/*
 * @Author: SHUANG
 * @Date: 2023-05-19 09:44:27
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 17:31:05
 * @Description: 重大问题反馈及投诉
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 问题及反馈查询
 * @Date: 2023-05-19 09:47:30
 */
export async function largeIssueQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.IssueListItem>>('/sample/large/issue/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 问题及反馈 新增 / 修改
 * @Date: 2023-05-19 09:48:04
 */
export async function largeIssueSave(data: TYPES.IssueSaveAction) {
  return request<FETCH.Row>('/sample/large/issue/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 问题及反馈 删除
 * @Date: 2023-05-19 09:48:39
 */
export async function largeIssueDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sample/large/issue/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 问题及反馈 导出
 * @Date: 2023-05-19 10:18:18
 */
export async function largeIssueExport(data: FETCH.Req) {
  return request<FETCH.Res>('/businessexcel/large/issue/export.action', {
    method: 'POST',
    responseType: 'blob',
    getResponse: true,
    data: data,
  });
}
