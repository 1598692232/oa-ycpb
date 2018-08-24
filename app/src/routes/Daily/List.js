import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Row,
  Col,
  Form,
  // Input,
  Select,
  // Icon,
  Button,
  // InputNumber,
  DatePicker,
  // Badge,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import styles from './List.less';

const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
// const statusMap = ['default', 'processing', 'success', 'error'];
// const status = ['关闭', '运行中', '已上线', '异常'];

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class List extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetchPrice',
      payload: {
        page: 1,
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetchPrice',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetchPrice',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetchPrice',
        payload: values,
      });
    });
  };

  // handleModalVisible = flag => {
  // 	this.setState({
  // 	  modalVisible: !!flag,
  // 	});
  // };

  // handleAdd = fields => {
  // 	const { dispatch } = this.props;
  // 	dispatch({
  // 	  type: 'rule/add',
  // 	  payload: {
  // 		description: fields.desc,
  // 	  },
  // 	});

  // 	message.success('添加成功');
  // 	this.setState({
  // 	  modalVisible: false,
  // 	});
  // };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="金额范围">
              {getFieldDecorator('price')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="日期时间">
              {getFieldDecorator('date', {
                initialValue: [moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)],
              })(<RangePicker format={dateFormat} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="分类">
              {getFieldDecorator('cate')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={24} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '账单名称',
        dataIndex: 'priceName',
      },
      {
        title: '日期',
        dataIndex: 'dateTime',
        sorter: true,
        align: 'right',
        render: val => `${val} 万`,
        // mark to display a total number
        needTotal: true,
      },
      {
        title: '地点',
        dataIndex: 'address',
        // filters: [
        //   {
        //     text: status[0],
        //     value: 0,
        //   },
        //   {
        //     text: status[1],
        //     value: 1,
        //   },
        //   {
        //     text: status[2],
        //     value: 2,
        //   },
        //   {
        //     text: status[3],
        //     value: 3,
        //   },
        // ],
        // onFilter: (value, record) => record.status.toString() === value,
        // render(val) {
        //   return <Badge status={statusMap[val]} text={status[val]} />;
        // },
      },
      {
        title: '金额',
        dataIndex: 'price',
        sorter: true,
        // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '类别',
        dataIndex: 'cate',
        sorter: true,
        // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '描述',
        dataIndex: 'desc',
        sorter: true,
        // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '备注',
        dataIndex: 'otherDesc',
        sorter: true,
        // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="">配置</a>
            <Divider type="vertical" />
            <a href="">订阅警报</a>
          </Fragment>
        ),
      },
    ];

    return (
      <Card bordered={false}>
        <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
        {/* <Table dataSource={dataSource} columns={columns} bordered/> */}
        <StandardTable
          selectedRows={selectedRows}
          loading={loading}
          data={data}
          columns={columns}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
        />
      </Card>
    );
  }
}
