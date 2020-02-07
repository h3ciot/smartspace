/* eslint-disable prettier/prettier */
import React from 'react';
import Home from 'containers/Home';
import SmartStrategy from 'containers/SmartStrategy';
export const getRouterData = (prefix = '') => {
  return {
    [`${prefix}/home`]: { component: Home },
    [`${prefix}/intelligent-strategy`]: { component: SmartStrategy }
  };
};
