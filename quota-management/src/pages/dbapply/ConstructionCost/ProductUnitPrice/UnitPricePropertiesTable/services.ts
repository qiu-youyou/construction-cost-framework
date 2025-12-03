/*
 * @Author: SHUANG
 * @Date: 2024-03-19 15:44:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-19 16:02:58
 * @Description: 工程造价-工程量清单编制-综合单价 清单特征
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 清单特征 查询
 * @Date: 2024-03-19 15:54:52
 */
export async function productUnitPricePropertiesQueryPageInfo(
  data: FETCH.Req<TYPES.ProductUnitPricePropertiesQuery>,
) {
  return request<FETCH.Res<TYPES.ProductUnitPricePropertiesItem>>(
    '/product/unitprice/property/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 清单特征 新增
 * @Date: 2024-03-19 16:01:24
 */
export async function productUnitPricePropertiesSaveBlankRow(data: TYPES.ProductUnitPricePropertiesQuery) {
  return request<FETCH.Res>('/product/unitprice/property/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 清单特征 行编辑
 * @Date: 2024-03-19 16:02:03
 */
export async function productUnitPricePropertiesUpdateRow(
  data: FETCH.CellEditReq,
  params?: TYPES.ProductUnitPricePropertiesQuery,
) {
  return request<FETCH.Res>('/product/unitprice/property/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 清单特征 删除
 * @Date: 2024-03-19 16:02:49
 */
export async function productUnitPricePropertiesDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/unitprice/property/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
