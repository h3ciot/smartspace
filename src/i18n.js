/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import messages from './translations';
import antdZh from 'antd/es/locale/zh_CN';
import antdEs from 'antd/es/locale/en_US';
export function getDefaultLocale() {
  let lang = '';
  try {
    // eslint-disable-next-line prefer-destructuring
    lang = /iot_lang=([a-zA-Z0-9-_]+)(;)?/.exec(document.cookie)[1];
  } catch (e) {
    lang = '';
  }
  if (!lang || appLocales.indexOf(lang) === -1) {
    lang = window.navigator.language || window.navigator.userLanguage || 'zh';
    lang = lang.substr(0, 2);
  }
  if (appLocales.indexOf(lang) === -1) {
    // eslint-disable-next-line prefer-destructuring
    lang = appLocales[0];
  }
  return lang;
}

export const appLocales = ['zh', 'en'];

export const translationMessages = {
  zh: { messages: messages['zh'], antd: antdZh },
  en: { messages: messages['en'], antd: antdEs },
};
