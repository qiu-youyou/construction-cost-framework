/*
 * @Author: SHUANG
 * @Date: 2022-08-29 16:23:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-19 18:03:48
 * @Description:
 */
import { request } from 'umi';

type UserColumnConfig = {
  configType?: string; // 配置类型:默认(repair)
  configPosition: string; // 配置的位置
  configContent?: string; // 由前台自定义
};

/**
 * @Author: SHUANG
 * @Description: 用户配置表保存
 * @Date: 2022-10-23 10:16:00
 */
export async function saveUserColumnConfig(data: UserColumnConfig) {
  return request<FETCH.Res>('/sys/column/config/save.action', {
    method: 'POST',
    data: { configType: 'columns', ...data },
  });
}

/**
 * @Author: SHUANG
 * @Description: 用户配置表读取
 * @Date: 2022-10-23 10:24:32
 */
export async function queryUserColumnConfig(data: UserColumnConfig) {
  return request<FETCH.Row<UserColumnConfig>>('/sys/column/config/queryOne.action', {
    method: 'POST',
    data: { configType: 'columns', ...data },
  });
}
