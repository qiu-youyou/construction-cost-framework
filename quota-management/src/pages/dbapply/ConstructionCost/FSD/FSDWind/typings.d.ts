/*
 * @Author: SHUANG
 * @Date: 2024-04-16 14:54:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 14:22:17
 * @Description: 工程造价-风水电 供风点信息
 */

import { FSDQuery } from '../typings';

/** 工程造价-风水电 供风点信息 查询 */
export type FSDWindQuery = FSDQuery;

/** 工程造价-风水电 供风点信息 数据项 */
export type FSDWindItem = FSDQuery & {
  windRate: number; // 供风损耗率
  windRatedCapacity: number; // 空气压缩机额定容量之和
  windOutputRatio: number; // 空气压缩机出力系数
  windAmortizationPrice: number; // 供风设备摊销费
  windDeviceType: '1' | '2'; // 设备类型(1[水泵冷却]，2[循环冷却水])
  windCoolingWaterPrice: number; // 冷却水金额
  windPumpMatCode: string; // 水泵编码
  windPumpMatName: string; // 水泵名称
  windPumpMatPrice: number; // 水泵总费用
  windCompressorMatCode: string; // 空气压缩机编码
  windCompressorMatName: string; // 空气压缩机名称
  windCompressorMatPrice: number; // 空气压缩机总费用
  windPrice: number; // 供风区供风价格
  windName: string; // 供风名称
  windRatio: number; // 供风比例
  windNote: string; // 备注
  changeLog: string; // 修改记录
  id: string;
};
