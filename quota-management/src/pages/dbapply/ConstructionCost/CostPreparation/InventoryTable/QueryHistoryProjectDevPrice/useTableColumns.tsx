/*
 * @Author: SHUANG
 * @Date: 2024-03-27 16:03:09
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 16:22:01
 * @Description: 工程造价-工程量清单编制-分部分项清单表 查询历史项目设备价格
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { HistoryDevPriceItem } from './typings';

const columns: TableColumnsDefine<HistoryDevPriceItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 35,
  },

  {
    title: '工程信息',
    children: [
      {
        title: '项目编码',
        dataIndex: 'projectCode',
        align: 'center',
        width: 60,
      },
      {
        title: '项目名称',
        dataIndex: 'projectName',
        width: 200,
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        width: 120,
      },
      {
        title: '阶段名称',
        dataIndex: 'stageName',
        align: 'center',
        width: 90,
      },
      {
        title: '省份',
        dataIndex: 'projectProvince',
        align: 'center',
        search: false,
        width: 55,
      },
      {
        title: '行业类型',
        dataIndex: 'projectIndustry',
        align: 'center',
        width: 140,
      },
    ],
  },

  {
    title: '设备信息',
    children: [
      {
        title: '设备编码',
        dataIndex: 'inventoryCode',
        align: 'center',
        width: 60,
      },
      {
        title: '设备名称',
        dataIndex: 'inventoryName',
        width: 160,
      },
      {
        title: '规格型号',
        dataIndex: 'inventoryProperty',
        width: 180,
      },
      {
        title: '单位',
        dataIndex: 'inventoryUnit',
        align: 'center',
        width: 70,
      },
      {
        title: '工程量',
        dataIndex: 'inventoryAmount',
        valueType: 'digit',
        width: 90,
      },
      {
        title: '单价',
        dataIndex: 'inventoryEquipmentPrice',
        valueType: 'digit',
        width: 90,
      },
    ],
  },

  {
    title: '项目编码',
    dataIndex: 'projectCode',
    hideInTable: true,
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    hideInTable: true,
  },
  {
    title: '省份',
    dataIndex: 'projectProvince',
    hideInTable: true,
  },
  {
    title: '行业',
    dataIndex: 'projectIndustry',
    hideInTable: true,
  },
  {
    title: '阶段',
    dataIndex: 'stageName',
    hideInTable: true,
  },

  {
    title: '设备编码',
    dataIndex: 'inventoryCode',
    hideInTable: true,
  },
  {
    title: '设备名称',
    dataIndex: 'inventoryName',
    hideInTable: true,
  },
  {
    title: '规格型号',
    dataIndex: 'inventoryProperty',
    hideInTable: true,
  },
];

export default columns;
