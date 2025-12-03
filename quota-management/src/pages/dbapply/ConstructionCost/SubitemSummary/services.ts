/*
 * @Author: SHUANG
 * @Date: 2024-01-18 11:54:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 16:44:24
 * @Description: 工程造价-造价编制-分部分项汇总
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-造价编制-分部分项汇总 查询
 * @Date: 2024-02-05 16:42:38
 */
export async function productSumSubitemQueryPageInfo(data: FETCH.Req<TYPES.SubitemSummaryQuery>) {
  return request<FETCH.Res<TYPES.SubitemSummaryItem>>('/product/sum/subitem/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-造价编制-分部分项汇总 计算
 * @Date: 2024-02-05 16:43:54
 */
export async function productSumSubitemCalculate(data: TYPES.SubitemSummaryQuery) {
  return request<FETCH.Res>('/product/sum/subitem/insertByProjectId.action', {
    method: 'POST',
    data,
  });
}
