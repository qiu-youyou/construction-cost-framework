/*
 * @Author: SHUANG
 * @Date: 2023-11-15 10:37:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-23 16:58:45
 * @Description: 标准综合单价库 - 目录
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 目录 - 查询
 * @Date: 2023-11-15 10:59:16
 */
export async function unitPriceDirectoryQueryTreeAll() {
  return request<FETCH.Res<TYPES.UnitPriceDirectoryItem>>(
    '/business/database/standard/comprehensive/unit/price/directory/queryPageInfo.action',
    {
      method: 'POST',
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 目录 - 保存
 * @Date: 2023-11-15 11:02:45
 */
export async function unitPriceDirectorySave(data: TYPES.UnitPriceDirectorySave) {
  return request<FETCH.Res<TYPES.UnitPriceDirectoryItem>>(
    '/business/database/standard/comprehensive/unit/price/directory/save.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 目录 - 删除
 * @Date: 2023-11-15 11:14:03
 */
export async function unitPriceDirectoryDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res<TYPES.UnitPriceDirectoryItem>>(
    '/business/database/standard/comprehensive/unit/price/directory/deleteByIds.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 目录 - 启用禁用
 * @Date: 2023-11-15 11:14:49
 */
export async function unitPriceDirectoryUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res<TYPES.UnitPriceDirectoryItem>>(
    '/business/database/standard/comprehensive/unit/price/directory/updateStatusByIds.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 目录 - 目录顺序交换 0
 * @Date: 2023-11-15 11:16:04
 */
export async function unitPriceDirectorySortSwap(data: { arg1: string; arg2: string }) {
  return request<FETCH.Res>(
    '/business/database/standard/comprehensive/unit/price/directory/sortSwap.action',
    {
      method: 'POST',
      data: { ids: [data?.arg1, data?.arg2] },
    },
  );
}
