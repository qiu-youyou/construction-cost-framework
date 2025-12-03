/*
 * @Author: SHUANG
 * @Date: 2023-11-13 17:14:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 13:57:28
 * @Description: 清单项目特征与定额参数特征映射库
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 清单项目特征与定额参数特征映射库 查询
 * @Date: 2023-11-13 17:14:30
 */
export async function propertiesParamsQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.PropertiesParamsItem>>(
    '/business/database/other/properties/params/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 清单项目特征与定额参数特征映射库 新增空行
 * @Date: 2023-11-13 17:15:38
 */
export async function propertiesParamsSaveBlankRow(data: TYPES.PropertiesParamsSaveParams) {
  return request<FETCH.Res>('/business/database/other/properties/params/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 清单项目特征与定额参数特征映射库 行编辑
 * @Date: 2023-11-13 17:16:22
 */
export async function propertiesParamsUpdateRow(data: FETCH.CellEditReq) {
  return request<FETCH.Res>('/business/database/other/properties/params/updateRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 清单项目特征与定额参数特征映射库 顺序交换
 * @Date: 2023-11-13 17:17:27
 */
export async function propertiesParamsSortSwap(data: { arg1: string; arg2: string }) {
  return request<FETCH.Res>('/business/database/other/properties/params/sortSwap.action', {
    method: 'POST',
    data: { ids: [data.arg1, data.arg2] },
  });
}

/**
 * @Author: SHUANG
 * @Description: 清单项目特征与定额参数特征映射库 删除
 * @Date: 2023-11-13 17:18:29
 */
export async function propertiesParamsDeleteByIds(data: { ids: string[] }) {
  return request<FETCH.Res>('/business/database/other/properties/params/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 清单项目特征与定额参数特征映射库 查询同步清单特征表
 * @Date: 2023-11-13 17:19:01
 */
export async function propertiesParamSyncDetailProperties() {
  return request<FETCH.Res<TYPES.PropertiesParamsSyncBillItem>>(
    '/business/database/other/properties/params/syncDetailProperties.action',
    {
      method: 'POST',
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 清单项目特征与定额参数特征映射库 查询定额参数表
 * @Date: 2023-11-13 17:20:02
 */
export async function propertiesParamQueryNormParams(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.PropertiesParamsNormParamsItem>>(
    '/business/database/other/properties/params/queryNormParams.action',
    {
      method: 'POST',
      data,
    },
  );
}
