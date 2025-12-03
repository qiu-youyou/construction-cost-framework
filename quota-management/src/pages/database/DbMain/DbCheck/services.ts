/*
 * @Author: SHUANG
 * @Date: 2023-11-21 18:16:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-21 18:18:16
 * @Description: 定额库-定额审查
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 定额库-定额审查 数据校核
 * @Date: 2023-11-21 18:17:58
 */
export async function dbQueryCheckNorm(data: TYPES.DbCheckQuery) {
  return request<FETCH.Res<TYPES.DbCheckNormItem>>('/business/database/db/norm/queryCheckNorm.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额库-定额审查 汇总修改记录
 * @Date: 2023-11-21 18:17:58
 */
export async function dbQueryNormMatByLogIsNotNull(data: TYPES.DbCheckQuery) {
  return request<FETCH.Res<TYPES.DbCheckNormMatByLogItem>>(
    '/business/database/db/norm/queryNormMatByLogIsNotNull.action',
    {
      method: 'POST',
      data,
    },
  );
}
