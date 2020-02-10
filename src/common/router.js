/* eslint-disable prettier/prettier */
import React from 'react';
import Home from 'containers/Home';
import SmartStrategy from 'containers/SmartStrategy';
import DeviceManage from 'containers/DeviceManage';
export const getRouterData = (prefix = '') => {
  return {
    [`${prefix}/home`]: { component: Home },
    [`${prefix}/device-manage`]: { component: DeviceManage },
    [`${prefix}/intelligent-strategy`]: { component: SmartStrategy }
  };
};
