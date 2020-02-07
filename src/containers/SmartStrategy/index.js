/**
 * @flow
 * 智能策略
 */
import React, { Component } from 'react';
import { Tabs, Spin, Row, Col } from 'antd';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
// import HomeReducer, { getOverview } from './reducer';
import './index.less';
import Scene from 'containers/Scene';
import Strategy from 'containers/Strategy';
import { bindActionCreators, compose } from 'redux';

const { TabPane } = Tabs;

type Props = {};

type State = {};

class SmartStrategy extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      key: '1',
    };
  }

  tabChange = key => {
    console.log(key);
    this.setState({
      key: key,
    });
  };

  render() {
    const { key } = this.state;
    return (
      <div id="smartStrategy">
        <div>
          <Tabs defaultActiveKey="1" onChange={this.tabChange} activeKey={key}>
            <TabPane tab="情景" key="1">
              <Scene />
            </TabPane>
            <TabPane tab="策略" key="2">
              <Strategy />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default SmartStrategy;
