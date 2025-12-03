/*
 * @Author: SHUANG
 * @Date: 2023-05-10 17:46:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-05-16 16:23:39
 * @Description: 答复流程
 */
import { request } from 'umi';
import type * as TYPES from './typing';

/**
 * @Author: SHUANG
 * @Description: 答复流程列表查询
 * @Date: 2023-05-10 17:47:15
 */
export async function sysAnswerQueryPageInfo(data: TYPES.SysAnswerQuery) {
  return request<FETCH.Res<TYPES.SysAnswerListItem>>('/sys/answer/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 答复流程首页列表查询
 * @Date: 2023-05-10 17:47:56
 */
export async function sysAnswerQueryPageInfoByIndex(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.SysAnswerListItem>>('/sys/answer/queryPageInfoByIndex.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 新建、回复
 * @Date: 2023-05-10 17:48:35
 */
export async function sysAnswerSave(data: TYPES.SysAnswerParams) {
  return request<FETCH.Res>('/sys/answer/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 关闭 答复流程
 * @Date: 2023-05-16 16:22:37
 */
export async function sysAnswerClose(id: string) {
  return request<FETCH.Res>('/sys/answer/close.action', {
    method: 'POST',
    data: { id },
  });
}
