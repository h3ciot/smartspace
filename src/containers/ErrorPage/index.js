/**
 * @author:lpf
 * @flow
 *
 **/
import React, { Component } from 'react';
import { Result, Button } from 'antd';
import errorImage from 'assets/images/error.png';
import { FormattedMessage } from 'react-intl';
type Props = {
  title?: string | React$Node,
  subTitle?: string | React$Node,
  extra?: React$Node,
};
type State = {};

class index extends Component<Props, State> {
  static defaultProps = {
    title: <FormattedMessage id="iot.platform.common.error.title" />,
    subTitle: <FormattedMessage id="iot.platform.common.error.subtitle" />,
    extra: (
      <Button
        type="primary"
        key="console"
        style={{ marginLeft: 0 }}
        onClick={() => {
          window.location.reload();
        }}
      >
        <FormattedMessage id="iot.platform.common.refresh" />
      </Button>
    ),
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Result
        className="error-page"
        icon={<img src={errorImage} alt="" />}
        status="error"
        title={this.props.title}
        subTitle={this.props.subTitle}
        extra={this.props.extra}
      />
    );
  }
}

export default index;
