import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './index.less';
class Header extends React.Component {
  render() {
    return (
      <div className="header-wrapper">
        <Link to="/">
          <FormattedMessage {...messages.home} />
        </Link>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
