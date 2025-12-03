/*
 * @Author: SHUANG
 * @Date: 2024-03-25 13:57:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 10:43:05
 * @Description: 工程造价-组时机械定义
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { MultiformMechanicalItem } from './typings';
import { valueEnumsRequest } from '../../valueEnums';

const columns: TableColumnsDefine<MultiformMechanicalItem> = [
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
    width: 90,
  },
  {
    title: '名称',
    dataIndex: 'matName',
    cellEdit: true,
    width: 140,
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
  },
  {
    title: '修改记录',
    dataIndex: 'matLog',
    valueType: 'textarea',
    ellipsis: false,
    customRender: (_, { matLog }) => <ChangeLogText changeLog={matLog} />,
  },
];

export default columns;
