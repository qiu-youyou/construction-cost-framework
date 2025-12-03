/*
 * @Author: SHUANG
 * @Date: 2022-09-05 10:11:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-16 15:35:22
 * @Description: 不同模块 单条查询
 */
import { request } from 'umi';

/**
 * @Author: SHUANG
 * @Description: 查询主单据
 * @Date: 2022-09-05 10:43:00
 */
export async function businessQueryOne(workflowFormUrl: string, id: string, params?: any) {
  return request<FETCH.Row>(`${workflowFormUrl}/queryOne.action`, {
    method: 'POST',
    data: !!params ? params : { id },
  });
}
