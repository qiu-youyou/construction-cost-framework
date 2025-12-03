/*
 * @Author: SHUANG
 * @Date: 2022-09-03 09:47:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-13 16:57:18
 * @Description:
 */

import { request } from 'umi';
import { AttachmentListItem } from './typing';

/**
 * @Author: SHUANG
 * @Description: 附件列表查询
 * @Date: 2022-09-29 20:59:17
 */
export async function attachmentQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<AttachmentListItem>>('/sys/attachment/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 附件上传
 * @Date: 2022-09-29 21:00:05
 */
export async function attachmentUpload(data: FormData) {
  return request<FETCH.Res>('/sys/attachment/upload.action', {
    requestType: 'form',
    method: 'POST',
    data: data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 附件删除
 * @Date: 2023-05-09 17:41:28
 */
export async function attachmentDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/attachment/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 下载
 * @Date: 2022-09-19 22:28:16
 */
export async function attachmentDownloadById(data: { businessId: string; id: string }) {
  return request<FETCH.Res>('/sys/attachment/downloadById.action', {
    method: 'POST',
    responseType: 'blob',
    getResponse: true,
    data: data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 下载附件地址
 * @Date: 2023-01-05 12:03:03
 */
export const attachmentDownloadPath = '/sys/attachment/downloadById.action';
