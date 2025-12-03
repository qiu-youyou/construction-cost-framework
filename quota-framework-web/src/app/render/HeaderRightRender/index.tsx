/*
 * @Author: SHUANG
 * @Date: 2023-07-10 11:47:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-25 16:21:56
 * @Description: 用户区域
 */

import { Space } from 'antd';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

export default function () {
  const { initialState } = useModel('@@initialState');

  if (!initialState) return null;

  return (
    <Space size={10}>
      <Avatar />
    </Space>
  );
}
