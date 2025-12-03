/*
 * @Author: SHUANG
 * @Date: 2023-11-08 18:59:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-08 19:03:06
 * @Description: 企业定额修编-勘误记录
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 定额勘误记录查询
 * @Date: 2023-11-08 19:00:56
 */
export async function dbCorrigendumQueryPageInfo(data: FETCH.Req & TYPES.DbCorrigendumQuery) {
  return request<FETCH.Res<TYPES.DbCorrigendumItem>>(
    '/business/database/db/corrigendum/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 定额勘误记录新增一行
 * @Date: 2023-11-08 19:02:34
 */
export async function dbCorrigendumSaveBlankRow(data: TYPES.DbCorrigendumQuery) {
  return request<FETCH.Res>('/business/database/db/corrigendum/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额勘误记录行编辑
 * @Date: 2023-11-08 19:04:25
 */
export async function dbCorrigendumUpdateRow(data: FETCH.CellEditReq, params?: TYPES.DbCorrigendumQuery) {
  return request<FETCH.Res>('/business/database/db/corrigendum/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额勘误记录删除
 * @Date: 2023-11-08 19:03:30
 */
export async function dbCorrigendumDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/corrigendum/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
