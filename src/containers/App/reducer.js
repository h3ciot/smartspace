/**
 * 全局state, global
 * @flow
 */
import actionFactory, { handleActions } from 'utils/actionFactory';
import { commonOperateReducers } from 'utils/reducerUtils';

const initialState = {
  groupData: [],
  groupDataLoading: false,
  groupDataOpLoading: false,
};

/**
 * Constants
 */
const groupAsyncAction = actionFactory('iot/smartspace/group');
const getGroupAction = groupAsyncAction('GET');
const addGroupAction = groupAsyncAction('POST');
const editGroupAction = groupAsyncAction('PUT');
const deleteGroupAction = groupAsyncAction('DELETE');
/**
 * Reducer
 */
const appReducer = handleActions(
  {
    ...getGroupAction.createReducers({
      pending: state => ({ ...state, groupDataLoading: true, groupData: [] }),
      accept: (state, action) => ({
        ...state,
        groupData: action.payload.groupList,
        groupDataLoading: false,
      }),
      reject: state => ({
        ...state,
        groupDataLoading: false,
        groupData: [],
      }),
    }),
    ...addGroupAction.createReducers(commonOperateReducers('groupDataOp')),
    ...editGroupAction.createReducers(commonOperateReducers('groupDataOp')),
    ...deleteGroupAction.createReducers(commonOperateReducers('groupDataOp')),
  },
  initialState
);

export default appReducer;

/**
 * Actions
 */
const groupPath = `${process.env.REACT_APP_RESTAPI_PREFIX}/group`;
const getGroup: () => disPromise<*> = getGroupAction.createActions(groupPath);
const addGroup: ({
  groupName: string,
  parentId: string,
}) => disPromise = addGroupAction.createActions(groupPath);
const editGroup: ({
  groupName: string,
  parentId: string,
  groupId: string,
}) => disPromise = editGroupAction.createActions(groupPath);
const deleteGroup: ({
  groupIdBefore: string,
  groupIdAfter?: string,
}) => disPromise = deleteGroupAction.createActions(groupPath);

export const groupAction = { getGroup, editGroup, addGroup, deleteGroup };
