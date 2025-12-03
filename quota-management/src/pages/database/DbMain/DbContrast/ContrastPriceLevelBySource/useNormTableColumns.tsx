/*
 * @Author: SHUANG
 * @Date: 2023-11-13 13:55:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 11:58:21
 * @Description: 企业定额修编-定额造价水平对比-与来源库对比 - 定额
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbPriceLevelBySourceNormItem } from './typings';

import { Typography } from 'antd';
const { Text } = Typography;

/** 比例 */
const percentageContrastValue = 50;

type Props = { normDbInfo?: { current?: string; source?: string } };

export default ({ normDbInfo }: Props) => {
  const columns: TableColumnsDefine<DbPriceLevelBySourceNormItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
    },

    {
      title: `${normDbInfo?.current || ''}`,
      children: [
        {
          title: '定额编码',
          dataIndex: 'currentNormCode',
          align: 'center',
          width: 100,
        },
        {
          title: '定额名称',
          dataIndex: 'currentNormName',
          width: 260,
          ellipsis: false,
          customRender: (_, { currentNormName, currentCompleteNormName }) => {
            const finalRender = (currentNormName || '') + ' ' + (currentCompleteNormName || '');
            return <Text ellipsis={{ tooltip: finalRender }}>{finalRender}</Text>;
          },
        },
        {
          title: '单位',
          dataIndex: 'currentNormUnit',
          align: 'center',
          width: 60,
        },
        {
          title: '基价(元)',
          dataIndex: 'currentNormPrice',
          valueType: 'digit',
          width: 85,
        },
        {
          title: '人工费(元)',
          dataIndex: 'currentNormManPrice',
          valueType: 'digit',
          width: 85,
        },
        {
          title: '材料费(元)',
          dataIndex: 'currentNormMatPrice',
          valueType: 'digit',
          width: 85,
        },
        {
          title: '机械费(元)',
          dataIndex: 'currentNormMacPrice',
          valueType: 'digit',
          width: 85,
        },
      ],
    },

    {
      title: `${normDbInfo?.source || ''}`,
      children: [
        {
          title: '定额编码',
          dataIndex: 'sourceNormCode',
          align: 'center',
          width: 100,
        },
        {
          title: '定额名称',
          dataIndex: 'sourceNormName',
          width: 260,
          ellipsis: false,
          customRender: (_, { sourceNormName, sourceCompleteNormName }) => {
            const finalRender = (sourceNormName || '') + ' ' + (sourceCompleteNormName || '');
            return <Text ellipsis={{ tooltip: finalRender }}>{finalRender}</Text>;
          },
        },

        {
          title: '单位',
          dataIndex: 'sourceNormUnit',
          align: 'center',
          width: 60,
        },
        {
          title: '基价(元)',
          dataIndex: 'sourceNormPrice',
          valueType: 'digit',
          width: 90,
        },
        {
          title: '人工费(元)',
          dataIndex: 'sourceNormManPrice',
          valueType: 'digit',
          width: 90,
        },
        {
          title: '材料费(元)',
          dataIndex: 'sourceNormMatPrice',
          valueType: 'digit',
          width: 90,
        },
        {
          title: '机械费(元)',
          dataIndex: 'sourceNormMacPrice',
          valueType: 'digit',
          width: 90,
        },
      ],
    },

    {
      title: '差额',
      children: [
        {
          title: '基价(元)',
          dataIndex: 'normPriceDifference',
          valueType: 'digit',
          width: 90,
        },
        {
          title: '人工费(元)',
          dataIndex: 'normManPriceDifference',
          valueType: 'digit',
          width: 90,
        },
        {
          title: '材料费(元)',
          dataIndex: 'normMatPriceDifference',
          valueType: 'digit',
          width: 90,
        },
        {
          title: '机械费(元)',
          dataIndex: 'normMacPriceDifference',
          valueType: 'digit',
          width: 90,
        },
      ],
    },

    {
      title: '调整比例',
      children: [
        {
          title: '基价(%)',
          dataIndex: 'normPricePercentage',
          valueType: 'digit',
          width: 85,
          customRender: (_, { normPricePercentage }) => {
            if (Math.abs(normPricePercentage) > percentageContrastValue)
              return <span style={{ color: 'red' }}>{normPricePercentage}</span>;
            return normPricePercentage;
          },
        },
        {
          title: '人工费(%)',
          dataIndex: 'normManPricePercentage',
          valueType: 'digit',
          width: 85,
          customRender: (_, { normManPricePercentage }) => {
            if (Math.abs(normManPricePercentage) > percentageContrastValue)
              return <span style={{ color: 'red' }}>{normManPricePercentage}</span>;
            return normManPricePercentage;
          },
        },
        {
          title: '材料费(%)',
          dataIndex: 'normMatPricePercentage',
          valueType: 'digit',
          width: 85,
          customRender: (_, { normMatPricePercentage }) => {
            if (Math.abs(normMatPricePercentage) > percentageContrastValue)
              return <span style={{ color: 'red' }}>{normMatPricePercentage}</span>;
            return normMatPricePercentage;
          },
        },
        {
          title: '机械费(%)',
          dataIndex: 'normMacPricePercentage',
          valueType: 'digit',
          width: 85,
          customRender: (_, { normMacPricePercentage }) => {
            if (Math.abs(normMacPricePercentage) > percentageContrastValue)
              return <span style={{ color: 'red' }}>{normMacPricePercentage}</span>;
            return normMacPricePercentage;
          },
        },
      ],
    },
  ];

  return columns;
};
