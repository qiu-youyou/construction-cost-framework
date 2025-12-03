/*
 * @Author: SHUANG
 * @Date: 2024-03-14 15:39:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 08:53:14
 * @Description: 工程造价-人材机汇总与调价 表
 */

import { Checkbox } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { MatSummaryItem } from './typings';

export default ({ fetchCellEditSaveRequest, matSummaryTableRef, readonly }: any) => {
  const columns: TableColumnsDefine<MatSummaryItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 55,
    },
    {
      title: '编码',
      dataIndex: 'matCode',
      align: 'center',
      width: 110,
    },
    {
      title: '名称',
      dataIndex: 'matName',
    },
    {
      title: '单位',
      dataIndex: 'matUnit',
      align: 'center',
      width: 100,
    },
    {
      title: '用量',
      dataIndex: 'matAmount',
      valueType: 'digit',
    },
    {
      title: '主材标识',
      dataIndex: 'matIsMain',
      ellipsis: false,
      align: 'center',
      search: false,
      width: 60,
      customRender: (_, item) => {
        /** 是否有合计标识 */
        let matIsMain = item?.matIsMain === 'Y';
        const stageId = item?.stageId || '';
        const projectId = item?.projectId || '';
        return (
          <Checkbox
            onClick={async () => {
              if (readonly) return;
              const newValue = item?.matIsMain === 'Y' ? 'N' : 'Y';
              const params: any = { filedName: 'matIsMain', newValue };
              const res = await fetchCellEditSaveRequest(params, { stageId, projectId }, {}, item, item);
              if (res?.status === 'SUCCESS') {
                matSummaryTableRef?.current?.reload?.();
              }
            }}
            checked={matIsMain}
          />
        );
      },
    },
    {
      title: '配合比',
      dataIndex: 'hasChildren',
      align: 'center',
      search: false,
      width: 70,
      customRender: (_, item) => {
        return item?.hasChildren == true ? <CheckSquareOutlined style={{ fontSize: 15 }} /> : '';
      },
    },
    {
      title: '材料分类',
      dataIndex: 'matTypeName',
      align: 'center',
      width: 120,
    },
    {
      title: '预算价(元)',
      dataIndex: 'matPrice',
      valueType: 'digit',
    },
    {
      title: '市场价(元)',
      dataIndex: 'matMarkPrice',
      valueType: 'digit',
      cellEdit: true,
    },
    {
      title: '价差(元)',
      dataIndex: 'priceDifferences',
      valueType: 'digit',
    },
    {
      title: '预算价合价(元)',
      dataIndex: 'matTotPrice',
      valueType: 'digit',
    },
    {
      title: '市场价合价(元)',
      dataIndex: 'matMarkTotPrice',
      valueType: 'digit',
    },
    {
      title: '价差合价(元)',
      dataIndex: 'priceDifferencesTot',
      valueType: 'digit',
    },
  ];

  return columns;
};
