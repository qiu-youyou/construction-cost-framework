/*
 * @Author: SHUANG
 * @Date: 2023-11-09 10:58:49
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-09 11:17:31
 * @Description: 标准库-装置性材料价格库-目录
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准库-装置性材料价格库-目录 查询
 * @Date: 2023-11-09 11:14:38
 */
export async function deviceMatDirectoryQueryTreeNodeAll(data: TYPES.DeviceMatDirectoryQuery) {
  return request<FETCH.Res<TYPES.DeviceMatDirectoryItem>>(
    '/business/database/other/db/device/mat/directory/queryTreeNodeAll.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准库-装置性材料价格库-目录 保存
 * @Date: 2023-11-09 11:15:14
 */
export async function deviceMatDirectorySave(data: TYPES.DeviceMatDirectorySaveParams) {
  return request<FETCH.Res>('/business/database/other/db/device/mat/directory/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 标准库-装置性材料价格库-删除 ByIds
 * @Date: 2023-11-09 11:16:13
 */
export async function deviceMatDirectoryDeleteByIds(
  data: FETCH.UpStatus,
  params: TYPES.DeviceMatDirectoryQuery,
) {
  return request<FETCH.Res>('/business/database/other/db/device/mat/directory/deleteByIds.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}
