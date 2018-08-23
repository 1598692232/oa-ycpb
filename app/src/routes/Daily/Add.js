import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect()
export default class Add extends PureComponent {
  render() {
    return <div>Add</div>;
  }
}
