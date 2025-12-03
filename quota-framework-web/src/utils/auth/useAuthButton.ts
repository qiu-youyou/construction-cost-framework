/*
 * @Author: SHUANG
 * @Date: 2023-08-11 14:24:44
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-22 11:26:12
 * @Description: 当前模块的按钮权限
 */
import { useLocation, useModel } from 'umi';

export default () => {
  const location = useLocation();
  const { initialState } = useModel('@@initialState');
  const { accessMenu } = initialState ?? {};

  // 根据当前路径 找 fullPath
  // accessMenu 是个对象 在 accessMenu中 找到 fullPath与 location.pathname相同的那一项
  const route = Object.values(accessMenu).find(
    (item) =>
      '/' + item?.fullPath === location?.pathname || '/' + item?.fullPath + '/' === location?.pathname,
  );

  const routeKey = route?.key;

  const allAuth = !routeKey ? [] : accessMenu?.[routeKey]?.btns;

  return {
    auth: (authKey: string) => {
      const hasAuth = allAuth?.includes?.(authKey);
      return hasAuth;
    },
    getAllAuth: () => {
      return allAuth;
    },
  };
};
