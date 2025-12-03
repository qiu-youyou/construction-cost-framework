/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:15:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-16 18:18:54
 * @Description: 标准综合单价库 - 清单定额 - 子目取费
 */
import { request } from 'umi';
import * as TYPES from './typings';
import { DbFeeDetailItem } from '@/pages/database/DbFee/DbFeeDetailTable/typings';

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单定额 - 子目取费 查询
 * @Date: 2023-11-16 18:18:30
 */
export async function unitPriceFeeQueryPageInfo(data: FETCH.Req<TYPES.UnitPriceNormFeeQuery>) {
  return request<FETCH.Res<DbFeeDetailItem>>(
    '/business/database/standard/comprehensive/unit/price/fee/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}
