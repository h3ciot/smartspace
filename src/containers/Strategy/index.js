/**
 * @flow
 * 策略
 */
import React, { Component } from 'react';
import { Tabs, Spin, Row, Col } from 'antd';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
// import HomeReducer, { getOverview } from './reducer';
import './index.less';
import { bindActionCreators, compose } from 'redux';

type Props = {};

type State = {};

class Strategy extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>策略</div>;
  }
}

export default Strategy;
