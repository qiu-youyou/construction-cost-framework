/*
 * @Author: SHUANG
 * @Date: 2022-09-03 09:47:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-03 11:28:57
 * @Description:
 */

import { request } from 'umi';
import { ButtonAuth, UserListQueryParamsPate } from './typing';

/**
 * @Author: SHUANG
 * @Description: 查询按钮权限
 * @Date: 2022-09-03 09:48:23
 */
export async function workflowCommonGetToolbarAuth(
  commitUrl: string,
  data: UserListQueryParamsPate & { businessId?: string },
) {
  return request<FETCH.Row<ButtonAuth>>(commitUrl + '/getToolbarPower.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询当前模块的 WorkFlowkey
 * @Date: 2022-11-01 19:12:16
 */
export async function workflowQueryWorkFlowKey(commitUrl: string) {
  return request<FETCH.Row<string>>(commitUrl + '/queryWorkFlowKey.action', {
    method: 'POST',
  });
}
