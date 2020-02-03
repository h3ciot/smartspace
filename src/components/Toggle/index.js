/**
 *
 * LocaleToggle
 * @flow
 */

import React from 'react';

import { Dropdown, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';
type Props = {
  onToggle: Function,
  values: Array<string>,
  value: string,
  messages: Object,
};

function Toggle(props: Props) {
  let menu = <Menu.Item key="no">--</Menu.Item>;

  // If we have items, render them
  if (props.values) {
    menu = props.values
      .filter(value => value !== props.value)
      .map(value => (
        <Menu.Item key={value}>
          <FormattedMessage id={props.messages[value].id} />
          {/*{props.messages[value]}*/}
        </Menu.Item>
      ));
  }
  console.log(props.values);
  return (
    <Dropdown overlay={<Menu onClick={({ key }) => props.onToggle(key)}>{menu}</Menu>}>
      <div>
        <FormattedMessage id={props.messages[props.value].id} />
      </div>
    </Dropdown>

    // <Select value={props.value} onChange={props.onToggle}>
    //   {content}
    // </Select>
  );
}

export default Toggle;
