/*
 * @Author: SHUANG
 * @Date: 2023-06-25 14:46:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-03 17:28:27
 * @Description: 配置错误处理
 */

import { loginPath } from '@/common/constant/path';
import { setToken } from '../../utils/auth/authorization';
import { history, RequestConfig } from 'umi';

// 是否为 dev 环境
const isDev = process.env.NODE_ENV === 'development';

// 处理单点登录
export const SSOMessage = 5003; // 接收到该状态重定向到单点登录
const adaptorHandleSSO = (errorReturn: any) => {
  // 开发环境不生效
  setToken('');
  if (isDev) history.push(loginPath);
  // else window.location.href = '/sso/oauth2/redirect';
  return errorReturn;
};

// 处理TOKEN过期
export const UnTokenMessage = 5004; // TOKEN 失效
const adaptorHandleUnToken = (errorReturn: any) => {
  setToken('');
  history.push(loginPath);
  return errorReturn;
};

// 强制修改密码
export const ForceChangePassMessage = 5005; // 需要修改密码

// 以下接口不做错误处理 PS: 完整URL 带 ‘/’ 不带 prefix
const adaptorIgnoreUrl = ['/business/settle/listing/checkVisaDetailTotalPrice.action'];

export const errorConfig: RequestConfig['errorConfig'] = {
  // 当后端接口不满足该规范的时候你需要通过该配置 把后端接口数据转换为该格式，
  // 该配置只是用于错误处理，不会影响最终传递给页面的数据格式。
  adaptor: (res, ctx) => {
    // 失败返回
    const errorReturn = {
      data: [],
      success: false,
      errorCode: res?.code,
      errorMessage: res?.message,
      status: res?.status,
    };

    // 成功返回
    const successReturn = {
      data: res?.data,
      errorCode: res?.code,
      errorMessage: res?.message,
      success: res?.status == 'SUCCESS',
      status: res?.status,
    };

    /** 重定向到本系统单点登录 */
    if (res.code == SSOMessage) return adaptorHandleSSO(errorReturn);

    /** token 过期 重新登录 */
    if (res.code == UnTokenMessage) return adaptorHandleUnToken(errorReturn);

    /** 处理 blob 形式 */
    if (res instanceof Blob) return { success: true, data: res };

    /** 排除检查类接口 即使接口失败 也视为成功 */
    const reqUrl = ctx?.req?.options?.url;
    if (reqUrl && adaptorIgnoreUrl.includes(reqUrl))
      return { ...errorReturn, success: true, data: res?.data };

    /** 定义返回 */
    return successReturn;
  },
};
