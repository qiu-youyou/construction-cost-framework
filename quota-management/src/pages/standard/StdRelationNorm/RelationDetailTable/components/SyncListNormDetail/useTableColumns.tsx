/*
 * @Author: SHUANG
 * @Date: 2023-11-07 10:50:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-07 10:53:05
 * @Description:查询成本信息系统分部分项目录
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { RelationSubItemByCostSystemItem } from '../../typings';

const columns: TableColumnsDefine<RelationSubItemByCostSystemItem> = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '分部分项目录名称',
    dataIndex: 'fbfxName',
  },
  {
    title: '业务类型',
    dataIndex: 'busType',
  },
  {
    title: '行业类别',
    dataIndex: 'indType',
  },
];

export default columns;
