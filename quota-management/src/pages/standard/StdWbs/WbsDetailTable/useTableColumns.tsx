/*
 * @Author: SHUANG
 * @Date: 2024-02-21 16:37:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 13:41:37
 * @Description: 标准库-WBS库-目录
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { WbsDetailItem } from './typings';

const columns: TableColumnsDefine<WbsDetailItem> = [
  {
    title: '序号',
    dataIndex: 'showNumber',
    search: false,
    align: 'left',
    width: 155,
  },
  {
    title: 'WBS编码',
    dataIndex: 'wbsCode',
    align: 'center',
    width: 120,
  },
  {
    title: 'WBS名称',
    dataIndex: 'wbsName',
    width: 160,
  },
  {
    title: '单位',
    dataIndex: 'wbsUnit',
    align: 'center',
    search: false,
    width: 85,
  },
  {
    title: '计算规则',
    dataIndex: 'wbsComRule',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '工作内容',
    dataIndex: 'wbsJobContent',
    valueType: 'textarea',
    search: false,
  },

  // {
  //   title: '是否打标',
  //   dataIndex: 'indexItems',
  //   valueType: 'select',
  //   search: false,
  //   width: 85,
  // },
  // {
  //   title: '税率(元)',
  //   dataIndex: 'taxRate',
  //   valueType: 'digit',
  //   search: false,
  //   width: 85,
  // },

  {
    title: '是否关联章节',
    dataIndex: 'scope',
    hideInTable: true,
    valueType: 'checkbox',
    initialValue: '1',
    valueEnum: { 1: { text: ' ' } },
  },
];

export default columns;
