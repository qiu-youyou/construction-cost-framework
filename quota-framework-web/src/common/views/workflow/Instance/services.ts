/*
 * @Author: SHUANG
 * @Date: 2023-07-25 17:57:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-16 14:16:25
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 流程实例维护查询
 * @Date: 2023-08-02 17:46:21
 */
export async function queryListInstance(data?: FETCH.Req) {
  let fetchParams: any = { ...data };
  if (!!fetchParams?.searchParams) {
    fetchParams = { ...fetchParams, ...JSON.parse(data?.searchParams) };
    delete fetchParams.searchParams;
  }
  return request<FETCH.Res<TYPES.InstanceListItem>>('/workflow/instance/listInstance.action', {
    method: 'POST',
    data: fetchParams,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询审批历史
 */
export async function queryCommentList(data?: FETCH.Req<{ processInstanceId: string }>) {
  return request<FETCH.Res<TYPES.InstanceListItem>>('/workflow/comment/queryCommentList.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 流程实例维护挂起
 * @Date: 2023-08-02 17:47:01
 */
export async function suspendInstance(data?: { ids: string[] }) {
  return request<FETCH.Res<TYPES.InstanceListItem>>('/workflow/instance/suspendInstance.action', {
    method: 'POST',
    data: { processInstanceIds: data?.ids },
  });
}

/**
 * @Author: SHUANG
 * @Description: 流程实例维护激活
 * @Date: 2023-08-02 17:48:57
 */
export async function activateInstance(data?: { ids: string[] }) {
  return request<FETCH.Res<TYPES.InstanceListItem>>('/workflow/instance/activateInstance.action', {
    method: 'POST',
    data: { processInstanceIds: data?.ids },
  });
}

/**
 * @Author: SHUANG
 * @Description: 流程实例维护终止
 * @Date: 2023-08-02 17:49:34
 */
export async function endInstance(data?: { ids: string[] }) {
  return request<FETCH.Res<TYPES.InstanceListItem>>('/workflow/instance/endInstance.action', {
    method: 'POST',
    data: { processInstanceIds: data?.ids },
  });
}
