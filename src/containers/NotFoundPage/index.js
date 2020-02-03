/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

// import messages from './messages';
import './index.less';

export default function NotFound() {
  return (
    <div className="no-page">
      <div className="no-page-image" />
      <div style={{ width: '100%', textAlign: 'center' }}>
        <FormattedMessage id="zone.containers.NotFoundPage.header" />
      </div>
    </div>
  );
}
