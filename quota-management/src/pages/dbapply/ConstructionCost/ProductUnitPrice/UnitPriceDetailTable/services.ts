/*
 * @Author: SHUANG
 * @Date: 2024-03-07 10:15:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-19 10:18:19
 * @Description: 工程造价-工程量清单编制-综合单价
 */

import { request } from 'umi';
import * as TYPES from './typings';
/** 来自标准综合单价库 */
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 查询
 * @Date: 2024-03-07 10:16:11
 */
export async function productUnitPriceQueryPageInfo(data: FETCH.Req<TYPES.ProductUnitPriceQuery>) {
  return request<FETCH.Res<UnitPriceDetailItem>>('/product/unitprice/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 根据编号查询
 * @Date: 2024-03-15 14:28:19
 */
export async function productUnitPriceQueryPageInfoByCode(data: FETCH.Req<TYPES.ProductUnitPriceQuery>) {
  return request<FETCH.Res<UnitPriceDetailItem>>('/product/unitprice/queryPageInfoByCode.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 新增行
 * @Date: 2024-03-07 10:17:35
 */
export async function productUnitPriceSaveBlankRow(data: TYPES.ProductUnitPriceQuery) {
  return request<FETCH.Res>('/product/unitprice/saveBlankRow.action', {
    method: 'POST',
    data: { ...data },
  });
}
/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 编辑行
 * @Date: 2024-03-07 10:24:43
 */
export async function productUnitPriceUpdateRow(
  data: FETCH.CellEditReq,
  params?: TYPES.ProductUnitPriceQuery,
) {
  return request<FETCH.Res>('/product/unitprice/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 删除
 * @Date: 2024-03-07 10:26:59
 */
export async function productUnitPriceDelete(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/unitprice/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 标准库批量新增到项目库
 * @Date: 2024-03-07 10:29:15
 */
export async function productUnitPriceInsertByBasic(data: TYPES.ProductUnitPriceInsertByBasic) {
  return request<FETCH.Res>('/product/unitprice/insertByBasicIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 综合单价存入临时库
 * @Date: 2024-03-19 10:17:16
 */
export async function productUnitUpdateDatabaseStatusByIds(
  data: TYPES.ProductUnitPriceQuery & { ids: string[] },
) {
  return request<FETCH.Res>('/product/unitprice/updateDatabaseStatusByIds.action', {
    method: 'POST',
    data,
  });
}
