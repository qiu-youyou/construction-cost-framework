/*
 * @Author: SHUANG
 * @Date: 2024-03-25 14:21:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 10:43:33
 * @Description: 工程造价-组时机械明细
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { MultiformMechanicalMatItem } from './typings';
import { valueEnumsRequest } from '../../valueEnums';

const columns: TableColumnsDefine<MultiformMechanicalMatItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '编码',
    dataIndex: 'matCode',
    align: 'center',
    cellEdit: true,
    width: 110,
  },
  {
    title: '名称',
    dataIndex: 'matName',
    cellEdit: true,
    width: 190,
  },
  {
    title: '单位',
    dataIndex: 'matUnit',
    valueType: 'select',
    selectWritingIn: true,
    cellEdit: true,
    request: async () => valueEnumsRequest('UNIT'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
  },
  {
    title: '单价(元)',
    dataIndex: 'matPrice',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '用量',
    dataIndex: 'matAmount',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '合价(元)',
    dataIndex: 'matTotal',
    valueType: 'digit',
    search: false,
  },
  {
    title: '修改记录',
    dataIndex: 'matLog',
    valueType: 'textarea',
    customRender: (_, { matLog }) => <ChangeLogText changeLog={matLog} />,
    search: false,
  },
];

export default columns;
