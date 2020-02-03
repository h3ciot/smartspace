/**
 * @flow
 */

import React, { Component } from 'react';
import { Spin } from 'antd';
import './index.less';

type Props = {
  src: string,
};

type State = {
  onLoad: boolean,
};

class Iframe extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      onLoad: true,
    };
  }

  render() {
    const { src } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <Spin wrapperClassName="iframePage" spinning={this.state.onLoad} size="large">
          <iframe
            title={src}
            style={{ verticalAlign: 'top' }}
            src={src}
            width="100%"
            height="100%"
            frameBorder={0}
            onLoad={() => this.setState({ onLoad: false })}
          />
        </Spin>
      </div>
    );
  }
}

export default Iframe;
