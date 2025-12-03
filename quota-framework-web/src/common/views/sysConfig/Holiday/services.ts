/*
 * @Author: SHUANG
 * @Date: 2023-07-26 11:24:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 10:56:06
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 节假日维护查询
 * @Date: 2023-07-26 11:29:21
 */
export async function sysHolidayQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.HolidayListItem>>('/sys/holiday/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 节假日维护保存
 * @Date: 2023-07-26 11:29:56
 */
export async function sysHolidaySave(data: Partial<TYPES.HolidayListItem>) {
  return request<FETCH.Res>('/sys/holiday/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description:
 * @Date: 2023-07-26 11:30:35
 */
export async function sysHolidayUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/holiday/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 节假日维护删除
 * @Date: 2023-07-26 11:30:42
 */

export async function sysHolidayDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/holiday/deleteByIds.action   ', {
    method: 'POST',
    data,
  });
}
