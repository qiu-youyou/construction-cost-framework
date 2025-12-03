/*
 * @Author: SHUANG
 * @Date: 2023-11-09 14:36:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 14:14:00
 * @Description: 标准库-次材市场价格库-明细
 */

import { request } from 'umi';
import * as TYPES from './typings';
import {
  DbMatItem,
  DbMatQuery,
} from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';

/**
 * @Author: SHUANG
 * @Description: 标准库-装置性材料价格库-明细 查询
 * @Date: 2023-11-09 11:39:47
 */
export async function subsidiaryMatDetailQueryPageInfo(data: FETCH.Req<TYPES.SubsidiaryMatDetailQuery>) {
  return request<FETCH.Res<TYPES.SubsidiaryMatDetailItem>>(
    '/business/database/other/db/subsidiary/mat/detail/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准库-装置性材料价格库-明细 更新行
 * @Date: 2023-11-09 11:43:04
 */
export async function subsidiaryMatDetailUpdateRow(
  data: FETCH.CellEditReq,
  _?: unknown,
  cellParams?: unknown,
  subsidiaryMatDetailCurrent?: TYPES.SubsidiaryMatDetailItem,
) {
  /** 当前选中明细对应目录ID */
  const deviceMatDirectoryId = subsidiaryMatDetailCurrent?.deviceMatDirectoryId || '';
  const currentParams = { deviceMatDirectoryId };
  return request<FETCH.Res>('/business/database/other/db/subsidiary/mat/detail/updateRow.action', {
    method: 'POST',
    data: { ...data, ...currentParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准库-装置性材料价格库-明细 删除 ByIds
 * @Date: 2023-11-09 11:44:32
 */
export async function subsidiaryMatDetailDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/other/db/subsidiary/mat/detail/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 勾选人材机同步数据
 * @Date: 2023-11-09 15:06:12
 */
export async function subsidiaryMatDetailBatchInserByRcj(data: TYPES.SubMatBatchInsertByRcj) {
  return request<FETCH.Res>('/business/database/other/db/subsidiary/mat/detail/batchInsertByRcjId.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT目录对应MATCONTENT、选择明细查询
 * @Date: 2023-11-15 11:47:48
 */
export async function matMainQueryPageInfoNotExistSubstrateDetail(data: FETCH.Req & DbMatQuery) {
  const finalParams: FETCH.Req & DbMatQuery = {
    ...data,
  };

  if (finalParams?.searchParams && finalParams?.searchParams !== '{}') {
    const searchParams = JSON.parse(finalParams?.searchParams);
    if (searchParams?.scopeLike != '1') {
      delete finalParams?.classifyId;
    }
    delete searchParams?.scopeLike;
    finalParams.searchParams = JSON.stringify(searchParams);
  }

  return request<FETCH.Res<DbMatItem>>(
    `/business/database/db/mat/classify/detail/queryPageInfoNotExistSubstrateDetail.action`,
    {
      method: 'POST',
      data: finalParams,
    },
  );
}
