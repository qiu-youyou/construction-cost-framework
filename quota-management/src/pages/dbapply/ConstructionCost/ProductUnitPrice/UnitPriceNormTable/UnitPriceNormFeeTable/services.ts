/*
 * @Author: SHUANG
 * @Date: 2024-03-12 17:40:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-12 17:51:34
 * @Description: 工程造价-工程量清单编制-定额 - 子目取费
 */
import { request } from 'umi';
import * as TYPES from './typings';
import { DbFeeDetailItem } from '@/pages/database/DbFee/DbFeeDetailTable/typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-定额 - 子目取费 查询
 * @Date: 2024-03-12 17:46:37
 */
export async function productUnitPriceNormFeeQueryPageInfo(data: FETCH.Req<TYPES.ProductNormFeeQuery>) {
  return request<FETCH.Res<DbFeeDetailItem>>('/product/unitprice/norm/fee/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-定额 - 子目取费 新增空行
 * @Date: 2024-03-12 17:47:55
 */
export async function productUnitPriceNormFeeSaveBlankRow(data: TYPES.ProductNormFeeQuery) {
  return request<FETCH.Res>('/product/unitprice/norm/fee/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-定额 - 子目取费 更新行
 * @Date: 2024-03-12 17:48:42
 */
export async function productUnitPriceNormFeeUpdateRow(
  data: FETCH.CellEditReq,
  params?: TYPES.ProductNormFeeQuery,
) {
  return request<FETCH.Res>('/product/unitprice/norm/fee/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-定额 - 子目取费 删除
 * @Date: 2024-03-12 17:50:58
 */
export async function productUnitPriceNormFeeDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/unitprice/norm/fee/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
