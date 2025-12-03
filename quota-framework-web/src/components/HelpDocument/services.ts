/*
 * @Author: SHUANG
 * @Date: 2023-02-10 15:42:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-19 18:21:46
 * @Description:
 */
import { request } from 'umi';

/**
 * @Author: SHUANG
 * @Description: 视频播放url
 * @Date: 2023-02-10 15:42:23
 */
export async function businessexcelVideoPlay(data: { videoType: string }) {
  return request<FETCH.Row>('/businessexcel/common/video/play.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 帮助文档
 * @Date: 2023-04-19 09:24:03
 */
export async function businessexcelDocumentPlay(data: { fileType: string }) {
  return request<FETCH.Row>('/businessexcel/common/prompt/document.action', {
    method: 'POST',
    responseType: 'blob',
    getResponse: true,
    data,
  });
}
