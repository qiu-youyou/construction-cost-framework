/*
 * @Author: SHUANG
 * @Date: 2022-08-23 11:44:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-31 17:17:18
 * @Description:
 */
import { request } from 'umi';
import {
  CommitRejectTaskParams,
  CommitTaskPropsCheckParams,
  NextUserListItem,
  UserListQueryParams,
} from '../typing';

/**
 * @Author: SHUANG
 * @Description: 获取退回下一环节审核人 -超级管理员操作
 * @Date: 2022-09-01 15:36:57
 */
export async function getRejectUserBySuper(data: UserListQueryParams) {
  return request<FETCH.Res<NextUserListItem>>('/workflow/common/rejectTaskUser.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 退回操作
 * @Date: 2023-06-15 14:42:14
 */
export async function getRejectUser(commitUrl: string, data: UserListQueryParams) {
  return request<FETCH.Res<NextUserListItem>>(commitUrl + '/rejectTaskUser.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 退回
 * @Date: 2022-09-01 20:03:04
 */
export async function commitRejectTask(commitUrl: string, data: CommitRejectTaskParams) {
  return request<FETCH.Res>(commitUrl + '/commitRejectTask.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 退回
 * @Date: 2022-09-01 20:03:04
 */
export async function commitRejectTaskCheck(commitUrl: string, data: CommitTaskPropsCheckParams) {
  return request<FETCH.Res>(commitUrl + '/commitRejectTaskCheck.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 退回 超级管理员操作
 * @Date: 2023-03-17 17:42:11
 */
export async function commitRejectBySuper(commitUrl: string, data: CommitRejectTaskParams) {
  return request<FETCH.Res>('/workflow/task/rejectBySuper.action', {
    method: 'POST',
    data,
  });
}
