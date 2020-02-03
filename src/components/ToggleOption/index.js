/**
 *
 * ToggleOption
 * @flow
 */

import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

type Props = {
  value: string,
  message: Object,
  intl: intlShape,
};

const ToggleOption = ({ value, message, intl }: Props) => (
  <option value={value}>{message ? intl.formatMessage(message) : value}</option>
);

export default injectIntl(ToggleOption);
