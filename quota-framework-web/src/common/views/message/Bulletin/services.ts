/*
 * @Author: SHUANG
 * @Date: 2023-04-28 16:27:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-24 16:16:44
 * @Description: 通知公告
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 查询公告列表 - 维护
 * @Date: 2023-04-28 16:46:13
 */
export async function sysNewsQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.BulletinListItem>>('/sys/news/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询某条公告
 * @Date: 2023-07-24 16:18:46
 */
export async function sysNewsQueryOne(data: FETCH.Req) {
  return request<FETCH.Row<TYPES.BulletinListItem>>('/sys/news/queryOne.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 保存公告
 * @Date: 2023-04-28 16:47:52
 */
export async function sysNewsSave(data: TYPES.BulletinSaveParams) {
  return request<FETCH.Row>('/sys/news/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 删除公告
 * @Date: 2023-04-28 16:49:30
 */
export async function sysNewsDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/news/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 更新公告状态
 * @Date: 2023-04-28 16:50:52
 */
export async function updateStatusByIdsEnable(data: FETCH.UpStatus) {
  // 发布
  return request<FETCH.Res>('/sys/news/updateStatusByIds.action', {
    method: 'POST',
    data: { ...data, billStatus: '7' },
  });
}
export async function updateStatusByIdsDisable(data: FETCH.UpStatus) {
  // 撤销
  return request<FETCH.Res>('/sys/news/updateStatusByIds.action', {
    method: 'POST',
    data: { ...data, billStatus: '8' },
  });
}
