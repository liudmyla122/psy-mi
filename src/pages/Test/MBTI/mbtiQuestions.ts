// MBTI Test Questions Data
// Based on Google Sheets: https://docs.google.com/spreadsheets/d/1tw9LPQTupOoWU3Nvrzd-lWrIiNK-UX1RPoX-_FGVvN4/edit?gid=0#gid=0

export interface MBTIQuestion {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  scores: {
    // Баллы для варианта A (а)
    optionA: {
      E?: number; // Экстраверсия
      I?: number; // Интроверсия
      S?: number; // Сенсорика
      N?: number; // Интуиция
      T?: number; // Мышление
      F?: number; // Чувство
      J?: number; // Суждение
      P?: number; // Восприятие
    };
    // Баллы для варианта B (б)
    optionB: {
      E?: number;
      I?: number;
      S?: number;
      N?: number;
      T?: number;
      F?: number;
      J?: number;
      P?: number;
    };
  };
}

export const mbtiQuestions: MBTIQuestion[] = [
  // Блок 1
  {
    id: 1,
    text: 'Зазвичай ви:',
    optionA: 'товариські (любите спілкуватися)',
    optionB: 'досить стримані та спокійні',
    scores: {
      optionA: { E: 2 },
      optionB: { I: 2 },
    },
  },
  {
    id: 2,
    text: 'Якби ви були викладачем, який курс ви б\nобрали:',
    optionA: 'курс, побудований на викладі фактів',
    optionB: 'курс, що зосереджений на теоріях',
    scores: {
      optionA: { S: 2 },
      optionB: { N: 2 },
    },
  },
  {
    id: 3,
    text: 'Ви частіше дозволяєте:',
    optionA: 'своєму серцю керувати розумом',
    optionB: 'своєму розуму керувати серцем',
    scores: {
      optionA: { F: 2 },
      optionB: { T: 2 },
    },
  },
  {
    id: 4,
    text: 'Коли ви вирушаєте кудись на весь день, ви:',
    optionA: 'заздалегідь плануєте, що і коли робитимете',
    optionB: 'дієте непередбачувано, без чіткого плану',
    scores: {
      optionA: { J: 2 },
      optionB: { P: 2 },
    },
  },
  {
    id: 5,
    text: 'Перебуваючи у компанії, ви зазвичай:',
    optionA: 'приєднуєтеся до загальної розмови',
    optionB: 'спілкуєтеся з кимось один на один',
    scores: {
      optionA: { E: 1 },
      optionB: { I: 2 },
    },
  },
  {
    id: 6,
    text: 'Вам легше порозумітися з людьми:',
    optionA: 'які мають багату уяву та мислять образами',
    optionB: 'які мислять практично та реалістично',
    scores: {
      optionA: { N: 1 },
      optionB: { S: 2 },
    },
  },
  {
    id: 7,
    text: 'Яку характеристику ви вважаєте\nприємнішою:',
    optionA: '«ви дуже душевна, тепла людина»',
    optionB: '«ви логічна та послідовна людина»',
    scores: {
      optionA: { F: 2 },
      optionB: { T: 1 },
    },
  },
  {
    id: 8,
    text: 'Ви віддаєте перевагу:',
    optionA: 'планувати зустрічі та події заздалегідь',
    optionB: 'вирішувати спонтанно, що робити в останній момент',
    scores: {
      optionA: { J: 2 },
      optionB: { P: 1 },
    },
  },
  {
    id: 9,
    text: 'У великій компанії частіше:',
    optionA: 'Ви знайомите людей один з одним',
    optionB: 'Вас знайомлять із іншими',
    scores: {
      optionA: { E: 2 },
      optionB: { I: 2 },
    },
  },
  {
    id: 10,
    text: 'Вас швидше можна назвати:',
    optionA: 'людиною практичною',
    optionB: 'мрійником',
    scores: {
      optionA: { S: 2 },
      optionB: { N: 2 },
    },
  },
  {
    id: 11,
    text: 'Зазвичай ви:',
    optionA: 'цінуєте почуття більше, ніж логіку',
    optionB: 'цінуйте логіку більше, ніж почуття',
    scores: {
      optionA: { F: 2 },
      optionB: { T: 2 },
    },
  },
  {
    id: 12,
    text: 'Ви частіше досягаєте успіху:',
    optionA: 'діючи у непередбачуваній ситуації, коли потрібно швидко приймати рішення',
    optionB: 'слідуючи ретельно розробленому плану',
    scores: {
      optionA: { P: 1 },
      optionB: { J: 1 },
    },
  },
  {
    id: 13,
    text: 'Ви віддаєте перевагу:',
    optionA: 'мати кілька близьких, вірних друзів',
    optionB: 'мати дружні зв\'язки з різними людьми',
    scores: {
      optionA: { I: 2 },
      optionB: { E: 1 },
    },
  },
  {
    id: 14,
    text: 'Вам більше подобаються люди, які:',
    optionA: 'дотримуються загальноприйнятих норм і не привертають до себе уваги',
    optionB: 'настільки оригінальні, що їм байдуже, звертають на них увагу чи ні',
    scores: {
      optionA: { S: 1 },
      optionB: { N: 2 },
    },
  },
  {
    id: 15,
    text: 'На вашу думку найбільший недолік - бути:',
    optionA: 'байдужим',
    optionB: 'нерозсудливим',
    scores: {
      optionA: {},
      optionB: { T: 2 },
    },
  },
  {
    id: 16,
    text: 'Дотримання чіткого розкладу для вас:',
    optionA: 'комфортне та зрозуміле',
    optionB: 'відчувається обмежувальним',
    scores: {
      optionA: { J: 2 },
      optionB: { P: 2 },
    },
  },
  {
    id: 17,
    text: 'Серед своїх друзів ви:',
    optionA: 'пізніше за інших дізнаєтеся про події в їхньому житті',
    optionB: 'часто перші дізнаєтеся про події в їхньому житті',
    scores: {
      optionA: { I: 2 },
      optionB: { E: 1 },
    },
  },
  {
    id: 18,
    text: 'Ви б воліли мати серед своїх друзів\nлюдину, яка:',
    optionA: 'часто генерує нові ідеї та мислить творчо',
    optionB: 'мислить практично і реалістично',
    scores: {
      optionA: { N: 2 },
      optionB: { S: 1 },
    },
  },
  {
    id: 19,
    text: 'Ви воліли б працювати під керівництвом\nлюдини, яка:',
    optionA: 'проявляє підтримку й розуміння',
    optionB: 'діє об\'єктивно та справедливо.',
    scores: {
      optionA: {},
      optionB: { T: 2 },
    },
  },
  {
    id: 20,
    text: 'Думка про те, щоб скласти список\nсправ на вихідні:',
    optionA: 'вас приваблює',
    optionB: 'залишає вас байдужим',
    scores: {
      optionA: { J: 1 },
      optionB: { P: 1 },
    },
  },
  {
    id: 21,
    text: 'Ви зазвичай:',
    optionA: 'легко підтримуєте розмову з більшістю людей',
    optionB: 'почуваєтеся комфортно спілкуючись лише з окремими людьми у знайомих ситуаціях',
    scores: {
      optionA: { E: 2 },
      optionB: { I: 2 },
    },
  },
  {
    id: 22,
    text: 'Коли ви читаєте для свого задоволення,\nвам подобається:',
    optionA: 'нестандартний, оригінальний стиль подачі',
    optionB: 'чіткий і зрозумілий виклад думок автора',
    scores: {
      optionA: { N: 1 },
      optionB: {},
    },
  },
  {
    id: 23,
    text: 'Ви вважаєте, що серйозніший недолік:',
    optionA: 'надто зосереджуватися на почуттях',
    optionB: 'недостатньо враховувати почуття інших',
    scores: {
      optionA: { T: 1 },
      optionB: {},
    },
  },
  {
    id: 24,
    text: 'У своїй повсякденній роботі:',
    optionA: 'вам більше подобаються критичні ситуації, коли вам доводиться працювати в умовах дефіциту часу',
    optionB: 'вам складно працювати в жорстких часових рамках',
    scores: {
      optionA: {},
      optionB: { J: 1 },
    },
  },
  {
    id: 25,
    text: 'Люди можуть визначити область ваших\nінтересів:',
    optionA: 'за першого знайомства з вами',
    optionB: 'лише тоді, коли дізнаються вас ближче',
    scores: {
      optionA: { E: 1 },
      optionB: { I: 1 },
    },
  },
  {
    id: 26,
    text: 'Виконуючи ту ж роботу, що і багато\nінших людей, ви віддаєте перевагу:',
    optionA: 'користуватися звичними, перевіреними способами',
    optionB: 'шукати власний підхід або пробувати нові методи',
    scores: {
      optionA: { S: 1 },
      optionB: { N: 1 },
    },
  },
  {
    id: 27,
    text: 'Вас більше хвилюють:',
    optionA: 'почуття та емоційний стан людей',
    optionB: 'принципи, правила та об\'єктивність',
    scores: {
      optionA: { F: 2 },
      optionB: {},
    },
  },
  {
    id: 28,
    text: 'Коли вам потрібно виконати певну\nроботу, ви зазвичай:',
    optionA: 'ретельно організовуєте все перед початком роботи',
    optionB: 'вважаєте за краще з\'ясовувати все необхідне в процесі роботи',
    scores: {
      optionA: { J: 1 },
      optionB: { P: 2 },
    },
  },
  {
    id: 29,
    text: 'Зазвичай ви:',
    optionA: 'вільно висловлюєте свої почуття',
    optionB: 'тримайте свої почуття при собі',
    scores: {
      optionA: { E: 1 },
      optionB: {},
    },
  },
  {
    id: 30,
    text: 'Ви віддаєте перевагу:',
    optionA: 'бути оригінальним',
    optionB: 'дотримуватися загальноприйнятих норм',
    scores: {
      optionA: { N: 1 },
      optionB: {},
    },
  },
  // Блок 2
  {
    id: 31,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'лагідний',
    optionB: 'наполегливий',
    scores: {
      optionA: { F: 2 },
      optionB: { T: 1 },
    },
  },
  {
    id: 32,
    text: 'Коли вам необхідно щось зробити у\nпевний час, ви вважаєте, що:',
    optionA: 'краще заздалегідь усе спланувати',
    optionB: 'плани трохи обмежують вашу гнучкість',
    scores: {
      optionA: { J: 1 },
      optionB: { P: 1 },
    },
  },
  {
    id: 33,
    text: 'Можна сказати, що ви:',
    optionA: 'більш захоплені ніж інші',
    optionB: 'менш захоплені, ніж більшість людей',
    scores: {
      optionA: { E: 1 },
      optionB: { I: 1 },
    },
  },
  {
    id: 34,
    text: 'Більш високою похвалою людині буде\nвизнання:',
    optionA: 'його здатності до передбачення',
    optionB: 'його здорового глузду',
    scores: {
      optionA: { N: 1 },
      optionB: { S: 2 },
    },
  },
  {
    id: 35,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'думки',
    optionB: 'почуття',
    scores: {
      optionA: { T: 2 },
      optionB: { F: 1 },
    },
  },
  {
    id: 36,
    text: 'Зазвичай:',
    optionA: 'ви волієте все робити в останню хвилину',
    optionB: 'для вас відкладати все до останньої хвилини - це занадто велике напруження',
    scores: {
      optionA: { P: 1 },
      optionB: { J: 1 },
    },
  },
  {
    id: 37,
    text: 'На вечірках вам:',
    optionA: 'іноді стає нудно',
    optionB: 'завжди весело',
    scores: {
      optionA: { I: 2 },
      optionB: { E: 1 },
    },
  },
  {
    id: 38,
    text: 'Ви вважаєте, що важливіше:',
    optionA: 'бачити різні можливості у будь-якій ситуації',
    optionB: 'сприймати факти такими, якими вони є',
    scores: {
      optionA: { N: 1 },
      optionB: {},
    },
  },
  {
    id: 39,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'переконливий',
    optionB: 'зворушливий',
    scores: {
      optionA: { T: 2 },
      optionB: { F: 1 },
    },
  },
  {
    id: 40,
    text: 'Чи вважаєте ви, що наявність стабільного\nповсякденного розпорядку:',
    optionA: 'дуже зручно до виконання багатьох справ',
    optionB: 'обтяжливо, навіть коли це потрібно',
    scores: {
      optionA: { J: 2 },
      optionB: { P: 2 },
    },
  },
  {
    id: 41,
    text: 'Коли щось входить у моду, ви зазвичай:',
    optionA: 'одним із перших випробовуєте це',
    optionB: 'мало цим цікавитеся',
    scores: {
      optionA: {},
      optionB: { I: 2 },
    },
  },
  {
    id: 42,
    text: 'Ви скоріше:',
    optionA: 'дотримуєтеся загальноприйнятих методів у роботі',
    optionB: 'шукаєте, що ще не так, і беретеся за невирішені проблеми',
    scores: {
      optionA: { S: 2 },
      optionB: {},
    },
  },
  {
    id: 43,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'аналізувати',
    optionB: 'співпереживати',
    scores: {
      optionA: { T: 1 },
      optionB: { F: 2 },
    },
  },
  {
    id: 44,
    text: 'Коли ви думаєте про те, що треба зробити\nякусь не дуже важливу справу або купити\nякусь дрібну річ, ви:',
    optionA: 'часто забуваєте про це і згадуєте надто пізно',
    optionB: 'фіксуєте в нотатках, щоб точно не забути',
    scores: {
      optionA: { P: 1 },
      optionB: { J: 1 },
    },
  },
  {
    id: 45,
    text: 'Дізнатися, що ви за людина:',
    optionA: 'досить легко',
    optionB: 'досить складно',
    scores: {
      optionA: { E: 1 },
      optionB: { I: 2 },
    },
  },
  {
    id: 46,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'факти',
    optionB: 'ідеї',
    scores: {
      optionA: { S: 2 },
      optionB: { N: 1 },
    },
  },
  {
    id: 47,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'справедливість',
    optionB: 'співчуття',
    scores: {
      optionA: { T: 1 },
      optionB: { F: 2 },
    },
  },
  {
    id: 48,
    text: 'Вам складніше пристосуватися:',
    optionA: 'до одноманітності',
    optionB: 'до постійних змін',
    scores: {
      optionA: { P: 1 },
      optionB: { J: 1 },
    },
  },
  {
    id: 49,
    text: 'Опинившись у скрутній ситуації,\nви зазвичай:',
    optionA: 'переводите розмову на інше',
    optionB: 'переводите все в жарт',
    scores: {
      optionA: { I: 1 },
      optionB: {},
    },
  },
  {
    id: 50,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'ствердження',
    optionB: 'ідея',
    scores: {
      optionA: { S: 2 },
      optionB: { N: 1 },
    },
  },
  {
    id: 51,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'співчуття',
    optionB: 'розважливість',
    scores: {
      optionA: { F: 2 },
      optionB: { T: 1 },
    },
  },
  {
    id: 52,
    text: 'Коли Ви починаєте якусь велику справу,\nяка займе у вас тиждень, ви:',
    optionA: 'складаєте спочатку список того, що потрібно зробити та в якому порядку',
    optionB: 'одразу беретеся за роботу',
    scores: {
      optionA: { J: 2 },
      optionB: { P: 1 },
    },
  },
  {
    id: 53,
    text: 'Ви вважаєте, що вашим близьким відомі\nваші думки:',
    optionA: 'досить добре',
    optionB: 'лише тоді, коли ви навмисно повідомляєте про них',
    scores: {
      optionA: { E: 1 },
      optionB: { I: 1 },
    },
  },
  {
    id: 54,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'теорія',
    optionB: 'факт',
    scores: {
      optionA: { N: 1 },
      optionB: { S: 2 },
    },
  },
  {
    id: 55,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'логіка',
    optionB: 'емпатія',
    scores: {
      optionA: { T: 1 },
      optionB: { F: 1 },
    },
  },
  {
    id: 56,
    text: 'Виконуючи якусь роботу, ви зазвичай:',
    optionA: 'плануєте роботу в такий спосіб, щоб закінчити із запасом часу',
    optionB: 'в останній момент працюєте з найвищою продуктивністю',
    scores: {
      optionA: { J: 1 },
      optionB: {},
    },
  },
  {
    id: 57,
    text: 'Перебуваючи на вечірці, ви віддаєте\nперевагу:',
    optionA: 'брати активну участь у розвитку подій',
    optionB: 'надаєте можливість іншим розважатись, як їм хочеться',
    scores: {
      optionA: { E: 1 },
      optionB: { I: 2 },
    },
  },
  {
    id: 58,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'буквальний',
    optionB: 'фігуральний',
    scores: {
      optionA: { S: 1 },
      optionB: { N: 1 },
    },
  },
  {
    id: 59,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'рішучий',
    optionB: 'відданий',
    scores: {
      optionA: { T: 1 },
      optionB: { F: 2 },
    },
  },
  {
    id: 60,
    text: 'Якщо у вихідний вранці вас спитають,\nщо ви збираєтеся зробити протягом\ndня, ви:',
    optionA: 'зможете досить точно відповісти',
    optionB: 'перерахуйте вдвічі більше справ, ніж зможете зробити',
    scores: {
      optionA: {},
      optionB: { P: 1 },
    },
  },
  {
    id: 61,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'енергійний',
    optionB: 'спокійний',
    scores: {
      optionA: { E: 1 },
      optionB: { I: 2 },
    },
  },
  {
    id: 62,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'образний',
    optionB: 'прозаїчний',
    scores: {
      optionA: { N: 2 },
      optionB: {},
    },
  },
  {
    id: 63,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'непоступливий',
    optionB: 'добросердечний',
    scores: {
      optionA: { T: 2 },
      optionB: {},
    },
  },
  {
    id: 64,
    text: 'Одноманітність повсякденних справ\nздається вам:',
    optionA: 'спокійним',
    optionB: 'стомлюючим',
    scores: {
      optionA: { J: 1 },
      optionB: {},
    },
  },
  {
    id: 65,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'стриманий',
    optionB: 'балакучий',
    scores: {
      optionA: { I: 2 },
      optionB: { E: 1 },
    },
  },
  {
    id: 66,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'робити',
    optionB: 'творити',
    scores: {
      optionA: { S: 2 },
      optionB: {},
    },
  },
  {
    id: 67,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'миротворець',
    optionB: 'суддя',
    scores: {
      optionA: { F: 2 },
      optionB: {},
    },
  },
  {
    id: 68,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'запланований',
    optionB: 'позаплановий',
    scores: {
      optionA: { J: 2 },
      optionB: { P: 2 },
    },
  },
  {
    id: 69,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'спокійний',
    optionB: 'жвавий',
    scores: {
      optionA: { I: 1 },
      optionB: { E: 1 },
    },
  },
  {
    id: 70,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'практичний',
    optionB: 'креативний',
    scores: {
      optionA: { S: 2 },
      optionB: {},
    },
  },
  {
    id: 71,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'м\'який',
    optionB: 'твердий',
    scores: {
      optionA: { F: 2 },
      optionB: {},
    },
  },
  {
    id: 72,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'методичний',
    optionB: 'спонтанний',
    scores: {
      optionA: { J: 2 },
      optionB: { P: 2 },
    },
  },
  {
    id: 73,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'говорити',
    optionB: 'писати',
    scores: {
      optionA: {},
      optionB: { I: 1 },
    },
  },
  {
    id: 74,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'реальність',
    optionB: 'уяву',
    scores: {
      optionA: { S: 1 },
      optionB: { N: 1 },
    },
  },
  {
    id: 75,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'прощати',
    optionB: 'дозволяти',
    scores: {
      optionA: { F: 2 },
      optionB: {},
    },
  },
  {
    id: 76,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'систематичний',
    optionB: 'довільний',
    scores: {
      optionA: { J: 2 },
      optionB: { P: 2 },
    },
  },
  {
    id: 77,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'товариський',
    optionB: 'замкнутий',
    scores: {
      optionA: { E: 1 },
      optionB: { I: 1 },
    },
  },
  {
    id: 78,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'конкретний',
    optionB: 'абстрактний',
    scores: {
      optionA: { S: 1 },
      optionB: { N: 2 },
    },
  },
  {
    id: 79,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'хто',
    optionB: 'що',
    scores: {
      optionA: { F: 1 },
      optionB: {},
    },
  },
  {
    id: 80,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'імпульс',
    optionB: 'рішення',
    scores: {
      optionA: { P: 1 },
      optionB: { J: 2 },
    },
  },
  {
    id: 81,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'вечірка',
    optionB: 'театр',
    scores: {
      optionA: { E: 1 },
      optionB: {},
    },
  },
  {
    id: 82,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'споруджувати',
    optionB: 'винаходити',
    scores: {
      optionA: { S: 2 },
      optionB: { N: 1 },
    },
  },
  {
    id: 83,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'некритичний',
    optionB: 'критичний',
    scores: {
      optionA: { F: 1 },
      optionB: { T: 1 },
    },
  },
  {
    id: 84,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'пунктуальний',
    optionB: 'вільний',
    scores: {
      optionA: { J: 1 },
      optionB: { P: 1 },
    },
  },
  {
    id: 85,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'основа',
    optionB: 'вершина',
    scores: {
      optionA: {},
      optionB: { S: 2 },
    },
  },
  {
    id: 86,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'обережний',
    optionB: 'довірливий',
    scores: {
      optionA: { T: 2 },
      optionB: {},
    },
  },
  {
    id: 87,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'мінливий',
    optionB: 'постійний',
    scores: {
      optionA: { P: 1 },
      optionB: {},
    },
  },
  {
    id: 88,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'теорія',
    optionB: 'практика',
    scores: {
      optionA: {},
      optionB: { S: 2 },
    },
  },
  {
    id: 89,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'погоджуватися',
    optionB: 'обговорювати',
    scores: {
      optionA: {},
      optionB: { T: 1 },
    },
  },
  {
    id: 90,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'дисциплінований',
    optionB: 'безтурботний',
    scores: {
      optionA: { J: 2 },
      optionB: { P: 1 },
    },
  },
  {
    id: 91,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'знак',
    optionB: 'символ',
    scores: {
      optionA: { S: 1 },
      optionB: {},
    },
  },
  {
    id: 92,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'стрімкий',
    optionB: 'ретельний',
    scores: {
      optionA: {},
      optionB: { J: 1 },
    },
  },
  {
    id: 93,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'приймати',
    optionB: 'змінювати',
    scores: {
      optionA: { J: 1 },
      optionB: {},
    },
  },
  {
    id: 94,
    text: 'Яке слово з пари (А чи Б) вам більше\nподобається:',
    optionA: 'відомий',
    optionB: 'невідомий',
    scores: {
      optionA: { S: 1 },
      optionB: { N: 1 },
    },
  },
];

// Экспорт функции для расчета типа MBTI
export const calculateMBTIType = (answers: { [questionId: number]: 'A' | 'B' }): string => {
  const scores = {
    E: 0, // Экстраверсия
    I: 0, // Интроверсия
    S: 0, // Сенсорика
    N: 0, // Интуиция
    T: 0, // Мышление
    F: 0, // Чувство
    J: 0, // Суждение
    P: 0, // Восприятие
  };

  mbtiQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer) {
      const answerScores = answer === 'A' ? question.scores.optionA : question.scores.optionB;
      Object.keys(answerScores).forEach((key) => {
        const dimension = key as keyof typeof answerScores;
        if (answerScores[dimension]) {
          scores[dimension] += answerScores[dimension] || 0;
        }
      });
    }
  });

  const type = [
    scores.E >= scores.I ? 'E' : 'I',
    scores.S >= scores.N ? 'S' : 'N',
    scores.T >= scores.F ? 'T' : 'F',
    scores.J >= scores.P ? 'J' : 'P',
  ].join('');

  return type;
};
