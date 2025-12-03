/*
 * @Author: SHUANG
 * @Date: 2023-07-25 15:31:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-16 16:37:06
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 友情连接维护查询
 * @Date: 2023-07-25 15:07:36
 */
export async function sysLinkQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.ShipLinkListItem>>('/sys/link/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 友情连接维护保存
 * @Date: 2023-07-25 15:07:44
 */
export async function sysLinkSave(data: TYPES.ShipLinkItemSave) {
  return request<FETCH.Res>('/sys/link/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 友情连接维护状态
 * @Date: 2023-07-25 15:08:39
 */
export async function sysLinkUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/link/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 区域维护删除
 * @Date: 2023-07-25 15:10:53
 */
export async function sysLinkDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/link/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
