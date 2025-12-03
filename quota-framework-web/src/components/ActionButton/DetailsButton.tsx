/*
 * @Author: SHUANG
 * @Date: 2022-08-21 09:56:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:45:51
 * @Description: 详情按钮
 */
import { Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useImperativeHandle, useRef } from 'react';

/** from components */
import { ModalActionType } from '../BaseModal/typings';
import { ActionButtonProps } from './typings';
import BaseModal from '../BaseModal';

const defaultProps: ActionButtonProps = {
  buttonText: '查看',
  triggerType: 'modal',
  idsKey: 'id',
  render: '',
};

const DetailsButton = (prop: ActionButtonProps) => {
  /** Props */
  const props = { ...defaultProps, ...prop };
  const actionRef = useRef<ModalActionType>();

  const [modal, contextHolder] = Modal.useModal();

  /** 点击按钮 */
  const ButtonDomOnClick = () => {
    if (props.triggerType === 'modal') {
      if (!actionRef?.current?.open) return;

      /** 没有可操作行 */
      if (!props?.current) {
        modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
        return;
      }

      actionRef?.current?.open();
      return;
    }
    if (!props?.onSubmit) return;
    if (!actionRef?.current?.open) return;

    /** 没有可操作行 */
    if (!props?.current) {
      modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
      return;
    }

    actionRef?.current?.open();
    return;
  };

  /** 关闭弹窗 */
  const onCancel = () => {
    /** 需要重新定义操作行 */
    if (typeof props?.determineActionCurrent === 'function') {
      props?.determineActionCurrent?.();
    }
  };

  /** ActionRef 对外可通过Ref操作方法 */
  const initUseImperativeHandle = () => ({
    open: () => {
      if (actionRef?.current?.open) actionRef?.current?.open();
    },
    close: () => {
      if (actionRef?.current?.close) actionRef?.current?.close();
    },
  });

  useImperativeHandle(props?.actionRef, initUseImperativeHandle);

  /** 按钮DOM */
  const ButtonDom = props.trigger ? (
    <span onClick={ButtonDomOnClick}>{props.trigger}</span>
  ) : (
    <Button className="DetailsButton" onClick={ButtonDomOnClick}>
      <EyeOutlined /> {props.buttonText}
    </Button>
  );

  /** 如果传入Render 默认全屏  */
  const renderModalDefaultProps = prop?.render && { width: 900, defaultFullScreen: true, noFooter: true };

  const ModalDom = (
    <>
      {ButtonDom}
      <BaseModal
        noFooter
        width={1050}
        footer={null}
        defaultFullScreen
        onCancel={onCancel}
        actionRef={actionRef}
        title={props.modalTitle || props.buttonText}
        {...renderModalDefaultProps}
        {...props.modalProps}
      >
        {props.render}
      </BaseModal>
      {contextHolder}
    </>
  );

  return ModalDom;
};

export default DetailsButton;
