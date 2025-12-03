/*
 * @Author: SHUANG
 * @Date: 2024-03-12 17:06:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-12 17:09:15
 * @Description: 工程造价-工程量清单编制-定额 - 取费表达式
 */
import { UnitPriceNormItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/typings';
import { request } from 'umi';

// 查询参数
type ExpQuery = {
  unitPriceId: string; //	综合单价库ID
  projectId: string; //	项目ID
  stageId: string; //	阶段ID
  unitPriceNormId: string; //	综合单价定额ID
};

/**
 * @Author: SHUANG
 * @Description: 工程造价-工程量清单编制-定额 - 取费表达式 查询
 * @Date: 2024-03-12 17:07:33
 */
export async function productUnitPriceNormExpQueryPageInfo(data: FETCH.Req<ExpQuery>) {
  return request<FETCH.Res<UnitPriceNormItem>>('/product/unitprice/norm/exp/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}
