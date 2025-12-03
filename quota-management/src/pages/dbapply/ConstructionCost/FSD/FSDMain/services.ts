/*
 * @Author: SHUANG
 * @Date: 2024-04-16 11:16:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-16 13:55:44
 * @Description: 工程造价-风水电
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 查询
 * @Date: 2024-04-16 11:24:10
 */
export async function fsdQueryPageInfo(data: FETCH.Req<TYPES.FsdQuery>) {
  return request<FETCH.Res<TYPES.FsdItem>>('/product/fsd/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 新增空行
 * @Date: 2024-04-16 11:34:13
 */
export async function fsdSaveBlankRow(data: TYPES.FsdQuery) {
  return request<FETCH.Res>('/product/fsd/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 更新行
 * @Date: 2024-04-16 11:34:57
 */
export async function fsdUpdateRow(data: FETCH.CellEditReq, params?: TYPES.FsdQuery) {
  return request<FETCH.Res>('/product/fsd/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 删除
 * @Date: 2024-04-16 11:35:05
 */
export async function fsdDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/fsd/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
