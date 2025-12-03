/*
 * @Author: SHUANG
 * @Date: 2023-11-10 09:12:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 09:24:15
 * @Description: 标准库-工程量分类库
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程量分类库 查询
 * @Date: 2023-11-10 09:20:31
 */
export async function otherTypeApiQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.OtherTypeApiItem>>(
    '/business/database/other/type/kpi/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 工程量分类库 保存空行
 * @Date: 2023-11-10 09:21:40
 */
export async function otherTypeApiSaveBlankRow(data: { currentId?: string }) {
  return request<FETCH.Res>('/business/database/other/type/kpi/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程量分类库 更新行
 * @Date: 2023-11-10 09:23:21
 */
export async function otherTypeApiUpdateRow(data: FETCH.CellEditReq) {
  return request<FETCH.Res>('/business/database/other/type/kpi/updateRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程量分类库 删除 ByIds
 * @Date: 2023-11-10 09:24:01
 */
export async function otherTypeApiDeleteByIds(data: { ids: string[] }) {
  return request<FETCH.Res>('/business/database/other/type/kpi/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
