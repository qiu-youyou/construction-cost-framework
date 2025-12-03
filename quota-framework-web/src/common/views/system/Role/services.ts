/*
 * @Author: SHUANG
 * @Date: 2022-08-21 09:56:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2022-09-15 17:53:59
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 查询角色列表
 */
export async function roleQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.RoleListItem>>('/sys/role/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 角色批量修改状态
 */
export async function roleUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/role/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 角色批量删除
 */
export async function roleDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/role/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 角色新增/修改
 */
export async function roleSave(data: TYPES.RoleActionItem) {
  return request<FETCH.Res>('/sys/role/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 菜单和按钮权限分配
 */
export async function menuBtnSave(data?: TYPES.MenuBtnSaveParams) {
  return request<FETCH.Res>('/sys/role/menu/btn/save.action', {
    method: 'POST',
    data,
  });
}

/**·
 * @Author: SHUANG
 * @Description: 分配数据权限-查询菜单树
 * @Date: 2022-08-18 10:26:20
 */
export async function queryRoleTreeNodeAllAuth(data: { roleId: string }) {
  return request<FETCH.Res>('/sys/menu/queryRoleTreeNodeAllAuth.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 分配数据权限-查询数据权限
 * @Date: 2022-08-18 10:23:22
 */
export async function roleToBranchMenusData(data: { roleId: string }) {
  return request<FETCH.Res>('/sys/role/toBranchMenusData.action', {
    method: 'POST',
    data,
  });
}
