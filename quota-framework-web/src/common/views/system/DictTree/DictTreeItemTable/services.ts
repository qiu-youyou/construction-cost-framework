/*
 * @Author: SHUANG
 * @Date: 2024-04-08 14:04:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 16:59:35
 * @Description: 树形字典
 */
import { request } from 'umi';
import * as TYPES from '../typings';

/**
 * @Author: SHUANG
 * @Description: 树形字典维护 查询
 * @Date: 2024-04-08 14:15:46
 */
export async function dictTreeItemQueryPageInfo(data: FETCH.Req & { businessId: string }) {
  return request<FETCH.Res<TYPES.DictTreeItem>>('/sys/dict/tree/item/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 树形字典维护 保存
 * @Date: 2024-04-08 14:19:16
 */
export async function dictTreeItemClassSave(data: Partial<TYPES.DictTreeItem>) {
  return request<FETCH.Res>('/sys/dict/tree/item/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 树形字典维护 状态
 * @Date: 2024-04-08 14:19:32
 */
export async function dictTreeItemUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/dict/tree/item/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 树形字典维护 删除
 * @Date: 2024-04-08 14:19:47
 */
export async function dictTreeItemDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/dict/tree/item/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
