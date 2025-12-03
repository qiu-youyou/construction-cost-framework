/*
 * @Author: SHUANG
 * @Date: 2024-03-07 16:14:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-09 15:55:58
 * @Description: 工程造价-工程量清单编制-综合单价 定额
 */

import { request } from 'umi';
import * as TYPES from './typings';
/** 引用标准综合单价 定额 */
import { UnitPriceNormItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 查询
 * @Date: 2024-03-07 16:20:40
 */
export async function productUnitPriceNormQueryPageInfo(data: FETCH.Req<TYPES.ProductUnitPriceNormQuery>) {
  return request<FETCH.Res<UnitPriceNormItem>>('/product/unitprice/norm/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 - 新增
 * @Date: 2024-03-07 16:21:32
 */
export async function productUnitPriceNormSave(data: TYPES.ProductUnitPriceNormSave) {
  return request<FETCH.Res>('/product/unitprice/norm/insertByBasicNormIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 - 删除
 * @Date: 2024-03-07 16:24:09
 */
export async function productUnitPriceNormDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/unitprice/norm/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 - 行编辑
 * @Date: 2024-03-07 16:24:51
 */
export async function productUnitPriceNormUpdateRow(
  data: FETCH.CellEditReq,
  serviceParams?: TYPES.ProductUnitPriceNormQuery,
) {
  return request<FETCH.Res>('/product/unitprice/norm/updateRow.action', {
    method: 'POST',
    data: { ...data, ...serviceParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 - 批量设置取费类型
 * @Date: 2024-03-07 16:25:33
 */
export async function productUnitPriceNormUpdateBatchSetFee(data: TYPES.UpdateBatchSetFeeParams) {
  return request<FETCH.Res>('/product/unitprice/norm/updateBatchSetFee.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 - 批量修改系数
 * @Date: 2024-03-14 14:24:03
 */
export async function productUnitPriceNormUpdateBatchSetRate(data: TYPES.UpdateBatchSetRateParams) {
  return request<FETCH.Res>('/product/unitprice/norm/updateBatchSetRate.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 - 存入临时库
 * @Date: 2024-04-09 15:54:05
 */
export async function productUnitPriceNormUpdateDatabaseStatusByIds(
  data: TYPES.ProductUnitPriceNormQuery & { ids: string[] },
) {
  return request<FETCH.Res>('/product/unitprice/norm/updateDatabaseStatusByIds.action', {
    method: 'POST',
    data,
  });
}
