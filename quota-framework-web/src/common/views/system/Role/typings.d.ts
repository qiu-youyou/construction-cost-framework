/*
 * @Author: SHUANG
 * @Date: 2023-07-11 16:10:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-25 15:01:17
 * @Description:
 */
/*
 * @Author: SHUANG
 * @Date: 2022-06-16 14:51:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2022-09-15 17:59:02
 * @Description:
 */

/** 角色列表项 */
export type RoleListItem = {
  id: string;
  billStatus: number; //	状态：3启用、4禁用
  roleName: string; //	角色名称
  roleType: number; //	角色类型
  roleCode: string; //	角色编码
  roleRemarks: string; //	角色描述
  selectListDisable: number; //	非 0 表示继承
};

/** 新增修改角色项 */
export type RoleActionItem = {
  id?: string; // id
  roleName: string; // 角色名称
  roleCode: string; // 角色编码
  roleType?: number; // 角色类型
  roleRemarks?: string; // 角色描述
};

/** 菜单和按钮权限分配 参数 */
export type MenuBtnSaveParams = {
  'add.menuId[]'?: string[]; // 菜单ID
  'add.menuBtnId[]'?: string[]; // 按钮ID
  'del[]'?: string[]; // 删除-菜单ID、菜单按钮ID
  'auth.menuId[]'?: string[];
  'auth.auth[]'?: number[];
  roleId: string; // 角色ID
};
