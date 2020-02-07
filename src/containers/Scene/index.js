/**
 * @flow
 * 智能策略
 */
import React, { Component } from 'react';
import { Table, Spin, Row, Col } from 'antd';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import sceneReducer, * as sceneActions from './reducer';
import './index.less';
import { bindActionCreators, compose } from 'redux';

type Props = {};

type State = {
  pageNumber: Number,
  pageSize: Number,
};

class Scene extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      pageSize: 10,
    };
  }

  componentDidMount() {
    const { getSceneList } = this.props;
    getSceneList();
  }

  pageChange = (pageNumber, pageSize) => {
    this.setState({ pageNumber });
  };

  sizeChange = (pageNumber, pageSize) => {
    this.setState({ pageSize });
  };

  render() {
    const { pageNumber, pageSize } = this.state;
    const { sceneList, sceneListLoading } = this.props;
    const columns = [
      {
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
      },
      {
        title: '情景名称',
        dataIndex: 'strategyName',
        key: 'strategyName',
      },
      {
        title: '动作',
        dataIndex: 'strategyAction',
        key: 'strategyAction',
      },
      {
        title: '执行空间',
        dataIndex: 'kongjian',
        key: 'kongjian',
      },
      {
        title: '创建时间',
        dataIndex: 'timeSetting',
        key: 'timeSetting',
      },
      {
        title: '备注',
        dataIndex: 'strategyDescription',
        key: 'strategyDescription',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
      },
    ];
    return (
      <div>
        <Table
          columns={columns}
          dataSource={sceneList}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '40'],
            onChange: this.pageChange,
            onShowSizeChange: this.sizeChange,
            current: pageNumber,
            pageSize: pageSize,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.sceneReducer };
};
const mapDispatchToProps = dispatch => ({ ...bindActionCreators({ ...sceneActions }, dispatch) });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'sceneReducer', reducer: sceneReducer });
export default compose(withReducer, withConnect)(Scene);
