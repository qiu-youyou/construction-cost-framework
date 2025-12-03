/*
 * @Author: SHUANG
 * @Date: 2023-10-30 10:23:19
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-14 15:03:15
 * @Description: 取费修编-取费目录
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 取费编制 目录查询
 * @Date: 2023-10-30 10:23:55
 */
export async function dbFeeDirectoryQueryTreeNodeAll(data: FETCH.Req<TYPES.DbFeeDirectoryQuery>) {
  return request<FETCH.Res<TYPES.DbFeeDirectoryItem>>(
    '/business/database/db/fee/directory/queryTreeNodeAll.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 取费编制 新增目录
 * @Date: 2023-10-30 10:24:48
 */
export async function dbFeeDirectorySave(data: TYPES.DbFeeDirectorySaveParams) {
  return request<FETCH.Res>('/business/database/db/fee/directory/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 取费编制 删除目录
 * @Date: 2023-10-30 10:25:47
 */
export async function dbFeeDirectoryDeleteByIds(data: FETCH.UpStatus, databaseCurrent?: { id?: string }) {
  return request<FETCH.Res>('/business/database/db/fee/directory/deleteByIds.action', {
    method: 'POST',
    data: { ...data, dbId: databaseCurrent?.id || '' },
  });
}

/**
 * @Author: SHUANG
 * @Description: 取费编制 复制
 * @Date: 2023-10-30 10:26:40
 */
export async function dbFeeDirectoryPaste(data: FETCH.Req<TYPES.DbFeeDirectoryPasteParams>) {
  return request<FETCH.Res>('/business/database/db/fee/directory/copyByIds.action', {
    method: 'POST',
    data,
  });
}
