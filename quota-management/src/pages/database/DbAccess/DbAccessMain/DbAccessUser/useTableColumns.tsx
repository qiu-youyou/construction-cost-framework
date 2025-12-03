/*
 * @Author: SHUANG
 * @Date: 2023-10-26 14:18:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-01 16:28:08
 * @Description: 定额库权限目录对应用户表列配置
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbAccessDirectorUserItem } from '../typings';

const columns: TableColumnsDefine<DbAccessDirectorUserItem> = [
  {
    title: '用户名',
    dataIndex: 'userCode',
  },
  {
    title: '真实姓名',
    dataIndex: 'userFullName',
  },
];

export default columns;
