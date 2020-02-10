/**
 * @flow
 * @author yangjie kf7216
 */

import React from 'react';
import { Tree, Input, Button, Modal, Form, Popconfirm, message, Select } from 'antd';
import { REGEXP_CNENNUM, getStringByteLength, REGEXP_POSINT } from '@alpha/utils/validator';
import { connect } from 'react-redux';
import './style/MapTree.less';
const { Option } = Select;
const { TreeNode } = Tree;
const { Search } = Input;
const FormItem = Form.Item;
const getNode = (id, tree, selectNode) => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.groupId === id) {
      selectNode.push(node);
      return;
    }
    if (node.children) {
      getNode(id, node.children, selectNode);
    }
  }
};

type FormProps = {
  form: Form,
  currentNode: Object,
};
const RegistrationForm = (props: FormProps) => {
  const { form, currentNode } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const handleConfirmName = (rule, value, callback) => {
    if (getStringByteLength(value) > 32) {
      callback('名称不能超过32个字符(一个汉字为两个字符)');
    }
    callback();
  };

  const handleConfirmSort = (rule, value, callback) => {
    // 排序值得自定义校验
    if (value < 1 || value > 100) {
      callback('排序值必须是1~100之间的整数');
    }
    callback();
  };

  return (
    <Form>
      {currentNode.groupId && (
        <FormItem {...formItemLayout} label="图层ID">
          {getFieldDecorator('groupId', {
            initialValue: currentNode.groupId,
          })(<span>{currentNode.groupId}</span>)}
        </FormItem>
      )}
      <FormItem {...formItemLayout} label="图层名称">
        {getFieldDecorator('groupName1', {
          initialValue: currentNode.groupName1,
          rules: [
            {
              required: true,
              message: '请输入图层名称',
            },
            {
              validator: handleConfirmName,
            },
            {
              pattern: REGEXP_CNENNUM,
              message: '图层名称仅支持中英文、数字和下划线',
            },
          ],
        })(<Input maxLength="32" placeholder="请输入图层名称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="排序">
        {getFieldDecorator('nodeOrder', {
          initialValue: currentNode.nodeOrder,
          rules: [
            { required: true, message: '排序不能为空' },
            { validator: handleConfirmSort },
            {
              pattern: REGEXP_POSINT,
              message: '输入值必须为整数',
            },
          ],
        })(<Input maxLength="3" placeholder="请输入排序" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="类型">
        {getFieldDecorator('nodeType', {
          initialValue: currentNode.nodeType,
          rules: [{ required: true, message: '图层类型不能为空' }],
        })(
          <Select placeholder="请选择图层属性">
            <Option value={0}>其他</Option>
            <Option value={1}>园区</Option>
            <Option value={2}>大楼</Option>
            <Option value={3}>楼层</Option>
            <Option value={4}>房间</Option>
          </Select>
        )}
      </FormItem>
    </Form>
  );
};
const NodeForm = Form.create()(RegistrationForm);

type Props = {
  onSelectTreeNode: (id: number) => void,
  getTreePath: (path: string) => void,
  appId?: string,
  shopId: string,
  groupId: number,
  loading: boolean,
  maptreeData: Array<any>,
  getMaptree: Function,
  addNode: Function,
  editNode: Function,
  delNode: Function,
};

type State = {
  expandedKeys: Array<any>,
  searchValue: string,
  autoExpandParent: boolean,
  addVisible: boolean,
  selectedKeys: Array<any>,
  isAddRoot: boolean,
  isModify: boolean,
  currentNode: Object,
};

class MapTree extends React.PureComponent<Props, State> {
  dawingBoard: Object;
  nodeForm: Object;
  treeData: Object[];
  searchItemKeys: Set<any>;
  searchItemParentKeys: Set<any>;
  constructor(props: Props) {
    super(props);
    this.treeData = [];
    this.searchItemKeys = new Set();
    this.searchItemParentKeys = new Set();
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      addVisible: false,
      selectedKeys: [],
      isAddRoot: false,
      isModify: false,
      currentNode: {
        groupName1: '',
        nodeOrder: '',
        nodeType: null,
      },
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      this.props.groupId !== nextProps.groupId &&
      nextProps.groupId &&
      parseInt(nextProps.groupId) !== -1
    ) {
      this.setState({ selectedKeys: [nextProps.groupId.toString()] });
      this.getTreePath(parseInt(nextProps.groupId));
    }
  }

  // 选择节点
  selectTreeNode = (selectedKeys, e) => {
    if (e && e.selected) {
      this.setState({ selectedKeys });
      this.props.onSelectTreeNode(parseInt(selectedKeys[0]));
    }
  };

  getTreePath = id => {
    const node = [];
    getNode(id, this.props.maptreeData, node);
    if (node.length === 0) {
      return;
    }
    let { parentId } = node[node.length - 1];
    while (parentId !== -1) {
      getNode(parentId, this.props.maptreeData, node);
      parentId = node[node.length - 1].parentId;
    }
    const path = [];
    for (let i = 0; i < node.length; i++) {
      path.push(node[i].groupName);
    }
    this.props.getTreePath && this.props.getTreePath(path.reverse().join('/'));
  };
  // 点击添加根节点
  addRootNode = () => {
    this.setState({
      isModify: false,
      addVisible: true,
      isAddRoot: true,
      currentNode: {
        groupName1: '',
        nodeOrder: '',
        nodeType: undefined,
      },
    });
  };

  // 点击添加子节点
  addChildNode = () => {
    this.setState({
      isModify: false,
      addVisible: true,
      isAddRoot: false,
      currentNode: {
        groupName1: '',
        nodeOrder: '',
        nodeType: undefined,
      },
    });
  };

  // 点击修改子节点
  editChildNode = (currentNode: Object) => {
    this.setState({
      isModify: true,
      addVisible: true,
      isAddRoot: false,
      currentNode: {
        groupName1: currentNode.groupName,
        nodeOrder: currentNode.nodeOrder,
        nodeType: currentNode.mapTreeType,
        groupId: currentNode.groupId,
      },
    });
  };

  changePara = para => {
    if (this.props.appId) {
      para.appId = this.props.appId;
    }
    return para;
  };
  // 添加节点
  handleOk = () => {
    const { shopId, getMaptree, addNode, editNode } = this.props;
    const { selectedKeys, isAddRoot, isModify } = this.state;
    this.nodeForm.validateFields((err, values) => {
      if (err) {
        return;
      }

      let nodeInfo = {
        shopId,
        groupName: values.groupName1,
        nodeOrder: parseInt(values.nodeOrder),
        mapTreeType: parseInt(values.nodeType),
      };

      if (isAddRoot) {
        nodeInfo = { ...nodeInfo, parentId: -1 };
      } else {
        nodeInfo = { ...nodeInfo, parentId: selectedKeys[0] };
      }

      if (isModify) {
        editNode(this.changePara({ ...nodeInfo, groupId: selectedKeys[0] })).then(res => {
          if (res.code === 0) {
            message.success('修改图层成功!', 1.5);
            this.setState({ addVisible: false });
          }
          getMaptree(this.changePara({ shopId }));
        });
      } else {
        addNode(this.changePara(nodeInfo)).then(res => {
          if (res.code === 0) {
            message.success('新增图层成功!', 1.5);
            this.setState({ addVisible: false });
          }
          getMaptree(this.changePara({ shopId })).then(res => {
            if (selectedKeys.length === 0 || selectedKeys[0] === '-1') {
              if (res && res.data.length > 0) {
                this.selectTreeNode([res.data[0].groupId.toString()], { selected: true });
              }
            }
          });
        });
      }
    });
  };

  // 删除节点
  delTreeNode = (groupId: number) => {
    const { shopId, getMaptree, delNode } = this.props;
    delNode(this.changePara({ shopId, groupId })).then(res => {
      if (res.code === 0) {
        message.success('删除图层成功!', 1.5);
      }
      this.selectTreeNode(['-1'], { selected: true });
      getMaptree(this.changePara({ shopId })).then(res => {
        if (res && res.data.length > 0) {
          this.selectTreeNode([res.data[0].groupId.toString()], { selected: true });
        }
      });
    });
  };

  onExpand = (expandedKeys: Array<any>) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  findIndex = (item, key, expandedKeys, parentKeys) => {
    this.searchItemParentKeys.delete(-1);
    parentKeys.push(item.groupId);
    if (item.groupName.toUpperCase().indexOf(key.toUpperCase()) > -1) {
      expandedKeys.push(item.parentId.toString());
      this.searchItemKeys.add(item.groupId);
      parentKeys.forEach(a => this.searchItemParentKeys.add(a));
    }
    if (item.children) {
      for (const x of item.children) {
        this.findIndex(x, key, expandedKeys, parentKeys);
      }
    }
  };
  onSearchChange = e => {
    const { value } = e.target;
    const expandedKeys = [];
    this.searchItemParentKeys.clear();
    this.searchItemKeys.clear();
    if (value !== '') {
      for (const item of this.props.maptreeData) {
        const parentsKeys = [];
        this.findIndex(item, value, expandedKeys, parentsKeys);
      }
    }
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: !!value,
    });
  };
  renderTreeNode = (item: Object) => {
    const { selectedKeys, searchValue } = this.state;
    const index = item.groupName.toUpperCase().indexOf(searchValue.toUpperCase());
    const beforeStr = item.groupName.substr(0, index);
    const afterStr = item.groupName.substr(index + searchValue.length);
    const groupName =
      index > -1 ? (
        <div className="item-title" title={item.groupName}>
          {beforeStr}
          <span style={{ color: '#f50' }}>{item.groupName.substr(index, searchValue.length)}</span>
          {afterStr}
        </div>
      ) : (
        <div className="item-title" title={item.groupName}>
          {item.groupName}
        </div>
      );
    return (
      <React.Fragment>
        {groupName}
        {item.groupId.toString() === selectedKeys[0] && (
          <div className="node-button">
            <i className="iconfont icon-bianji" onClick={() => this.editChildNode(item)} />
            <div className="divider" />
            <i className="iconfont icon-tianjia" onClick={this.addChildNode} />
            <Popconfirm title="是否删除该图层？" onConfirm={() => this.delTreeNode(item.groupId)}>
              <i className="iconfont icon-jian" />
            </Popconfirm>
          </div>
        )}
      </React.Fragment>
    );
  };

  renderTree = (arr: Array<Object>, renderChildren: boolean = false) => {
    const { searchValue } = this.state;
    const tree = [];
    arr.map(item => {
      if (
        this.searchItemKeys.has(item.groupId) ||
        this.searchItemParentKeys.has(item.groupId) ||
        searchValue === '' ||
        renderChildren
      ) {
        if (item.children) {
          tree.push(
            <TreeNode key={item.groupId} title={this.renderTreeNode(item)} autoExpandParent={true}>
              {this.renderTree(item.children, true)}
            </TreeNode>
          );
        } else {
          tree.push(<TreeNode key={item.groupId} title={this.renderTreeNode(item)} />);
        }
      }
    });
    return tree;
  };

  render() {
    const {
      expandedKeys,
      autoExpandParent,
      addVisible,
      selectedKeys,
      currentNode,
      isModify,
    } = this.state;
    const { maptreeData, loading } = this.props;

    return (
      <div className="map-tree">
        <Search
          className="tree-search"
          placeholder="请输入图层名称"
          onChange={this.onSearchChange}
          enterButton
          maxLength="32"
        />
        <Button className="add-root-button" type="dashed" icon="plus" onClick={this.addRootNode}>
          添加根图层
        </Button>
        <div className="tree-content">
          <Tree
            showLine
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onSelect={this.selectTreeNode}
            selectedKeys={selectedKeys}
          >
            {this.renderTree(maptreeData)}
          </Tree>
        </div>
        {addVisible ? (
          <Modal
            title={isModify ? '修改图层' : '添加图层'}
            visible
            maskClosable={false}
            onOk={this.handleOk}
            confirmLoading={loading}
            onCancel={() => {
              this.setState({ addVisible: false });
            }}
          >
            <NodeForm
              ref={form => {
                form ? (this.nodeForm = form) : null;
              }}
              currentNode={currentNode}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shopId: state.global.shopId,
  appId: state.global.appId,
  maptreeData: state.localMapManage.maptreeData,
  loading: state.localMapManage.loading,
});
export default connect(mapStateToProps, null, null, { withRef: true })(MapTree);
