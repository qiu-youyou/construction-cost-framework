/*
 * @Author: SHUANG
 * @Date: 2023-06-29 16:24:39
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 17:18:44
 * @Description: path 常量
 */
import { JDCMDPATH } from 'jd-framework-web/package/common';

/** 系统登录url */
export const loginPath = JDCMDPATH.loginPath;

/** 系统首页配置 将会影响 switch tabs 是否可关闭,系统默认进入页等 */
export const homePath = '/home/index';

/** 用户修改密码 */
export const changePassPath = JDCMDPATH.changePassPath;

/** 用户强制修改密码 */
export const changeForcePath = JDCMDPATH.changeForcePath;

/** 流程图查看 */
export const workflowProcessViewPath = JDCMDPATH.workflowProcessViewPath;

/** 流程设计器 */
export const workflowEditorPath = JDCMDPATH.workflowEditorPath;

/** 报表设计器 */
export const reportEditorPath = JDCMDPATH.reportEditorPath;

/** 管理员登录 url */
export const adminPath = JDCMDPATH.adminPath;
