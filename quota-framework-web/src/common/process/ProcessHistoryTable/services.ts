/*
 * @Author: SHUANG
 * @Date: 2022-09-04 14:37:49
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-22 14:32:27
 * @Description:
 */
import { request } from 'umi';

export interface QueryCommentParams {
  processInstanceId?: string; // 流程实例ID
}

export async function queryCommentList(data: QueryCommentParams) {
  return request<FETCH.Res>('/workflow/comment/queryCommentList.action', {
    method: 'POST',
    data,
  });
}
