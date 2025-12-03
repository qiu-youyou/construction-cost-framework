/*
 * @Author: SHUANG
 * @Date: 2024-03-26 17:13:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-26 18:33:35
 * @Description: 工程造价-工程量清单编制-分部分项清单表 批量应用历史项目清单
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { valueEnumsRequest } from '@/pages/dbapply/Product/valueEnums';
import { ProjectSearchItem } from '../typings';

const columns: TableColumnsDefine<ProjectSearchItem> = [
  {
    title: '项目编码',
    dataIndex: 'projectCode',
    align: 'center',
    width: 70,
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 220,
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    width: 180,
  },
  {
    title: '阶段名称',
    dataIndex: 'stageName',
    align: 'center',
    width: 110,
  },
  {
    title: '版本号',
    dataIndex: 'versionCode',
    align: 'center',
    search: false,
    width: 120,
  },
  {
    title: '业务类型',
    dataIndex: 'projectBusinessType',
    valueType: 'select',
    request: async () => valueEnumsRequest('busi_type'),
    width: 90,
  },
  {
    title: '行业类型',
    dataIndex: 'projectIndustry',
    align: 'center',
    width: 160,
  },
  {
    title: '省份',
    dataIndex: 'projectProvince',
    align: 'center',
    width: 60,
  },
];

export default columns;
