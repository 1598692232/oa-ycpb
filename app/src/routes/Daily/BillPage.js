import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import { getRoutes } from 'utils/utils';

@connect()
export default class SearchList extends Component {
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'list':
        dispatch(routerRedux.push(`${match.url}/list`));
        break;
      case 'chart':
        dispatch(routerRedux.push(`${match.url}/chart`));
        break;
      case 'cate':
        dispatch(routerRedux.push(`${match.url}/cate`));
        break;
      case 'add':
        dispatch(routerRedux.push(`${match.url}/add`));
        break;
      default:
        break;
    }
  };

  render() {
    const tabList = [
      {
        key: 'list',
        tab: '列表',
      },
      {
        key: 'chart',
        tab: '图表',
      },
      {
        key: 'cate',
        tab: '分类',
      },
      {
        key: 'add',
        tab: '添加',
      },
    ];

    // const mainSearch = (
    //   <div style={{ textAlign: 'center' }}>
    //     <Input.Search
    //       placeholder="请输入"
    //       enterButton="搜索"
    //       size="large"
    //       onSearch={this.handleFormSubmit}
    //       style={{ width: 522 }}
    //     />
    //   </div>
    // );

    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout
        title="账单管理"
        // content={mainSearch}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch>
      </PageHeaderLayout>
    );
  }
}
