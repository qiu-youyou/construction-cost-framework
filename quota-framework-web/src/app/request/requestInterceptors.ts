/*
 * @Author: SHUANG
 * @Date: 2022-08-21 09:56:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-13 16:58:52
 * @Description:
 */
import qs from 'qs';
import { getToken } from '../../utils/auth/authorization';
import type { RequestOptionsInit } from 'umi-request';

const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const headers = {
    Token: getToken(),
    'Content-Type':
      url.includes('/login') || url.includes('/updatePwd.action')
        ? 'application/json; charset=UTF-8'
        : 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  if (options?.requestType == 'json') {
    headers['Content-Type'] = 'text/html';
  }

  let data;
  if (options?.requestType == 'json') data = options.data;
  else data = qs.stringify({ ...options.data }, { indices: false });

  return {
    url: `${url}`,
    options:
      url.includes('/login') || url.includes('/updatePwd.action')
        ? { ...options, interceptors: true, headers }
        : options?.requestType === 'form'
        ? { ...options, interceptors: true }
        : { ...options, interceptors: true, headers, data },
  };
};

export default authHeaderInterceptor;
