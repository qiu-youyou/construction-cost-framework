/*
 * @Author: SHUANG
 * @Date: 2024-03-14 15:24:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 11:42:22
 * @Description: 工程造价-人材机汇总与调价 表
 */
import { request } from 'umi';
import * as TYPES from './typings';
import { InventoryItem } from '../../CostPreparation/InventoryTable/typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价-人材机汇总与调价 表 查询
 * @Date: 2024-03-14 15:24:32
 */
export async function matSummaryQueryPageInfo(data: FETCH.Req<TYPES.MatSummaryQuery>) {
  if (!data?.matRcjType) {
    delete data.matRcjType;
  }
  return request<FETCH.Res<TYPES.MatSummaryItem>>(
    '/product/unitprice/norm/mat/sum/queryAggregateTalentAndMachine.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-人材机汇总与调价 行编辑 修改价格（市场价）
 * @Date: 2024-03-15 14:56:43
 */
export async function matSummaryUpdateByMatCode(data: any) {
  return request<any>('/product/unitprice/norm/mat/sum/updateByMatCode.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-人材机汇总与调价 查看相关定额
 * @Date: 2024-03-15 14:48:44
 */
export async function matSummaryQueryNormByProductPriceNormMatCode(data: FETCH.Req<TYPES.MatSummaryQuery>) {
  return request<FETCH.Res<TYPES.MatSummaryNormItem>>(
    '/product/unitprice/norm/mat/sum/queryNormByProductPriceNormMatCode.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-人材机汇总与调价 查看相关清单
 * @Date: 2024-03-18 14:59:03
 */
export async function matSummaryQueryInventoryByProductPriceNormCode(data: FETCH.Req<TYPES.MatSummaryQuery>) {
  return request<FETCH.Res<InventoryItem>>(
    '/product/unitprice/norm/mat/sum/queryInventoryByProductPriceNormCode.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-人材机汇总与调价 查询材料分类汇总
 * @Date: 2024-03-18 17:33:42
 */
export async function matSummaryQueryMatTypeSummary(data: FETCH.Req<TYPES.MatSummaryQuery>) {
  return request<FETCH.Res<TYPES.MatTypeSummaryItem>>(
    '/product/unitprice/norm/mat/sum/queryMatTypeSummary.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-人材机汇总与调价 应用组时费
 * @Date: 2024-03-29 11:05:37
 */
export async function matSummaryUpdateByMultiformMechanicalId(
  data: TYPES.MatSummaryUpdateByMultiformMechanical,
) {
  return request<FETCH.Res>('/product/unitprice/norm/mat/sum/updateByMultiformMechanicalId.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-人材机汇总与调价 查询配合比
 * @Date: 2024-04-26 11:38:28
 */
export async function matSummaryQueryPageInfoByParentId(
  data: Partial<TYPES.MatSummaryUpdateByMultiformMechanical>,
) {
  return request<FETCH.Res>('/product/unitprice/norm/mat/sum/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}
