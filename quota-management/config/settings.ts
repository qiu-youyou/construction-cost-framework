/*
 * @Author: SHUANG
 * @Date: 2023-07-13 13:55:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-27 13:33:45
 * @Description:
 */
const systemName = '中南院';

export type Settings = USER.SysSettings;

const localSettings: Settings = {
  systemName,
  waterMark: '',
  pageTitle: '',
  loginTitle: '',
  headerTitle: '',
  logoTitle: 'XXXX',
  copyright: 'XXXX公司',
  homeVersion: '服务电话：010-00000000',

  primaryColor: '#00489d',
  // primaryColor: '#144eb1',
  appLayout: false,
};

export default localSettings;
