/*
 * @Author: SHUANG
 * @Date: 2024-01-18 11:45:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 17:23:05
 * @Description: 工程造价-造价编制-WBS汇总
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-造价编制-WBS汇总 查询
 * @Date: 2024-02-05 17:21:38
 */
export async function productSumWbsQueryTreeNodeAll(data: FETCH.Req<TYPES.WbsSummaryQuery>) {
  return request<FETCH.Res<TYPES.WbsSummaryItem>>('/product/sum/wbs/queryTreeNodeAll.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-造价编制-WBS汇总 计算
 * @Date: 2024-02-05 17:22:05
 */
export async function productSumWbsCalculate(data: TYPES.WbsSummaryQuery) {
  return request<FETCH.Res>('/product/sum/wbs/insertByProjectId.action', {
    method: 'POST',
    data,
  });
}
