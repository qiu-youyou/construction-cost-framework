/*
 * @Author: SHUANG
 * @Date: 2022-09-01 15:18:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-14 17:39:24
 * @Description:
 */
import { request } from 'umi';

/**
 * @Author: SHUANG
 * @Description: 查询字段
 * @Date: 2022-10-06 09:49:00
 */
export async function customQueryFlied(data: { customKey?: string }) {
  return request<FETCH.Res<any>>('/sys/custom/query/queryFlied.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询模板
 * @Date: 2022-10-06 09:51:21
 */
export async function customQueryModel(data: { customKey?: string }) {
  return request<FETCH.Row<any>>('/sys/custom/query/queryModel.action', {
    method: 'POST',
    data,
  });
}
