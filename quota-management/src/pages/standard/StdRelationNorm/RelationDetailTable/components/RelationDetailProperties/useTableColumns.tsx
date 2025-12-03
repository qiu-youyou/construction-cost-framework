/*
 * @Author: SHUANG
 * @Date: 2023-11-07 10:50:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-07 14:42:26
 * @Description: 清单关联定额映射库 - 清单 - 项目特征
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { RelationDetailPropertiesItem } from '../../typings';

const columns: TableColumnsDefine<RelationDetailPropertiesItem> = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '项目特征名称',
    dataIndex: 'propertiesName',
  },
  {
    title: '单位',
    dataIndex: 'propertiesUnit',
    align: 'center',
    width: 90,
  },
  {
    title: '项目特征值',
    dataIndex: 'propertiesValue',
    align: 'center',
    width: 90,
  },
];

export default columns;
