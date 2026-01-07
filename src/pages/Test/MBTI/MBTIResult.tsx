import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../../../layout';
import { getAssetUrl } from '../../../utils/assetPath';
import './MBTI.css';

// Данные о типах MBTI
const mbtiTypesData: { [key: string]: { name: string; description: string; traits: string; professions: string } } = {
  ESTJ: {
    name: 'МЕНЕДЖЕР',
    description: 'Працездатний співробітник, який сприймає світ «таким, яким він є». Він схильний планувати і доводити до кінця початі справи. Піклується про близьке оточення, добродушний, але в той же час може бути запальним, різким, а іноді і впертим.',
    traits: 'екстраверт, сенсорик, логік, раціонал',
    professions: 'СЕO, COO, Project Manager (керівні посади).',
  },
  ESTP: {
    name: 'ПІДПРИЄМЕЦЬ',
    description: 'Така особистість досягає своїх цілей за будь-яку ціну. Перешкоди тільки підсилюють його прагнення до досягнення мети. Він прагне до керівництва і не вміє підкорятися. Зазвичай розробляє конкретний план дій і чітко його дотримується.',
    traits: 'екстраверт, сенсорик, логік, ірраціонал',
    professions: 'Менеджер по роботі з клієнтами, Підприємець, Маркетолог.',
  },
  ESFJ: {
    name: 'КОНСУЛ',
    description: 'Співробітник з такою комбінацією вміє впливати на людей, піклується іншими і схильний жертвувати собою. Він вміє легко налагодити зв\'язок з ким завгодно і повернути ситуацію в потрібне для себе русло.',
    traits: 'екстраверт, сенсорик, етик, раціонал',
    professions: 'Account Manager, HR manager, соціальний працівник.',
  },
  ESFP: {
    name: 'ШОУМЕН',
    description: 'Визначає слабкі сторони людей, що допомагає йому маніпулювати та керувати. Керується власними інтересами в спілкуванні з людьми і «живе в теперішньому». Така людина часто не доводить до кінця те, що почала, прагне до миттєвих результатів. Але в той же час орієнтується на гармонійні стосунки з іншими.',
    traits: 'екстраверт, сенсорик, етик, ірраціонал',
    professions: 'Event-manager, Стиліст, PR-спеціаліст.',
  },
  ENTJ: {
    name: 'КОМАНДИР',
    description: 'Співробітник легко захоплюється, йде на ризик, покладається на інтуїцію. Він без побоювань впроваджує нові технології, здатний глибоко аналізувати себе і світ. Життя для такої людини — боротьба, в якій відчуває себе «у своїй тарілці». Він відкритий новим можливостям, але має потребу в контролі.',
    traits: 'екстраверт, інтуїт, логік, раціонал',
    professions: 'СЕО, СМО, Стратегічний консультант, Юрист.',
  },
  ENTP: {
    name: 'ПОЛЕМІСТ',
    description: 'Винахідливий, ініціативний і вміє пристосовуватися — так можна охарактеризувати цього спеціаліста. Він той самий генератор ідей, першопроходець, який терпіти не може рутину. Постійний рух і інтуїтивне прийняття рішень — його постійні супутники.',
    traits: 'екстраверт, інтуїт, логік, ірраціонал',
    professions: 'Бренд-стратег, Підприємець або Стартап-засновник, Політичний стратег, Креативний директор.',
  },
  ENFJ: {
    name: 'ТРЕНЕР',
    description: 'Такий співробітник емоційний і емпатичний. Його міміка яскраво виражена, а сам він красномовний. Схильний до самоорганізації, саме тому його фантазії та ідеї реалізуються. Він інтуїтивно відчуває, яке рішення потрібно прийняти в тій чи іншій ситуації.',
    traits: 'екстраверт, інтуїт, етик, раціонал',
    professions: 'HR менеджер, Соціальний працівник, Викладач, Кар\'єрний консультант, Тренер з особистісного розвитку.',
  },
  ENFP: {
    name: 'АКТИВІСТ',
    description: 'Творча людина і фантазер. Комбінація якостей дозволяє йому ефективно співпрацювати з іншими людьми, бути відкритим і товариським. А ще брати участь в різних заходах, вирішувати виниклі питання і бути гнучким.',
    traits: 'екстраверт, інтуїт, етик, ірраціонал',
    professions: 'Креативний директор, Бренд-менеджер, Коуч.',
  },
  ISTJ: {
    name: 'АДМІНІСТРАТОР',
    description: 'Відповідальний, суворий, педантичний — такими якостями володіє людина з цією комбінацією. Він орієнтується на об\'єктивну реальність і схильний аналізувати інформацію. Береться за справу лише тоді, коли впевнений у своїх силах і позитивному результаті.',
    traits: 'інтроверт, сенсорик, логік, раціонал',
    professions: 'Аудитор, Юрист, Бухгалтер, Системний адміністратор, Офіс-менеджер.',
  },
  ISTP: {
    name: 'ВІРТУОЗ',
    description: 'Він пізнає світ через відчуття. За вдачею емпат, але здебільшого зосереджений на собі. Його здатність об\'єктивно приймати рішення і аналізувати говорить про технічний склад розуму. Завжди укладається в дедлайни, але іноді може діяти непередбачувано.',
    traits: 'інтроверт, сенсорик, логік, ірраціонал',
    professions: 'Аналітик, Розробник, Інженер-механік, Архітектор.',
  },
  ISFJ: {
    name: 'ЗАХИСНИК',
    description: 'Цей співробітник схильний аналізувати себе і інших, розпізнає фальш і тримає психологічну дистанцію. Він виконавчий, турботливий, служить іншим. Сили і енергію черпає з внутрішніх ресурсів і завжди покладається виключно на власний досвід.',
    traits: 'інтроверт, сенсорик, етик, раціонал',
    professions: 'Вихователь, Офіс-менеджер, Рекрутер, соціальний працівник.',
  },
  ISFP: {
    name: 'АВАНТЮРИСТ',
    description: 'Вміє насолоджуватись життям в умовах одноманітності і рутини. Відмінно взаємодіє з людьми, уникає конфліктів. Любить відчувати свою значимість і допомагати. Така людина не прагне керувати іншими або переробити їх, поважає їх простір і вимагає цього ж до себе. За вдачею є приземленим практиком, на якого можна покластися.',
    traits: 'інтроверт, сенсорик, етик, ірраціонал',
    professions: 'Графічний дизайнер, фотограф, консультант.',
  },
  INTJ: {
    name: 'СТРАТЕГ',
    description: 'Вміє виділяти головне, каже чітко і по суті, практик. Ця людина любить вдосконалювати все що робить, прагне реалізувати завдання якнайкраще. Він не любить порожніх розмов, тому уникає великих галасливих компаній і важко знаходить спільну мову з людьми.',
    traits: 'інтроверт, інтуїт, логік, раціонал',
    professions: 'Дослідник, Бізнес-стратег, Фінансовий аналітик, Керівник відділу досліджень та розвитку.',
  },
  INTP: {
    name: 'ЛОГІК',
    description: 'Цей співробітник — справжній ерудит, який має філософський склад розуму. Він аналізує свої рішення, прагне до об\'єктивності і неупередженості. Бурхливі прояви емоцій — це не про нього. З іншого боку, він відчуває напругу через велику кількість даних для аналізу і їх мінливість.',
    traits: 'інтроверт, інтуїт, логік, ірраціонал',
    professions: 'Аналітик, Researcher, програміст.',
  },
  INFJ: {
    name: 'АДВОКАТ',
    description: 'Про таких людей кажуть «йому можна довіряти». Він дуже чутливий, надає великого значення відносинам між людьми, вміє давати цінні поради і «відкривати інших». Розвинена інтуїція забезпечує не тільки нескінченний потік ідей, але і допомагає організовувати себе.',
    traits: 'інтроверт, інтуїт, етик, раціонал',
    professions: 'Психотерапевт, HR-спеціаліст, Викладач гуманітарних наук, Коуч із особистісного розвитку.',
  },
  INFP: {
    name: 'ПОСЕРЕДНИК',
    description: 'Ця людина — чутливий лірик, який відмінно розбирається в людях і викликає їх прихильність до себе. Він володіє хорошим почуттям гумору і надає велике значення зовнішньому вигляду. Прагне до самопізнання, жити в гармонії з самим собою і приносити користь оточуючим.',
    traits: 'інтроверт, інтуїт, етик, ірраціонал',
    professions: 'Журналіст, Ілюстратор, редактор, Спеціаліст із соціальної роботи.',
  },
};

