/**
 * @flow
 * 主页
 */
import React from 'react';
import { Carousel, Spin, Row, Col } from 'antd';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import Banner1 from 'assets/images/banner/banner1.png';
import HomeReducer, { getOverview } from './reducer';
import DeviceMap from './TypeMap';
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
  deviceList: Array,
  loading: boolean,
  getOverview: Function,
};
class Home extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    props.getOverview({});
    console.log(props.getOverview);
  }
  render() {
    const { loading, deviceList } = this.props;
    return (
      <div className="home-page">
        <div className="home-page-banners">
          <Carousel style={{ height: 300 }}>
            {banners.map((item, i) => (
              <div className="home-page-banner-item" key={i}>
                <img src={item.img} alt="" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="home-page-device">
          <Spin spinning={loading}>
            <Row>
              {deviceList.map(item => {
                const { terminalType, total = 0, online = 0, offline = 0 } = item;
                return (
                  <Col key={terminalType} span={6}>
                    <div className="device-item">
                      <div className="device-name"></div>
                      <div className="device-count">
                        <span>总数&nbsp;&nbsp;{total}</span>
                        <br />
                        <span>在线&nbsp;&nbsp;{online}</span>
                        <br />
                        <span>离线&nbsp;&nbsp;{offline}</span>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Spin>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { loading: state.home.deviceListLoading, deviceList: state.home.deviceList };
};
const mapDispatchToPropsFn = dispatch => ({ ...bindActionCreators({ getOverview }, dispatch) });
const withReducer = injectReducer({ key: 'home', reducer: HomeReducer });
export default compose(withReducer, connect(mapStateToProps, mapDispatchToPropsFn))(Home);
