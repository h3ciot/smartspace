/* eslint-disable prettier/prettier */
/**
 * @flow
 */
import * as reduxActions from 'redux-actions';
import { stringify } from 'qs';
import request from './request';
import { message } from 'antd';
const pathReg = /:[a-zA-Z]+/g;
const { createAction, handleActions } = reduxActions;

/**
 * 创建异步action types
 */
function createAsyncActionTypes(type: string): { pending: string, reject: string, accept: string } {
  return {
    pending: `${type}_PENDING`,
    accept: `${type}_ACCEPT`,
    reject: `${type}_REJECT`,
  };
}

/**
 *
 * @param {Object} actionTypes 异步action types对象
 */
const mapAsyncReducers = actionTypes => reducerMap => {
  return {
    [actionTypes.pending]: reducerMap.pending || (state => ({ ...state })),
    [actionTypes.accept]: reducerMap.accept || (state => ({ ...state })),
    [actionTypes.reject]: reducerMap.reject || (state => ({ ...state })),
  };
};

const messageByCode = (code: number) => {
  try {
    const [codeLevel] = code.toString();
    let msgOut = message.info;
    switch (codeLevel) {
      case '0':
        msgOut = message.success;
        break;
      case '1':
        // use default message out
        break;
      case '2':
        msgOut = message.warning;
        break;
      case '3':
        msgOut = message.error;
        break;
      default:
        break;
    }

    return msgOut;
  } catch (error) {
    return msg => msg;
  }
};

const handleJsonData = (jsonData: Object) => {
  const { code, data, message: msg, errCode } = jsonData;
  if (code === 0 || errCode === 0) {
    return data;
  }
  messageByCode(code)(typeof msg === 'string' ? msg : JSON.stringify(msg));
  throw msg;
};

type Options = {
  handleData?: Object => any,
  handleError?: Error => any,
};
/**
 *
 * @param {string} type action type
 */
const asyncActionFactory = (type: string) => (method: string) => {
  const types = createAsyncActionTypes(`${method}_${type}`);

  const createReducers = mapAsyncReducers(types);

  const createActions = (path: string, options: Options = {}) => {
    const [pending, accept, reject] = Object.keys(types).map(item => createAction(types[item]));
    const defaultOptions = {
      handleData: handleJsonData,
      handleError: error => error,
    };
    const opts = { ...defaultOptions, ...options };
    let lastRequestTime = null;
    return (params: Object, cb: { signal: Object, rj: Function } = {}) => (dispatch: Dispatch) => {
      const { signal, rj } = cb;
      dispatch(pending());
      let url = path;
      const requestTime = new Date().getTime();
      lastRequestTime = requestTime;
      const reqOptions = { method, signal };
      url = generateUrl(url, params);
      if (method === 'GET' || method === 'DELETE') {
        if (params) {
          switch (method) {
            case 'DELETE':
              reqOptions.body = params;
            // eslint-disable-next-line no-fallthrough
            case 'GET':
              url = `${url}?${stringify(params)}`;
              break;
            default:
              break;
          }
        }
      } else {
        if (params) {
          reqOptions.body = params;
        }
      }
      return request(url, reqOptions)
        .then(data => {
          if (requestTime !== lastRequestTime) {
            throw new Error('repeat request');
          }
          let procData = {};
          try {
            procData = opts.handleData(data);
            dispatch(accept(procData));
          } catch (error) {
            dispatch(reject(error));
            opts.handleError(error);
          }
          return data;
        })
        .catch(err => {
          if (err.name === 'AbortError' || requestTime !== lastRequestTime) {
            console.log(err);
            // reject(err);
            return new Promise(() => {});
          }
          if (err.httpErrorText) {
            message.error(err.httpErrorText);
          }
          rj && rj(err);
          dispatch(reject(err));
          return { };
        });
    };
  };

  return { types, createActions, createReducers };
};
const ansyHandleFactory = (name: string) => (
  method: fetchMethod,
  newReducers?: { pending?: Function, reject?: Function, accept?: Function }
): Object => {
  const actionType = createAsyncActionTypes(`${method}_${name}`);
  if (newReducers) {
    const obj = {
      [actionType.pending]:
        newReducers.pending || (state => ({ ...state, loading: true })),
      [actionType.reject]:
        newReducers.reject || (state => ({ ...state, loading: false })),
      [actionType.accept]:
        newReducers.accept || (state => ({ ...state, loading: false })),
    };
    return obj;
  }
  return { actionType, method };
};

function generateUrl(url, param) {
  let pathPara = pathReg.exec(url);
  const para = {};
  while (pathPara) {
    const [temp] = pathPara;
    const key = temp.substr(1);
    console.log(key);
    const value = param[key];
    para[temp] = value;
    pathPara = pathReg.exec(url);
  }
  let actualPath = url;
  for (const key in para) {
    actualPath = actualPath.replace(key, para[key]);
  }
  return actualPath;
}
export { createAsyncActionTypes, createAction, handleActions, reduxActions, ansyHandleFactory };

export default asyncActionFactory;
