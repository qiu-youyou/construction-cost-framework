import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 查询菜单树节点
 */
export async function menuQueryTreeNodeAll() {
  return request<FETCH.Res<TYPES.MenuListItem>>('/sys/menu/queryTreeNodeAll.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 更改菜单状态
 */
export async function menuUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/menu/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 删除菜单项
 */
export async function menuDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/menu/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 新增/修改 菜单项
 */
export async function menuSave(data: TYPES.MenuActionItem) {
  return request<FETCH.Res>('/sys/menu/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询菜单对应按钮权限
 */
export async function MenuBtnQueryPageInfo(data?: FETCH.Req<TYPES.AuthBtnListParams>) {
  return request<FETCH.Res<TYPES.AuthBtnListItem>>('/sys/menu/btn/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 更改按钮对应状态
 */
export async function menuBtnUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/menu/btn/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 删除按钮项
 */
export async function menuBtnDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/menu/btn/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 新增/修改 按钮项
 */
export async function menuBtnSave(data: TYPES.AuthBtnActionItem) {
  return request<FETCH.Res>('/sys/menu/btn/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 根据角色查询分配的菜单
 */
export async function menuQueryRoleTreeNodeAll(data?: FETCH.Req<TYPES.AuthBtnListParams>) {
  return request<FETCH.Res<TYPES.MenuListItem>>('/sys/menu/queryRoleTreeNodeAll.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 根据角色查询分配的菜单按钮
 */
export async function MenuBtnQueryRolePageInfo(data?: FETCH.Req<TYPES.AuthBtnListParams>) {
  return request<FETCH.Res<TYPES.AuthBtnListItem>>('/sys/menu/btn/queryRolePageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 默认权限生成
 * @Date: 2023-07-24 16:41:26
 */
export async function menuBtnInsertDefaultBtn(data: TYPES.AuthBtnListParams) {
  return request<FETCH.Res>('/sys/menu/btn/insertDefaultBtn.action', {
    method: 'POST',
    data,
  });
}