export function MBTIResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedResult, setSavedResult] = useState<any>(null);
  const [mbtiResult, setMbtiResult] = useState<any>(null);

  useEffect(() => {
    const state = location.state as { savedResult?: any };
    if (state?.savedResult) {
      setSavedResult(state.savedResult);
      // Извлекаем данные из сохраненного результата
      const result = parseSavedResult(state.savedResult);
      setMbtiResult(result);
    } else {
      // Если нет сохраненного результата, перенаправляем в профиль
      const currentPath = location.pathname;
      if (currentPath.startsWith('/ua/')) {
        navigate('/ua/my-profile');
      } else if (currentPath.startsWith('/en/')) {
        navigate('/en/my-profile');
      } else {
        navigate('/my-profile');
      }
    }
  }, [location.state, location.pathname, navigate]);

  const parseSavedResult = (savedResult: any) => {
    if (!savedResult) return null;

    let mbtiType = '';
    let name = '';
    let description = '';
    let traits = '';
    let professions = '';

    if (savedResult.score && savedResult.score.includes('Type:')) {
      // Новый формат с полной информацией
      const scoreParts = savedResult.score.split(';');
      scoreParts.forEach((part: string) => {
        const [key, ...valueParts] = part.split(':');
        const value = valueParts.join(':');
        switch (key.trim()) {
          case 'Type':
            mbtiType = value.trim();
            break;
          case 'Name':
            name = value.trim();
            break;
          case 'Description':
            description = value.trim();
            break;
          case 'Traits':
            traits = value.trim();
            break;
          case 'Professions':
            professions = value.trim();
            break;
        }
      });
    } else {
      // Старый формат - только тип в score
      mbtiType = savedResult.score || '';
      name = savedResult.result || '';

      // Если тип найден, получаем данные из mbtiTypesData
      if (mbtiType && mbtiTypesData[mbtiType]) {
        const typeData = mbtiTypesData[mbtiType];
        name = name || typeData.name;
        description = typeData.description;
        traits = typeData.traits;
        professions = typeData.professions;
      } else if (name) {
        // Пытаемся найти тип по названию
        const foundType = Object.keys(mbtiTypesData).find(
          key => mbtiTypesData[key].name === name
        );
        if (foundType) {
          mbtiType = foundType;
          const typeData = mbtiTypesData[foundType];
          description = typeData.description;
          traits = typeData.traits;
          professions = typeData.professions;
        }
      }
    }

    // Определяем изображение для типа
    const imageMap: { [key: string]: string } = {
      ESTJ: '1.svg',
      INFJ: '2arh.svg',
      ISTJ: '3admin.svg',
      INTJ: '4strateg.svg',
      ENFP: '5aktivist.svg',
      INFP: '6posrednik.svg',
      ESTP: '7pidpr.svg',
      ISFJ: '8zahisnik.svg',
      ENTP: '9polemist.svg',
      ENTJ: '10komandir.svg',
      ISTP: '11virtuoz.svg',
      ISFP: '12avanturist.svg',
      ESFJ: '13konsul.svg',
      ENFJ: '14trener.svg',
      ESFP: '15houman.svg',
      INTP: '16logik.svg',
    };

    const imageName = mbtiType ? (imageMap[mbtiType] || '1.svg') : '1.svg';
    const imageUrl = getAssetUrl(`_assets/images/mbti/${imageName}`);

    return {
      type: mbtiType || 'UNKNOWN',
      name: name || savedResult.result || 'Результат MBTI',
      description: description || (savedResult.result ? `Ваш результат: ${savedResult.result}` : 'Результат тесту MBTI'),
      traits: traits || '',
      professions: professions || '',
      imageUrl: imageUrl,
    };
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (!savedResult || !mbtiResult) {
    return null;
  }

  return (
    <div className="mbti-page">
      <Sidebar />
      <main className="mbti-main">
        <div className="mbti-content">
          <div className="mbti-results" style={{ marginTop: '50px' }}>
            <div style={{ marginBottom: '1rem' }}>
              <button
                type="button"
                onClick={() => navigate('/my-profile')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#347AEC',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  padding: 0,
                  textDecoration: 'none',
                }}
              >
                ← Назад в профіль
              </button>
              {savedResult?.completedAt && (
                <p
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '14px',
                    color: '#6B7280',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  Дата проходження: {formatDate(savedResult.completedAt)}
                </p>
              )}
            </div>
            <h2 className="mbti-results-title">Результат MBTI</h2>
            <div className="mbti-results-content">
              <div className="mbti-results-image">
                <img src={mbtiResult.imageUrl} alt={mbtiResult.type} />
              </div>
              <div className="mbti-results-info">
                <h3 className="mbti-result-role">{mbtiResult.name}</h3>
                <p className="mbti-result-type">
                  <strong>{mbtiResult.type}:</strong> {mbtiResult.traits}
                </p>
                <p className="mbti-result-text">{mbtiResult.description}</p>
                <div className="mbti-result-profession">
                  <strong>ПРОФЕСІЇ:</strong> {mbtiResult.professions}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MBTIResultPage;

