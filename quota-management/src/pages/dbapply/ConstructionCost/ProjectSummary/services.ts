/*
 * @Author: SHUANG
 * @Date: 2024-01-17 09:51:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-06 14:00:40
 * @Description: 工程造价-造价编制-项目汇总
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 项目汇总 查询
 * @Date: 2024-02-28 15:44:03
 */
export async function productSumStageQueryPageInfo(data: FETCH.Req<TYPES.ProjectSummaryQuery>) {
  return request<FETCH.Res<TYPES.ProjectSummaryItem>>('/product/sum/stage/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目汇总 新增空行
 * @Date: 2024-02-28 15:45:38
 */
export async function productSumStageSaveBlankRow(data: TYPES.ProjectSummaryQuery) {
  return request<FETCH.Res>('/product/sum/stage/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目汇总 行编辑
 * @Date: 2024-02-28 15:46:44
 */
export async function productSumStageUpdateRow(data: FETCH.CellEditReq, params?: TYPES.ProjectSummaryQuery) {
  return request<FETCH.Res>('/product/sum/stage/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目汇总 删除
 * @Date: 2024-02-28 15:47:03
 */
export async function productSumStageDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/sum/stage/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目汇总 选择项目汇总模板
 * @Date: 2024-02-28 15:47:31
 */
export async function insertProductStageByDirectoryId(
  data: TYPES.ProjectSummaryQuery & { directoryId: string },
) {
  return request<FETCH.Res>('/product/sum/stage/insertProductStageByDirectoryId.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目汇总 计算
 * @Date: 2024-03-06 13:51:18
 */
export async function productSumStageCalculateFee(data: TYPES.ProjectSummaryQuery) {
  return request<FETCH.Res>('/product/sum/other/calculateFee.action', {
    method: 'POST',
    data,
  });
}
