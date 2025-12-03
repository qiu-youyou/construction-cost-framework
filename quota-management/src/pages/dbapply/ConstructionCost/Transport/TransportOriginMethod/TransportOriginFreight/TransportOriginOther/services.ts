/*
 * @Author: SHUANG
 * @Date: 2024-04-22 11:32:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 11:41:17
 * @Description: 工程造价-运保杂费计算 来源地 分段运输费用
 */
import { request } from 'umi';
import { TransportOriginOtherItem, TransportOriginOtherQuery } from '../../typings';

/**
 * @Author: SHUANG
 * @Description: 分段运输费用-查询
 * @Date: 2024-04-22 11:36:47
 */
export async function transportOriginOtherQueryPageInfo(data: FETCH.Req<TransportOriginOtherQuery>) {
  return request<FETCH.Res<TransportOriginOtherItem>>(
    '/product/transport/origin/other/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 分段运输费用-新增行
 * @Date: 2024-04-22 11:38:16
 */
export async function transportOriginOtherSaveBlankRow(data: TransportOriginOtherQuery) {
  return request<FETCH.Res>('/product/transport/origin/other/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 分段运输费用-更新行
 * @Date: 2024-04-22 11:39:02
 */
export async function transportOriginOtherUpdateRow(
  data: FETCH.CellEditReq,
  params?: TransportOriginOtherQuery,
) {
  return request<FETCH.Res>('/product/transport/origin/other/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 分段运输费用-删除
 * @Date: 2024-04-22 11:39:38
 */
export async function transportOriginOtherDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/transport/origin/other/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
