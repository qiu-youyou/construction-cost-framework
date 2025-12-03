/*
 * @Author: SHUANG
 * @Date: 2023-10-21 11:25:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-05 13:57:10
 * @Description: 定额库(人材机 机械台班 混凝土配合比)
 */
import { request } from 'umi';
import * as TYPES from './typings';
import { DbNormItem } from '../../DbNorm/DbNormTable/typings';

/**
 * @Author: SHUANG
 * @Description: MAT明细查询
 * @Date: 2023-10-21 11:29:24
 */
async function dbMatQueryPageInfo(data: FETCH.Req<TYPES.DbMatQuery>) {
  return request<FETCH.Res<TYPES.DbMatItem>>(
    '/business/database/db/mat/classify/detail/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: MAT明细新增空行
 * @Date: 2023-10-21 11:35:12
 */
async function dbMatSaveBlankRow(data: TYPES.DbMatSaveParams) {
  return request<FETCH.Res>('/business/database/db/mat/classify/detail/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT明细更新行
 * @Date: 2023-10-21 11:48:45
 */
export async function dbMatUpdateRow(
  data: FETCH.CellEditReq,
  _?: unknown,
  cellParams?: unknown,
  dbMatCurrent?: TYPES.DbMatItem,
) {
  /** 当前MAT明细 上的章节ID */
  const dbId = dbMatCurrent?.dbId || '';
  const dbMatCurrentClassifyId = dbMatCurrent?.classifyId || '';

  const currentParams = { dbId, classifyId: dbMatCurrentClassifyId };
  return request<FETCH.Res>('/business/database/db/mat/classify/detail/updateRow.action', {
    method: 'POST',
    data: { ...data, ...currentParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT明细删除 ByIds
 * @Date: 2023-10-21 11:50:15
 */
async function dbMatDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/mat/classify/detail/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT明细复制 ByIds
 * @Date: 2023-10-21 11:51:19
 */
async function dbMatPaste(data: FETCH.Req<TYPES.DbMatPasteParams>) {
  return request<FETCH.Res>('/business/database/db/mat/classify/detail/copyByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT明细 查看相关定额
 * @Date: 2023-11-06 18:18:49
 */
export async function queryNormByMatClassifyDetailIds(data: FETCH.Req<{ dbId?: string; matCode: string }>) {
  return request<FETCH.Res<DbNormItem>>('/business/database/db/norm/queryNormByMatClassifyDetailIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 按照dbId更新人材机明细含量
 * @Date: 2023-11-13 15:32:15
 */
export async function dbMatUpdateDetailMatByDbId(data: { dbId: string }) {
  return request<FETCH.Res<DbNormItem>>(
    '/business/database/db/mat/classify/detail/updateDetailMatByDbId.action',
    {
      method: 'POST',
      data,
    },
  );
}

export default () => {
  return {
    dbMatQueryPageInfo,
    dbMatSaveBlankRow,
    dbMatUpdateRow,
    dbMatDeleteByIds,
    dbMatPaste,
    queryNormByMatClassifyDetailIds,
    dbMatUpdateDetailMatByDbId,
  };
};
