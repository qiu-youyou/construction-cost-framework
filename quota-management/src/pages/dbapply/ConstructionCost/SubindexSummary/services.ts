/*
 * @Author: SHUANG
 * @Date: 2024-01-18 09:52:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 17:36:09
 * @Description: 工程造价-造价编制-工程量指标汇总
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-造价编制-工程量指标汇总 查询
 * @Date: 2024-02-05 17:34:52
 */

export async function productSumSubindexQueryPageInfo(data: FETCH.Req<TYPES.SubindexSummaryQuery>) {
  return request<FETCH.Res<TYPES.SubindexSummaryItem>>('/product/sum/index/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-造价编制-工程量指标汇总 计算
 * @Date: 2024-02-05 17:34:52
 */

export async function productSumSubindexCalculate(data: TYPES.SubindexSummaryQuery) {
  return request<FETCH.Res>('/product/sum/index/insertByProjectId.action', {
    method: 'POST',
    data,
  });
}
