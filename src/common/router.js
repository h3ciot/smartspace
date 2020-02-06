/* eslint-disable prettier/prettier */
import React from 'react';
import NotFoundPage from 'containers/NotFoundPage';
import Home from 'containers/Home';
export const getRouterData = (prefix = '') => {
  const routerConfig = {
    [`${prefix}/home`]: { component: Home },
  };
  return routerConfig;
};
