/*
 * @Author: SHUANG
 * @Date: 2023-11-07 11:16:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-07 11:55:02
 * @Description: 查询成本信息系统分部分项目录
 */

import { InfoCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { RelationSubItemByCostSystemItem } from '../../typings';

/**
 * @Author: SHUANG
 * @Description: 保存当前选中分部分项
 * @Date: 2023-11-07 11:16:32
 * @name branchCurrent 当前选中分部分项行
 * @name onSubmit 提交方法
 */
export const fetchOnSubmit = async (
  branchCurrent?: RelationSubItemByCostSystemItem,
  onSubmit?: (branch?: RelationSubItemByCostSystemItem) => Promise<FETCH.Res>,
) => {
  if (!branchCurrent?.id) {
    const modalInfo = {
      icon: <InfoCircleOutlined />,
      content: '请选择需要导入的数据！再进行该操作！',
      title: '继续操作',
      okText: '确定',
    };
    Modal.warning(modalInfo);
    return;
  }
  return onSubmit?.(branchCurrent);
};
