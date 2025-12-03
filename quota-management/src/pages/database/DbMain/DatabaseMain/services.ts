/*
 * @Author: SHUANG
 * @Date: 2023-10-16 11:20:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-13 16:47:05
 * @Description: 企业定额库
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 定额库查询
 * @Date: 2023-10-16 11:55:57
 */
export async function databaseDbQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.DatabaseDbItem>>('/business/database/db/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额库复制
 * @Date: 2023-10-16 12:00:23
 */
export async function databaseDbDbCopy(data: TYPES.DatabaseDbCopy) {
  return request<FETCH.Res<TYPES.DatabaseDbItem>>('/business/database/db/dbCopy.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额库行内编辑
 * @Date: 2023-10-17 10:19:04
 */
export async function databaseDbUpdateRow(data: FETCH.CellEditReq) {
  return request<FETCH.Res>('/business/database/db/updateRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额库说明查询
 * @Date: 2023-10-17 10:23:47
 */
export async function databaseDbExtQueryOne(data: TYPES.DatabaseDbExtQuery) {
  return request<FETCH.Row<TYPES.DatabaseDbExtItem>>('/business/database/db/ext/queryOne.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额库启用禁用
 * @Date: 2023-10-24 09:10:17
 */
export async function databaseDbUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额库删除
 * @Date: 2023-10-24 09:11:47
 */
export async function databaseDbDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额库保存
 * @Date: 2023-10-26 16:35:23
 */
export async function databaseDbSave(data: TYPES.DatabaseDbItem) {
  return request<FETCH.Res>('/business/database/db/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 导入定额库
 * @Date: 2024-02-22 16:44:13
 */
export async function databaseUploadDbExcel(data: FormData) {
  return request<FETCH.Res>('/business/database/ext/import/uploadDbExcel.action', {
    requestType: 'form',
    method: 'POST',
    data: data,
  });
}
