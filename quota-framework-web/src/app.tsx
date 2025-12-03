/*
 * @Author: SHUANG
 * @Date: 2023-06-15 19:48:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 11:29:27
 * @Description: 约定 src/app.tsx 为运行时配置。
 * 运行时配置和配置的区别是他跑在浏览器端，基于此，我们可以在这里写函数、jsx、import 浏览器端依赖等等，注意不要引入 node 依赖。
 */

import { getInitialStateConfig } from './app/initialState';
import { configProvider } from './app/provider';
import Loading from './common/views/result/Loading';
import { requestConfig } from './app/request';
import layoutConfig from './app/layout';
/** 获取用户信息比较慢的时候会展示一个 loading
 *  When it is slow to obtain user information, a loading will be displayed */
export const initialStateConfig = { loading: <Loading /> };

/** 约定一个地方生产和消费初始化数据。
 * Agree on a local production and consumption initialization data */
export const getInitialState = getInitialStateConfig;

/** https://github.com/umijs/umi-request */
export const request = requestConfig;

export const layout = layoutConfig;
configProvider();
