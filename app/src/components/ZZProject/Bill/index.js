import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

import { Button } from 'antd';

import styles from './index.less';

export default class Bill extends PureComponent {
  static defaultProps = {};

  state = {};

  componentWillMount() {}

  componentDidMount() {}

  componentReceiveProps() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={styles.a}>
        <Button>Component Sample</Button>
      </div>
    );
  }
}
