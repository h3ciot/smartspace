import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';
import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    // 切换不安全生命周期
    constructor(props) {
      super(props);
      const { injectReducer } = getInjectors(props.store);
      injectReducer(key, reducer);
    }
    // componentWillMount() {
    //   const { injectReducer } = getInjectors(this.props.store);
    //   injectReducer(key, reducer);
    // }
    // componentWillUnmount() {
    //   const { destoryReducer } = getInjectors(this.props.store);
    //   destoryReducer(key);
    // }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  // eslint-disable-next-line react/prefer-stateless-function
  class Warped extends React.PureComponent {
    render() {
      return (
        <ReactReduxContext.Consumer>
          {({ store }) => <ReducerInjector store={store} {...this.props} />}
        </ReactReduxContext.Consumer>
      );
    }
  }

  return hoistNonReactStatics(Warped, WrappedComponent);
};
