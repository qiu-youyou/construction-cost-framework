/*
 * @Author: SHUANG
 * @Date: 2023-11-21 11:55:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-21 17:39:23
 * @Description: 定额标准发布 定额输出参数设置
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 定额标准发布 定额输出参数设置 查询输出参数
 * @Date: 2023-11-21 11:56:39
 */
export async function dbReleaseQueryOneSettings() {
  return request<FETCH.Row<TYPES.DbReleaseSettingsItem>>(
    '/business/database/ext/report/queryOneSettings.action',
    {
      method: 'POST',
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 定额标准发布 定额输出参数设置 保存输出参数
 * @Date: 2023-11-21 11:57:03
 */
export async function dbReleaseSaveSettings(data: TYPES.DbReleaseSettingsItem) {
  return request<FETCH.Res>('/business/database/ext/report/saveSettings.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 输出Excel
 * @Date: 2023-11-21 14:20:05
 */
export async function dbReleaseExportExcel(data: TYPES.DbReleaseSettingsItem & { jsonStr: any }) {
  return request<FETCH.Res>('/business/database/ext/report/exportExcel.action', {
    method: 'POST',
    responseType: 'blob',
    getResponse: true,
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 输出PDF
 * @Date: 2023-11-21 14:20:05
 */
export async function dbReleaseExportPdf(data: TYPES.DbReleaseSettingsItem & { jsonStr: any }) {
  return request<FETCH.Res>('/business/database/ext/report/exportPdf.action', {
    method: 'POST',
    responseType: 'blob',
    getResponse: true,
    data,
  });
}
