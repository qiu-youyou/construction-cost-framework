/*
 * @Author: SHUANG
 * @Date: 2023-07-13 16:16:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:54:53
 * @Description: 登录状态 其他信息
 */
import BaseCard from '../../../../../components/BaseCard';
import Logins from './Logins';
import Links from './Links';

export default () => {
  const tabPaneItems = [
    { key: 'todo', label: '最近登录状态', children: <Logins /> },
    { key: 'done', label: '链接', children: <Links /> },
  ];

  return <BaseCard noHeader tabs={{ animated: true, items: tabPaneItems }} />;
};
