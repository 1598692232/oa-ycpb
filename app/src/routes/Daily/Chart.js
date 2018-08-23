import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect()
export default class Chart extends PureComponent {
  render() {
    return <div>Chart</div>;
  }
}
