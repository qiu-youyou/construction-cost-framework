/*
 * @Author: SHUANG
 * @Date: 2023-11-06 09:59:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-06 10:10:43
 * @Description: 清单关联定额映射库 目录
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description:  清单关联定额映射库 目录 查询
 * @Date: 2023-11-06 10:05:39
 */
export async function relationDirectoryQueryTreeAll(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.RelationDirectoryItem>>(
    '/business/database/standard/detail/relation/directory/queryTreeAll.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 清单关联定额映射库 目录 保存
 * @Date: 2023-11-06 10:06:03
 */
export async function relationDirectorySave(data: TYPES.RelationDirectorySaveParams) {
  return request<FETCH.Res>('/business/database/standard/detail/relation/directory/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 清单关联定额映射库 目录 删除
 * @Date: 2023-11-06 10:06:41
 */
export async function relationDirectoryDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/standard/detail/relation/directory/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 清单关联定额映射库 目录 启用禁用
 * @Date: 2023-11-06 10:08:12
 */
export async function relationDirectoryUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>(
    '/business/database/standard/detail/relation/directory/updateStatusByIds.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 清单关联定额映射库 目录顺序交换 0
 * @Date: 2023-11-06 10:10:27
 */
export async function relationDirectorySortSwap(data: { arg1: string; arg2: string }) {
  return request<FETCH.Res>('/business/database/standard/detail/relation/directory/sortSwap.action', {
    method: 'POST',
    data: { ids: [data?.arg1, data?.arg2] },
  });
}
