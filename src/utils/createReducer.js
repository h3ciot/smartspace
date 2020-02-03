/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

export default function createReducer(injectedReducers) {
  return combineReducers({
    ...injectedReducers,
  });
}
