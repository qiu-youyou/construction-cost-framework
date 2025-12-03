/*
 * @Author: SHUANG
 * @Date: 2022-07-06 15:49:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-12 16:40:05
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';
/**
 * @Author: SHUANG
 * @Description: 代办查询接口
 */
export async function queryTaskAssignee(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.ToDoListItem>>('/workflow/task/queryTaskAssignee.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 已办查询接口
 */
export async function todoDonequeryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.ToDoDoneListItem>>('/workflow/task/queryTaskAssigneeByVia.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 通知查询接口
 */
export async function noticeQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.NoticeListItem>>('/sys/business/notice/queryByCurrentUser.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 公告查询接口
 */
export async function sysQueryNewsPageInfo() {
  return request<FETCH.Res<TYPES.NewsListItem>>('/sys/news/queryNewsPageInfo.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 快捷功能查询接口
 */
export async function shortcutQueryPageInfo() {
  return request<FETCH.Res<TYPES.ShortcutItem>>('/sys/lnk/person/indexQueryPageInfo.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 最近登录状态查询接口
 */
export async function queryCurrentLoginPageInfo() {
  return request<FETCH.Res<TYPES.LoginsItem>>('/sys/log/operation/queryCurrentLoginPageInfo.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 链接查询接口
 */
export async function linkQueryPageInfo() {
  return request<FETCH.Res<TYPES.LinksItem>>('/sys/link/indexQueryPageInfo.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 角标查询
 * @Date: 2022-12-08 17:32:22
 */
export async function queryTaskStamp() {
  return request<FETCH.Row<TYPES.TotalMap>>('/workflow/task/stamp.action', {
    method: 'POST',
  });
}
