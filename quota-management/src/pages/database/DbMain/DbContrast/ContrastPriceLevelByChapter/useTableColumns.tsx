/*
 * @Author: SHUANG
 * @Date: 2023-11-08 15:21:39
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 18:29:07
 * @Description: 企业定额修编-造价水平对比-按章节
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbPriceLevelByChapterItem } from './typings';

/** 比例 */
const percentageContrastValue = 50;

const columns: TableColumnsDefine<DbPriceLevelByChapterItem> = [
  {
    title: '序号',
    dataIndex: 'showNumber',
    align: 'left',
    width: 115,
  },
  {
    title: '册章节编码',
    dataIndex: 'chapterCode',
    width: 120,
  },
  {
    title: '册章节名称',
    dataIndex: 'chapterName',
    width: 400,
  },
  {
    title: '基价水平差(%)',
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
    title: '人工费水平差(%)',
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
    title: '材料费水平差(%)',
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
    title: '机械费水平差(%)',
    dataIndex: 'normMacPricePercentage',
    valueType: 'digit',
    width: 85,
    customRender: (_, { normMacPricePercentage }) => {
      if (Math.abs(normMacPricePercentage) > percentageContrastValue)
        return <span style={{ color: 'red' }}>{normMacPricePercentage}</span>;
      return normMacPricePercentage;
    },
  },
];

export default columns;
