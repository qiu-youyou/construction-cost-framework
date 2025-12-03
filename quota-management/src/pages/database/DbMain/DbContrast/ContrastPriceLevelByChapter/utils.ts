/*
 * @Author: SHUANG
 * @Date: 2023-11-10 16:07:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-13 11:32:12
 * @Description: 企业定额修编-价格差异对比
 */

import { divide, floor, multiply, subtract } from 'lodash';

import { DatabaseDbItem } from '../../DatabaseMain/typings';
import { DbPriceLevelByChapterItem } from './typings';

/**
 * @Author: SHUANG
 * @Description: 处理对比数据
 * 按照同样定额的人工费之和、材料费之和、机械费之和，进行定额基价水平的对比。
 * 差额比例过大的，以红色显示，起提醒作用。
 * 比例可配置，默认±50%
 * 按章节汇总定额人工费单价、材料费单价、机械费单价、基价，计算变化百分比，
 * 后面减前面如：2022《陆上风电场工程企业定额》 VS 2024《陆上风电场工程企业定额》，用2024年价格-2022年价格。
 * 并排除新增的、删除的，只计算新老册定额同时存在的。
 * @Date: 2023-11-10 16:08:13
 *
 * @name source 需要处理的数据源
 * @name contrastDb 对比的两个库
 */

export const handlePriceDifferenceData = (
  source: { [index: string]: DbPriceLevelByChapterItem[] },
  contrastDb?: DatabaseDbItem[],
) => {
  if (contrastDb?.length !== 2) return [];

  /** 明细字段 */
  const fieldObj = {
    normPrice: '', // 定额基价
    normManPrice: '', // 定额人工费
    normMatPrice: '', // 定额材料费
    normMacPrice: '', // 定额机械费
    id: '',
  };

  /** 计算差额的字段 计算比例 */
  const differenceFieldObj = {
    normPrice: '', // 定额基价
    normManPrice: '', // 定额人工费
    normMatPrice: '', // 定额材料费
    normMacPrice: '', // 定额机械费
  };

  /** main key */
  const frontMainId = contrastDb?.[0]?.id;
  const realMainId = contrastDb?.[1]?.id;

  if (!frontMainId || !realMainId) return [];
  /** 对比数据 */
  const contrastData: DbPriceLevelByChapterItem[] = new Array(source[frontMainId]?.length);

  for (let index = 0; index < contrastData?.length; index++) {
    const frontItem: any = source[frontMainId]?.[index];
    const realItem: any = source[realMainId]?.[index];

    /** 合并属性 */

    const dataObj: any = {};
    for (const key in fieldObj) {
      dataObj[key + 'Front'] = frontItem?.[key] || 0;
      dataObj[key + 'Real'] = realItem?.[key] || 0;
    }

    /* 计算差额及比例 */
    for (const key in differenceFieldObj) {
      const frontPrice = Number(dataObj[key + 'Front']);
      const realPrice = Number(dataObj[key + 'Real']);

      /** B - A */
      dataObj[key + 'Difference'] = floor(subtract(realPrice, frontPrice), 2);

      // (B - A) / A
      if (frontPrice == 0) {
        dataObj[key + 'Percent'] = 0;
      } else {
        const divideRes = divide(dataObj[key + 'Difference'] || 0, frontPrice);
        dataObj[key + 'Percent'] = floor(multiply(divideRes || 0, 100), 2);
      }
    }

    dataObj.id = frontItem.id;
    dataObj.chapterCode = frontItem.chapterCode;
    dataObj.chapterName = frontItem.chapterName;

    contrastData[index] = dataObj;
  }

  return contrastData;
};
