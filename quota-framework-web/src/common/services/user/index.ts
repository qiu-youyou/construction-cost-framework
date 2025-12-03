/*
 * @Author: SHUANG
 * @Date: 2023-06-19 16:53:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 17:39:03
 * @Description: 用户相关
 */
import { getToken, setToken } from '../../../utils/auth/authorization';
import { loginPath } from '@/common/constant/path';
import { request, history } from 'umi';

/** 来自各项目 */
import ICONMAP from '@/common/constant/iconMap';

/**
 * @Author: SHUANG
 * @Description: 查询用户信息
 * @Date: 2023-07-12 11:06:58
 */
export async function securityGetUserInfo(authorization: string) {
  return request(`/security/getUserInfo/${authorization}`, {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 登录
 * @Date: 2023-06-29 15:36:41
 */
export async function login(data: USER.LoginParams) {
  return request<USER.LoginResult>('/login', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 退出登录
 * @Date: 2023-06-29 15:36:06
 */
export async function logout() {
  return request<Record<string, any>>('/logout', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 获取当前菜单
 * @Date: 2023-06-29 15:36:58
 */
export async function queryUserRote() {
  return request<FETCH.Res<USER.MenuItem>>('/sys/menu/queryUserRote.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 修改密码接口
 * @Date: 2022-10-21 16:14:40
 */
export async function updatePwd(data: USER.PassParams) {
  return request<FETCH.Res>('/sys/user/updatePwd.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 获取当前的用户
 * @Date: 2023-06-29 15:37:51
 */
export async function queryCurrentUser() {
  return new Promise<USER.CurrentUser>(async (resolve, reject) => {
    const authorization = getToken();
    const res = await securityGetUserInfo(authorization || '');
    if (!res || res?.status !== 'SUCCESS') reject();
    const data = {
      status: 'SUCCESS',
      name: res?.rows?.fullName || '',
      userid: res?.rows?.userName,
      notifyCount: 0,
      unreadCount: 0,
    };
    if (!!res?.other) {
      setToken(res?.other || undefined);
    }
    resolve(data);
  });
}

/**
 * @Author: SHUANG
 * @Description: 登录配置项加载
 * @Date: 2023-07-19 15:20:36
 */
export async function securityLoadConfig() {
  return request<FETCH.Row<USER.SysSettings>>('/security/loadConfig', {
    method: 'POST',
  });
}

// 获取用户
export const fetchUserInfo = async () => {
  try {
    const res = await queryCurrentUser();
    return res;
  } catch (error) {
    history.push(loginPath);
  }
  return undefined;
};

// 获取菜单
export const fetchMenuData = async () => {
  try {
    const res = await queryUserRote();
    if (res?.status !== 'SUCCESS') return [];
    return setIcons(res.rows);
  } catch (error) {}
  return undefined;
};

const setIcons = (rows: FETCH.Res['rows']) => {
  const results: FETCH.Res['rows'] = [];
  rows.forEach((item, index) => {
    const targetItem = { ...item, icon: item?.icon && ICONMAP[item.icon] };
    if (item.children) {
      results[index] = targetItem;
      results[index].children = setIcons(item.children);
    } else {
      results[index] = targetItem;
    }
  });
  return results;
};

// 获取系统配置项
export const fetchSysConfig = async () => {
  try {
    const res = await securityLoadConfig();
    if (res?.status !== 'SUCCESS') return {}; // 默认 config/setting 文件
    return res?.rows;
  } catch (error) {}
};
