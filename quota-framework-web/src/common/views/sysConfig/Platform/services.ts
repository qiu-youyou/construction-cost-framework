/*
 * @Author: SHUANG
 * @Date: 2023-07-24 09:44:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-21 17:16:44
 * @Description:
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 配置维护查询
 * @Date: 2023-07-24 09:47:25
 */
export async function sysConfigQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.SysConfigListItem>>('/sys/config/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 配置维护新增/编辑
 * @Date: 2023-07-24 11:05:53
 */
export async function sysConfigSave(data: TYPES.SysConfigListItem) {
  return request<FETCH.Res>('/sys/config/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 配置维护状态
 * @Date: 2023-07-24 11:07:06
 */
export async function sysConfigUpdateStatusByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/config/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 配置维护删除
 * @Date: 2023-07-24 11:09:23
 */
export async function sysConfigDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/config/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 载入系统配置
 * @Date: 2023-07-24 11:10:50
 */
export async function sysConfigRefreshSystemConfig(data?: FETCH.UpStatus) {
  return request<FETCH.Res>('/sys/config/refreshSystemConfig.action', {
    method: 'POST',
    data,
  });
}
