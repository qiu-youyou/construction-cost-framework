/*
 * @Author: SHUANG
 * @Date: 2023-08-22 15:49:49
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 17:37:39
 * @Description:
 */

import { history } from 'umi';
import layout from '/config/layout';
import { changeForcePath, loginPath } from '@/common/constant/path';
import { getUserForceChange } from '../../utils/auth/authorization';

export default (currentUser?: USER.CurrentUser, menuData?: any) => {
  return () => {
    const { location } = history;

    const { pathname } = location;

    /** 去往强制修改密码页 */
    if (pathname == changeForcePath) {
      return;
    }

    /** 去往登录页 */
    if (pathname.includes(loginPath)) {
      return;
    }

    /** 没有查询到用户 回到登录页 */
    if (!currentUser && pathname !== loginPath) {
      history.push(loginPath);
      return;
    }

    /** 如果强制修改密码 停留在该页 */
    if (!!getUserForceChange()) {
      history.push(changeForcePath);
      return;
    }

    /** 混合布局模式 处理 redirect */
    if (layout.layout === 'mix') {
      const findRoute = menuData?.filter(
        (item: any) => `/${item.path}` === pathname || `/${item.path}/` === pathname,
      );
      if (findRoute?.length) {
        const redirect = findRoute?.[0]?.redirect;
        history.push(redirect);
        return;
      }
    }
  };
};
