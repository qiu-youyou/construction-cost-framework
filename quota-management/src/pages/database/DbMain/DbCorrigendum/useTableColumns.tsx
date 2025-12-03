/*
 * @Author: SHUANG
 * @Date: 2023-11-08 19:09:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-08 19:34:30
 * @Description: 企业定额修编-勘误记录
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbCorrigendumItem } from './typings';

const columns: TableColumnsDefine<DbCorrigendumItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 35,
  },
  {
    title: '修订人',
    dataIndex: 'corrigendumMan',
    cellEdit: true,
    width: 100,
  },
  {
    title: '修订时间',
    dataIndex: 'corrigendumDatetime',
    valueType: 'date',
    cellEdit: true,
  },
  {
    title: '修订内容',
    dataIndex: 'corrigendumContent',
    cellEdit: true,
  },
  {
    title: '是否有附件',
    dataIndex: 'isFile',
    align: 'center',
    width: 70,
  },
];

export default columns;
