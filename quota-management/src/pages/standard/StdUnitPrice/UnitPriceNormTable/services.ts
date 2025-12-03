/*
 * @Author: SHUANG
 * @Date: 2023-11-16 09:09:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-16 14:57:05
 * @Description: 标准综合单价库 - 清单定额
 */

import { request } from 'umi';
import * as TYPES from './typings';
import { DbNormExtItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单定额 - 查询
 * @Date: 2023-11-16 09:10:02
 */
export async function unitPriceNormQueryPageInfo(data: FETCH.Req<TYPES.UnitPriceNormQuery>) {
  return request<FETCH.Res<TYPES.UnitPriceNormItem>>(
    '/business/database/standard/comprehensive/unit/price/norm/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单定额 - 新增
 * @Date: 2023-11-16 09:10:02
 */
export async function unitPriceNormSyncInserNorm(data: TYPES.UnitPriceNormSave) {
  return request<FETCH.Res>(
    '/business/database/standard/comprehensive/unit/price/norm/syncInsertNorm.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单定额 - 删除
 * @Date: 2023-11-16 14:57:03
 */
export async function unitPriceNormDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/standard/comprehensive/unit/price/norm/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单定额 - 行编辑
 * @Date: 2023-11-16 09:19:05
 */
export async function unitPriceNormUpdateRow(
  data: FETCH.CellEditReq,
  params?: TYPES.UnitPriceNormQuery,
  cellParams?: unknown,
  unitPriceNormCurrent?: TYPES.UnitPriceNormItem,
) {
  /** 综合单价 当前清单明细 ID */
  const unitPriceId = unitPriceNormCurrent?.unitPriceId || '';
  /** 综合单价 当前综合单价目录 ID */
  const unitPriceDbId = unitPriceNormCurrent?.unitPriceDbId || '';
  /** 清单定额 当前行 定额 定额库 ID */
  const dbId = unitPriceNormCurrent?.dbId || '';
  /** 清单定额 当前行 定额 ID */
  const id = unitPriceNormCurrent?.id || '';

  const currentParams: TYPES.UnitPriceNormCellSave = { unitPriceDbId, unitPriceId, dbId, id };
  return request<FETCH.Res>('/business/database/standard/comprehensive/unit/price/norm/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params, ...currentParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单定额 - 批量设置取费类型
 * @Date: 2023-11-16 09:22:53
 */
export async function unitPriceNormUpdateBatchSetFee(data: TYPES.UpdateBatchSetFeeParams) {
  return request<FETCH.Res>(
    '/business/database/standard/comprehensive/unit/price/norm/updateBatchSetFee.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 明细扩展表(注，工作内容，适用范围)查询
 * @Date: 2023-10-19 17:43:02
 */
export async function dbNormExtQueryOne(data: { id: string; dbId: string }) {
  return request<FETCH.Row<DbNormExtItem>>('/business/database/db/norm/ext/queryOne.action', {
    method: 'POST',
    data,
  });
}
