/*
 * @Author: SHUANG
 * @Date: 2023-01-09 11:52:47
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-16 15:08:43
 * @Description:
 */

import { request } from 'umi';

export type AbandonWorkflowParams = {
  businessId: string; // 业务主单据ID
  processInstanceId: string; // 工作流实例ID
  abandonMessage: string; // 废弃原因
  billStatus: string;
};

/**
 * @Author: SHUANG
 * @Description: 业务作废接口
 * @Date: 2023-01-09 11:53:16
 */
export async function abandonWorkflow(commitUrl: string, data: AbandonWorkflowParams) {
  return request<FETCH.Res>(commitUrl + '/abandonWorkflow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 管理员作废单据
 * @Date: 2023-03-20 09:45:48
 */
export async function abandonWorkflowBySuper(commitUrl: string, data: AbandonWorkflowParams) {
  return request<FETCH.Res>(commitUrl + '/abandonWorkflowBySuper.action', {
    method: 'POST',
    data,
  });
}
