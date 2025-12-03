/*
 * @Author: SHUANG
 * @Date: 2024-03-06 14:26:01
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-06 14:30:30
 * @Description: 产品 - 查看表达式
 */
import { request } from 'umi';
import { OtherSummaryQuery } from '../typings';

export type ProductExpItem = {
  id: string; //	无
  projectId: string; //	项目ID
  stageId: string; //	阶段ID
  expFeeCode: string; //	取费表达式编码
  expFeeName: string; //	取费表达式名称
  expFeeType: string; //	取费表达式类型
  expFeeValue: string; //	取费表达式值
};

/**
 * @Author: SHUANG
 * @Description: 产品 - 查看表达式 查询
 * @Date: 2024-02-28 15:44:03
 */
export async function productExpQueryPageInfo(data: FETCH.Req<OtherSummaryQuery>) {
  return request<FETCH.Res<ProductExpItem>>('/product/exp/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}
