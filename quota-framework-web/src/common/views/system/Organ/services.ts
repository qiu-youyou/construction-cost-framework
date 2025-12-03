import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 查询组织机构树节点
 * @Date: 2023-08-01 10:39:36
 */
export async function orgQueryTreeNodeAll() {
  return request<FETCH.Res<TYPES.OrganListItem>>('/sys/org/queryTreeNodeAll.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 更改组织机构状态
 * @Date: 2023-08-01 10:39:47
 */
export async function orgUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/org/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 删除组织机构项
 * @Date: 2023-08-01 10:40:01
 */
export async function orgDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/org/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 新增/修改 组织机构项
 * @Date: 2023-08-01 10:40:35
 */
export async function orgSave(data: TYPES.OrgActionItem) {
  return request<FETCH.Res>('/sys/org/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询组织机构对应人员
 * @Date: 2023-08-01 10:40:53
 */
export async function orgUserQueryPageInfo(data?: FETCH.Req<TYPES.OrganUserListParams>) {
  return request<FETCH.Res<TYPES.OrganUserListItem>>('/sys/org/user/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 分配授权组织机构对应人员
 * @Date: 2023-08-01 10:41:08
 */
export async function orgUserSave(data: TYPES.OrgUserSaveParams) {
  return request<FETCH.Res>('/sys/org/user/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 取消授权组织机构对应人员
 * @Date: 2023-08-01 10:41:22
 */
export async function orgUserDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/org/user/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询组织机构对应角色
 * @Date: 2023-08-01 10:41:37
 */
export async function orgRoleQueryPageInfo(data?: FETCH.Req<TYPES.OrganRoleListParams>) {
  return request<FETCH.Res<TYPES.OrganRoleListItem>>('/sys/org/role/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 取消授权组织机构对应角色
 * @Date: 2023-08-01 10:42:09
 */
export async function orgRoleDeleteByIds(data?: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/org/role/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 分配授权组织机构对应角色
 * @Date: 2023-08-01 10:42:21
 */
export async function orgRoleSave(data?: TYPES.OrgRoleSaveParams) {
  return request<FETCH.Res>('/sys/org/role/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 组织机构维护公章查看
 * @Date: 2023-08-02 16:06:41
 */
export async function signatureQueryOne(data?: { businessType: 'ORG'; businessId: string }) {
  return request<FETCH.Row<{ signatureImage: string }>>('/sys/signature/queryOne.action', {
    method: 'POST',
    data,
  });
}
