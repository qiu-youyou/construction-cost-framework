/*
 * @Author: SHUANG
 * @Date: 2024-04-16 14:54:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-16 15:14:53
 * @Description: 工程造价-风水电 价区及供水点
 */

import { FSDWindItem } from '../FSDWind/typings';
import { FSDQuery } from '../typings';

/** 工程造价-风水电 价区及供水点 查询 */
export type FSDWaterQuery = FSDQuery & { level?: string };

/** 工程造价-风水电 价区及供水点 数据项 */
export type FSDWaterItem = FSDQuery & {
  waterName: string; // 供水名称
  waterPrice: string; // 供水金额
  waterRatio: number; // 供水比例(%)
  waterUtilizationRate: number; // 能量利用系数
  waterRatedCapacity: number; // 水泵额定容量之和
  waterOutputRatio: number; // 水泵出力系数
  waterAdditionalPrice: number; // 取水附加费
  waterPumpMatCode: string; // 水泵编码
  waterPumpMatName: string; // 水泵名称
  waterPumpMatPrice: number; // 水泵总费用
  waterRate: number; // 系数
  waterBasePrice: number; // 取水基价
  level: string; // 层级
  changeLog: string; // 修改记录
  waterNote: string; // 说明
  id: string;
  parentId: string;
  children?: FSDWindItem[];
};
