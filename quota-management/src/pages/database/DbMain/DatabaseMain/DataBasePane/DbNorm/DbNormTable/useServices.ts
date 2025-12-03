/*
 * @Author: SHUANG
 * @Date: 2023-10-18 13:46:04
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-01 17:24:52
 * @Description: 企业定额维护-定额
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 定额明细查询
 * @Date: 2023-10-18 13:51:26
 */
async function dbNormQueryPageInfo(data: FETCH.Req<TYPES.DbNormQuery>) {
  return request<FETCH.Res<TYPES.DbNormItem>>('/business/database/db/norm/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 明细新增空行
 * @Date: 2023-10-18 15:15:57
 */
async function dbNormSaveBlankRow(data: TYPES.DbNormSaveParams) {
  return request<FETCH.Res>('/business/database/db/norm/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额明细行编辑
 * @Date: 2023-10-19 14:31:08
 */
async function dbNormUpdateRow(
  data: FETCH.CellEditReq,
  _: unknown,
  cellParams?: unknown,
  dbNormCurrent?: TYPES.DbNormQuery,
) {
  /** 当前定额的章节ID */
  const dbId = dbNormCurrent?.dbId || '';
  const chapterId = dbNormCurrent?.chapterId || '';

  const currentParams = { dbId, chapterId };
  return request<FETCH.Res>('/business/database/db/norm/updateRow.action', {
    method: 'POST',
    data: { ...data, ...currentParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额明细删除
 * @Date: 2023-10-19 15:18:15
 */
async function dbNormDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/norm/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额明细粘贴操作
 * @Date: 2023-10-19 15:40:40
 */
async function dbNormPaste(data: TYPES.DbNormPasteParams) {
  return request<FETCH.Res>('/business/database/db/norm/copyByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 明细扩展表(注，工作内容，适用范围)查询
 * @Date: 2023-10-19 17:43:02
 */
async function dbNormExtQueryOne(data: TYPES.DbNormExtQuery) {
  return request<FETCH.Row<TYPES.DbNormExtItem>>('/business/database/db/norm/ext/queryOne.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 明细扩展表(注，工作内容，适用范围)更新行
 * @Date: 2023-10-24 15:27:40
 */
async function dbNormExtUpdateRow(data: FETCH.CellEditReq, params?: TYPES.DbNormExtQuery) {
  return request<FETCH.Res>('/business/database/db/norm/ext/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额系数调整
 * @Date: 2023-11-08 10:54:06
 */
async function dbNormCoefficientAdjust(data: TYPES.DbNormAdjustParams) {
  return request<FETCH.Res>('/business/database/db/norm/coefficientAdjust.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额手动重新计算
 * @Date: 2023-11-08 11:50:34
 */
async function dbNormManualCalculation(data: TYPES.DbNormQuery) {
  return request<FETCH.Res>('/business/database/db/norm/manualCalculation.action', {
    method: 'POST',
    data,
  });
}

export default () => {
  return {
    dbNormQueryPageInfo,
    dbNormSaveBlankRow,
    dbNormUpdateRow,
    dbNormDeleteByIds,
    dbNormPaste,
    dbNormExtQueryOne,
    dbNormExtUpdateRow,
    dbNormCoefficientAdjust,
    dbNormManualCalculation,
  };
};
