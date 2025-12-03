/*
 * @Author: SHUANG
 * @Date: 2023-11-09 11:36:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-24 15:18:25
 * @Description: 标准库-装置性材料价格库-明细
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准库-装置性材料价格库-明细 查询
 * @Date: 2023-11-09 11:39:47
 */
export async function deviceMatDetailQueryPageInfo(data: FETCH.Req<TYPES.DeviceMatDetailQuery>) {
  return request<FETCH.Res<TYPES.DeviceMatDetailItem>>(
    '/business/database/other/db/device/mat/detail/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准库-装置性材料价格库-明细 新增空行
 * @Date: 2023-11-09 11:41:06
 */
export async function deviceMatDetailSaveBlankRow(data: TYPES.DeviceMatDetailQuery) {
  return request<FETCH.Res>('/business/database/other/db/device/mat/detail/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准库-装置性材料价格库-明细 更新行
 * @Date: 2023-11-09 11:43:04
 */
export async function deviceMatDetailUpdateRow(
  data: FETCH.CellEditReq,
  _?: unknown,
  cellParams?: unknown,
  deviceMatDetailCurrent?: TYPES.DeviceMatDetailItem,
) {
  const deviceMatDirectoryId = deviceMatDetailCurrent?.deviceMatDirectoryId || '';
  const currentParams = { deviceMatDirectoryId };

  return request<FETCH.Res>('/business/database/other/db/device/mat/detail/updateRow.action', {
    method: 'POST',
    data: { ...data, ...currentParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准库-装置性材料价格库-明细 删除 ByIds
 * @Date: 2023-11-09 11:44:32
 */
export async function deviceMatDetailDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/other/db/device/mat/detail/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
