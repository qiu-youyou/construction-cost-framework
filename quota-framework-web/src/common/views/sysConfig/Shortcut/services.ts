/*
 * @Author: SHUANG
 * @Date: 2023-07-25 15:21:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-25 15:29:08
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 系统快捷键维护查询
 * @Date: 2023-07-25 15:26:52
 */
export async function shortcutQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.ShortcutListItem>>('/sys/lnk/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 系统快捷键维护保存
 * @Date: 2023-07-25 15:27:57
 */
export async function shortcutSave(data: TYPES.ShortcutItemSave) {
  return request<FETCH.Res>('/sys/lnk/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 系统快捷键维护状态
 * @Date: 2023-07-25 15:28:38
 */
export async function shortcutUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/lnk/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 系统快捷键维护删除
 * @Date: 2023-07-25 15:30:02
 */
export async function shortcutDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/lnk/deleteByIds.action', {
    method: 'POST',
    data,
  });
}
