/*
 * @Author: SHUANG
 * @Date: 2023-11-08 15:21:39
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-27 18:27:14
 * @Description:  企业定额修编-价格差异对比
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbNormPriceDifferenceItem } from './typings';

import { Typography } from 'antd';
const { Text } = Typography;

type Props = { dbInfo?: { current?: string; source?: string } };

export default ({ dbInfo }: Props) => {
  /** 比例 */
  const percentageContrastValue = 50;

  const columns: TableColumnsDefine<DbNormPriceDifferenceItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 55,
    },
    {
      title: '定额编码',
      dataIndex: 'normCode',
      align: 'center',
      width: 100,
    },

    {
      title: `${dbInfo?.current || ''}`,
      children: [
        {
          title: '定额名称',
          dataIndex: 'currentNormName',
          width: 220,
          ellipsis: false,
          customRender: (_, { currentNormName, currentCompleteNormName }) => {
            const finalRender = (currentNormName || '') + ' ' + (currentCompleteNormName || '');
            return <Text ellipsis={{ tooltip: finalRender }}>{finalRender}</Text>;
          },
        },
        {
          title: '单位',
          dataIndex: 'currentNormUnit',
          valueType: 'select',
          valueEnum: {},
          width: 75,
        },
        {
          title: '基价(元)',
          dataIndex: 'currentNormPrice',
          valueType: 'digit',
        },
        {
          title: '人工费(元)',
          dataIndex: 'currentNormManPrice',
          valueType: 'digit',
        },
        {
          title: '材料费(元)',
          dataIndex: 'currentNormMatPrice',
          valueType: 'digit',
        },
        {
          title: '机械费(元)',
          dataIndex: 'currentNormMacPrice',
          valueType: 'digit',
        },
      ],
    },

    {
      title: `${dbInfo?.source || ''}`,
      children: [
        {
          title: '定额名称',
          dataIndex: 'sourceNormName',
          width: 220,
          ellipsis: false,
          customRender: (_, { sourceNormName, sourceCompleteNormName }) => {
            const finalRender = (sourceNormName || '') + ' ' + (sourceCompleteNormName || '');
            return <Text ellipsis={{ tooltip: finalRender }}>{finalRender}</Text>;
          },
        },
        {
          title: '单位',
          dataIndex: 'sourceNormUnit',
          valueType: 'select',
          valueEnum: {},
          width: 75,
        },
        {
          title: '基价(元)',
          dataIndex: 'sourceNormPrice',
          valueType: 'digit',
        },
        {
          title: '人工费(元)',
          dataIndex: 'sourceNormManPrice',
          valueType: 'digit',
        },
        {
          title: '材料费(元)',
          dataIndex: 'sourceNormMatPrice',
          valueType: 'digit',
        },
        {
          title: '机械费(元)',
          dataIndex: 'sourceNormMacPrice',
          valueType: 'digit',
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
        },
        {
          title: '人工费(元)',
          dataIndex: 'normManPriceDifference',
          valueType: 'digit',
        },
        {
          title: '材料费(元)',
          dataIndex: 'normMatPriceDifference',
          valueType: 'digit',
        },
        {
          title: '机械费(元)',
          dataIndex: 'normMacPriceDifference',
          valueType: 'digit',
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
