/*
 * @Author: SHUANG
 * @Date: 2023-11-14 16:00:27
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-15 10:05:07
 * @Description: 人材机明细重构（材料关联关系设置） - 人材机明细
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { MatSubsidiaryContentItem } from './typings';

const columns: TableColumnsDefine<MatSubsidiaryContentItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 50,
  },
  {
    title: '定额库名称',
    dataIndex: 'dbSimple',
    align: 'center',
    width: 130,
  },
  {
    title: '材料编码',
    dataIndex: 'matCode',
    align: 'center',
    width: 90,
  },
  {
    title: '材料名称',
    dataIndex: 'matName',
  },
  {
    title: '单位',
    dataIndex: 'matUnit',
    valueType: 'select',
    valueEnum: {},
    search: false,
    width: 70,
  },
];

export default columns;
