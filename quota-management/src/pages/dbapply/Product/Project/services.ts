/*
 * @Author: SHUANG
 * @Date: 2024-01-16 09:43:39
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-31 10:15:33
 * @Description: 工程造价产品-工程信息
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 工程造价产品-工程信息 查询工程信息
 * @Date: 2024-01-31 10:12:20
 */
export async function productProjectQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.ProjectItem>>('/business/product/project/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价产品-工程信息 保存工程信息
 * @Date: 2024-01-31 10:13:56
 */
export async function productProjectSave(data: TYPES.ProjectSaveParams) {
  return request<FETCH.Res>('/business/product/project/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 工程造价产品-工程信息 删除
 * @Date: 2024-01-31 10:16:46
 */
export async function productProjectDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/product/project/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
