/*
 * @Author: SHUANG
 * @Date: 2022-08-04 14:46:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-18 11:03:47
 * @Description: 只提供触发弹窗的一个按钮
 */
import { Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useImperativeHandle, useRef } from 'react';

/** from components */
import { ModalActionType } from '../BaseModal/typings';
import { ActionButtonProps } from './typings';
import BaseModal from '../BaseModal';

const defaultProps: ActionButtonProps = {
  buttonText: '点击',
  triggerType: 'modal',
  idsKey: 'id',
  render: '',
};

/** 用于激活弹窗表单弹窗 让你不再维护弹窗的状态 */
const ModalButton = (prop: ActionButtonProps) => {
  /** Props */
  const props = { ...defaultProps, ...prop };
  const actionRef = useRef<ModalActionType>();

  const [modal, contextHolder] = Modal.useModal();

  /** DOM Trigger */
  const ButtonDomOnClick = () => {
    if (!actionRef?.current?.open) return;

    /** 不做是否包含当前行的判断 */
    if (typeof props?.determineActionCurrent === 'boolean' && !props.determineActionCurrent) {
      actionRef?.current?.open();
      return;
    }

    /** 没有可操作行 */
    if (!props?.current) {
      modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
      return;
    }

    actionRef?.current?.open();
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

  /** DOM */
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

export default ModalButton;
