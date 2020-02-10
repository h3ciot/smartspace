/**
 * @flow
 * 设备管理页面
 */
import React from 'react';
import { Spin, Row, Col } from 'antd';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import Banner1 from 'assets/images/banner/banner1.png';
import DeviceReducer, { getOverview } from './reducer';
import './index.less';
import { bindActionCreators, compose } from 'redux';
const banners = [
  {
    img: Banner1,
  },
  {
    img: Banner1,
  },
  {
    img: Banner1,
  },
];
type Props = {
  Gr: Array,
  groupList: boolean,
  getOverview: Function,
};
type State = {};
class DeviceManage extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="device-manage">
        <div className="group-tree-containers">tree</div>
        <div className="device-containers">device</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToPropsFn = dispatch => ({ ...bindActionCreators({ getOverview }, dispatch) });
const withReducer = injectReducer({ key: 'device', reducer: DeviceReducer });
export default compose(withReducer, connect(mapStateToProps, mapDispatchToPropsFn))(DeviceManage);
