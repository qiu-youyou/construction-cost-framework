/*
 * @Author: SHUANG
 * @Date: 2023-04-23 09:07:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-31 11:03:03
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 查询用户列表
 * @Date: 2023-08-01 15:59:01
 */
export async function userQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.UserListItem>>('/sys/user/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description:用户新增/修改
 */
export async function userSave(data: TYPES.UserActionItem) {
  return request<FETCH.Res>('/sys/user/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 用户批量修改状态
 * @Date: 2023-08-01 15:59:21
 */
export async function userUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/user/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 用户批量删除
 * @Date: 2023-08-01 16:00:05
 */
export async function userDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/user/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查看用户组织机构
 * @Date: 2023-09-14 15:20:56
 */
export async function queryOrgInfoByUserId(data: { id: string }) {
  return request<FETCH.Res>('/sys/user/queryOrgInfoByUserId.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查看用户角色
 * @Date: 2023-09-14 15:20:58
 */
export async function queryRoleInfoByUserId(data: { id: string }) {
  return request<FETCH.Res>('/sys/user/queryRoleInfoByUserId.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 人员查询@接口，通知和转办都使用
 * @Date: 2022-10-20 17:17:11
 */
export async function sysNoticeUserSearch(name: string) {
  return request<FETCH.Res<{ userName: string; userRealname: string }>>('/sys/user/search.action', {
    method: 'POST',
    data: { name },
  });
}

/**
 * @Author: SHUANG
 * @Description: 重置密码随机
 * @Date: 2023-10-13 10:24:48
 */
export async function sysUserResetPwd(id: string) {
  return request<FETCH.Row>('/sys/user/resetPwd.action', {
    method: 'POST',
    data: { id },
  });
}

/**
 * @Author: SHUANG
 * @Description: 重置密码默认
 * @Date: 2024-01-31 11:03:01
 */
export async function sysUserResetPwdByInit(id: string) {
  return request<FETCH.Row>('/sys/user/resetPwdByInit.action', {
    method: 'POST',
    data: { id },
  });
}
