/*
 * @Author: SHUANG
 * @Date: 2023-11-10 09:12:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 09:43:43
 * @Description: 标准库-材料统计分类库
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 材料统计分类库 查询
 * @Date: 2023-11-10 09:20:31
 */
export async function otherTypeMatQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.OtherMatTypeItem>>(
    '/business/database/other/type/mat/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 材料统计分类库 保存空行
 * @Date: 2023-11-10 09:21:40
 */
export async function otherTypeMatSaveBlankRow(data: { currentId?: string }) {
  return request<FETCH.Res>('/business/database/other/type/mat/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 材料统计分类库 更新行
 * @Date: 2023-11-10 09:23:21
 */
export async function otherTypeMatUpdateRow(data: FETCH.CellEditReq) {
  return request<FETCH.Res>('/business/database/other/type/mat/updateRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 材料统计分类库 删除 ByIds
 * @Date: 2023-11-10 09:24:01
 */
export async function otherTypeMatDeleteByIds(data: { ids: string[] }) {
  return request<FETCH.Res>('/business/database/other/type/mat/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
