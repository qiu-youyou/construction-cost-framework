/*
 * @Author: SHUANG
 * @Date: 2022-08-18 15:46:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-25 11:14:56
 * @Description:
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 日志查询接口
 * @Date: 2022-08-18 15:52:27
 */
export async function logOperationQueryCurrentPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.OpLogListItem>>('/sys/log/operation/queryCurrentPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 日志维护删除
 * @Date: 2023-07-24 17:21:15
 */
export async function logOperationDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/log/operation/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
