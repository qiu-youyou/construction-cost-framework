/*
 * @Author: SHUANG
 * @Date: 2023-07-13 13:55:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-04 18:05:03
 * @Description:
 */
const systemName = 'XX基础平台(jd-framework-web)';

export type Settings = USER.SysSettings;

const localSettings: Settings = {
  systemName,
  waterMark: '',
  pageTitle: '',
  loginTitle: '',
  headerTitle: '',
  logoTitle: 'XXXX',
  copyright: 'XXXX有限公司',
  homeVersion: '服务电话：010-00000000',
  loginMode: 'accountAndScan',

  primaryColor: '#00489d',
  appLayout: false,
};

module.exports = localSettings;
