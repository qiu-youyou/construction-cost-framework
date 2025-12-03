/*
 * @Author: SHUANG
 * @Date: 2022-08-17 15:50:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-21 13:41:36
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 分页查询 业务字典
 * @Date: 2023-07-11 16:38:50
 */
export async function businessDictQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.BusinessDictListItem>>('/sys/business/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 新增/修改 业务字典
 * @Date: 2023-07-11 16:38:59
 */
export async function businessDictSave(data: TYPES.BusinessDictListItem) {
  return request<FETCH.Res>('/sys/business/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 更改状态 业务字典
 * @Date: 2023-07-11 16:39:13
 */
export async function businessDictUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/business/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description:  删除 业务字典
 * @Date: 2023-07-11 16:39:24
 */
export async function businessDistDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/business/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
