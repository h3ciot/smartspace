import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import BlankLayout from './layouts/BlankLayout';
import NotFoundPage from 'containers/NotFoundPage';
import { getRouterData } from './common/router';
import { menuData } from './common/menu';
import env from 'utils/env';
const ROUTE_PREFIX = `${env.ROUTE_PREFIX}`;
function RouterConfig({ menuConfig }) {
  const routerData = getRouterData(`${ROUTE_PREFIX}`);
  return (
    <Router>
      <Switch>
        <Route
          path={ROUTE_PREFIX}
          render={props => (
            <BasicLayout
              {...props}
              menuData={menuData}
              routerData={routerData}
              homePath={`${ROUTE_PREFIX}/overview`}
            />
          )}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
