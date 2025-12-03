/*
 * @Author: SHUANG
 * @Date: 2022-08-29 16:23:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-13 16:57:53
 * @Description:
 */
import { request } from 'umi';

/**
 * @Author: SHUANG
 * @Description: 全局字典表
 * @Date: 2022-09-01 17:38:36
 */
export async function queryDictItemByClassCode(classEns: string[]) {
  return request<FETCH.Row<SYS.DictDefine>>(`/sys/dict/item/queryDictItemByClassCode.action`, {
    method: 'POST',
    data: { 'classEns[]': classEns },
  });
}

/**
 * @Author: SHUANG
 * @Description: 全局业务字典表
 * @Date: 2023-07-12 11:19:42
 */
export async function businessDictQueryPageInfo() {
  return request<FETCH.Res>(`/sys/business/queryPageInfo.action`, {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 模型相关字典
 * @Date: 2022-09-01 17:38:18
 */
export async function queryModelSelectParams() {
  return request<FETCH.Res>('/workflow/select/queryModelSelectParams.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 静态文件上传
 * @Date: 2023-05-18 13:59:50
 */
export async function staticResourceUpload(data: FormData) {
  return request<FETCH.Res>('/sys/static/attachment/otherUpload.action', {
    requestType: 'form',
    method: 'POST',
    data: data,
  });
}
