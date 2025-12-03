/*
 * @Author: SHUANG
 * @Date: 2024-01-17 09:51:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-06 11:57:45
 * @Description: 工程造价-造价编制-其他费用汇总
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 其他费用汇总 查询
 * @Date: 2024-02-28 10:20:24
 */
export async function productSumOtherQueryPageInfo(data: FETCH.Req<TYPES.OtherSummaryQuery>) {
  return request<FETCH.Res<TYPES.OtherSummaryItem>>('/product/sum/other/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 其他费用汇总 新增空行
 * @Date: 2024-02-28 10:24:17
 */
export async function productSumOtherSaveBlankRow(data: TYPES.OtherSummaryQuery) {
  return request<FETCH.Res>('/product/sum/other/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 其他费用汇总 行编辑
 * @Date: 2024-02-28 10:28:39
 */
export async function productSumOtherUpdateRow(data: FETCH.CellEditReq, params?: TYPES.OtherSummaryQuery) {
  return request<FETCH.Res>('/product/sum/other/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 其他费用汇总 删除
 * @Date: 2024-02-28 10:30:54
 */
export async function productSumOtherDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/sum/other/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 其他费用汇总 选择其他费用模版
 * @Date: 2024-02-28 10:34:16
 */
export async function insertProductOtherSumByDirectoryId(
  data: TYPES.OtherSummaryQuery & { directoryId: string },
) {
  return request<FETCH.Res>('/product/sum/other/insertProductOtherSumByDirectoryId.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 其他费用汇总 计算
 * @Date: 2024-03-06 11:57:44
 */
export async function productSumOtherCalculateFee(data: TYPES.OtherSummaryQuery) {
  return request<FETCH.Res>('/product/sum/other/calculateFee.action', {
    method: 'POST',
    data,
  });
}
