/*
 * @Author: SHUANG
 * @Date: 2024-04-10 17:16:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-15 16:24:20
 * @Description: 工程造价-运保杂费计算 运杂费用
 */
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { valueEnumsRequest } from '../../valueEnums';
import { TransportItem } from './typings';

const columns: TableColumnsDefine<TransportItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '名称',
    dataIndex: 'traName',
    cellEdit: true,
    width: 180,
  },
  {
    title: '单位',
    dataIndex: 'traUnit',
    valueType: 'select',
    selectWritingIn: true,
    cellEdit: true,
    request: async () => valueEnumsRequest('UNIT'),
    customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
  },
  {
    title: '税率',
    dataIndex: 'traTaxRate',
    valueType: 'digit',
    cellEdit: true,
  },
  {
    title: '运杂费(除税)',
    dataIndex: 'traPrice',
    valueType: 'digit',
  },
  {
    title: '运杂费(含税)',
    dataIndex: 'traPriceTax',
    valueType: 'digit',
  },

  {
    title: '修改记录',
    dataIndex: 'changeLog',
    valueType: 'textarea',
    ellipsis: false,
    customRender: (_, { changeLog }) => <ChangeLogText changeLog={changeLog} />,
  },
];

export default columns;
