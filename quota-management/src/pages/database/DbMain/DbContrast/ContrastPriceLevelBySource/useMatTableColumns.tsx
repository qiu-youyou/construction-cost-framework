/*
 * @Author: SHUANG
 * @Date: 2023-11-13 13:55:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-27 18:30:41
 * @Description: 企业定额修编-定额造价水平对比-与来源库对比 - 材料
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbPriceLevelBySourceMatItem } from './typings';

type Props = { matDbInfo?: { current?: string; source?: string } };

export default ({ matDbInfo }: Props) => {
  const columns: TableColumnsDefine<DbPriceLevelBySourceMatItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
    },

    {
      title: `${matDbInfo?.current || ''}`,

      children: [
        {
          title: '材料编码',
          dataIndex: 'currentMatCode',
          align: 'center',
          width: 150,
        },
        {
          title: '材料名称',
          dataIndex: 'currentMatName',
          width: 220,
        },
        {
          title: '单位',
          dataIndex: 'currentMatUnit',
          align: 'center',
          width: 60,
        },
        {
          title: '单价(元)',
          dataIndex: 'currentMatPrice',
          valueType: 'digit',
          width: 85,
        },
      ],
    },

    {
      title: `${matDbInfo?.source || ''}`,
      children: [
        {
          title: '材料编码',
          dataIndex: 'sourceMatCode',
          align: 'center',
          width: 150,
        },
        {
          title: '材料名称',
          dataIndex: 'sourceMatName',
          width: 220,
        },
        {
          title: '单位',
          dataIndex: 'sourceMatUnit',
          align: 'center',
          width: 60,
        },
        {
          title: '单价(元)',
          dataIndex: 'sourceMatPrice',
          valueType: 'digit',
          width: 85,
        },
      ],
    },

    {
      title: '差额',
      dataIndex: 'matPriceDifference',
      valueType: 'digit',
      width: 85,
    },
    {
      title: '调整比例',
      dataIndex: 'matPricePercentage',
      // valueType: 'digit',
      align: 'right',
      width: 85,
    },
  ];

  return columns;
};
