/*
 * @Author: SHUANG
 * @Date: 2024-04-16 15:15:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 14:39:21
 * @Description: 工程造价-风水电 供风点信息
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供风点信息 查询
 * @Date: 2024-04-16 15:16:30
 */
export async function fsdWinQueryPageInfo(data: FETCH.Req<TYPES.FSDWindQuery>) {
  return request<FETCH.Res<TYPES.FSDWindItem>>('/product/fsd/wind/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供风点信息 新增空行
 * @Date: 2024-04-16 15:16:37
 */
export async function fsdWinSaveBlankRow(data: TYPES.FSDWindQuery) {
  return request<FETCH.Res>('/product/fsd/wind/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供风点信息 更新行
 * @Date: 2024-04-16 15:16:44
 */
export async function fsdWinUpdateRow(data: FETCH.CellEditReq, params?: TYPES.FSDWindQuery) {
  return request<FETCH.Res>('/product/fsd/wind/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供风点信息 删除行
 * @Date: 2024-04-16 15:17:02
 */
export async function fsdWinDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/fsd/wind/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供风点信息 保存
 * @Date: 2024-04-16 15:17:19
 */
export async function fsdWinUpdateFsdWind(data: TYPES.FSDWindItem) {
  return request<FETCH.Res>('/product/fsd/wind/updateFsdWind.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 供风点信息 计算
 * @Date: 2024-04-16 15:17:26
 */
export async function fsdWinCompute(data: TYPES.FSDWindQuery) {
  return request<FETCH.Res>('/product/fsd/wind/compute.action', {
    method: 'POST',
    data,
  });
}

export const fsdWindDataModel: any = {
  windRate: 0, // 供风损耗率 1
  windRatedCapacity: 0, // 空气压缩机额定容量之和 1
  windOutputRatio: 0, // 空气压缩机出力系数 1
  windAmortizationPrice: 0, // 供风设备摊销费 1
  windDeviceType: '', // 设备类型(1[水泵冷却]，2[循环冷却水]) 1
  windCoolingWaterPrice: 0, // 冷却水金额 1
  windPumpMatCode: '', // 水泵编码 1
  windPumpMatName: '', // 水泵名称 1
  windPumpMatPrice: 0, // 水泵总费用 1
  windCompressorMatCode: '', // 空气压缩机编码 1
  windCompressorMatName: '', // 空气压缩机名称 1
  windCompressorMatPrice: 0, // 空气压缩机总费用 1
  windPrice: 0, // 供风区供风价格 1
};
