/*
 * @Author: SHUANG
 * @Date: 2023-06-19 17:02:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-29 10:18:17
 * @Description:
 */
/* eslint-disable */
export type CurrentUser = {
  name: string;
  status: string;
  avatar?: string;
  userid?: string;
  notifyCount?: number;
  unreadCount?: number;
};

export type LoginResult = {
  code: string | number;
  status: string;
  rows?: string;
};

export type LoginParams = {
  username?: string;
  password?: string;
  autoLogin?: boolean;
  type?: string;
};

export type PassParams = {
  oldPassword?: string;
  newPassword?: string;
};

export type MenuItem = {
  key: any;
  icon: string;
  path: string;
  name: string;
  target: string;
  btns: string[];
  link: string;
  children?: MenuItem[];
  meta: { title: string };
};

export type SysSettings = {
  /**
   * @name homeVersion
   * @description 服务电话、版权信息配置
   * @type string
   */
  homeVersion?: string;

  /**
   * @name loginBackgroundImg
   * @description 登录背景图片配置
   * @type string
   */
  loginBackgroundImg?: string;

  /**
   * @name logoImg
   * @description 系统logo配置
   * @type string
   */
  logoImg?: string;

  /**
   * @name systemName
   * @description 系统名称
   * @type string
   */
  systemName?: string;

  /**
   * @name key
   * @description 登录加密公钥
   * @type stirng
   */
  key?: string;
} & {
  /**
   * @name systemName
   * @description 系统名称
   * @type string
   */
  systemName: string;

  /**
   * @name logoTitle
   * @description  logo显示文字
   * @type string
   * @default systemName
   */
  logoTitle: string;

  /**
   * @name pageTitle
   * @description 浏览器标签显示的文字
   * @type string
   * @default systemName
   */
  pageTitle: string;

  /**
   * @name loginTitle
   * @description 登录框显示文字
   * @type string
   * @default systemName
   */
  loginTitle: string;

  /**
   * @name headerTitle
   * @description 系统Header栏显示文字
   * @type string
   * @default systemName
   */
  headerTitle: string;

  /**
   * @name waterMark
   * @description 系统水印显示文字
   * @type string
   * @default systemName
   */
  waterMark: string;

  /**
   * @name copyright
   * @description 系统中显示的版权信息
   * @type string
   * @default XXXX有限公司
   */
  copyright: string;

  /**
   * @name primaryColor
   * @description  系统主题色
   * @type string
   * @default #00489d
   */
  primaryColor: string;

  /**
   * @name appLayout
   * @description 系统 layout
   * @type false | side | top | mix
   * @default side
   */
  appLayout: false | 'side' | 'top' | 'mix';

  /**
   * @name loginMode
   * @description 登录模式
   * @type account | scan
   * @default account
   */
  loginMode?: 'account' | 'scan' | 'accountAndScan';
};
