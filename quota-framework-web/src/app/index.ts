/*
 * @Author: SHUANG
 * @Date: 2023-09-25 16:55:17
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 11:32:44
 * @Description: 统一导出资源
 */

import { configProvider } from './provider';
export const JDCONFProvider = { configProvider };

/** initialState */
import { getInitialStateConfig } from './initialState';
export const JDCONFInitialState = { getInitialStateConfig };

/** layout */
import layoutConfig from './layout/index';
import onPageChange from './layout/onPageChange';
export const JDCONFLayout = { layoutConfig, onPageChange };

/** render */
import HeaderRightRender from './render/HeaderRightRender';
import SwitchTabsLayout from './render/SwitchTabsLayout';
import childrenRender from './render/childrenRender';
export const JDCONFRender = {
  HeaderRightRender,
  SwitchTabsLayout,
  childrenRender,
};

/** request */
import { SSOMessage, UnTokenMessage, ForceChangePassMessage, errorConfig } from './request/errorConfig';
import { errorHandler } from './request/errorHandler';
import { requestConfig } from './request/index';
import requestInterceptors from './request/requestInterceptors';
import responseInterceptors from './request/responseInterceptors';

export const JDCONFRequest = {
  SSOMessage,
  UnTokenMessage,
  ForceChangePassMessage,
  errorConfig,
  errorHandler,
  requestConfig,
  requestInterceptors,
  responseInterceptors,
};
