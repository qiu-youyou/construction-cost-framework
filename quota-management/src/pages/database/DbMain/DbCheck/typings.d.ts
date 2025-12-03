/*
 * @Author: SHUANG
 * @Date: 2023-11-21 17:35:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-28 09:00:36
 * @Description: 定额库-定额审查 数据校核
 */

import { StringNullableChain } from 'lodash';

/** 查询参数 */
export type DbCheckQuery = {
  dbId: string; // 无
};

/** 定额库-定额审查 数据校核 数据项 */
export type DbCheckNormItem = {
  checkCode: string; // 校核提示列
  normName: string; // 定额名称
  normCode: string; // 定额编码
  normUnit: string; // 定额单位
  completeNormName: string;
  normLog: string; // 修改记录
  id: string;
};

/** 定额库-定额审查 数据校核 汇总修改记录 数据项 */
export type DbCheckNormMatByLogItem = {
  normCode: string; // 定额编号
  normName: string; // 定额名称
  normUnit: string; // 定额单位
  normPrice: string; // 定额单价
  normManPrice: string; // 定额人工
  normMatPrice: string; // 定额材料
  normMacPrice: string; // 定额机械
  normLog: string; // 定额日志
  matCode: string; // 材料编码
  matName: string; // 材料名称
  matUnit: string; // 材料单位
  matPrice: string; // 材料单价
  matAmountSrc: string; // 材料含量
  matLog: string; // 材料日志
  completeNormName: string;
  id: string;
  rowSpan?: number;
};
