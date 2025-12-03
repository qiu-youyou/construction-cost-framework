/*
 * @Author: SHUANG
 * @Date: 2023-10-07 15:10:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-07 16:06:20
 * @Description:
 */
const bulletin = require('jd-framework-web/package/mock/common/home/bulletin');
const loginfo = require('jd-framework-web/package/mock/common/home/loginfo');
const notice = require('jd-framework-web/package/mock/common/home/notice');
const shortcut = require('jd-framework-web/package/mock/common/home/shortcut');
const task = require('jd-framework-web/package/mock/common/home/task');

export default { ...bulletin, ...loginfo, ...notice, ...shortcut, ...task };
