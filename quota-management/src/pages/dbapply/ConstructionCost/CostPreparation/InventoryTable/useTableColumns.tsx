/*
 * @Author: SHUANG
 * @Date: 2024-01-11 15:47:43
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 16:49:47
 * @Description: 工程造价-工程量清单编制-分部分项清单
 */

import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { valueEnumsRequest } from '../../valueEnums';
import { InventoryItem } from './typings';

type Props = { auditStatus?: boolean };

export default ({ auditStatus }: Props) => {
  const columns: TableColumnsDefine<InventoryItem> = [
    {
      title: '序号',
      dataIndex: 'showNumber',
      ellipsis: true,
      align: 'left',
      width: 145,
    },
    {
      title: '清单编码',
      dataIndex: 'inventoryCode',
      align: 'center',
      cellEdit: true,
      width: 120,
    },
    {
      title: '清单名称',
      dataIndex: 'inventoryName',
      cellEdit: true,
      width: 180,
    },
    {
      title: '单位',
      dataIndex: 'inventoryUnit',
      valueType: 'select',
      selectWritingIn: true,
      cellEdit: true,
      search: false,
      width: 70,
      request: async () => valueEnumsRequest('UNIT'),
      customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
    },
    {
      title: '工程量',
      dataIndex: 'inventoryAmount',
      valueType: 'digit',
      cellEdit: true,
      width: 80,
    },
    {
      title: '主材/设备单价',
      dataIndex: 'inventoryEquipmentPrice',
      valueType: 'digit',
      cellEdit: true,
      width: 90,
    },
    {
      title: '施工/安装单价',
      dataIndex: 'inventoryConstructPrice',
      valueType: 'digit',
      cellEdit: true,
      width: 90,
    },
    {
      title: '主材/设备合价',
      dataIndex: 'inventoryEquipmentTotal',
      valueType: 'digit',
      width: 90,
    },
    {
      title: '施工/安装合价',
      dataIndex: 'inventoryConstructTotal',
      valueType: 'digit',
      width: 90,
    },
    {
      title: '计算规则',
      dataIndex: 'inventoryCalcRule',
      valueType: 'textarea',
      cellEdit: true,
      width: 180,
    },
    {
      title: '项目特征',
      dataIndex: 'inventoryProperty',
      valueType: 'textarea',
      width: 180,
    },
    {
      title: '对应WBS编码',
      dataIndex: 'wbsCode',
      align: 'center',
      width: 110,
    },
    // {
    //   title: '对应WBS名称',
    //   dataIndex: 'wbsName',
    //   width: 140,
    // },
    {
      title: '综合单价编码',
      dataIndex: 'unitPriceCode',
      cellEdit: true,
      align: 'center',
      width: 90,
    },
    {
      title: '指标分类',
      dataIndex: 'indexName',
      align: 'center',
      width: 90,
    },

    {
      title: '修改记录',
      dataIndex: 'inventoryLog',
      valueType: 'textarea',
      ellipsis: false,
      customRender: (_, { inventoryLog }) => {
        return <ChangeLogText changeLog={inventoryLog} />;
      },
    },
  ];

  if (auditStatus) {
    columns.splice(
      1,
      0,
      {
        title: '审核闭合',
        dataIndex: 'auditFlag',
        align: 'center',
        width: 70,
        customRender: (_, { auditFlag }) => {
          return auditFlag === 'N' ? '是' : auditFlag === 'Y' ? '否' : '';
        },
      },
      {
        title: '审核标注',
        dataIndex: 'auditRemarks',
        valueType: 'textarea',
        width: 300,
      },
      {
        title: '修改记录',
        dataIndex: 'inventoryLog',
        valueType: 'textarea',
        ellipsis: false,
        customRender: (_, { inventoryLog }) => {
          return <ChangeLogText changeLog={inventoryLog} />;
        },
        width: 300,
      },
    );
    // 删除columns 最后一项
    columns.pop();
  }

  return columns;
};
