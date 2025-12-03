/*
 * @Author: SHUANG
 * @Date: 2024-02-22 16:24:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 16:00:49
 * @Description: 同步地区数据
 */

import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { dataswapSyncSysArea } from '../services';
import { DataswapProps } from '../typings';

export default (props: DataswapProps) => {
  const { onSuccess, onError } = props;
  const [modal, contextHolder] = Modal.useModal();

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  const onOk = async () => {
    /** 当前库ID */
    setLoading(true);
    const res = await dataswapSyncSysArea();
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      onSuccess?.();
    } else {
      onError?.();
    }
    return res;
  };

  const handleOnClick = async () => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `同步地区数据?`,
      okText: '开始同步',
      onOk,
    });
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button onClick={handleOnClick} className="BorderButtonLime" loading={loading}>
      <RetweetOutlined /> {props?.buttonText || '同步地区'}
    </Button>
  );

  return (
    <>
      {triggerBtn}
      {contextHolder}
    </>
  );
};
