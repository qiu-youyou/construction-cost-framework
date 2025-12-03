/*
 * @Author: SHUANG
 * @Date: 2022-08-17 17:09:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 13:49:06
 * @Description: routes
 */
import common from './routes/common';
import redirect from './routes/redirect';
import database from './routes/database';
import standard from './routes/standard';
import dbsearch from './routes/dbsearch';
import dbapply from './routes/dbapplay';
import home from './routes/home';

const user = require('jd-framework-web/package/config/routes/common/user');

export default [
  ...home,

  ...user,

  /** 企业定额库 */
  ...database,

  /** 定额库查询 */
  ...dbsearch,

  /** 标准数据库 */
  ...standard,

  /** 企业定额应用 */
  ...dbapply,

  /** 公共模块 */
  ...common,

  /** handle redirect */
  ...redirect,
];
