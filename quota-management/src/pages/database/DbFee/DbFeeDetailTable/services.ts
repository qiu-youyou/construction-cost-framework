/*
 * @Author: SHUANG
 * @Date: 2023-10-30 10:23:19
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-25 14:15:02
 * @Description: 取费修编-取费目录
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 取费编制 明细查询
 * @Date: 2023-10-30 10:23:55
 */
export async function dbFeeDetailQueryPageInfo(data: FETCH.Req<TYPES.DbFeeDetailQuery>) {
  return request<FETCH.Res<TYPES.DbFeeDetailItem>>(
    '/business/database/db/fee/directory/detail/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 取费编制明细 新增空行
 * @Date: 2023-10-30 13:54:57
 */
export async function dbFeeDetailSaveBlankRow(data: TYPES.DbFeeDetailQuery) {
  return request<FETCH.Res>('/business/database/db/fee/directory/detail/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 取费明细 更新行
 * @Date: 2023-10-30 13:59:20
 */
export async function dbFeeDetailUpdateRow(
  data: FETCH.CellEditReq,
  _?: unknown,
  other?: unknown,
  dbFeeDetailCurrent?: TYPES.DbFeeDetailItem,
) {
  const dbId = dbFeeDetailCurrent?.dbId || '';
  const feeDirectoryId = dbFeeDetailCurrent?.feeDirectoryId || '';
  const currentParams = { dbId, feeDirectoryId };

  return request<FETCH.Res>('/business/database/db/fee/directory/detail/updateRow.action', {
    method: 'POST',
    data: { ...data, ...currentParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: 取费明细 删除
 * @Date: 2023-10-30 14:28:26
 */
export async function dbFeeDetailDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/fee/directory/detail/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 取费编制明细 批量更新标准费率
 * @Date: 2024-02-26 14:21:56
 */
export async function dbFeeDetailBatchUpdateBaseFeeRate(data: any) {
  return request<FETCH.Res>('/business/database/db/fee/directory/detail/batchUpdateBaseFeeRate.action', {
    method: 'POST',
    data,
  });
}
