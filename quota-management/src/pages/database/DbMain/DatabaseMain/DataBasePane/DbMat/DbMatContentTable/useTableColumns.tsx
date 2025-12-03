/*
 * @Author: SHUANG
 * @Date: 2023-10-21 11:58:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-25 16:08:22
 * @Description: 定额库(人材机 机械台班 混凝土配合比)明细表对应含量表列配置
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { DbMatContentItem } from './typings';

const columns: TableColumnsDefine<DbMatContentItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 55,
  },
  {
    title: '材料编码',
    dataIndex: 'matCode',
    align: 'center',
    width: 140,
  },
  {
    title: '材料名称',
    dataIndex: 'matName',
    valueType: 'textarea',
  },
  {
    title: '材料单位',
    dataIndex: 'matUnit',
    valueType: 'select',
    search: false,
    valueEnum: {},
  },
  {
    title: '材料单价(元)',
    dataIndex: 'matPrice',
    valueType: 'digit',
    search: false,
  },
  {
    title: '材料用量',
    dataIndex: 'matAmout',
    valueType: 'digit',
    cellEdit: true,
    search: false,
  },
  {
    title: '修改记录',
    dataIndex: 'matLog',
    valueType: 'textarea',
    ellipsis: false,
    customRender: (_, { matLog }) => <ChangeLogText changeLog={matLog} />,
    search: false,
  },
];

export default columns;
