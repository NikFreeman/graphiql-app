import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      lang: 'ENG',
      selectedLang: 'Selected Language: ENG',
      graphiqlBy: 'GraphiQL by Musical Trio',
      welcome: 'Welcome!',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      goToMain: 'Go to Main Page',
      signOut: 'Sign Out',
      up: 'Up!',
      email: 'Email address',
      password: 'Password',
      notFound: 'Not found',
      developers: 'Developers',
      variables: 'Variables',
      headers: 'Headers',
      docs: 'Docs',
      emailIsRequired: 'Email field is required',
      emailIsInvalid: 'Email is Invalid',
      passwordIsRequired: 'Password field is required',
      passwordMin: 'Password must be at least 6 characters',
      nickInfo:
        'NikFreeman is a talented programmer who is passionate about creating innovative and efficient software solutions. With a keen eye for detail and a deep understanding of programming languages and frameworks, Nik brings a valuable skillset to any project. As a core member of the GraphiQL app development team, Nik is constantly working to ensure that the app is both user-friendly and high-performing.',
      bonusInfo:
        'Bonus156 is a skilled developer with extensive experience in building complex web applications. With a creative approach to problem-solving and a dedication to producing high-quality code, Bonus is a valuable asset to any development team. As a key member of the GraphiQL app development team, Bonus is involved in all aspects of the project, from architecture design to feature implementation.',
      rockInfo:
        'Rockmonolit is a seasoned programmer with an impressive track record of delivering successful software projects. With a strong background in web development and a passion for designing intuitive user interfaces, Rockmonolit is a valuable addition to any development team. As an integral part of the GraphiQL app development team, Rockmonolit is working to create a powerful and user-friendly tool that will revolutionize the way developers interact with APIs.',
      projectInfoTitle: 'Information about the project',
      projectInfo:
        'GraphiQL is an integrated development environment (IDE) that is primarily used for querying APIs that are built using GraphQL. It is built using the React JavaScript library and allows developers to interactively explore and test their GraphQL APIs by writing and executing queries, viewing query results, and analyzing the underlying schema. GraphiQL for React provides a range of features designed to simplify the process of working with GraphQL APIs, making it an indispensable tool for developers building GraphQL-based applications.',
      courseInfoTitle: 'Information about the course',
      courseInfo:
        'The Rolling Scopes School offers a comprehensive course on React, covering topics such as JSX, class and functional components, virtual DOM, React hooks, Redux, and more. The course provides a strong foundation in React and web development, with hands-on projects and real-world scenarios designed to help students build practical skills. With experienced instructors and a supportive community, the Rolling Scopes React course is an excellent starting point for anyone looking to learn this popular JavaScript library.',
    },
  },
  ru: {
    translation: {
      lang: 'РУС',
      selectedLang: 'Язык: русский',
      graphiqlBy: 'GraphiQL от команды Musical Trio',
      welcome: 'Приветствуем!',
      signIn: 'Войти',
      signUp: 'Регистрация',
      goToMain: 'Вернуться на главную',
      signOut: 'Выйти',
      up: 'Наверх!',
      email: 'Электронный адрес',
      password: 'Пароль',
      notFound: 'Код ошибки: Страница не найдена',
      developers: 'Разработчики',
      variables: 'Переменные',
      headers: 'Заголовки запроса',
      docs: 'Документация',
      emailIsRequired: 'Электронная почта обязательна',
      emailIsInvalid: 'Электронная почта недействительна',
      passwordIsRequired: 'Пароль обязателен',
      passwordMin: 'Пароль должен быть не менее 6 символов',
      nickInfo:
        'NikFreeman — талантливый программист, полностью поглощенный созданием инновационных и эффективных программных продуктов. Обладая беспрецедентным вниманием к деталям и глубоким пониманием языков программирования и сред разработки, NikFreeman своим набором навыков способен сделать любой проект лучше. Как ключевой член команды разработчиков GraphiQL, NikFreeman неустанно работает над тем, чтобы приложение было удобным и высокопроизводительным.',
      bonusInfo:
        'Bonus156 — квалифицированный разработчик с немалым опытом создания сложных веб-приложений. Благодаря своему творческому подходу к решению любых возникающих проблем и стремлению создавать не просто хороший, а высококачественный код, Bonus156 является ценным дополнением любой команды разработчиков. Как важный участник авантюры, именуемой GraphiQL, Bonus156 принимает активное участие во всех аспектах проекта, от проектирования архитектуры до реализации функциональностей.',
      rockInfo:
        'Rockmonolit — опытный программист с впечатляющим портфолио успешных программных проектов. Имея некоторый опыт веб-разработки и страсть к созданию интуитивно понятных пользовательских интерфейсов, Rockmonolit способен отлично дополнить любой коллектив. На данный момент Rockmonolit вместе с партнерами работает над созданием мощного и удобного инструмента GraphiQL, который определенно изменит способы взаимодействия разработчиков с разнообразными API.',
      projectInfoTitle: 'Информация о проекте',
      projectInfo:
        'GraphiQL — это интегрированная среда разработки (IDE), которая в основном используется для запросов к API, как нетрудно догадаться,созданным с использованием GraphQL. Прилоржение написано с использованием библиотеки React JavaScript и позволяет разработчикам в интерактивном режиме испытывать и тестировать свои API-интерфейсы GraphQL, создавая и выполняя запросы, просматривая результаты запросов. GraphiQL предоставляет ряд функций, призванных упростить процесс работы с API-интерфейсами GraphQL, что делает его незаменимым инструментом для разработчиков, создающих приложения на основе GraphQL.',
      courseInfoTitle: 'Сведения о курсе',
      courseInfo:
        'Школа Rolling Scopes предлагает углубленный, комплексный курс по React, охватывающий такие темы, как JSX, классовые и функциональные компоненты, виртуальный DOM, хуки React, Redux и многое другое. Данный курс может предоставить фундаментальные знания в области React и веб-разработки, а также познакомить с проектами и реальными сценариями с целью помочь студентам приобрести практические навыки. Благодаря опытным менторам и поддерживающему, активному сообществу курс Rolling Scopes React станет отличной отправной точкой для всех, кто хочет изучить эту популярную библиотеку JavaScript.',
    },
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
