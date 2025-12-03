/*
 * @Author: SHUANG
 * @Date: 2024-03-14 17:28:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 17:31:38
 * @Description: 工程造价-工程量清单编制-综合单价 单价分析表
 */
/** 引用 标准综合单价 单价分析表 */
import { UnitPriceAnalysisItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/UnitPriceAnalysisTable/typings';
import { request } from 'umi';

export type ProductUnitPriceAnalysisQuery = {
  unitPriceId: string; // 	综合单价行ID
  projectId: string; // 	项目ID
  stageId: string; // 	阶段ID
  unitPriceNormId?: string; // 	定额ID
};

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 综合单价-单价分析表
 * @Date: 2024-03-14 17:28:57
 */
export async function productUnitPriceAnalysisQueryPageInfo(data: FETCH.Req<ProductUnitPriceAnalysisQuery>) {
  return request<FETCH.Res<UnitPriceAnalysisItem>>('/product/unitprice/analysis/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-综合单价 定额-单价分析表
 * @Date: 2024-03-14 17:28:57
 */
export async function productUnitPriceAnalysisQueryPageInfoByNorm(
  data: FETCH.Req<ProductUnitPriceAnalysisQuery>,
) {
  return request<FETCH.Res<UnitPriceAnalysisItem>>('/product/unitprice/analysis/queryPageInfoByNorm.action', {
    method: 'POST',
    data,
  });
}
