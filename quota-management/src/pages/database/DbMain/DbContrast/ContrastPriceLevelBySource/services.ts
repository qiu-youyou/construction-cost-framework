/*
 * @Author: SHUANG
 * @Date: 2023-11-13 13:48:07
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 11:44:47
 * @Description: 企业定额修编-定额造价水平对比-与来源库对比
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 定额造价水平对比-与来源库对比-定额
 * @Date: 2023-11-13 13:51:05
 */
export async function normQueryCurrentAndSourcePriceContrast(
  data?: FETCH.Req<TYPES.DbPriceLevelBySourceQuery>,
) {
  return request<FETCH.Res<TYPES.DbPriceLevelBySourceNormItem>>(
    '/business/database/db/norm/queryCurrentAndSourcePriceContrast.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 定额造价水平对比-与来源库对比-材料
 * @Date: 2023-11-13 13:51:41
 */
export async function matQueryCurrentAndSourcePriceContrast(
  data?: FETCH.Req<TYPES.DbPriceLevelBySourceQuery>,
) {
  return request<FETCH.Res<TYPES.DbPriceLevelBySourceMatItem>>(
    '/business/database/db/mat/classify/detail/queryCurrentAndSourcePriceContrast.action',
    {
      method: 'POST',
      data,
    },
  );
}
