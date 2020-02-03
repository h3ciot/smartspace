/**
 * 全局state, global
 * @flow
 */
import actionFactory, { handleActions, createAction } from 'utils/actionFactory';
const initialState = {
  session: null,
  developInfo: {},
  menuData: [],
};

/**
 * Constants
 */
const sessionAsyncAction = actionFactory('iot/platform/session')('GET');
const shopInfoAsyncAction = actionFactory('zone/App/SHOPINFO')('GET');
const developInfoAsyncAction = actionFactory('iot/platform/developInfo')('GET');
const userRoleAction = actionFactory('GET_USER_ROLE')('GET');
/**
 * Reducer
 */
const appReducer = handleActions(
  {
    ...sessionAsyncAction.createReducers({
      accept: (state, action) => ({ ...state, session: action.payload }),
    }),
    ...shopInfoAsyncAction.createReducers({
      accept: (state, action) => ({
        ...state,
        shopInfo: action.payload,
      }),
    }),
    ...developInfoAsyncAction.createReducers({
      accept: (state, action) => {
        return { ...state, developInfo: action.payload };
      },
    }),
    ...userRoleAction.createReducers({
      accept: (state, action) => ({
        ...state,
      }),
    }),
  },
  initialState
);

export default appReducer;

/**
 * Actions
 */

/**
 * 获取场所
 *
 */
export const getSession = sessionAsyncAction.createActions('/iot/web/cas_session', {
  handleData: data => data,
});

export const getShopInfo = shopInfoAsyncAction.createActions(
  '/iot/transmission/iothubtbnode/projectService/oneProject'
);
export const getDevelopInfo = () => {
  const timeTemp = new Date().getTime();
  return developInfoAsyncAction.createActions(
    `/iot/ace/oasis/oasis-rest-application/restapp/dep/key?_=${timeTemp}`
  )();
};
export const getCancel = actionFactory('zone/App/SESSION/cancel')('GET').createActions('/cancel');

export const getUserRole = userRoleAction.createActions(
  '/iot/transmission/iothubtbnode/firmService/userRole'
);
