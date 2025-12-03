/*
 * @Author: SHUANG
 * @Date: 2022-08-23 11:44:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-31 17:17:15
 * @Description:
 */
import { request } from 'umi';
import { CommitRejectTaskParams, NextUserListItem, UserListQueryParams } from '../typing';

/**
 * @Author: SHUANG
 * @Description: 获取驳回下一环节审核人
 * @Date: 2022-09-01 15:36:57
 */
export async function getRejectUser(data: UserListQueryParams) {
  return request<FETCH.Res<NextUserListItem>>('/workflow/common/rejectTaskUser.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 驳回
 * @Date: 2022-09-01 20:03:04
 */
export async function commitRejectTask(commitUrl: string, data: CommitRejectTaskParams) {
  return request<FETCH.Res>(commitUrl + '/publishTaskReject.action', {
    method: 'POST',
    data,
  });
}
