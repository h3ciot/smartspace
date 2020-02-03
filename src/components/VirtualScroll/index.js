/**
 * @author:lpf
 * @flow
 */
import './index.less';
import React, { Component } from 'react';
type Props = {
  dataSource: Array,
  itemRender: Function,
  itemHeight: number,
  style: Object,
};
type States = {
  scrollTop: number,
  renderData: Array,
  itemHeight: number,
  containerHeight: number,
};
export default class VirtualScroll extends Component<Props, States> {
  static defaultProps = {
    dataSource: [],
    itemRender: f => null,
    itemHeight: 0,
  };
  containerRef: Object;
  itemRef: Object;
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      renderData: [],
      // actualHeight: 0,
      itemHeight: props.itemHeight * props.dataSource.length,
      containerHeight: 0,
    };
    this.containerRef = React.createRef();
    this.itemRef = React.createRef();
  }
  componentDidMount(): void {
    const { clientHeight: containerHeight } = this.containerRef.current;
    this.setState({
      containerHeight,
      actualHeight: this.props.dataSource.length * this.props.itemHeight,
    });
    window.addEventListener('resize', this.setContainerHeight);
  }
  setContainerHeight = () => {
    const { clientHeight: containerHeight } = this.containerRef.current;
    this.setState({
      containerHeight,
      actualHeight: this.props.dataSource.length * this.props.itemHeight,
    });
  };
  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        actualHeight: nextProps.dataSource.length * nextProps.itemHeight,
        scrollTop: 0,
      });
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.setContainerHeight);
  }

  renderList = () => {
    const { containerHeight, actualHeight, scrollTop } = this.state;
    const { dataSource, itemHeight, itemRender } = this.props;
    const num = Math.ceil(containerHeight / itemHeight) + 2;
    const beginIndex = Math.floor(scrollTop / itemHeight);
    return (
      <div className="listContainer" style={{ height: actualHeight }}>
        {dataSource.slice(beginIndex, beginIndex + num).map((item, index) => (
          <div
            key={index}
            className="virtualScrollItem"
            style={{
              transform: `translateY(${(index + (beginIndex > 0 ? beginIndex - 1 : beginIndex)) *
                itemHeight}px)`,
            }}
          >
            {itemRender(item)}
          </div>
        ))}
      </div>
    );
  };
  onScroll = e => {
    const { scrollTop } = this.containerRef.current;
    this.setState({ scrollTop });
  };
  render() {
    const { itemHeight, dataSource, style } = this.props;
    return (
      <div
        ref={this.containerRef}
        style={style}
        className="virtualScrollContainer"
        onScroll={this.onScroll}
      >
        {this.renderList()}
        {!itemHeight && dataSource.length ? (
          <div ref={this.itemRef} className="virtualScrollHiddenItem">
            {this.props.itemRender(dataSource[0])}
          </div>
        ) : null}
      </div>
    );
  }
}
