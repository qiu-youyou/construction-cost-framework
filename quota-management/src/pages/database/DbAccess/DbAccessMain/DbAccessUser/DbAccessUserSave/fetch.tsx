/*
 * @Author: SHUANG
 * @Date: 2023-11-07 11:31:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-07 11:34:49
 * @Description: 选择人员授权权限
 */

import { Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { UserListItem } from 'jd-framework-web/package/common/views/system/User/typings';

/**
 * @Author: SHUANG
 * @Description: 保存授权用户
 * @Date: 2023-11-07 11:31:35
 */
export const fetchOnSubmit = async (
  userSelection?: UserListItem[],
  onSubmit?: (userSelection: UserListItem[]) => Promise<FETCH.Res<any>>,
) => {
  if (!userSelection?.length) {
    const modalInfo = {
      icon: <InfoCircleOutlined />,
      content: '请勾选需要增加的数据！再进行该操作！',
      title: '继续操作',
      okText: '确定',
    };
    Modal.warning(modalInfo);
    return;
  }
  return onSubmit?.(userSelection);
};
