/*
 * @Author: SHUANG
 * @Date: 2024-03-25 13:56:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 10:01:43
 * @Description: 工程造价-组时机械定义
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-组时机械定义 查询
 * @Date: 2024-03-25 14:10:47
 */
export async function multiformMechanicalQueryPageInfo(data: FETCH.Req<TYPES.MultiformMechanicalQuery>) {
  return request<FETCH.Res<TYPES.MultiformMechanicalItem>>(
    '/product/multiform/mechanical/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-组时机械定义 新增空行
 * @Date: 2024-03-25 14:11:33
 */
export async function multiformMechanicalSaveBlankRow(data: TYPES.MultiformMechanicalQuery) {
  return request<FETCH.Res>('/product/multiform/mechanical/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-组时机械定义 更新行
 * @Date: 2024-03-25 14:13:06
 */
export async function multiformMechanicalUpdateRow(
  data: FETCH.CellEditReq,
  params?: TYPES.MultiformMechanicalQuery,
) {
  return request<FETCH.Res>('/product/multiform/mechanical/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-组时机械定义 删除行
 * @Date: 2024-03-25 14:14:13
 */
export async function multiformMechanicalDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/multiform/mechanical/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
