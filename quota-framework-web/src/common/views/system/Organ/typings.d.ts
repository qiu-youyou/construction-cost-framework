/*
 * @Author: SHUANG
 * @Date: 2022-06-16 14:51:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-16 09:15:31
 * @Description:
 */

import { RoleListItem } from '../Role/typings';
import { UserListItem } from '../User/typings';

/** 组织机构项 */
export type OrganListItem = {
  children: OrganListItem[];
  billDatetime: string;
  billSort: string;
  billStatus: string;
  id: string;
  orgCode: string;
  orgLevel: number;
  orgName: string;
  orgShow: string;
  orgType: string;
  parentId: string;
  signature: string;
};

/** 新增修改组织机构 */
export type OrgActionItem = {
  parentId: string; // 父节点ID
  orgName: string; // 组织机构名称
  orgCode: string; // 组织机构代码
  orgType: string; // 详情请查阅字典
  orgShow?: string; // 显示、不显示 默认显示
  id?: string; // ID,更新时必填、新增时不填
};

/** 查询组织机构对应人员 */
export type OrganUserListParams = { orgId: string };

/** 查询组织组织机构对应角色列表 */
export type OrganRoleListParams = OrganUserListParams;

/** 分配人员到机构保存 */
export type OrgUserSaveParams = {
  orgId: string; // 组织机构ID
  'userIds[]': string[]; // 用户ID
};

/** 织机构对应人员授权列表项 同 User 表 */
export type OrganUserListItem = UserListItem;

/** 组织机构对应角色列表项 同 角色表 */
export type OrganRoleListItem = RoleListItem;

/** 分配到机构保存 */
export type OrgRoleSaveParams = {
  orgId: string; // 组织机构ID
  'roleIds[]': string[]; // 用户ID
};
