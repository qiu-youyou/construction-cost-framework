/*
 * @Author: SHUANG
 * @Date: 2023-07-26 16:36:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 14:47:48
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

// 目录维护

/**
 * @Author: SHUANG
 * @Description: 目录维护查询
 * @Date: 2023-08-01 11:09:51
 */
export async function customClassQueryPageInfo() {
  return request<FETCH.Res<TYPES.FieldClassListItem>>('/sys/custom/class/queryPageInfo.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 目录维护新增
 * @Date: 2023-08-01 11:11:28
 */
export async function customClassSave(data: TYPES.FieldClassListItem) {
  return request<FETCH.Res>('/sys/custom/class/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 目录维护状态
 * @Date: 2023-08-01 11:12:39
 */
export async function customClassUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/custom/class/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 目录维护删除
 * @Date: 2023-08-01 11:13:46
 */
export async function customClassDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/custom/class/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

// 高级查询

/**
 * @Author: SHUANG
 * @Description: 查询字段维护查询
 * @Date: 2023-08-01 11:09:51
 */
export async function customQueryQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.FieldQueryListItem>>('/sys/custom/query/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询字段维护新增
 * @Date: 2023-08-01 11:11:28
 */
export async function customQuerySave(data: TYPES.FieldQueryListItem) {
  return request<FETCH.Res>('/sys/custom/query/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询字段维护状态
 * @Date: 2023-08-01 11:12:39
 */
export async function customQueryUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/custom/query/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询字段维护删除
 * @Date: 2023-08-01 11:13:46
 */
export async function customQueryDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/custom/query/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

// 排序维护

/**
 * @Author: SHUANG
 * @Description: 排序维护查询
 * @Date: 2023-08-01 11:09:51
 */
export async function customSortQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.FieldSortListItem>>('/sys/custom/sort/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 排序维护新增
 * @Date: 2023-08-01 11:11:28
 */
export async function customSortSave(data: TYPES.FieldSortListItem) {
  return request<FETCH.Res>('/sys/custom/sort/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 排序维护状态
 * @Date: 2023-08-01 11:12:39
 */
export async function customSortUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/custom/sort/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 排序维护删除
 * @Date: 2023-08-01 11:13:46
 */
export async function customSortDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/custom/sort/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
