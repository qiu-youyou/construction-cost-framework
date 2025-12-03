/*
 * @Author: SHUANG
 * @Date: 2023-10-16 11:24:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-26 11:04:13
 * @Description:  定额册维护
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 定额册查询
 * @Date: 2023-10-16 18:06:22
 */
export async function dbChapterQueryTreeNodeAll(data: FETCH.Req<TYPES.DbChapterQuery>) {
  return request<FETCH.Res<TYPES.DbChapterItem>>('/business/database/db/chapter/queryTreeNodeAll.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额册新增
 * @Date: 2023-10-17 09:53:12
 */
export async function dbChapterSave(data: TYPES.DbChapterSaveParams) {
  return request<FETCH.Res>('/business/database/db/chapter/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额册行编辑
 * @Date: 2023-10-17 09:59:06
 */
export async function dbChapterUpdateRow(data: FETCH.CellEditReq) {
  return request<FETCH.Res>('/business/database/db/chapter/updateRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额册删除
 * @Date: 2023-10-17 10:12:20
 */
export async function dbChapterDeleteByIds(data: FETCH.UpStatus & TYPES.DbChapterQuery) {
  return request<FETCH.Res>('/business/database/db/chapter/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 册说明查询
 * @Date: 2023-10-17 10:13:40
 */
export async function dbChapterExtQueryOne(data: TYPES.DbChapterExtQuery) {
  return request<FETCH.Row<TYPES.DbChapterExtItem>>('/business/database/db/chapter/ext/queryOne.action', {
    method: 'POST',
    data,
  });
}
