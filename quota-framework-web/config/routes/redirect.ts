/*
 * @Author: SHUANG
 * @Date: 2023-09-13 11:03:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-07 16:19:06
 * @Description: 处理重定向
 */

const redirect = [{ path: '/', redirect: '/home' }, { component: '@/common/views/result/404' }];
module.exports = redirect;
