/*
 * @Author: SHUANG
 * @Date: 2023-10-26 11:41:52
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-15 15:51:33
 * @Description: 定额库权限表列配置
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbAccessItem } from './typings';

const columns: TableColumnsDefine<DbAccessItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 50,
  },
  {
    title: '定额库编码',
    dataIndex: 'dbCode',
    align: 'center',
  },
  {
    title: '定额库名称',
    dataIndex: 'dbName',
    valueType: 'textarea',
  },
  {
    title: '定额库简称',
    dataIndex: 'dbSimple',
    align: 'center',
    width: 120,
  },
  {
    title: '编制说明权限',
    dataIndex: 'dbNodeUser',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '章节说明权限',
    dataIndex: 'dbChapterUser',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '定额明细权限',
    dataIndex: 'dbNormUser',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '人材机权限',
    dataIndex: 'dbRCJUser',
    search: false,
  },
];

export default columns;
