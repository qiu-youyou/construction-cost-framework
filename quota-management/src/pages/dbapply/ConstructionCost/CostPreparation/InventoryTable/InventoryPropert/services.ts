/*
 * @Author: SHUANG
 * @Date: 2024-01-11 14:39:46
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 14:34:49
 * @Description: 工程造价-工程量清单编制-分部分项清单表 项目特征
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 项目特征 查询
 * @Date: 2024-02-27 14:25:24
 */
export async function inventoryPropertQueryPageInfo(data: FETCH.Req<TYPES.InventoryPropertQuery>) {
  return request<FETCH.Res<TYPES.InventoryPropertItem>>('/product/inventory/propert/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目特征 批量设置
 * @Date: 2024-02-27 14:30:07
 */
export async function inventoryPropertSave(data: TYPES.InventoryPropertQuery) {
  return request<FETCH.Res>('/product/inventory/propert/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目特征 行编辑
 * @Date: 2024-02-27 14:35:06
 */
export async function inventoryPropertUpdateRow(data: FETCH.CellEditReq) {
  return request<FETCH.Res>('/product/inventory/propert/updateRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目特征 删除
 * @Date: 2024-02-28 15:20:48
 */
export async function inventoryPropertDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/inventory/propert/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
