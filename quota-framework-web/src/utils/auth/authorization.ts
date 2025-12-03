/*
 * @Author: SHUANG
 * @Date: 2022-06-22 14:54:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 14:38:18
 * @Description:
 */
const KEY = 'authorization';

export const setToken = (v: string) => {
  sessionStorage.setItem(KEY, v);
};
export const getToken = () => {
  const v = sessionStorage.getItem(KEY);
  return v || '';
};

export const setUserForceChange = () => {
  localStorage.setItem('forceChange', '5005');
};
export const getUserForceChange = () => {
  const v = localStorage.getItem('forceChange');
  return v;
};
export const clearUserForceChange = () => {
  localStorage.setItem('forceChange', '');
};

// 清除所有cookie函数
export const clearAllCookie = () => {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
  }
};

/** 根据获取到的菜单 处理菜单 权限 */
/** 处理 本地菜单 服务器获取的菜单 以及分类为外链菜单 */
export const handleNoLocalesMenu = (
  menuData: USER.MenuItem[],
  accessMenu: { [index: string]: any },
  parentPath?: string,
) => {
  menuData?.forEach((item, index) => {
    const key = item.name;
    item.name = item?.meta?.title;
    item.path = item?.path || '404';
    if (!item?.path || !!item?.link) {
      item.target = '_blank';
      item.path = item?.link;
      item.key = +(index + '' + Math.random() * 100);
      item.name = item?.meta?.title;
    }
    // 保存完整路径
    const fullPath = (parentPath ? parentPath + '/' : '') + item?.path;
    accessMenu[key] = { key, path: item?.path, btns: item?.btns || [], fullPath };
    if (!!item?.children?.length) {
      if (item.children[0]?.children?.length) {
        item.redirect = `/${item.path}/${item.children[0]?.path}/` + item.children[0]?.children?.[0]?.path;
      } else {
        item.redirect = `/${item.path}/` + item.children[0]?.path;
      }
      handleNoLocalesMenu(item?.children, accessMenu, accessMenu?.[key]?.fullPath || item?.path);
    }
  });
};

export const optimizeRoutes = (routes: any) => {
  const filterRoutes = routes?.filter((item: any) => !!item?.name && item?.name !== '首页');
  return filterRoutes?.map((item: any) => {
    const { icon, path, name, routes } = item;
    const children = optimizeRoutes(routes); // 递归处理子级
    return {
      icon,
      path,
      name,
      meta: { title: name },
      btns: [],
      children,
    };
  });
};
