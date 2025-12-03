/*
 * @Author: SHUANG
 * @Date: 2024-02-21 16:37:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 15:24:45
 * @Description: 标准库-WBS库-目录
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准库-WBS-目录 查询
 * @Date: 2024-02-21 16:45:55
 */
export async function wbsDirectoryQueryTreeNodeAll() {
  return request<FETCH.Res<TYPES.WbsDirectoryItem>>(
    '/business/database/db/wbs/directory/queryTreeNodeAll.action',
    {
      method: 'POST',
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准库-WBS-目录 保存
 * @Date: 2024-02-21 16:46:49
 */
export async function wbsDirectorySave(data: Partial<TYPES.WbsDirectoryItem>) {
  return request<FETCH.Res<TYPES.WbsDirectoryItem>>('/business/database/db/wbs/directory/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准库-WBS-目录 删除 ByIds
 * @Date: 2024-02-21 16:47:28
 */
export async function wbsDirectoryDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/wbs/directory/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
