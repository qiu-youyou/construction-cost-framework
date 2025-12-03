/*
 * @Author: SHUANG
 * @Date: 2024-03-01 15:53:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 15:56:48
 * @Description: 基础企业定额维护-定额
 */

import { request } from 'umi';

import * as DBNORMTYPES from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';
import { DbBasicNormQuery } from '../../../typings';

/**
 * @Author: SHUANG
 * @Description: 定额明细查询
 * @Date: 2024-03-01 15:54:20
 */
async function dbBasicNormQueryPageInfo(data: FETCH.Req<DbBasicNormQuery>) {
  return request<FETCH.Res<DBNORMTYPES.DbNormItem>>('/database/maintenance/db/norm/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额明细行编辑
 * @Date: 2024-03-01 16:01:49
 */
async function dbBasicNormUpdateRow(
  data: FETCH.CellEditReq,
  _: unknown,
  cellParams?: unknown,
  dbBasicNormCurrent?: DbBasicNormQuery & DBNORMTYPES.DbNormQuery,
) {
  /** 当前定额的章节ID */
  const dbId = dbBasicNormCurrent?.dbId || '';
  const chapterId = dbBasicNormCurrent?.chapterId || '';
  const businessId = dbBasicNormCurrent?.businessId || '';

  const currentParams = { dbId, chapterId, businessId };
  return request<FETCH.Res>('/database/maintenance/db/norm/updateRow.action', {
    method: 'POST',
    data: { ...data, ...currentParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额明细删除
 * @Date: 2024-03-01 16:05:06
 */
async function dbBasicNormDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/database/maintenance/db/norm/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额明细粘贴操作 zhegnshuai 说没有
 * @Date: 2023-10-19 15:40:40
 */

/**
 * @Author: SHUANG
 * @Description: 明细扩展表(注，工作内容，适用范围)查询
 * @Date: 2024-03-01 16:07:49
 */
async function dbBasicNormExtQueryOne(
  data: DbBasicNormQuery & DBNORMTYPES.DbNormExtQuery,
  businessId?: string,
) {
  return request<FETCH.Row<DBNORMTYPES.DbNormExtItem>>('/database/maintenance/db/norm/ext/queryOne.action', {
    method: 'POST',
    data: { ...data, businessId },
  });
}

/**
 * @Author: SHUANG
 * @Description: 明细扩展表(注，工作内容，适用范围)更新行
 * @Date: 2024-03-01 16:12:41
 */
async function dbBasicNormExtUpdateRow(
  data: FETCH.CellEditReq,
  params?: DbBasicNormQuery & DBNORMTYPES.DbNormExtQuery,
  businessId?: string,
) {
  return request<FETCH.Res>('/database/maintenance/db/norm/ext/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params, businessId },
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额系数调整
 * @Date: 2024-03-01 16:13:39
 */
async function dbBasicNormCoefficientAdjust(data: DbBasicNormQuery & DBNORMTYPES.DbNormAdjustParams) {
  return request<FETCH.Res>('/database/maintenance/db/norm/coefficientAdjust.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额手动重新计算
 * @Date: 2024-03-01 16:18:23
 */
async function dbBasicNormManualCalculation(data: DbBasicNormQuery & DBNORMTYPES.DbNormQuery) {
  return request<FETCH.Res>('/database/maintenance/db/norm/manualCalculation.action', {
    method: 'POST',
    data,
  });
}

export default () => {
  return {
    dbNormQueryPageInfo: dbBasicNormQueryPageInfo,
    dbNormSaveBlankRow: () => {},
    dbNormUpdateRow: dbBasicNormUpdateRow,
    dbNormDeleteByIds: dbBasicNormDeleteByIds,
    dbNormPaste: () => {},
    dbNormExtQueryOne: dbBasicNormExtQueryOne,
    dbNormExtUpdateRow: dbBasicNormExtUpdateRow,
    dbNormCoefficientAdjust: dbBasicNormCoefficientAdjust,
    dbNormManualCalculation: dbBasicNormManualCalculation,
  };
};
