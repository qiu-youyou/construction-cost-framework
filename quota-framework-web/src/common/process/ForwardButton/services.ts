/*
 * @Author: SHUANG
 * @Date: 2022-08-23 11:44:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-31 17:17:09
 * @Description:
 */
import { request } from 'umi';

export type ForwardTaskByUserParams = {
  processInstanceId: string; // 表单流程实例ID
  workflowKey: string; // key
  userInfo?: string; // 转办人员
  content?: string; // key
};

/**
 * @Author: SHUANG
 * @Description: 转办任务接口
 * @Date: 2022-10-20 19:14:17
 */
export async function forwardTaskByUser(data: ForwardTaskByUserParams) {
  return request<FETCH.Res>('/workflow/task/forwardTaskByUser.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 超级管理员转办
 * @Date: 2023-03-17 17:38:00
 */
export async function forwardTaskSuperByUser(data: ForwardTaskByUserParams) {
  return request<FETCH.Res>('/workflow/task/forwardTaskSuperByUser.action', {
    method: 'POST',
    data,
  });
}
