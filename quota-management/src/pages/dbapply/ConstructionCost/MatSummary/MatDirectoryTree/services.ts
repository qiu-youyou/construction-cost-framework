/*
 * @Author: SHUANG
 * @Date: 2024-03-14 15:05:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 13:45:36
 * @Description: 工程造价-人材机汇总与调价 目录
 */
import { request } from 'umi';

export type MatSumDirectoryItem = {
  matName: string;
  matRcjType: string;
  matIsMain: string;
  parentId: string;
  hasChildren: any;
};

/**
 * @Author: SHUANG
 * @Description: 工程造价-人材机汇总与调价 目录 查询
 * @Date: 2024-03-14 15:06:19
 */
export async function matSumDirectoryQueryMatClassify() {
  return request<FETCH.Res<MatSumDirectoryItem>>('/product/unitprice/norm/mat/sum/queryMatClassify.action', {
    method: 'POST',
  });
}
