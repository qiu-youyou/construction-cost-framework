/*
 * @Author: SHUANG
 * @Date: 2023-10-07 15:11:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-07 16:07:15
 * @Description:
 */
const business = require('jd-framework-web/package/mock/common/system/business');
const dict = require('jd-framework-web/package/mock/common/system/dict');
const log = require('jd-framework-web/package/mock/common/system/log');
const menu = require('jd-framework-web/package/mock/common/system/menu');
const organ = require('jd-framework-web/package/mock/common/system/organ');
const role = require('jd-framework-web/package/mock/common/system/role');
const routes = require('jd-framework-web/package/mock/common/system/routes');
const system = require('jd-framework-web/package/mock/common/system/system');
const tests = require('jd-framework-web/package/mock/common/system/test');
const user = require('jd-framework-web/package/mock/common/system/user');

export default {
  ...business,
  ...dict,
  ...log,
  ...menu,
  ...organ,
  ...role,
  ...routes,
  ...system,
  ...tests,
  ...user,
};
