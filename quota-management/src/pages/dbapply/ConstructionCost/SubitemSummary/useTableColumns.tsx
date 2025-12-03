/*
 * @Author: SHUANG
 * @Date: 2024-01-18 09:52:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 17:47:06
 * @Description: 工程造价-造价编制-分部分项汇总
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { SubitemSummaryItem } from './typings';

const columns: TableColumnsDefine<SubitemSummaryItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 45,
  },
  {
    title: '分部分项编码',
    dataIndex: 'subitemCode',
    align: 'center',
    width: 90,
  },
  {
    title: '分部分项名称',
    dataIndex: 'subitemName',
  },
  {
    title: '主材/设备合价(万元)',
    dataIndex: 'subitemEquipmentTotal',
    valueType: 'digit',
    search: false,
    width: 65,
  },
  {
    title: '施工/安装合价(万元)',
    dataIndex: 'subitemConstructTotal',
    valueType: 'digit',
    search: false,
    width: 65,
  },
  {
    title: '合计(万元)',
    dataIndex: 'subitemTotal',
    valueType: 'digit',
    search: false,
    width: 65,
  },
];

export default columns;
