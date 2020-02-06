import React from 'react';
import { isUrl } from 'utils/utils';

export const menuData = [
  {
    name: '首页',
    id: 'iot.platform.main.menu.home',
    path: 'home',
    display: true,
    link: false,
    icon: <i className="menu-icon iconfont icon-gailan" />,
  },
  {
    name: '网关管理',
    id: 'iot.platform.main.menu.gateway_manage',
    path: 'gateway-manage',
    display: true,
    link: false,
    icon: <i className="menu-icon iconfont icon-gailan" />,
  },
  {
    name: '设备管理',
    id: 'iot.platform.main.menu.device_manage',
    path: 'device-manage',
    display: true,
    link: false,
    icon: <i className="menu-icon iconfont icon-gailan" />,
  },
  {
    name: '智能策略',
    id: 'iot.platform.main.menu.intelligent_strategy',
    path: 'intelligent-strategy',
    display: true,
    link: false,
    icon: <i className="menu-icon iconfont icon-gailan" />,
  },
  {
    name: '设置',
    id: 'iot.platform.main.menu.setting',
    path: 'setting',
    display: true,
    link: false,
    icon: <i className="menu-icon iconfont icon-gailan" />,
  },
];
function formatter(data, parentPath = '/', parentAuthority) {
  if (!/\/$/.test(parentPath)) {
    parentPath = `${parentPath}/`;
  }
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = parentPath => formatter(menuData, parentPath);

export const getCommonMenuData = (parentPath, menuData) => formatter(menuData, parentPath);
