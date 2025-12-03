/*
 * @Author: SHUANG
 * @Date: 2024-01-10 17:06:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 10:54:30
 * @Description: 工程造价-工程量清单编制-分部分项目录
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-分部分项目录 查询
 * @Date: 2024-01-10 17:17:26
 */
export async function inventoryQueryTreeDirectory(data: TYPES.InventoryDirectoryQuery) {
  return request<FETCH.Res<TYPES.InventoryDirectoryItem>>('/product/inventory/queryTreeDirectory.action', {
    method: 'POST',
    data,
  });
}
