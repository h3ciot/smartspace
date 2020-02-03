// 取消请求demo，注意高阶函数顺序
import React from 'react';
import { withAbortComponent, mapAbortToRequestProps } from 'utils/cancelRequest';
import { getCancel } from '../App/reducer';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
class Cancel extends React.PureComponent {
  componentDidMount() {
    this.props
      .getCancel(
        { a: 123 },
        {
          rj: e => {
            console.log(e);
          },
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return <div>test</div>;
  }
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getCancel }, dispatch),
});
const withConnect = connect(null, mapAbortToRequestProps(mapDispatchToProps));
const withInject = injectReducer({ key: 'cancel', reducer });
export default compose(withInject, withAbortComponent, withConnect)(Cancel);
// export default withAbortComponent(withConnect(Cancel));
