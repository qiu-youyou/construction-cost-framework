/*
 * @Author: SHUANG
 * @Date: 2024-04-16 15:15:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 11:53:29
 * @Description: 工程造价-风水电 供电点信息
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供电点信息 查询
 * @Date: 2024-04-16 15:16:30
 */
export async function fsdElectricityQueryPageInfo(data: FETCH.Req<TYPES.FSDElectricityQuery>) {
  return request<FETCH.Res<TYPES.FSDElectricityItem>>('/product/fsd/electricity/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供电点信息 新增空行
 * @Date: 2024-04-16 15:16:37
 */
export async function fsdElectricitySaveBlankRow(data: TYPES.FSDElectricityQuery) {
  return request<FETCH.Res>('/product/fsd/electricity/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供电点信息 更新行
 * @Date: 2024-04-16 15:16:44
 */
export async function fsdElectricityUpdateRow(data: FETCH.CellEditReq, params?: TYPES.FSDElectricityQuery) {
  return request<FETCH.Res>('/product/fsd/electricity/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供电点信息 删除行
 * @Date: 2024-04-16 15:17:02
 */
export async function fsdElectricityDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/fsd/electricity/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供电点信息 保存
 * @Date: 2024-04-16 15:17:19
 */
export async function fsdElectricityUpdateFsdElectricity(data: Partial<TYPES.FSDElectricityItem>) {
  return request<FETCH.Res>('/product/fsd/electricity/updateFsdElectricity.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供电点信息 计算
 * @Date: 2024-04-16 15:17:26
 */
export async function fsdElectricityCompute(data: TYPES.FSDElectricityQuery) {
  return request<FETCH.Res>('/product/fsd/electricity/compute.action', {
    method: 'POST',
    data,
  });
}

export const fsdElectricityDataModel: any = {
  elePrice: 0, // 综合电价(元/kwh)  1
  eleScrapRate: 0, // 变配电设备及配电线路损耗率 1
  eleRatedCapacity: 0, // 柴油发电机额定容量之和 1
  eleOutputRatio: 0, // 柴油发电机出力系数 1
  eleAmortizationPrice: 0, // 供电设备摊销费 1
  eleDeviceType: '', // 设备类型(1[水泵冷却]，2[循环冷却水]) 1
  eleFactoryRate: 0, // 厂用电率 1
  eleCoolWaterPrice: 0, // 冷却水金额 1
  elePumpMatCode: '', // 水泵编码 1
  elePumpMatName: '', // 水泵名称 1
  elePumpMatPrice: 0, // 水泵总费用 1
  eleGeneratorMatCode: '', // 柴油发电机编码 1
  eleGeneratorMatName: '', // 柴油发电机名称 1
  eleGeneratorMatPrice: 0, // 柴油发电机总费用 1
  eleWorkPrice: 0, // 电网供电基本电价 1
  eleHighVoltageScrapRate: 0, // 高压输电线损耗率 1
  eleLineScrapRate: 0, // 变配电设备及配电线路损耗率 1
  elePeoAmortizationPrice: 0, // 电网供电设备摊销费 1
  eleOutsideRatio: 0, // 外购电占比 1
  eleOutsidePrice: 0, // 外购电金额 1
  eleOneselfRatio: 0, // 自发电占比 1
  eleOneselfPrice: 0, // 自发电金额 1
  eleOtherRatio: 0, // 其他供电占比 1
  eleOtherPrice: 0, // 其他供电金额 1
};
