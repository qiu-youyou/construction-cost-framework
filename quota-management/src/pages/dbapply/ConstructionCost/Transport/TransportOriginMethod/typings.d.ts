/*
 * @Author: SHUANG
 * @Date: 2024-04-15 17:25:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 15:58:25
 * @Description: 工程造价-运保杂费计算 来源地 运输方式
 */
import { TransportOriginQuery } from '../TransportOrigin/typings';

/** 工程造价-运保杂费计算 来源地 运输方式 查询 */
export type TransportOriginMethodQuery = TransportOriginQuery & {
  oriId: string; // 来源ID
};

/** 工程造价-运保杂费计算 来源地 运输方式 数据项 */
export type TransportOriginMethodItem = {
  metName: string; // 运输方式
  metAddress: string; // 起止地点
  metTransportPrice: number; // 运费除税
  metTransportPriceTax: number; // 运费含税
  metSundryPrice: number; // 杂费除税
  metSundryPriceTax: number; // 杂费含税
  metTraPrice: number; // 运杂费除税
  metTraPriceTax: number; // 运杂费含税
  traTaxRate: number; // 税率
  changeLog: string; // 修改记录
  metNote: string; // 说明
  projectId: string; // 项目Id
  stageId: string; // 阶段Id
  traId: string; // 运杂费Id
  oriId: string; // 来源Id
  id: string;
};

/** 工程造价-运保杂费计算 铁路综合运费 查询  */
export type TransportOriginTrainQuery = {
  traTaxRate?: number; // 税率
  projectId: string; // 项目Id
  stageId: string; // 阶段Id
  traId: string; // 运杂费Id
  oriId: string; // 来源Id
  id: string; // 运输方式iD
};

/** 工程造价-运保杂费计算 分段运输费用 查询  */
export type TransportOriginOtherQuery = {
  traTaxRate?: number; // 税率
  projectId: string; // 项目Id
  stageId: string; // 阶段Id
  traId: string; // 运杂费Id
  oriId: string; // 来源Id
  metId: string; // 运输方式Id
};

/** 工程造价-运保杂费计算 分段运输费用 数据项 */
export type TransportOriginOtherItem = {
  otherNumber: string; // 段数
  otherDistance: number; // 运距
  otherRate: number; // 运价系数
  otherPrice: number; // 不含税运价
  otherTransportPrice: number; // 不含税运费
  otherPriceTax: number; // 含税运价
  otherTransportPriceTax: number; // 含税运费
  otherNote: string; // 备注
  changeLog: string; // 修改记录
};

/** 工程造价-运保杂费计算 杂费 数据项 */
export type TransportOriginSundryItem = {
  sundryName: string; // 杂费名称
  sundryPrice: number; // 杂费单价除税
  sundryPriceTax: number; // 杂费单价含税
};
