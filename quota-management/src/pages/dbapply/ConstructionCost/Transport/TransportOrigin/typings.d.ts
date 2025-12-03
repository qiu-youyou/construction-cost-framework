/*
 * @Author: SHUANG
 * @Date: 2024-04-11 10:21:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-15 17:29:43
 * @Description: 工程造价-运保杂费计算 来源地
 */

import { TransportQuery } from '../TransportMain/typings';

/** 工程造价-运保杂费计算 来源地 查询 */
export type TransportOriginQuery = TransportQuery & {
  traTaxRate?: number | string; // 费率
  traId?: string; // 运杂费Id
};

/** 工程造价-运保杂费计算 来源地 数据项 */
export interface TransportOriginItem {
  traId: string; // 运杂费ID
  oriName: string; // 来源地名称
  oriDeliveryRate: number; // 交货比例(%)
  oriDeliveryCondition: string; // 交货条件
  oriDeliveryPlace: string; // 交货地点
  oriTraPrice: number; // 运杂费除税
  oriTraPriceTax: number; // 运杂费含税
  oriTrainGrade: number; // 火车货物等级
  oriCarGrade: number; // 汽车货物等级
  oriBoatGrade: number; // 船运货物等级
  oriCarRate: number; // 汽车货物系数
  oriBoatRate: number; // 船运货物系数
  oriTrainRate: number; // 火车货物系数
  oriNote: string; // 说明
  traTaxRate: number; // 税率
  changeLog: string; // 修改记录
  id: string;
  stageId: string;
  projectId: string;
}
