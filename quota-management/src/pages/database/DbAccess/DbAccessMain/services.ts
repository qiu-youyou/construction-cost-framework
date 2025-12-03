/*
 * @Author: SHUANG
 * @Date: 2023-10-26 11:24:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-26 11:32:10
 * @Description: 定额库权限
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 定额库以及权限人员列表查询
 * @Date: 2023-10-26 11:26:15
 */
export async function dbAccessQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.DbAccessItem>>('/business/database/access/db/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额库对应权限目录查询
 * @Date: 2023-10-26 11:26:28
 */
export async function dbAccessDirectorQueryPageInfo(data: TYPES.DbAccessDirectorQuery) {
  return request<FETCH.Res<TYPES.DbAccessDirectorItem>>(
    '/business/database/access/director/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 定额库权限目录对应人员查询
 * @Date: 2023-10-26 11:28:01
 */
export async function dbAccessUserQueryPageInfo(data: FETCH.Req<TYPES.DbAccessDirectorUserQuery>) {
  return request<FETCH.Res<TYPES.DbAccessDirectorUserItem>>(
    '/business/database/access/user/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 定额库权限目录对应用户新增
 * @Date: 2023-10-26 11:30:12
 */
export async function dbAccessUserSave(data: TYPES.DbAccessDirectorUserSaveParams) {
  return request<FETCH.Res>('/business/database/access/user/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额库权限目录对应用户删除
 * @Date: 2023-10-26 11:31:44
 */
export async function dbAccessUserDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/access/user/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
