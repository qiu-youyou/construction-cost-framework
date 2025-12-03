/*
 * @Author: SHUANG
 * @Date: 2022-07-06 15:49:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-18 15:24:25
 * @Description:
 */
import { message } from 'antd';
import { useState } from 'react';

/** from components */
import { BaseModalProps } from './typings';

const useModalState = (props: BaseModalProps) => {
  // 是否显示
  const [visible, setVisible] = useState<boolean>(!!props.visible);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const handleModalOpen = async () => {
    props?.beforeOpen?.();
    if (!!props?.triggerControl) {
      const res = await props?.triggerControl?.();
      if (res?.status === 'SUCCESS') {
        setVisible(true);
        setConfirmLoading(false);
        return;
      }
    } else {
      setVisible(true);
      setConfirmLoading(false);
    }
  };

  const handleModalClose = () => {
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleModalEnter = async () => {
    if (!props?.onSubmit) {
      setVisible(false);
      return;
    }
    setConfirmLoading(true);
    const res = await props.onSubmit();
    setConfirmLoading(false);
    if (res?.status === 'SUCCESS') {
      setVisible(false);
      if (!!res?.message) message.success(res.message);
    }
  };

  const onEnter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisible(false);
    if (props?.onEnter) props.onEnter(e);
  };

  const onCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisible(false);
    if (props?.onCancel) props.onCancel(e);
  };

  return {
    visible,
    confirmLoading,
    handleModalOpen,
    handleModalClose,
    handleModalEnter,
    onCancel,
    onEnter,
  };
};

export default useModalState;
