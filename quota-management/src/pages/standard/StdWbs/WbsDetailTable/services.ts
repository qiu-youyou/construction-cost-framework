/*
 * @Author: SHUANG
 * @Date: 2024-02-21 16:37:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 15:24:25
 * @Description: 标准库-WBS库-目录
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准库-WBS-目录 查询
 * @Date: 2024-02-21 16:45:55
 */
export async function wbsDetailQueryPageInfo(data: FETCH.Req<TYPES.WbsDetailQuery>) {
  return request<FETCH.Res<TYPES.WbsDetailItem>>('/business/database/db/wbs/queryTreeNodeAll.action', {
    method: 'POST',
    data,
  });
}
