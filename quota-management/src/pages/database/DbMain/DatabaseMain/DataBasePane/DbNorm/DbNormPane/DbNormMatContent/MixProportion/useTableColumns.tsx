/*
 * @Author: SHUANG
 * @Date: 2023-10-21 11:58:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 09:27:40
 * @Description: 定额库(人材机 机械台班 混凝土配合比)明细表对应含量表列配置
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbNormMatContentItem } from '../typings';

const columns: TableColumnsDefine<DbNormMatContentItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 95,
  },
  {
    title: '类型',
    dataIndex: 'matRcjType',
    valueType: 'select',
    valueEnum: {
      1: { text: '人工' },
      2: { text: '材料' },
      3: { text: '机械' },
      4: { text: '机械台班' },
      5: { text: '混凝土' },
    },
    width: 80,
  },
  {
    title: '材料编码',
    dataIndex: 'matCode',
    align: 'center',
    width: 120,
  },
  {
    title: '材料名称',
    dataIndex: 'matName',
    valueType: 'textarea',
  },
  {
    title: '单位',
    dataIndex: 'matUnit',
    valueType: 'select',
    search: false,
    valueEnum: {},
  },
  {
    title: '单价(元)',
    dataIndex: 'matPrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '单位用量',
    dataIndex: 'matAmount',
    valueType: 'digit',
    search: false,
    width: 85,
  },
];

export default columns;
