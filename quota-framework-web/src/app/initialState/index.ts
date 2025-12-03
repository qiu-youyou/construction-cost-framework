/*
 * @Author: SHUANG
 * @Date: 2022-08-05 15:26:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 17:48:59
 * @Description: 运行时
 */
import { history } from 'umi';

import localSettings, { Settings } from '/config/settings';
import { homePath, loginPath } from '@/common/constant/path';
import { fetchMenuData, fetchUserInfo, fetchSysConfig } from '../../common/services/user';

import { handleNoLocalesMenu } from '../../utils/auth/authorization';
import { clearLocationUrl } from '../../utils/util/location';

/** 约定一个地方生产和消费初始化数据。
 * Agree on a local production and consumption initialization data
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialStateConfig(): Promise<{
  loading?: boolean;
  settings?: Partial<Settings>;
  menuData?: USER.MenuItem[];
  currentUser?: USER.CurrentUser;
  accessMenu?: { [index: string]: any };
}> {
  clearLocationUrl();

  // 获取用户相关信息
  let menuData: any = [];
  const sysConfig = await fetchSysConfig();
  const settings = { ...localSettings, ...sysConfig };
  const currentUser = await fetchUserInfo();
  if (!currentUser) history.push(loginPath);
  else menuData = await fetchMenuData();

  /** 菜单权限 */
  const accessMenu: { [index: string]: any } = [];

  /** 不开国际化 */
  handleNoLocalesMenu(!!menuData?.length ? [...menuData] : [], accessMenu);

  if (history.location.pathname.includes(loginPath)) {
    history.push(homePath);
  } else if (history.location.pathname === '/') {
    history.push(homePath);
  }

  return {
    menuData,
    currentUser,
    accessMenu,
    settings,
  };
}
