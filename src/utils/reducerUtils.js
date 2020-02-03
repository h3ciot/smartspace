/**
 * @author:lpf
 * @flow
 *
 **/
function resetObject(obj: Object, val: any) {
  const ret = {};
  Object.keys(obj).forEach(key => (ret[key] = val));
  return ret;
}
function commonObjectReducers(mark: string, val = undefined) {
  return {
    pending: state => ({ ...state, [mark + 'Loading']: true }),
    accept: (state, action) => ({
      ...state,
      [mark]: action.payload,
      [mark + 'Loading']: false,
    }),
    reject: state => ({
      ...state,
      [mark + 'Loading']: false,
      [mark]: val === undefined ? resetObject(state[mark], val) : val,
    }),
  };
}
function commonArrayReducers(mark: string) {
  return {
    pending: state => ({
      ...state,
      [mark + 'Loading']: true,
      [mark]: { ...state[mark], list: [], totalCount: 0 },
    }),
    accept: (state, action) => ({
      ...state,
      [mark]: action.payload,
      [mark + 'Loading']: false,
    }),
    reject: state => ({
      ...state,
      [mark + 'Loading']: false,
      [mark]: { ...state[mark], list: [], totalCount: 0 },
    }),
  };
}

function commonOperateReducers(mark: string, acceptCb) {
  return {
    pending: state => ({ ...state, [mark + 'Loading']: true }),
    accept: state => {
      acceptCb && acceptCb();
      return {
        ...state,
        [mark + 'Loading']: false,
      };
    },
    reject: state => ({ ...state, [mark + 'Loading']: false }),
  };
}

export { commonObjectReducers, commonOperateReducers, commonArrayReducers };
