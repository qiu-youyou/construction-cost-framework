/*
 * @Author: SHUANG
 * @Date: 2024-02-22 09:19:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 11:50:12
 * @Description: 取费模板库
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 取费模板库 查询
 * @Date: 2024-02-22 09:20:00
 */
export async function databaseDbFeeQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.DbFeeDatabaseItem>>('/business/database/db/fee/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 转换取费模板库 - 标准模板库
 * @Date: 2024-02-22 11:49:10
 */
export async function fetchDatabaseDbFeeQueryPageInfo(data: FETCH.Req) {
  const res = await databaseDbFeeQueryPageInfo(data);
  res.rows = res?.rows?.map((item) => ({
    ...item,
    dbCode: item?.feeCode || '',
    dbName: item?.feeName || '',
    dbPhase: item?.feePhase || '',
    dbNote: item?.feeNote || '',
    dbSimple: '',
  }));

  return res;
}

/**
 * @Author: SHUANG
 * @Description: 取费模板库 保存
 * @Date: 2024-02-22 09:20:00
 */
export async function databaseDbFeeSave(data: TYPES.DbFeeDatabaseItem) {
  return request<FETCH.Res>('/business/database/db/fee/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 取费模板库 删除
 * @Date: 2024-02-22 09:20:00
 */
export async function databaseDbFeeDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/fee/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 取费模板库 复制
 * @Date: 2024-02-22 09:23:07
 */
export async function databaseDbFeeDbFeeCopyByIds(data: TYPES.DbFeeDatabaseCopy) {
  return request<FETCH.Res<TYPES.DbFeeDatabaseItem>>('/business/database/db/fee/dbFeeCopyByIds.action', {
    method: 'POST',
    data,
  });
}
