import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Настройка email транспорта (для восстановления пароля)
// Если SMTP не настроен, создаем "транспорт-заглушку" для режима разработки
let emailTransporter: nodemailer.Transporter | null = null;

if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  try {
    emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true для 465, false для других портов
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('SMTP transporter configured');
  } catch (error) {
    console.error('Failed to configure SMTP transporter:', error);
  }
} else {
  console.log('SMTP не настроен. Email не будет отправляться. В режиме разработки токены будут выводиться в консоль.');
}

// Функция для отправки email с токеном восстановления
const sendPasswordResetEmail = async (email: string, resetToken: string) => {
  if (!emailTransporter) {
    throw new Error('SMTP не настроен');
  }

  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@psymi.com',
    to: email,
    subject: 'Відновлення пароля - PSY MI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #347AEC;">Відновлення пароля</h2>
        <p>Ви отримали цей email, тому що ви (або хтось інший) запросили відновлення пароля для вашого облікового запису.</p>
        <p>Натисніть на кнопку нижче, щоб встановити новий пароль:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #347AEC; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Відновити пароль</a>
        <p>Або скопіюйте та вставте цю посилання у ваш браузер:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p>Якщо ви не запитували відновлення пароля, проігноруйте цей email.</p>
        <p>Це посилання дійсне протягом 1 години.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 12px;">PSY MI - Психологічні тести</p>
      </div>
    `,
  };

  await emailTransporter.sendMail(mailOptions);
  console.log('Password reset email sent to:', email);
};

// Проверяем доступность модели testResult при запуске
console.log('Prisma Client initialized');
console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$') && typeof prisma[k] === 'object' && prisma[k] !== null));
console.log('testResult available:', 'testResult' in prisma);

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Увеличиваем лимит для загрузки изображений
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware для проверки токена
const authenticateToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ detail: 'Токен не надано' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ detail: 'Користувач не знайдений' });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(403).json({ detail: 'Недійсний токен' });
  }
};

// Регистрация пользователя
app.post('/api/auth/users/', async (req, res) => {
  try {
    const { email, password, re_password, first_name, scope } = req.body;

    // Валидация
    if (!email || !password || !re_password || !first_name) {
      return res.status(400).json({
        email: !email ? ['Це поле обов\'язкове.'] : undefined,
        password: !password ? ['Це поле обов\'язкове.'] : undefined,
        re_password: !re_password ? ['Це поле обов\'язкове.'] : undefined,
        first_name: !first_name ? ['Це поле обов\'язкове.'] : undefined,
      });
    }

    if (password !== re_password) {
      return res.status(400).json({
        re_password: ['Паролі не співпадають.'],
      });
    }

    if (password.length < 8 || password.length > 16) {
      return res.status(400).json({
        password: ['Пароль повинен містити від 8 до 16 символів.'],
      });
    }

    // Проверка существования пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        email: ['Користувач з таким email вже існує.'],
      });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        scope: scope || null,
        isRegistered: true,
      },
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      scope: user.scope,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ detail: 'Помилка сервера при реєстрації' });
  }
});

// Вход пользователя
app.post('/api/auth/token/login/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        detail: 'Email та пароль обов\'язкові',
      });
    }

    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(400).json({
        detail: 'Невірний email або пароль',
      });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        detail: 'Невірний email або пароль',
      });
    }

    // Генерация токена
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      auth_token: token,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ detail: 'Помилка сервера при вході' });
  }
});

// Получение информации о текущем пользователе
app.get('/api/auth/users/me/', authenticateToken, async (req, res) => {
  try {
    const user = (req as any).user;

    res.json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      scope: user.scope,
      username: user.username,
      image: user.image,
      createdAt: user.createdAt,
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({ detail: 'Помилка сервера при отриманні інформації про користувача' });
  }
});

// Выход пользователя (опционально, для инвалидации токена)
app.post('/api/auth/token/logout/', authenticateToken, async (req, res) => {
  try {
    // В этом простом примере мы просто возвращаем успех
    // В реальном приложении можно добавить черный список токенов
    res.json({ detail: 'Успішний вихід' });
  } catch (error: any) {
    console.error('Logout error:', error);
    res.status(500).json({ detail: 'Помилка сервера при виході' });
  }
});

// Обновление аватара пользователя
app.patch('/api/auth/users/me/', authenticateToken, async (req, res) => {
  try {
    const user = (req as any).user;
    const { image } = req.body;

    if (image && typeof image === 'string') {
      // Обновляем изображение пользователя
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { image },
      });

      res.json({
        id: updatedUser.id,
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        scope: updatedUser.scope,
        username: updatedUser.username,
        image: updatedUser.image,
        createdAt: updatedUser.createdAt,
      });
    } else {
      res.status(400).json({ detail: 'Некоректні дані для оновлення' });
    }
  } catch (error: any) {
    console.error('Update user error:', error);
    res.status(500).json({ detail: 'Помилка сервера при оновленні профілю' });
  }
});

// Сохранение результата теста
app.post('/api/test-results/', authenticateToken, async (req, res) => {
  try {
    const user = (req as any).user;
    const { testName, testType, result, score } = req.body;

    console.log('Saving test result:', { userId: user.id, testName, testType, result, score });

    if (!testName || !testType || !result) {
      console.error('Missing required fields:', { testName, testType, result });
      return res.status(400).json({
        detail: 'Необхідно вказати testName, testType та result',
      });
    }

    // Проверяем, что модель testResult доступна
    if (!prisma.testResult) {
      console.error('ERROR: prisma.testResult is not available!');
      console.error('Available models:', Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
      return res.status(500).json({ 
        detail: 'Модель TestResult не доступна в Prisma Client. Перезапустите сервер.',
      });
    }

    const testResult = await prisma.testResult.create({
      data: {
        userId: user.id,
        testName,
        testType,
        result,
        score: score || null,
      },
    });

    console.log('Test result saved successfully:', testResult.id);

    res.status(201).json({
      id: testResult.id,
      testName: testResult.testName,
      testType: testResult.testType,
      result: testResult.result,
      score: testResult.score,
      completedAt: testResult.completedAt,
    });
  } catch (error: any) {
    console.error('Save test result error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    // Более детальная информация об ошибке
    let errorDetail = 'Помилка сервера при збереженні результату тесту';
    if (error.code === 'P2002') {
      errorDetail = 'Результат з таким значенням вже існує';
    } else if (error.code === 'P2003') {
      errorDetail = 'Помилка зовнішнього ключа (користувач не знайдений)';
    } else if (error.message) {
      errorDetail = `Помилка: ${error.message}`;
    }
    
    res.status(500).json({ 
      detail: errorDetail,
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        code: error.code,
        name: error.name
      } : undefined
    });
  }
});

// Получение результатов тестов пользователя
app.get('/api/test-results/', authenticateToken, async (req, res) => {
  try {
    const user = (req as any).user;
    
    const testResults = await prisma.testResult.findMany({
      where: { userId: user.id },
      orderBy: { completedAt: 'desc' },
    });

    res.json(testResults.map(result => ({
      id: result.id,
      testName: result.testName,
      testType: result.testType,
      result: result.result,
      score: result.score,
      completedAt: result.completedAt,
    })));
  } catch (error: any) {
    console.error('Get test results error:', error);
    res.status(500).json({ detail: 'Помилка сервера при отриманні результатів тестів' });
  }
});

// Запрос на восстановление пароля
app.post('/api/auth/password/reset/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        detail: 'Email обов\'язковий',
      });
    }

    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Для безопасности всегда возвращаем успех, даже если пользователь не найден
    // Это предотвращает перебор email адресов
    if (!user) {
      return res.json({
        detail: 'Якщо користувач з таким email існує, ми надіслали інструкції для відновлення пароля.',
      });
    }

    // Генерация токена восстановления
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Токен действителен 1 час

    // Сохранение токена в базе данных (используем модель VerificationToken)
    await prisma.verificationToken.upsert({
      where: {
        identifier_token: {
          identifier: email,
          token: resetToken,
        },
      },
      update: {
        token: resetToken,
        expires: expiresAt,
      },
      create: {
        identifier: email,
        token: resetToken,
        expires: expiresAt,
      },
    });

    // Отправка email
    try {
      if (emailTransporter) {
        await sendPasswordResetEmail(email, resetToken);
        console.log('Password reset email sent successfully to:', email);
      } else {
        // В режиме разработки выводим токен в консоль для тестирования
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
        console.log('========================================');
        console.log('SMTP не настроен. Password reset token (для тестирования):');
        console.log('Email:', email);
        console.log('Token:', resetToken);
        console.log('Reset URL:', resetUrl);
        console.log('========================================');
      }
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // В режиме разработки выводим токен в консоль для тестирования
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
      console.log('========================================');
      console.log('Development mode: Password reset token:');
      console.log('Email:', email);
      console.log('Token:', resetToken);
      console.log('Reset URL:', resetUrl);
      console.log('========================================');
      // Не прерываем выполнение - токен сохранен, пользователь может использовать ссылку
    }

    // Всегда возвращаем успех для безопасности (не раскрываем, существует ли пользователь)
    res.json({
      detail: 'Якщо користувач з таким email існує, ми надіслали інструкції для відновлення пароля.',
    });
  } catch (error: any) {
    console.error('Password reset request error:', error);
    res.status(500).json({ detail: 'Помилка сервера при запиті відновлення пароля' });
  }
});

// Подтверждение восстановления пароля (установка нового пароля)
app.post('/api/auth/password/reset/confirm/', async (req, res) => {
  try {
    const { token, new_password, re_password } = req.body;

    if (!token || !new_password || !re_password) {
      return res.status(400).json({
        detail: 'Токен, новий пароль та підтвердження пароля обов\'язкові',
      });
    }

    if (new_password !== re_password) {
      return res.status(400).json({
        detail: 'Паролі не співпадають',
      });
    }

    if (new_password.length < 8 || new_password.length > 16) {
      return res.status(400).json({
        detail: 'Пароль повинен містити від 8 до 16 символів',
      });
    }

    // Поиск токена в базе данных
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token: token,
        expires: {
          gt: new Date(), // Токен еще не истек
        },
      },
    });

    if (!verificationToken) {
      return res.status(400).json({
        detail: 'Недійсний або прострочений токен відновлення пароля',
      });
    }

    // Поиск пользователя по email (identifier)
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return res.status(400).json({
        detail: 'Користувач не знайдений',
      });
    }

    // Хеширование нового пароля
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Обновление пароля пользователя
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Удаление использованного токена
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
        },
      },
    });

    res.json({
      detail: 'Пароль успішно змінено. Тепер ви можете увійти з новим паролем.',
    });
  } catch (error: any) {
    console.error('Password reset confirm error:', error);
    res.status(500).json({ detail: 'Помилка сервера при зміні пароля' });
  }
});

// Удаление результата теста
app.delete('/api/test-results/:id', authenticateToken, async (req, res) => {
  try {
    const user = (req as any).user;
    const resultId = req.params.id;
    
    // Проверяем, что результат принадлежит пользователю
    const testResult = await prisma.testResult.findUnique({
      where: { id: resultId },
    });
    
    if (!testResult) {
      return res.status(404).json({ detail: 'Результат тесту не знайдено' });
    }
    
    if (testResult.userId !== user.id) {
      return res.status(403).json({ detail: 'Немає доступу до цього результату' });
    }
    
    // Удаляем результат
    await prisma.testResult.delete({
      where: { id: resultId },
    });
    
    res.json({ message: 'Результат тесту успішно видалено' });
  } catch (error: any) {
    console.error('Delete test result error:', error);
    res.status(500).json({ detail: 'Помилка сервера при видаленні результату тесту' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

