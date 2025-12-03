/*
 * @Author: SHUANG
 * @Date: 2023-07-11 16:10:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-21 13:42:25
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 分页查询 字典类别项
 */
export async function dictClassQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.DictClassItem>>('/sys/dict/class/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 新增/修改 字典类别项
 */
export async function dictClassSave(data: TYPES.DictClassAction) {
  return request<FETCH.Res>('/sys/dict/class/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 更改状态 字典类别项
 */
export async function dictClassUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/dict/class/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 删除 字典类别项
 */
export async function dictClassDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/dict/class/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 分页查询 字典项
 */
export async function dictItemQueryPageInfo(data?: FETCH.Req<TYPES.DictItemListParams>) {
  return request<FETCH.Res<TYPES.DictItemItem>>('/sys/dict/item/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 新增/修改 字典类别项
 */
export async function dictItemSave(data: TYPES.DictItemAction) {
  return request<FETCH.Res>('/sys/dict/item/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 更改状态 字典类别项
 */
export async function dictItemUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/dict/item/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 删除 字典类别项
 */
export async function dictItemDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/dict/item/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
