/**
 * scene reducer
 * @flow
 */
import actionFactory, { handleActions, createAction } from 'utils/actionFactory';
import env from 'utils/env';

const url = '/iot/iotsmartspace';

const initialState = {
  sceneList: [],
  sceneListLoading: false,
};

const sceneAsyncAction = actionFactory('iot/smartspace/scene')('GET');

const sceneReducer = handleActions(
  {
    ...sceneAsyncAction.createReducers({
      pending: state => ({ ...state, sceneListLoading: true }),
      accept: (state, action) => ({
        ...state,
        sceneList: action.payload,
        sceneListLoading: false,
      }),
      reject: state => ({
        ...state,
        sceneListLoading: false,
        sceneList: [],
      }),
    }),
  },
  initialState
);

export default sceneReducer;

type sceneAsyncActionParams = {};

export const getSceneList: (
  obj: sceneAsyncActionParams
) => disPromise<*> = sceneAsyncAction.createActions(`/iot/iotsmartspace/stragegy`);
