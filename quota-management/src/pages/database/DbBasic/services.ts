/*
 * @Author: SHUANG
 * @Date: 2024-02-29 11:37:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-05 15:35:26
 * @Description: 基础企业定额
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 模块基础企业定额维护列表 查询
 * @Date: 2024-02-29 11:38:17
 */
export async function basicDatabaseDbQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.BasicDatabaseDbItem>>('/database/maintenance/db/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 模块基础企业定额维护列表 保存
 * @Date: 2024-02-29 11:39:04
 */
export async function basicDatabaseDbSave(data: Partial<TYPES.BasicDatabaseDbItem>) {
  return request<FETCH.Res>('/database/maintenance/db/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 模块基础企业定额维护列表 删除
 * @Date: 2024-02-29 11:41:39
 */
export async function basicDatabaseDbDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/database/maintenance/db/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 模块基础企业定额维护列表 选择定额查询
 * @Date: 2024-02-29 11:50:17
 */
export async function basicDatabaseDbqueryPageInfoNotExistsNormMaintenance(
  data: TYPES.BasicDatabaseDbNotExistsNormQuery,
) {
  return request<FETCH.Res>('/business/database/db/norm/queryPageInfoNotExistsNormMaintenance.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 模块基础企业定额维护列表 选择人材机，机械，混凝土
 * @Date: 2024-02-29 11:59:24
 */
export async function basicDatabaseDbqueryPageInfoNotExistsMaintenance(
  data: TYPES.BasicDatabaseDbNotExistsMatQuery,
) {
  return request<FETCH.Res>(
    '/business/database/db/mat/classify/detail/queryPageInfoNotExistsMaintenance.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 同步定额,人材机，机械台班，混凝土
 * @Date: 2024-02-29 12:00:32
 */
export async function basicDatabaseDbBatchInsertMaintenanceByIds(data: TYPES.BasicDatabaseDbSyncParams) {
  return request<FETCH.Res>('/database/maintenance/db/batchInsertMaintenanceByIds.action', {
    method: 'POST',
    data,
  });
}
