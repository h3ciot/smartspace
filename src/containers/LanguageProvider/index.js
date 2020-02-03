/* eslint-disable react/prefer-stateless-function */
/**
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { makeSelectLocale } from './selectors';
class LanguageProvider extends React.PureComponent {
  render() {
    const { locale, messages } = this.props;
    const localeMs = messages[locale];
    return (
      <IntlProvider locale={locale} messages={localeMs.messages}>
        <ConfigProvider locale={localeMs.antd}>
          {React.Children.only(this.props.children)}
        </ConfigProvider>
      </IntlProvider>
    );
  }
}

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({ locale }));

export default connect(mapStateToProps)(LanguageProvider);
