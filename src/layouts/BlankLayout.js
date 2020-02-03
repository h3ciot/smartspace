import React from 'react';

import { setAppId } from 'containers/App/reducer';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class BasicLayout extends React.PureComponent {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={match.path} exact component={null} />
        <Redirect to={match.url} />
      </Switch>
    );
  }
}

export default connect(null, dispatch => ({
  ...bindActionCreators({}, dispatch),
}))(BasicLayout);
