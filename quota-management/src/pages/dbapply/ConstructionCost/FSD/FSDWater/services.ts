/*
 * @Author: SHUANG
 * @Date: 2024-04-16 15:15:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 16:10:38
 * @Description: 工程造价-风水电 价区及供水点
 */

import { request } from 'umi';
import * as TYPES from './typings';
import { message } from 'antd';

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 价区及供水点 查询
 * @Date: 2024-04-16 15:16:30
 */
export async function fsdWaterQueryTreeNodeAll(data: FETCH.Req<TYPES.FSDWaterQuery>) {
  return request<FETCH.Res<TYPES.FSDWaterItem>>('/product/fsd/water/queryTreeNodeAll.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 价区及供水点 新增空行
 * @Date: 2024-04-16 15:16:37
 */
export async function fsdWaterSaveBlankRow(data: TYPES.FSDWaterQuery, current?: TYPES.FSDWaterItem) {
  let level;
  if (data?.level == '1') level = current?.level || '1';

  if (data?.level == '2') {
    level = +(current?.level || 1) + 1;
    if (level > 3) {
      message.error('已达到最大层级！');
      return { status: 'ERROR' };
    }
  }

  return request<FETCH.Res>('/product/fsd/water/saveBlankRow.action', {
    method: 'POST',
    data: { ...data, level },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 价区及供水点 更新行
 * @Date: 2024-04-16 15:16:44
 */
export async function fsdWaterUpdateRow(
  data: FETCH.CellEditReq,
  params?: TYPES.FSDWaterQuery,
  p?: any,
  item?: TYPES.FSDWaterItem,
) {
  if (data.filedName === 'waterRatio' && item?.level == '3') return { status: 'ERROR' };
  return request<FETCH.Res>('/product/fsd/water/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 价区及供水点 删除行
 * @Date: 2024-04-16 15:17:02
 */
export async function fsdWaterDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/product/fsd/water/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 价区及供水点 保存
 * @Date: 2024-04-16 15:17:19
 */
export async function fsdWaterUpdateFsdWater(data: TYPES.FSDWaterItem) {
  return request<FETCH.Res>('/product/fsd/water/updateFsdWater.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-风水电 价区及供水点 计算
 * @Date: 2024-04-16 15:17:26
 */
export async function fsdWaterCompute(data: TYPES.FSDWaterQuery) {
  return request<FETCH.Res>('/product/fsd/water/compute.action', {
    method: 'POST',
    data,
  });
}

export const fsdwaterDataModel: any = {
  waterName: '', // 供水名称 1
  waterPrice: '', // 供水金额 1
  waterRatio: 0, // 供水比例(%) 1
  waterAmortizationPrice: 0, // 供水设施维修摊销费 1
  waterUtilizationRate: 0, // 能量利用系数 1
  waterRatedCapacity: 0, // 水泵额定容量之和 1
  waterOutputRatio: 0, // 水泵出力系数 1
  waterAdditionalPrice: 0, // 取水附加费 1
  waterPumpMatCode: '', // 水泵编码 1
  waterPumpMatName: '', // 水泵名称 1
  waterPumpMatPrice: 0, // 水泵总费用 1
  waterRate: 0, // 系数 1
  waterBasePrice: 0, // 取水基价 1
  level: '', // 层级
};
