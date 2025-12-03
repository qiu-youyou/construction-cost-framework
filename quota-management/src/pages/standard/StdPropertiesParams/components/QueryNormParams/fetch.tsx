/*
 * @Author: SHUANG
 * @Date: 2023-11-14 11:00:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-14 13:58:20
 * @Description: 查询参数表
 */
import { Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { PropertiesParamsNormParamsItem } from '../../typings';

/**
 * @Author: SHUANG
 * @Description: 保存当前选择参数行
 * @Date: 2023-11-14 11:01:41
 * @name current 当前行
 * @name onSubmit 提交方法
 */
export const fetchOnSubmit = async (
  current?: PropertiesParamsNormParamsItem,
  onSubmit?: (branch?: PropertiesParamsNormParamsItem) => Promise<FETCH.Res>,
) => {
  if (!current) {
    const modalInfo = {
      icon: <InfoCircleOutlined />,
      content: '请选择增加的数据！再进行该操作！',
      title: '继续操作',
      okText: '确定',
    };
    Modal.warning(modalInfo);
    return;
  }
  onSubmit?.(current);
  return;
};
