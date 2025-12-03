/*
 * @Author: SHUANG
 * @Date: 2023-07-25 11:33:47
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 17:03:09
 * @Description: common
 */

const user = require('./user');
const home = require('./home');
const system = require('./system');
const monitor = require('./monitor');
const message = require('./message');
const workflow = require('./workflow');
const config = require('./sysConfig');
const outWindow = require('./OutWindow');

let common = [...user, ...home, ...config, ...system, ...monitor, ...workflow, ...message, ...outWindow];
module.exports = common;
