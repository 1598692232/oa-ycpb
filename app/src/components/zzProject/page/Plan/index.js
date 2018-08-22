import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

import { Button } from 'antd';

import styles from './index.less';

export default class Plan extends PureComponent {
  static defaultProps = {};

  state = {};

  componentWillMount() {}

  componentDidMount() {}

  componentReceiveProps() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={styles.a}>
        <Button>Component Plan</Button>
        {/* <FooterToolbar></FooterToolbar> */}
      </div>
    );
  }
}
