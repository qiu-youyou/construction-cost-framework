/*
 * @Author: SHUANG
 * @Date: 2024-03-26 17:05:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-29 09:58:52
 * @Description: 工程造价-工程量清单编制-分部分项清单表 批量应用历史项目清单
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 批量应用历史清单查询 项目阶段
 * @Date: 2024-03-26 17:06:08
 */
export async function productQueryProductAndProject(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.ProjectSearchItem>>(
    '/business/product/project/product/queryProductAndProject.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 批量应用历史清单
 * @Date: 2024-03-27 14:27:19
 */
export async function productBatchInsertHistoryProjectInventory(
  data: TYPES.BatchInsertHistoryProjectInventoryParams,
) {
  return request<FETCH.Res>('/product/inventory/batchInsertHistoryProjectInventory.action', {
    method: 'POST',
    data,
  });
}
