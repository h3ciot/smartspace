import React from 'react';

export function withAbortComponent(WrappedComponent, ref = false) {
  class Wrap extends React.Component {
    constructor(props) {
      super(props);
      this.abortController = new AbortController();
    }
    componentWillUnmount() {
      this.abortController.abort();
      console.log('abort');
    }
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
    render() {
      const { forwardedRef, ...rest } = this.props;
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent ref={forwardedRef} {...rest} signal={this.abortController.signal} />;
    }
  }
  if (ref) {
    return React.forwardRef((props, ref) => {
      return <Wrap {...props} forwardedRef={ref} />;
    });
  } else {
    return Wrap;
  }
}

export function withAbortPureComponent(WrappedComponent, ref = false) {
  class Wrap extends React.PureComponent {
    constructor(props) {
      super(props);
      this.abortController = new AbortController();
    }
    componentWillUnmount() {
      this.abortController.abort();
      console.log('abort');
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
    render() {
      const { forwardedRef, ...rest } = this.props;
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent ref={forwardedRef} {...rest} signal={this.abortController.signal} />;
    }
  }
  if (ref) {
    return React.forwardRef((props, ref) => {
      return <Wrap {...props} forwardedRef={ref} />;
    });
  } else {
    return Wrap;
  }
}

export function mapAbortToRequestProps(fn) {
  return (dispatch, ownProps) => {
    const ret = fn(dispatch, ownProps);
    const { signal } = ownProps;
    Object.keys(ret).forEach(key => {
      const fnTemp = ret[key];
      ret[key] = (...para) => {
        const [, cb = {}] = para || [, {}];
        return fnTemp(para[0], { ...cb, signal: cb.signal || signal });
      };
    });
    return ret;
  };
}
