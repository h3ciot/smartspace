/**
 * @flow
 * 主页
 */
import React from 'react';
import ErrorPage from 'containers/ErrorPage';
type Props = {};
export class App extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }
  render() {
    const { error } = this.state;
    return error ? <ErrorPage /> : this.props.children;
  }
}
export default App;
