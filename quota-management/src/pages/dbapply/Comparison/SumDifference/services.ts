/*
 * @Author: SHUANG
 * @Date: 2024-03-21 10:43:27
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 11:09:21
 * @Description: 工程造价对比
 */
import { request } from 'umi';
import TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 分部分项汇总对比 查询/计算
 * @Date: 2024-03-21 10:49:17
 */
export async function sumSubitemQueryDifference(data: FETCH.Req<TYPES.DifferenceQuery>) {
  return request<FETCH.Row<TYPES.DifferenceData>>('/product/sum/subitem/queryDifference.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: WBS汇总对比 查询/计算
 * @Date: 2024-03-21 10:51:11
 */
export async function sumWbsQueryDifference(data: FETCH.Req<TYPES.DifferenceQuery>) {
  return request<FETCH.Row<TYPES.DifferenceData>>('/product/sum/wbs/queryDifference.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 指标对比 查询/计算
 * @Date: 2024-03-21 10:52:32
 */
export async function sumIndexQueryDifference(data: FETCH.Req<TYPES.DifferenceQuery>) {
  return request<FETCH.Row<TYPES.DifferenceData>>('/product/sum/index/queryDifference.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目汇总对比 查询/计算
 * @Date: 2024-03-21 10:54:28
 */
export async function sumStageQueryDifference(data: FETCH.Req<TYPES.DifferenceQuery>) {
  return request<FETCH.Row<TYPES.DifferenceData>>('/product/sum/stage/queryDifference.action', {
    method: 'POST',
    data,
  });
}
