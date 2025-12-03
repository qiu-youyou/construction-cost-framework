/*
 * @Author: SHUANG
 * @Date: 2023-01-03 10:48:17
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-24 16:08:46
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 通知列表查询
 * @Date: 2023-07-24 16:11:24
 */
export async function businessNoticeQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.NoticeListItem>>('/sys/business/notice/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 点击查看通知明细前接口 点击查看通知前接口-异步调用查看状态更新
 * @Date: 2022-10-21 15:31:46
 */
export async function noticeViewUpdate(noticeId: string) {
  return request<FETCH.Res>('/sys/business/notice/viewUpdate.action', {
    method: 'POST',
    data: { noticeId },
  });
}
