/*
 * @Author: SHUANG
 * @Date: 2022-08-21 09:56:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-13 16:57:59
 * @Description:
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 静态资源维护查询
 * @Date: 2023-07-25 15:07:36
 */
export async function staticAttachmentQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.StaticResourceListItem>>('/sys/static/attachment/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 静态资源维护新增
 * @Date: 2023-07-25 15:07:44
 */
export async function staticAttachmentSave(data: FormData) {
  return request<FETCH.Res>('/sys/static/attachment/upload.action', {
    requestType: 'form',
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 静态资源删除
 * @Date: 2023-07-25 15:10:53
 */
export async function staticAttachmentDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/static/attachment/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
