/*
 * @Author: SHUANG
 * @Date: 2022-09-03 09:47:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-15 17:54:28
 * @Description:
 */

import { request } from 'umi';
import { UserListQueryParamsPate } from '../typing';

/**
 * @Author: SHUANG
 * @Description: 表单详情页查看显示审批
 * @Date: 2022-09-03 16:19:46
 * 参考流程提交获取人员时参数
 */
export async function analysisWorkflow(commitUrl: string, data: UserListQueryParamsPate) {
  return request<FETCH.Row>(commitUrl + '/analysisWorkflowXml.action', {
    method: 'POST',
    data,
  });
}
