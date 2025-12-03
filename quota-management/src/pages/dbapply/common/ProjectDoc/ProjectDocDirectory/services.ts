/*
 * @Author: SHUANG
 * @Date: 2024-02-04 16:56:04
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 15:51:42
 * @Description: 项目文档库-目录
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 项目文档库-目录 查询
 * @Date: 2024-02-04 16:57:58
 */
export async function projectDocDirectoryQueryTreeNodeAll(data: TYPES.ProjectDocDirectoryQuery) {
  return request<FETCH.Res<TYPES.ProjectDocDirectoryItem>>(
    '/business/product/project/product/info/doc/directory/queryTreeNodeAll.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 项目文档库-目录 保存
 * @Date: 2024-02-04 16:59:59
 */
export async function projectDocDirectorySave(data: TYPES.ProjectDocDirectorySaveParams) {
  return request<FETCH.Res>('/business/product/project/product/info/doc/directory/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目文档库-目录 删除
 * @Date: 2024-02-04 17:00:40
 */
export async function projectDocDirectoryDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/product/project/product/info/doc/directory/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 项目文档库-目录 项目相关设计文档库同步
 * @Date: 2024-02-04 17:01:38
 */
export async function projectDocDirectoryBatchInsert(data: TYPES.ProjectDocDirectoryQuery) {
  return request<FETCH.Res>(
    '/business/product/project/product/info/doc/directory/batchInsertByDocumentDirectory.action',
    {
      method: 'POST',
      data,
    },
  );
}
