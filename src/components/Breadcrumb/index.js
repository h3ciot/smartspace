import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './index.less';

const Breadcrumb = props => {
  const {
    location: { pathname },
    menuData,
  } = props;

  const getRenderItems = (menus, pathname) => {
    return menus.reduce((renderItems, menu) => {
      const { name, path, children, target, link } = menu;
      if (pathname.indexOf(menu.path) !== -1) {
        renderItems.push(
          <li key={menu.path}>
            {link ? (
              <Link
                className="breadcrumb-link"
                to={path}
                target={target}
                replace={path === pathname}
              >
                <span>{name}</span>
              </Link>
            ) : (
              <div className="breadcrumb-title">
                <span>{name}</span>
              </div>
            )}
          </li>
        );
      }
      if (children) {
        return renderItems.concat(getRenderItems(children, pathname));
      }
      return renderItems;
    }, []);
  };

  const renderItems = getRenderItems(menuData, pathname);

  return (
    renderItems.length > 1 && (
      <div className="breadcrumbs">
        <ul>{renderItems}</ul>
      </div>
    )
  );
};

export default Breadcrumb;
