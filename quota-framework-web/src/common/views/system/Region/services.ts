/*
 * @Author: SHUANG
 * @Date: 2022-08-21 09:56:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-25 15:30:12
 * @Description:
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 区域维护查询
 * @Date: 2023-07-25 15:07:36
 */
export async function orgcodegroupQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.RegionsListItem>>('/sys/business/orgcodegroup/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 区域维护保存
 * @Date: 2023-07-25 15:07:44
 */
export async function orgcodegroupSave(data: TYPES.RegionsItemSave) {
  return request<FETCH.Res>('/sys/business/orgcodegroup/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 区域维护状态
 * @Date: 2023-07-25 15:08:39
 */
export async function orgcodegroupUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/business/orgcodegroup/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 区域维护删除
 * @Date: 2023-07-25 15:10:53
 */
export async function orgcodegroupDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/business/orgcodegroup/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询区域列表-字典
 * @Date: 2023-07-25 15:11:41
 */
export async function orgcodegroupQueryOption() {
  return request<FETCH.Res<{ label: string; value: string }>>(
    `/sys/business/orgcodegroup/queryOption.action`,
    {
      method: 'POST',
    },
  );
}
