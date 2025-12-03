/*
 * @Author: SHUANG
 * @Date: 2023-11-13 16:42:19
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-16 11:44:03
 * @Description: 标准库-项目汇总表-明细
 */

import { request } from 'umi';
import * as TYPES from '../../StdOtherFeeTemp/OtherFeeTempDetailTable/typings';

/**
 * @Author: SHUANG
 * @Description: 标准库-项目汇总表-明细 查询
 * @Date: 2023-11-09 11:39:47
 */
export async function otherSumTempDetailQueryPageInfo(data: FETCH.Req<TYPES.OtherFeeTempDetailQuery>) {
  return request<FETCH.Res<TYPES.OtherFeeTempDetailItem>>(
    '/business/database/other/sum/detail/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准库-项目汇总表-明细 新增空行
 * @Date: 2023-11-09 11:41:06
 */
export async function otherSumTempDetailSaveBlankRow(data: TYPES.OtherFeeTempDetailQuery) {
  return request<FETCH.Res>('/business/database/other/sum/detail/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准库-项目汇总表-明细 更新行
 * @Date: 2023-11-09 11:43:04
 */
export async function otherSumTempDetailUpdateRow(
  data: FETCH.CellEditReq,
  _?: unknown,
  cellParams?: unknown,
  otherSumTempDetailCurrent?: TYPES.OtherFeeTempDetailItem,
) {
  /** 当前选中明细对应目录ID */
  const otherSumDirectoryId = otherSumTempDetailCurrent?.otherSumDirectoryId || '';
  const otherSumDirectoryName = otherSumTempDetailCurrent?.otherSumDirectoryName;

  const currentParams = { otherSumDirectoryId, otherSumDirectoryName };

  return request<FETCH.Res>('/business/database/other/sum/detail/updateRow.action', {
    method: 'POST',
    data: { ...data, ...currentParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准库-项目汇总表-明细 删除 ByIds
 * @Date: 2023-11-09 11:44:32
 */
export async function otherSumTempDetailDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/other/sum/detail/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
