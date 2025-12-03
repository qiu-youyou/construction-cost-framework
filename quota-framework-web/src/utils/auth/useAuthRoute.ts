/*
 * @Author: SHUANG
 * @Date: 2023-10-07 14:41:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-30 13:41:43
 * @Description:
 */

import { MenuDataItem } from '@ant-design/pro-components';

export default (
  initialState: { accessMenu: { [index: string]: any }; menuData: MenuDataItem[] } | undefined,
) => {
  const { accessMenu } = initialState || {};
  const accessMenuPaths: any[] = [];
  for (const key in accessMenu) {
    accessMenuPaths.push('/' + accessMenu[key].fullPath);
  }
  return {
    /** initialState 中包含了的路由才有权限访问 }; */
    accessRoute: (route: { path: string }) => {
      return accessMenuPaths?.includes(route.path);
    },
  };
};
