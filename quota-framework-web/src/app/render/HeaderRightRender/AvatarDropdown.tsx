/*
 * @Author: SHUANG
 * @Date: 2023-07-10 14:18:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 17:38:04
 * @Description: 用户头像下拉相关
 */
import { stringify } from 'qs';
import { useCallback } from 'react';
import { Avatar, Spin } from 'antd';
import { history, useModel } from 'umi';
import { MenuInfo } from 'rc-menu/lib/interface';
import { LogoutOutlined, EditOutlined } from '@ant-design/icons';

import BaseDropDown, { BaseDropDownProps } from '../../../components/BaseDropDown';
import { clearUserForceChange, setToken } from '../../../utils/auth/authorization';
import { loginPath, changePassPath } from '@/common/constant/path';
import { logout } from '../../../common/services/user';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
export const systemUserloginOut = async () => {
  setToken('');
  await logout();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  clearUserForceChange();
  if (window.location.pathname !== loginPath && !redirect) {
    history.replace({
      pathname: loginPath,
      search: stringify({ redirect: pathname + search }),
    });
  }
  // other
  // setToken('');
  // window.location.href = '/logout';
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const sysSettings = initialState?.settings;
  const avatar = sysSettings.logoImg;

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        systemUserloginOut();
        return;
      }
      if (key === 'changePass') {
        history.push(changePassPath);
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    </span>
  );

  // 如果没有任何信息 展示 loading。
  if (!initialState) return loading;

  // 如果没有用户信息 展示 loading
  const { currentUser } = initialState;
  if (!currentUser || !currentUser.name) return loading;

  const menuSet: BaseDropDownProps['menu'] = {
    selectedKeys: [],
    onClick: onMenuClick,
    className: styles.menu,
    items: [
      // { key: 'center', icon: <UserOutlined />, label: '个人中心' },
      // { key: 'settings', icon: <SettingOutlined />, label: '个人设置' },
      { key: 'changePass', icon: <EditOutlined />, label: '修改密码' },
      { key: 'logout', icon: <LogoutOutlined />, label: '退出登录' },
    ],
  };

  return (
    <BaseDropDown menu={menuSet}>
      <span className={`${styles.rightContent}`}>
        <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
        <span className={`${styles.rightUserName}`}>{currentUser.name}</span>
      </span>
    </BaseDropDown>
  );
};

export default AvatarDropdown;
