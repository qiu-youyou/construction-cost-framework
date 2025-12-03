/*
 * @Author: SHUANG
 * @Date: 2024-04-16 14:54:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 09:41:20
 * @Description: 工程造价-风水电 供电点信息
 */

import { FSDQuery } from '../typings';

/** 工程造价-风水电 供电点信息 查询 */
export type FSDElectricityQuery = FSDQuery;

/** 工程造价-风水电 供电点信息 数据项 */
export type FSDElectricityItem = FSDQuery & {
  eleName: string; // 供电名称
  elePrice: string; // 供电综合单价
  eleRate: number; // 供电比例(%)
  eleScrapRate: number; // 变配电设备及配电线路损耗率
  eleRatedCapacity: number; // 柴油发电机额定容量之和
  eleOutputRatio: number; // 柴油发电机出力系数
  eleAmortizationPrice: number; // 供电设备摊销费
  eleDeviceType: '1' | '2'; // 设备类型(1[水泵冷却]，2[循环冷却水])
  eleFactoryRate: number; // 厂用电率
  eleCoolWaterPrice: number; // 冷却水金额
  elePumpMatCode: string; // 水泵编码
  elePumpMatName: string; // 水泵名称
  elePumpMatPrice: number; // 水泵总费用
  eleGeneratorMatCode: string; // 柴油发电机编码
  eleGeneratorMatName: string; // 柴油发电机名称
  eleGeneratorMatPrice: number; // 柴油发电机总费用
  eleWorkPrice: number; // 电网供电基本电价
  eleHighVoltageScrapRate: number; // 高压输电线损耗率
  eleLineScrapRate: number; // 变配电设备及配电线路损耗率
  elePeoAmortizationPrice: number; // 电网供电设备摊销费
  eleOutsideRatio: number; // 外购电占比
  eleOutsidePrice: number; // 外购电金额
  eleOneselfRatio: number; // 自发电占比
  eleOneselfPrice: number; // 自发电金额
  eleOtherRatio: number; // 其他供电占比
  eleOtherPrice: number; // 其他供电金额
  changeLog: string; // 修改记录
  eleNote: string; // 说明
  id: string
};
