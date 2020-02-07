import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom';
import styles from './index.less';
import { urlToList } from '../_utils/pathTools';
import { FormattedMessage } from 'react-intl';
const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  );

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { openKeys: this.resetMenu(props) };
  }
  resetMenu = props => {
    this.menus = props.menuData;
    this.flatMenuKeys = props.menuData.length ? getFlatMenuKeys(props.menuData) : [];
    return props.menuData.length ? this.getDefaultCollapsedSubMenus(props) : [];
  };
  componentDidUpdate(prevProps) {
    const { location, menuData } = this.props;
    if (prevProps.location.pathname !== location.pathname && menuData.length) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(this.props),
      });
    }
    if (menuData !== prevProps.menuData) {
      this.setState({ openKeys: this.resetMenu(this.props) });
    }
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const {
      location: { pathname },
    } = props || this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  }

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, id } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target} rel="noreferrer noopener">
          {icon}
          <span>
            <FormattedMessage id={id} />
          </span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        rel="noreferrer noopener"
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>
          <FormattedMessage id={id} />
        </span>
      </Link>
    );
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>
                    <FormattedMessage id={item.id} />
                  </span>
                </span>
              ) : (
                <FormattedMessage id={item.id} />
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  };

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        // return this.checkPermissionItem(item.authority, ItemDom);
        return ItemDom;
      })
      .filter(item => item);
  };

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const {
      location: { pathname },
    } = this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  };

  // conversion Path
  // 转化路径
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };

  // permission to check
  // checkPermissionItem = (authority, ItemDom) => {
  //   const { Authorized } = this.props;
  //   if (Authorized && Authorized.check) {
  //     const { check } = Authorized;
  //     return check(authority, ItemDom);
  //   }
  //   return ItemDom;
  // };

  isMainMenu = key => {
    return this.menus.some(item => key && (item.key === key || item.path === key));
  };

  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };
  render() {
    const { collapsed } = this.props;
    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {}
      : {
          openKeys,
        };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return this.menus.length ? (
      <Menu
        key="Menu"
        {...menuProps}
        onOpenChange={this.handleOpenChange}
        selectedKeys={selectedKeys}
        mode="horizontal"
        style={{ textAlign: 'center' }}
      >
        {this.getNavMenuItems(this.menus)}
      </Menu>
    ) : null;
  }
}
