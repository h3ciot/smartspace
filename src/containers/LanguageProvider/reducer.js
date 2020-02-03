/*
 *
 * LanguageProvider reducer
 *
 */
import { getDefaultLocale } from '../../i18n';
import actionFactory, { handleActions, createAction } from 'utils/actionFactory';
/*
 * LanguageProvider constants
 */
export const CHANGE_LOCALE = 'iot-platform/LanguageToggle/CHANGE_LOCALE';
const setLanguageAction = actionFactory('iot/platform/language/change')('GET');

/*
 * LanguageProvider actions
 */
export const changeLocale = createAction(CHANGE_LOCALE);

export const initialState = {
  locale: getDefaultLocale(),
  loading: false,
};
const languageProviderReducer = handleActions(
  {
    [CHANGE_LOCALE]: (state, action) => ({
      ...state,
      locale: action.payload,
    }),
    ...setLanguageAction.createReducers({
      pending: state => ({ ...state, loading: true }),
      accept: state => ({ ...state, loading: false }),
      reject: state => ({ ...state, loading: true }),
    }),
  },
  initialState
);
export default languageProviderReducer;
export const setLanguage = setLanguageAction.createActions('/iot/api/changeLanguage');
