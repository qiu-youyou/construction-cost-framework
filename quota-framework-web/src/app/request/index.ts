/*
 * @Author: SHUANG
 * @Date: 2022-07-13 11:43:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-25 18:02:09
 * @Description: 请求相关配置
 */

import { RequestConfig } from 'umi';
import requestInterceptors from './requestInterceptors';
import responseInterceptors from './responseInterceptors';
import { errorHandler } from './errorHandler';
import { errorConfig } from './errorConfig';

// 是否为 dev 环境
const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? '/api' : '/web/server';

export const requestConfig: RequestConfig = {
  prefix: baseUrl, // 接口请求地址
  // timeout: 10000, // 接口超时时间
  credentials: 'include', // 是否携带cookie
  requestInterceptors: [requestInterceptors],
  responseInterceptors: [responseInterceptors],
  errorHandler,
  errorConfig,
};
