/*
 * @Author: SHUANG
 * @Date: 2024-04-03 14:56:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 16:39:09
 * @Description:  工程造价-工程量清单编制 审核
 */
import { request } from 'umi';
import * as TYPES from './typings';
import { InventoryItem } from '../typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制 审核标注
 * @Date: 2024-04-03 14:58:35
 */
export async function inventoryUpdateAuditRemarksByIds(data: FETCH.Req<TYPES.AuitRemarksParams>) {
  return request<FETCH.Res>('/product/inventory/updateAuditRemarksByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制 审核闭合
 * @Date: 2024-04-03 15:06:32
 */
export async function inventoryUpdateCloseAuditRemarksByIds(data: FETCH.Req<TYPES.AuitRemarksParams>) {
  return request<FETCH.Res>('/product/inventory/updateCloseAuditRemarksByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制 审核汇总
 * @Date: 2024-04-03 16:37:10
 */
export async function inventoryQueryAuditRemarksPageInfo(data: FETCH.Req<TYPES.AuitRemarksParams>) {
  return request<FETCH.Res<InventoryItem>>('/product/inventory/queryAuditRemarksPageInfo.action', {
    method: 'POST',
    data,
  });
}
