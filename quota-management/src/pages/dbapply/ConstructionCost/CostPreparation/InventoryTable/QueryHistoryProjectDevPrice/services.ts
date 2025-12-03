/*
 * @Author: SHUANG
 * @Date: 2024-03-27 15:58:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-01 17:10:23
 * @Description: 工程造价-工程量清单编制-分部分项清单表 查询历史项目设备价格
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 查询历史项目设备价格
 * @Date: 2024-03-27 16:01:44
 */
export async function inventoryQueryHistoryProjectDevPrice(data: FETCH.Req<TYPES.HistoryDevPriceQuery>) {
  return request<FETCH.Row>('/product/inventory/queryHistoryProjectDevPrice.action', {
    method: 'POST',
    data,
  });
}
