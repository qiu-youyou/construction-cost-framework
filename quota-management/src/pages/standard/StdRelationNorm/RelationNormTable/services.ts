/*
 * @Author: SHUANG
 * @Date: 2023-11-06 11:24:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-06 11:31:38
 * @Description: 清单关联定额映射库 - 清单 - 定额
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description:  清单关联定额映射库 - 清单 - 定额查询
 * @Date: 2023-11-06 11:28:55
 */
export async function relationNormQueryPageInfo(data: FETCH.Req<TYPES.RelationNormQuery>) {
  return request<FETCH.Res<TYPES.RelationNormItem>>(
    '/business/database/standard/detail/relation/norm/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description:  清单关联定额映射库 - 清单 - 定额保存
 * @Date: 2023-11-06 11:28:55
 */
export async function relationNormInsert(data: FETCH.Req<TYPES.RelationNormSaveParams>) {
  return request<FETCH.Res>('/business/database/standard/detail/relation/norm/insert.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description:  清单关联定额映射库 - 清单 - 定额删除
 * @Date: 2023-11-06 11:28:55
 */
export async function relationNormDeleteByIds(data: FETCH.UpStatus & TYPES.RelationNormQuery) {
  return request<FETCH.Res>('/business/database/standard/detail/relation/norm/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
