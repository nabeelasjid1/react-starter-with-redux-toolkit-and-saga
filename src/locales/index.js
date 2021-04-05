import enUS from './en-US';
import zhCn from './zh-CN';

const defaultLocale = localStorage.locale ? localStorage.locale : 'en'; // English is default locale if none is set

const messages = {
  en: {
    ...enUS,
    'dashboard.header': 'Create React App',
    'dashboard.footer': 'Love you 3000'
  },
  zh: {
    ...zhCn,
    'dashboard.header': 'Create React App中的本地化',
    'dashboard.footer': '爱你3000'
  },
  ru: {
    'dashboard.header': 'Локализация в приложении Создать React',
    'dashboard.footer': 'Люблю тебя 3000'
  },
  fr: {
    'dashboard.header': 'Localisation dans l\'application Create React',
    'dashboard.footer': 'Je t\'aime 3000'
  },
};

export { messages, defaultLocale };
