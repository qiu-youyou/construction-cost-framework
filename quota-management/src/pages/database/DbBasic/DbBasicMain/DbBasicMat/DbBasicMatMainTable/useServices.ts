/*
 * @Author: SHUANG
 * @Date: 2024-03-05 11:27:43
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 14:49:17
 * @Description: 基础企业定额维护 - 人材机、混凝土、机械台班 主表
 */
import { request } from 'umi';
import * as DBMATTYPES from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import { DbBasicNormQuery } from '../../../typings';
import { DbNormItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';

/**
 * @Author: SHUANG
 * @Description: MAT明细查询
 * @Date: 2024-03-05 11:28:04
 */
async function dbBasicMatQueryPageInfo(data: FETCH.Req<DbBasicNormQuery & DBMATTYPES.DbMatQuery>) {
  return request<FETCH.Res<DBMATTYPES.DbMatItem>>(
    '/database/maintenance/db/mat/classify/detail/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: MAT明细新增行
 * @Date: 2024-03-06 10:54:39
 */
export async function dbBasicMatSaveBlankRow(data: DBMATTYPES.DbMatSaveParams) {
  return request<FETCH.Res>('/database/maintenance/db/mat/classify/detail/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT明细更新行
 * @Date: 2024-03-05 11:33:02
 */
export async function dbBasicMatUpdateRow(
  data: FETCH.CellEditReq,
  _?: unknown,
  cellParams?: unknown,
  dbMatCurrent?: DBMATTYPES.DbMatItem,
  businessId?: string,
) {
  /** 当前MAT明细 上的章节ID */
  const dbId = dbMatCurrent?.dbId || '';
  const dbMatCurrentClassifyId = dbMatCurrent?.classifyId || '';

  const currentParams = { dbId, classifyId: dbMatCurrentClassifyId };
  return request<FETCH.Res>('/database/maintenance/db/mat/classify/detail/updateRow.action', {
    method: 'POST',
    data: { ...data, ...currentParams, businessId },
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT明细删除 ByIds
 * @Date: 2024-03-05 11:33:10
 */
export async function dbBasicMatDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/database/maintenance/db/mat/classify/detail/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT明细复制 ByIds
 * @Date: 2023-10-21 11:51:19
 * zhegnshuai说没有复制
 */

/**
 * @Author: SHUANG
 * @Description: MAT明细 查看相关定额
 * @Date: 2024-03-05 11:33:22
 */
export async function dbBasicQueryNormByMatClassifyDetailIds(
  data: FETCH.Req<{ dbId?: string; matCode: string }>,
) {
  return request<FETCH.Res<DbNormItem>>(
    '/database/maintenance/db/norm/queryNormByMatClassifyDetailIds.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 按照dbId更新人材机明细含量 同步人材机价格信息
 * @Date: 2024-03-05 11:33:35
 */
export async function dbBasicMatUpdateDetailMatByDbId(data: { dbId: string }) {
  return request<FETCH.Res<DbNormItem>>(
    '/database/maintenance/db/mat/classify/detail/updateDetailMatByDbId.action',
    {
      method: 'POST',
      data,
    },
  );
}

export default () => {
  return {
    dbMatQueryPageInfo: dbBasicMatQueryPageInfo,
    dbMatSaveBlankRow: dbBasicMatSaveBlankRow,
    dbMatUpdateRow: dbBasicMatUpdateRow,
    dbMatDeleteByIds: dbBasicMatDeleteByIds,
    queryNormByMatClassifyDetailIds: dbBasicQueryNormByMatClassifyDetailIds,
    dbMatUpdateDetailMatByDbId: dbBasicMatUpdateDetailMatByDbId,
  };
};
