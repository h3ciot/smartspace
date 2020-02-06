import React from 'react';
import { Layout, Popover } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import SiderMenu from 'components/SiderMenu';
import NotFoundPage from 'containers/NotFoundPage';
import { getMenuData } from '../common/menu';
import { getRoutes } from 'utils/utils';
import Breadcrumb from 'components/Breadcrumb';
import logo from '../assets/images/logo.png';
import './basicLayout.less';
const { Header, Content } = Layout;
class BasicLayout extends React.PureComponent {
  render() {
    const { location, match, routerData, userInfo } = this.props;
    const routes = getRoutes(match.path, routerData);
    const menuData = getMenuData(match.url);
    return (
      <Layout id="basic-layout" style={{ height: '100%' }}>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className="logo">
              <div className="logo-img">
                <img src={logo} alt="" />
              </div>
              <div className="logo-title">智慧办公系统</div>
            </div>
            <SiderMenu
              logo={logo}
              // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
              // If you do not have the Authorized parameter
              // you will be forced to jump to the 403 interface without permission
              // Authorized={Authorized}
              menuData={menuData}
              // collapsed={true}
              location={location}
              isMobile={false}
              // onCollapse={this.handleMenuCollapse}
            />
            {userInfo && (
              <div className="userInfo">
                <Popover
                  placement="bottom"
                  arrowPointAtCenter
                  content={
                    <div className="userInfoDetail">
                      <div className="infoItem link">
                        <i className="iconfont icon-yingyongpeizhi" />
                        <a href="/oasisapp/index.html">应用中心</a>
                      </div>
                      {/*<div className="infoItem link">*/}
                      {/*<i className="iconfont icon-yijianfankui" />*/}
                      {/*意见反馈*/}
                      {/*</div>*/}
                    </div>
                  }
                >
                  <i className="iconfont icon-setting" />
                </Popover>
                <Popover
                  placement="bottom"
                  arrowPointAtCenter
                  content={
                    <div className="userInfoDetail">
                      <div className="infoItem" title={userInfo.name}>
                        <i className="iconfont icon-renwu-ren" />
                        {userInfo.name}
                      </div>
                    </div>
                  }
                >
                  <i className="iconfont icon-yonghu" />
                </Popover>
              </div>
            )}
          </Header>
          {/*<Breadcrumb menuData={menuData} location={location} />*/}
          <Content style={{ margin: 0, minHeight: 600, height: '100%' }}>
            <Switch>
              {routes.map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              {routes.length ? (
                <Redirect to={routes[0].path} />
              ) : (
                <Route component={NotFoundPage} />
              )}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  ({ global }) => ({ userInfo: global.userInfo, user: global.user }),
  dispatch => ({
    ...bindActionCreators({}, dispatch),
  })
)(BasicLayout);
