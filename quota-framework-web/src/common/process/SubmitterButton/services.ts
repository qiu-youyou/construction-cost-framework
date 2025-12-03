/*
 * @Author: SHUANG
 * @Date: 2022-08-23 11:44:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-31 17:17:24
 * @Description:
 */
import { request } from 'umi';
import { CommitCompleteTaskParams, NextUserListItem, UserListQueryParamsPate } from '../typing';

/**
 * @Author: SHUANG
 * @Description: 获取下一环节审核人
 * @Date: 2022-09-01 15:36:57
 */
export async function getNextUser(data: UserListQueryParamsPate) {
  return request<FETCH.Res<NextUserListItem>>('/workflow/common/getNextUser.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 提交
 * @Date: 2022-09-01 20:03:04
 */
export async function commitCompleteTask(commitUrl: string, data: CommitCompleteTaskParams) {
  return request<FETCH.Res>(commitUrl + '/commitCompleteTask.action', {
    method: 'POST',
    data,
  });
}
