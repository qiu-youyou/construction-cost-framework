/*
 * @Author: SHUANG
 * @Date: 2024-04-08 14:04:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 16:01:18
 * @Description: 树形字典目录
 */
import { request } from 'umi';
import * as TYPES from '../typings';

/**
 * @Author: SHUANG
 * @Description: 树形字典目录维护 查询
 * @Date: 2024-04-08 14:15:46
 */
export async function dictTreeClassQueryPageInfo() {
  return request<FETCH.Res<TYPES.DictTreeClassItem>>('/sys/dict/tree/class/queryPageInfo.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 树形字典目录维护 保存
 * @Date: 2024-04-08 14:19:16
 */
export async function dictTreeClassSave(data: Partial<TYPES.DictTreeClassItem>) {
  return request<FETCH.Res>('/sys/dict/tree/class/save.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 树形字典目录维护 状态
 * @Date: 2024-04-08 14:19:32
 */
export async function dictTreeClassUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/dict/tree/class/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 树形字典目录维护 删除
 * @Date: 2024-04-08 14:19:47
 */
export async function dictTreeClassDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/dict/tree/class/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
