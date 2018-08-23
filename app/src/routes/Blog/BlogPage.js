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
      case 'diary':
        dispatch(routerRedux.push(`${match.url}/diary`));
        break;
      case 'notes':
        dispatch(routerRedux.push(`${match.url}/notes`));
        break;
      case 'share':
        dispatch(routerRedux.push(`${match.url}/share`));
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
        key: 'diary',
        tab: '日记',
      },
      {
        key: 'notes',
        tab: '笔记',
      },
      {
        key: 'share',
        tab: '技术分享',
      },
      {
        key: 'add',
        tab: '添加/编辑',
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
        title="blog管理"
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
