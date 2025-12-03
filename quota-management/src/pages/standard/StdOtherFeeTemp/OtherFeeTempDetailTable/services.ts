/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:31:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 10:19:31
 * @Description: 标准库-其他费用模板-明细
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准库-其他费用模板-明细 查询
 * @Date: 2023-11-09 11:39:47
 */
export async function otherFeeTempDetailQueryPageInfo(data: FETCH.Req<TYPES.OtherFeeTempDetailQuery>) {
  return request<FETCH.Res<TYPES.OtherFeeTempDetailItem>>(
    '/business/database/other/detail/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准库-其他费用模板-明细 新增空行
 * @Date: 2023-11-09 11:41:06
 */
export async function otherFeeTempDetailSaveBlankRow(data: TYPES.OtherFeeTempDetailQuery) {
  return request<FETCH.Res>('/business/database/other/detail/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准库-其他费用模板-明细 更新行
 * @Date: 2023-11-09 11:43:04
 */
export async function otherFeeTempDetailUpdateRow(
  data: FETCH.CellEditReq,
  _?: unknown,
  cellParams?: unknown,
  otherFeeTempDetailCurrent?: TYPES.OtherFeeTempDetailItem,
) {
  /** 当前选中明细对应目录ID */
  const otherSumDirectoryId = otherFeeTempDetailCurrent?.otherSumDirectoryId || '';
  const otherSumDirectoryName = otherFeeTempDetailCurrent?.otherSumDirectoryName;

  const currentParams = { otherSumDirectoryId, otherSumDirectoryName };
  return request<FETCH.Res>('/business/database/other/detail/updateRow.action', {
    method: 'POST',
    data: { ...data, ...currentParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准库-其他费用模板-明细 删除 ByIds
 * @Date: 2023-11-09 11:44:32
 */
export async function otherFeeTempDetailDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/other/detail/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
