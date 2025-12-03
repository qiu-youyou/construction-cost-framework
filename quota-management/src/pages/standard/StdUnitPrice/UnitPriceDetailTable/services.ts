/*
 * @Author: SHUANG
 * @Date: 2023-11-15 14:04:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-20 15:54:11
 * @Description: 标准综合单价库 - 清单明细
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单明细 - 查询
 * @Date: 2023-11-15 14:05:03
 */
export async function unitPriceDetailQueryTreeAll(data: TYPES.UnitPriceDetailQuery) {
  return request<FETCH.Res<TYPES.UnitPriceDetailItem>>(
    '/business/database/standard/comprehensive/unit/price/detail/queryTreeAll.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单明细 - 新增空行
 * @Date: 2023-11-15 14:05:46
 */
export async function unitPriceDetailSaveBlankRow(data: TYPES.UnitPriceDetailSave) {
  return request<FETCH.Res<TYPES.UnitPriceDetailItem>>(
    '/business/database/standard/comprehensive/unit/price/detail/saveBlankRow.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单明细 - 行编辑
 * @Date: 2023-11-15 14:08:31
 */
export async function unitPriceDetailUpdateRow(data: FETCH.CellEditReq, params?: TYPES.UnitPriceDetailQuery) {
  return request<FETCH.Res<TYPES.UnitPriceDetailItem>>(
    '/business/database/standard/comprehensive/unit/price/detail/updateRow.action',
    {
      method: 'POST',
      data: { ...data, ...params },
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单明细 - 删除
 * @Date: 2023-11-15 15:28:23
 */
export async function unitPriceDetailDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>(
    '/business/database/standard/comprehensive/unit/price/detail/deleteByIds.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 同步映射库清单数据
 * @Date: 2023-11-15 14:10:49
 */
export async function unitPriceDetailSyncListNorm(data: TYPES.UnitPriceDetailSyncListNorm) {
  return request<FETCH.Res>(
    '/business/database/standard/comprehensive/unit/price/detail/syncListNormDetailNorm.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 单价编号顺序重组
 * @Date: 2023-11-15 14:11:43
 */
export async function unitPriceDetailUpdateUnitPriceCodeReSort(data: TYPES.UnitPriceDetailQuery) {
  return request<FETCH.Res>(
    '/business/database/standard/comprehensive/unit/price/detail/updateUnitPriceCodeReSort.action',
    {
      method: 'POST',
      data,
    },
  );
}
