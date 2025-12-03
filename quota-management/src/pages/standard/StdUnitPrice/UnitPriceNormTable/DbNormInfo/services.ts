/*
 * @Author: SHUANG
 * @Date: 2023-11-16 15:55:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-08 13:48:06
 * @Description: 标准综合单价库 - 清单定额 - 清单定额信息
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单定额 - 清单定额信息 人材机查询
 * @Date: 2023-11-16 15:57:02
 */
export async function unitPriceMatQueryTreeAll(data: TYPES.UnitPriceNormMatQuery) {
  return request<FETCH.Res<TYPES.UnitPriceNormMatItem>>(
    '/business/database/standard/comprehensive/unit/price/mat/queryTreeAll.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单定额 - 清单定额信息 参数查询
 * @Date: 2023-11-16 15:57:02
 */
export async function unitPriceParamsQueryPageInfo(data: FETCH.Req<TYPES.UnitPriceNormMatQuery>) {
  return request<FETCH.Res<TYPES.UnitPriceNormParamsItem>>(
    '/business/database/standard/comprehensive/unit/price/params/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单定额 - 清单定额信息 人材机行编辑
 * @Date: 2024-02-26 16:55:59
 */
export async function unitPriceMatUpdateRow(data: FETCH.CellEditReq) {
  return request<FETCH.Res>('/business/database/standard/comprehensive/unit/price/mat/updateRow.action', {
    method: 'POST',
    data,
  });
}
