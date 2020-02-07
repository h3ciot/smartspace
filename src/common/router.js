/* eslint-disable prettier/prettier */
import React from 'react';
import Home from 'containers/Home';
export const getRouterData = (prefix = '') => {
  return {
    [`${prefix}/home`]: { component: Home },
  };
};
