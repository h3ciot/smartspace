/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import Toggle from 'components/Toggle';
import messages from './messages';
import { appLocales } from '../../i18n';
import { changeLocale, setLanguage } from '../LanguageProvider/reducer';
import { makeSelectLocale } from '../LanguageProvider/selectors';

export class LocaleToggle extends React.PureComponent {
  onToggle = value => {
    console.log(value);
    const { changeLocale, setLanguage } = this.props;
    setLanguage({ lang: value });
    changeLocale(value);
  };
  render() {
    return (
      <Toggle
        value={this.props.locale}
        values={appLocales}
        messages={messages}
        onToggle={this.onToggle}
      />
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({ locale }));

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ changeLocale, setLanguage }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
