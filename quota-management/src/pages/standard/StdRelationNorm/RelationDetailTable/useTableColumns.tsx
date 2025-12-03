/*
 * @Author: SHUANG
 * @Date: 2023-11-06 10:52:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 18:29:25
 * @Description: 清单关联定额映射库 - 清单
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { RelationDetailItem } from './typings';

const columns: TableColumnsDefine<RelationDetailItem> = [
  {
    title: '序号',
    dataIndex: 'showNumber',
    align: 'left',
    width: 95,
  },
  {
    title: '编码',
    dataIndex: 'detailCode',
    align: 'center',
    width: 100,
  },
  {
    title: '名称',
    dataIndex: 'detailName',
    width: 140,
  },
  {
    title: '单位',
    dataIndex: 'detailUnit',
    valueType: 'select',
    search: false,
    valueEnum: {},
  },
  {
    title: '计算规则',
    dataIndex: 'detailCalcRule',
    valueType: 'textarea',
  },
  {
    title: '工作内容',
    dataIndex: 'detailWork',
    valueType: 'textarea',
  },
  {
    title: '项目特征描述',
    dataIndex: 'detailProperty',
    valueType: 'textarea',
  },
];

export default columns;
