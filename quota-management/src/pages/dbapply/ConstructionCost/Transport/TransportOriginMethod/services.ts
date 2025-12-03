/*
 * @Author: SHUANG
 * @Date: 2024-04-15 17:32:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-15 17:33:57
 * @Description: 工程造价-运保杂费计算 来源地 运输方式
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-运输方式-查询
 * @Date: 2024-04-15 17:33:52
 */
export async function transportOriginMethodQueryPageInfo(data: FETCH.Req<TYPES.TransportOriginMethodQuery>) {
  return request<FETCH.Res<TYPES.TransportOriginMethodItem>>(
    '/product/transport/origin/method/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-运输方式-行内编辑
 * @Date: 2024-04-15 17:33:45
 */
export async function transportOriginMethodUpdateRow(
  data: FETCH.CellEditReq,
  params?: TYPES.TransportOriginMethodQuery,
) {
  return request<FETCH.Res>('/product/transport/origin/method/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}
