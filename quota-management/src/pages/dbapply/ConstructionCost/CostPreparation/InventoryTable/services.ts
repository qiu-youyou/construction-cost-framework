/*
 * @Author: SHUANG
 * @Date: 2024-02-21 11:09:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 14:49:20
 * @Description: 工程造价-工程量清单编制-分部分项清单
 */
import { request } from 'umi';
import * as TYPES from './typings';
import { ProductItem } from '@/pages/dbapply/Product/Product/typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-分部分项清单 查询
 * @Date: 2024-01-11 11:55:11
 */
export async function inventoryQueryTreeNodeAll(data: FETCH.Req<TYPES.InventoryQuery>) {
  return request<FETCH.Res<TYPES.InventoryItem>>('/product/inventory/queryTreeNodeAll.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-分部分项清单 新增行
 * @Date: 2024-02-21 15:06:05
 */
export async function inventorySaveBlankRow(data: TYPES.InventoryQuery) {
  return request<FETCH.Res>('/product/inventory/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-分部分项清单 编辑行
 * @Date: 2024-02-21 17:09:10
 */
export async function inventoryUpdateRow(data: FETCH.CellEditReq, params?: TYPES.InventoryQuery) {
  const finalParams: any = { ...params };
  delete finalParams?.parentId;
  return request<FETCH.Res>('/product/inventory/updateRow.action', {
    method: 'POST',
    data: { ...data, ...finalParams },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-分部分项清单 删除
 * @Date: 2024-02-21 11:40:19
 */
export async function inventoryDeleteByIds(data: FETCH.UpStatus) {
  const finalParams: any = { ...data };
  delete finalParams?.parentId;
  return request<FETCH.Res>('/product/inventory/deleteByIds.action', {
    method: 'POST',
    data: finalParams,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-分部分项清单 数据重排
 * @Date: 2024-02-22 17:09:08
 */
export async function inventorySortSwap(data: FETCH.Req, productActionCurrent?: ProductItem) {
  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';

  const finalParams = { ids: [data?.arg1, data?.arg2], projectId, stageId };
  return request<FETCH.Res>('/product/inventory/sortSwap.action', {
    method: 'POST',
    data: finalParams,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-分部分项清单 复制
 * @Date: 2024-02-22 17:22:52
 */

export async function inventoryCopyByIds(data: FETCH.Paste, actionCurrent?: Partial<TYPES.InventoryItem>) {
  const stageId = actionCurrent?.stageId || '';
  const projectId = actionCurrent?.projectId || '';
  return request<FETCH.Res>('/product/inventory/copyByIds.action', {
    method: 'POST',
    data: { ...data, projectId, stageId },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-分部分项清单 升降级
 * @Date: 2024-02-22 17:31:27
 */
export async function inventoryUpgradeAndDowngrade(data: {
  projectId: string;
  stageId: string;
  parentId: string;
  id: string;
}) {
  return request<FETCH.Res>('/product/inventory/upgradeAndDowngrade.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 分部分项清单-关联WBS
 * @Date: 2024-02-27 10:04:19
 */
export async function inventoryCreateRelevancyByIds(data: TYPES.InventoryCreateRelevancyParams) {
  return request<FETCH.Res>('/product/inventory/updateRelevancyByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 导入工程造价-工程量清单编制-分部分项清单
 * @Date: 2024-03-15 11:44:42
 */
export async function inventoryReportUploadHandledExcel(data: FormData) {
  return request<FETCH.Res>('/product/inventory/report/uploadHandledExcel.action', {
    requestType: 'form',
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 分部分项清单-工程量清单编制-批量修改清单编码
 * @Date: 2024-03-21 14:17:52
 */
export async function updateInventoryCodeSerialNumber(data: FETCH.Req<TYPES.InventoryQuery>) {
  return request<FETCH.Res>('/product/inventory/updateInventoryCodeSerialNumber.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 分部分项清单-工程量清单编制-自动匹配综合单价
 * @Date: 2024-03-29 11:43:20
 */
export async function inventoryUpdateAutoUnitPriceCode(data: FETCH.Req<TYPES.InventoryQuery>) {
  return request<FETCH.Res>('/product/inventory/updateAutoUnitPriceCode.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description:
 * @Date: 2024-04-01 14:34:52
 */
export async function inventoryBatchInsertInventoryByListNormDetail(data: TYPES.InventoryListSaveParams) {
  return request<FETCH.Res>('/product/inventory/batchInsertInventoryByListNormDetail.action', {
    method: 'POST',
    data,
  });
}
