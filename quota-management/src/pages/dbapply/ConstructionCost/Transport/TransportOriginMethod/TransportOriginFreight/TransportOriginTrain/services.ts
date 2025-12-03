/*
 * @Author: SHUANG
 * @Date: 2024-04-15 17:32:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 11:19:33
 * @Description: 工程造价-运保杂费计算 来源地 运费计算 铁路
 */
import { request } from 'umi';
import { TransportOriginTrainQuery } from '../../typings';

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-运费计算 铁路 查询
 * @Date: 2024-04-15 17:33:52
 */
export async function transportOriginTrainQueryOne(data: FETCH.Req<TransportOriginTrainQuery>) {
  return request<FETCH.Row<any>>('/product/transport/origin/train/queryOne.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-运费计算 铁路 行内编辑
 * @Date: 2024-04-15 17:33:45
 */
export async function transportOriginTrainUpdateRow(
  data: FETCH.CellEditReq,
  params?: TransportOriginTrainQuery,
) {
  return request<FETCH.Res>('/product/transport/origin/train/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 运杂费-来源地-运费计算 铁路 编辑
 * @Date: 2024-04-22 10:44:29
 */
export async function transportOriginTrainUpdateTransportTrain(data: FETCH.CellEditReq) {
  return request<FETCH.Res>('/product/transport/origin/train/updateTransportTrain.action', {
    method: 'POST',
    data,
  });
}

export const transportTrainDataModel: any = {
  trainDistance: 0, // 火车运距
  trainWhoRate: 0, // 整车比例(%)
  trainScaRate: 0, // 零担比例(%)
  trainWhoPrice: 0, // 基本运价整车除税
  trainScaPrice: 0, // 基本运价零担除税
  trainWhoShippingPrice: 0, // 加价整车除税
  trainScaShippingPrice: 0, // 加价零担除税
  trainWhoPriceTot: 0, // 运费整车除税
  trainScaPriceTot: 0, // 运费零担除税
  trainTransportPrice: 0, // 综合运费除税
  trainWhoPriceTax: 0, // 基本运价整车含税
  trainScaPriceTax: 0, // 基本运价零担含税
  trainWhoShippingPriceTax: 0, // 加价整车含税
  trainScaShippingPriceTax: 0, // 加价零担含税
  trainWhoPriceTotTax: 0, // 运费整车含税
  trainScaPriceTotTax: 0, // 运费零担含税
  trainTransportPriceTax: 0, // 综合运费含税
};
