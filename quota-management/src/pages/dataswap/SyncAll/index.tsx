/*
 * @Author: SHUANG
 * @Date: 2024-02-22 16:24:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 16:41:47
 * @Description: 同步全部
 */

import { useState } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { DataswapProps } from '../typings';
import * as API from '../services';

export default (props: DataswapProps) => {
  const [modal, contextHolder] = Modal.useModal();

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  const onOk = async () => {
    /** 当前库ID */
    setLoading(true);
    const promiseQueue: any = [];
    Object.keys(API).forEach((key) => {
      promiseQueue.push(API[key]());
    });
    const res = await Promise.all(promiseQueue);
    setLoading(false);
    modal.success({
      title: '完成',
      content: `成功：${res.filter((item: any) => item?.status === 'SUCCESS').length}，失败：${
        res.filter((item: any) => item?.status !== 'SUCCESS').length
      }`,
    });
    return res;
  };

  const handleOnClick = async () => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `同步全部?`,
      okText: '开始同步',
      onOk,
    });
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button onClick={handleOnClick} className="ButtonLime" loading={loading}>
      <RetweetOutlined /> {props?.buttonText || '同步全部'}
    </Button>
  );

  return (
    <>
      {triggerBtn}
      {contextHolder}
    </>
  );
};
