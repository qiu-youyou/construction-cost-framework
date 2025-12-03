/*
 * @Author: SHUANG
 * @Date: 2024-01-31 10:44:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-04 17:28:27
 * @Description: 工程造价产品-产品信息
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价产品-产品信息 查询产品信息
 * @Date: 2024-01-31 10:45:23
 */
export async function projectProductQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.ProductItem>>('/business/product/project/product/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价产品-产品信息 保存产品信息
 * @Date: 2024-01-31 10:53:16
 */
export async function projectProductSave(data: TYPES.ProductSaveParams) {
  return request<FETCH.Res>('/business/product/project/product/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价产品-产品信息 删除产品
 * @Date: 2024-01-31 10:55:33
 */
export async function projectProductDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/product/project/product/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 复制产品
 * @Date: 2024-02-04 16:41:43
 */
export async function projectProductCopy(data: TYPES.ProductCopyParams) {
  return request<FETCH.Res>('/business/product/project/product/copyId.action', {
    method: 'POST',
    data,
  });
}
