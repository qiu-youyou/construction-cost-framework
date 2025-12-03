/*
 * @Author: SHUANG
 * @Date: 2022-08-17 17:09:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-22 14:48:42
 * @Description: routes
 */

const common = require('./routes/common');
const redirect = require('./routes/redirect');
import demo from './routes/demo';

const { APP_ENV } = process.env;

export default [
  /** 公共模块 */
  ...common,

  /** your Routes */

  /** dev mode show demo */
  ...demo,

  /** handle redirect */
  ...redirect,
];
