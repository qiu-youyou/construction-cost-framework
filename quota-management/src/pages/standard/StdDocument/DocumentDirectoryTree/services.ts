/*
 * @Author: SHUANG
 * @Date: 2023-11-10 15:06:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-23 16:56:25
 * @Description: 项目相关设计文档目录结构
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 项目相关设计文档目录结构 查询
 * @Date: 2023-11-10 15:15:21
 */
export async function otherDocumentQueryTreeNodeAll() {
  return request<FETCH.Res<TYPES.DocumentDirectoryItem>>(
    '/business/database/other/document/queryTreeNodeAll.action',
    {
      method: 'POST',
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 项目相关设计文档目录结构 保存
 * @Date: 2023-11-10 15:16:34
 */
export async function otherDocumentSave(data: TYPES.DocumentDirectorySaveParams) {
  return request<FETCH.Res<TYPES.DocumentDirectoryItem>>('/business/database/other/document/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目相关设计文档目录结构 删除 ByIds
 * @Date: 2023-11-10 15:17:41
 */
export async function otherDocumentDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res<TYPES.DocumentDirectoryItem>>(
    '/business/database/other/document/deleteByIds.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 项目相关设计文档目录结构 启用禁用
 * @Date: 2023-11-10 15:18:49
 */
export async function otherDocumentUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res<TYPES.DocumentDirectoryItem>>(
    '/business/database/other/document/updateStatusByIds.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 项目相关设计文档目录结构 顺序交换
 * @Date: 2023-11-23 16:47:42
 */
export async function otherDocumentSortSwap(data: { arg1: string; arg2: string }) {
  return request<FETCH.Res>('/business/database/other/document/sortSwap.action', {
    method: 'POST',
    data: { ids: [data?.arg1, data?.arg2] },
  });
}
