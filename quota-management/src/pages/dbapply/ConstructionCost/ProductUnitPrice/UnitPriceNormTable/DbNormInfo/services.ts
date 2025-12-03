/*
 * @Author: SHUANG
 * @Date: 2024-03-08 13:44:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-09 16:56:59
 * @Description: 工程造价-工程量清单编制-综合单价 定额 查看定额信息
 */

import { request } from 'umi';
import * as TYPES from './typings';
import { matMainQueryPageInfoNotExistsNormMat } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormMatContent/useServices';
import { DbNormParamsItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormParams/typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 查看定额信息 人材机查询
 * @Date: 2024-03-08 13:48:39
 */
export async function productUnitPriceNormMatQueryPageInfo(data: TYPES.ProductUnitPriceNormMatQuery & any) {
  delete data?.dbId;
  delete data?.chapterId;
  delete data?.normId;
  return request<FETCH.Res<TYPES.ProductUnitPriceNormMatItem>>(
    '/product/unitprice/norm/mat/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 查看定额信息 人材机含量更新行
 * @Date: 2024-03-12 15:23:27
 */
export async function productUnitPriceNormMatUpdateRow(data: FETCH.CellEditReq) {
  return request<FETCH.Res>('/product/unitprice/norm/mat/updateRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 查看定额信息 人材机含量删除
 * @Date: 2024-03-12 15:25:53
 */
export async function productUnitPriceNormMatDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res<TYPES.ProductUnitPriceNormMatItem>>(
    '/product/unitprice/norm/mat/deleteByIds.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description:  MAT目录对应MATCONTENT、选择明细查询
 * @Date: 2024-03-12 15:27:00
 */
export const productMatMainQueryPageInfoNotExistsNormMat = matMainQueryPageInfoNotExistsNormMat;

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 查看定额信息 添加含量
 * @Date: 2024-03-12 15:28:40
 */
export async function productUnitPriceNormInsert(data: TYPES.ProductUnitPriceNormInsert) {
  return request<FETCH.Res>('/product/unitprice/norm/mat/insertByBasicNormMatIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 参数查询
 * @Date: 2024-03-19 14:51:57
 */
export async function productUnitPriceNormParamsQueryPageInfo(
  data: FETCH.Req<TYPES.ProductUnitPriceNormMatQuery>,
) {
  return request<FETCH.Res<DbNormParamsItem>>('/product/unitprice/norm/params/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 人材机 应用组时费
 * @Date: 2024-03-29 10:31:58
 */
export async function productUnitPriceNormMatUpdateByMultiformMechanicalId(
  data: TYPES.ProductUnitPriceNormMatApplyMechanical,
) {
  return request<FETCH.Res>('/product/unitprice/norm/mat/updateByMultiformMechanicalId.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额 人材机 存入临时库
 * @Date: 2024-04-09 16:53:53
 */
export async function productUnitPriceNormMatUpdateDatabaseStatusByIds(
  data: TYPES.ProductUnitPriceNormMatQuery & { ids: string[] },
) {
  return request<FETCH.Res>('/product/unitprice/norm/mat/updateDatabaseStatusByIds.action', {
    method: 'POST',
    data,
  });
}
