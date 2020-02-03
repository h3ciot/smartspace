/* eslint-disable prettier/prettier */
import NotFoundPage from 'containers/NotFoundPage';
import React from 'react';
export const getRouterData = (prefix = '') => {
  const routerConfig = {
    [`${prefix}/`]: { component: NotFoundPage },
  };
  return routerConfig;
};
