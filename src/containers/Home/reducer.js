/**
 * homepage reducer
 * @flow
 */
import actionFactory, { handleActions, createAction } from 'utils/actionFactory';
import env from 'utils/env';
console.log(process.env);
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
      pending: state => ({ ...state, deviceListLoading: true }),
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
export const getOverview = overviewAsyncAction.createActions(`/iot/iotsmartspace/overview`);
