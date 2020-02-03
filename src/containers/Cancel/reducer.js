/**
 * 全局state, global
 * @flow
 */
import actionFactory, { handleActions, createAction } from 'utils/actionFactory';

const initialState = {
  session: null,
  shopId: '',
  shopName: '',
  shops: [],
};

/**
 * Constants
 */
const SET_SHOPID = 'zone/App/SET_SHOPID';
const sessionAsyncAction = actionFactory('zone/App/SESSION')('GET');
const shopInfoAsyncAction = actionFactory('zone/App/SHOPINFO')('POST');
/**
 * Reducer
 */
const appReducer = handleActions(
  {
    [SET_SHOPID]: (state, action) => ({ ...state, shopId: action.payload }),
    ...sessionAsyncAction.createReducers({
      accept: (state, action) => ({ ...state, session: action.payload }),
    }),
    ...shopInfoAsyncAction.createReducers({
      accept: (state, action) => {
        const shops = action.payload.data || [];
        return {
          ...state,
          shops,
          shopName: shops.length ? shops[0].shopName : '',
        };
      },
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

export const setShopId = createAction(SET_SHOPID);

export const getShopInfo = shopInfoAsyncAction.createActions(
  '/iot/ace/oasis/oasis-rest-shop/restshop/shopModel/shops'
);
export const getCancel = actionFactory('zone/App/SESSION/cancel')('GET').createActions(
  '/cancel/:a/acd'
);
