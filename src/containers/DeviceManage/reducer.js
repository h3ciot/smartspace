/**
 * homepage reducer
 * @flow
 */
import actionFactory, { handleActions } from 'utils/actionFactory';
const initialState = {
  deviceListLoading: false,
  deviceList: [],
};

/**
 * Constants
 */
const overviewAsyncAction = actionFactory('iot/smartspace/overview')('GET');
/**
 * Reducer
 */
const homeReducer = handleActions(
  {
    ...overviewAsyncAction.createReducers({
      pending: state => ({ ...state, deviceListLoading: true, deviceList: [] }),
      accept: (state, action) => ({
        ...state,
        deviceList: action.payload.list,
        deviceListLoading: false,
      }),
      reject: state => ({
        ...state,
        deviceListLoading: false,
        deviceList: [],
      }),
    }),
  },
  initialState
);

export default homeReducer;

/**
 * Actions
 */

/**
 * 获取总览数据
 *
 */
export const getOverview = overviewAsyncAction.createActions(
  `${process.env.REACT_APP_RESTAPI_PREFIX}/overview`
);
