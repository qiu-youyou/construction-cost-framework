/*
 * @Author: SHUANG
 * @Date: 2024-04-22 11:40:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 14:41:34
 * @Description: 工程造价-运保杂费计算 来源地 分段运输费用
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { TransportOriginSundryItem } from '../typings';

const columns: TableColumnsDefine<TransportOriginSundryItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '杂费名称',
    dataIndex: 'sundryName',
    cellEdit: true,
  },
  {
    title: '除税',
    dataIndex: 'sundryPrice',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '含税',
    dataIndex: 'sundryPriceTax',
    valueType: 'digit',
  },
  // {
  //   title: '修改记录',
  //   dataIndex: 'changeLog',
  //   valueType: 'textarea',
  //   ellipsis: false,
  //   customRender: (_, { changeLog }) => <ChangeLogText changeLog={changeLog} />,
  // },
];

export default columns;
