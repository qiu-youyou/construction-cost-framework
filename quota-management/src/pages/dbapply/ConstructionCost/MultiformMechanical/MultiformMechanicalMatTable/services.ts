/*
 * @Author: SHUANG
 * @Date: 2024-03-25 14:15:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-25 16:19:43
 * @Description: 工程造价-组时机械明细
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-组时机械明细 查询
 * @Date: 2024-03-25 14:10:47
 */
export async function multiformMechanicalMatQueryPageInfo(
  data: FETCH.Req<TYPES.MultiformMechanicalMatQuery>,
) {
  return request<FETCH.Res<TYPES.MultiformMechanicalMatItem>>(
    '/product/multiform/mechanical/mat/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-组时机械明细 新增空行
 * @Date: 2024-03-25 14:11:33
 */
export async function multiformMechanicalMatSaveBlankRow(data?: TYPES.MultiformMechanicalMatQuery) {
  return request<FETCH.Res>('/product/multiform/mechanical/mat/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-组时机械明细 从材料库新增
 * @Date: 2024-03-25 14:17:17
 */
export async function multiformMechanicalMatInsertByBasicNormMatIds(
  data: TYPES.MultiformMechanicalMatInsertByBasicNormMatIds,
) {
  return request<FETCH.Res>('/product/multiform/mechanical/mat/insertByBasicNormMatIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-组时机械明细 更新行
 * @Date: 2024-03-25 14:13:06
 */
export async function multiformMechanicalMatUpdateRow(
  data: FETCH.CellEditReq,
  params?: TYPES.MultiformMechanicalMatQuery,
) {
  return request<FETCH.Res>('/product/multiform/mechanical/mat/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-组时机械明细 删除行
 * @Date: 2024-03-25 14:14:13
 */
export async function multiformMechanicalMatDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/multiform/mechanical/mat/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
