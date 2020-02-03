import React from 'react';
import { isUrl } from 'utils/utils';

export const menuData = [
  {
    name: '概览',
    id: 'iot.platform.main.menu.overview',
    path: '/',
    display: true,
    link: false,
    icon: <i className="menu-icon iconfont icon-gailan" />,
  },
  // {
  //   name: '设备接入',
  //   id: 'iot.platform.main.menu.device',
  //   path: 'device',
  //   display: true,
  //   link: false,
  //   icon: <i className="menu-icon iconfont icon-shebeijieru" />,
  //   children: [
  //     {
  //       name: '开发者信息',
  //       id: 'iot.platform.main.menu.device.developer',
  //       path: 'developer',
  //       display: true,
  //       link: false,
  //       icon: <i className="icon iconfont icon-warning" />,
  //     },
  //     {
  //       name: '产品',
  //       id: 'iot.platform.main.menu.device.info',
  //       path: 'product/terminalModal',
  //       display: true,
  //       link: false,
  //       icon: <i className="icon iconfont icon-device" />,
  //     },
  //   ],
  // },
  // {
  //   name: '项目管理',
  //   id: 'iot.platform.main.menu.project',
  //   path: 'project',
  //   display: true,
  //   link: false,
  //   icon: <i className="menu-icon iconfont icon-xiangmuguanli" />,
  //   // target: '_blank',
  // },
  // {
  //   name: '应用管理',
  //   id: 'iot.platform.main.menu.application',
  //   path: 'application/appList',
  //   display: true,
  //   link: false,
  //   icon: <i className="menu-icon iconfont icon-yingyongguanli" />,
  // },
  // {
  //   name: '产品文档',
  //   id: 'iot.platform.main.menu.docs',
  //   path: 'docs',
  //   display: true,
  //   link: true,
  //   target: '_black',
  //   icon: <i className="menu-icon iconfont icon-chanpinwendang" />,
  // },
  // {
  //   name: '镜像管理',
  //   id: 'iot.platform.main.menu.image',
  //   path: 'image',
  //   display: true,
  //   link: true,
  //   target: '_black',
  //   icon: <i className="menu-icon iconfont icon-jingxiangguanli" />,
  // },
  // {
  //   name: '模型管理',
  //   id: 'iot.platform.main.menu.model',
  //   path: 'model',
  //   display: true,
  //   link: true,
  //   target: '_black',
  //   icon: <i className="menu-icon iconfont icon-moxingguanli" />,
  // },
  // {
  //   name: '函数计算',
  //   id: 'iot.platform.main.menu.function',
  //   path: 'function',
  //   display: true,
  //   link: true,
  //   target: '_black',
  //   icon: <i className="menu-icon iconfont icon-hanshujisuan" />,
  // },
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
