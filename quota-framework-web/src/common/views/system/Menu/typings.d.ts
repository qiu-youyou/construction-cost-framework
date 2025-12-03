/*
 * @Author: SHUANG
 * @Date: 2022-06-16 14:51:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2022-09-05 16:41:43
 * @Description:
 */

/** 菜单项 */
export type MenuListItem = {
  billSort: number;
  billStatus: string;
  children: MenuListItem[];
  createMan: string;
  createManId: string;
  id: string;
  menuIcon: string;
  menuKey: string;
  menuLevel: number;
  menuName: string;
  menuRoute: string;
  parentId: string;
  updateDatetime: string;
  updateMan: string;
  updateManId: string;
  key: string;
  dataAuthority: string | number;
};

/** 查询对应按钮 */
export type AuthBtnListParams = {
  roleId?: string;
  businessId?: string;
};

/** 权限列表项目 */
export type AuthBtnListItem = {
  id: string;
  billSort: string;
  billDatetime: string;
  billStatus: string;
  businessId: string;
  lable: string;
  value: string;
  checked: boolean;
  roleMenuBtnId: string;
};

/** 新增修改菜单 */
export type MenuActionItem = {
  parentId: string; //	菜单父亲节点ID，不填默认为0
  menuName: string; //	菜单名称
  menuKey: string; //	菜单key，具有唯一性，不允许重复
  menuIcon?: string; //	菜单图标
  menuRoute: string; //	菜单路由
  menuUrl?: string; //	外部链接
  menuShow?: string; //	是否显示菜单c
  menuLevel?: number; // 菜单层级，不填会根据parentId计算层级,从0级开始
  id?: string; // 菜单id
};

/** 新增修改菜单按钮 */
export type AuthBtnActionItem = {
  id?: string; // 菜单按钮id
  businessId: string; //	菜单id，不能为空
  lable: string; //	权限中文名
  value: string; //	权限英文名
  billSort: string; // 排序
};
