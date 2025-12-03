/*
 * @Author: SHUANG
 * @Date: 2022-08-21 09:56:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-30 14:16:31
 * @Description:
 */
import { Button, Modal } from 'antd';
import { useImperativeHandle } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

/** from components */
import useModalRender from './useModalRender';
import useModalState from './useModalState';
import * as TYPES from './typings';
import * as DATA from './data';

const BaseModal = (prop: TYPES.BaseModalProps) => {
  /** 生成默认配置 */
  const props = { ...DATA.defaultProps, ...prop };
  const modalState = useModalState(props);

  /** ActionRef */
  const initUseImperativeHandle = () => ({
    open: modalState.handleModalOpen,
    close: modalState.handleModalClose,
  });

  /** 操作按钮 */
  const buttonFooter =
    prop?.footer === null
      ? null
      : prop?.footer || [
          <Button key="back" onClick={modalState.onCancel}>
            {props.cancelText}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={modalState.confirmLoading}
            onClick={modalState.handleModalEnter}
          >
            {props.okText}
          </Button>,
        ];

  useImperativeHandle(props?.actionRef, initUseImperativeHandle);

  /** 自定义渲染 */
  const { renderTitle, modalRender, className, resizableWidth, resizableHeight } = useModalRender(props);

  return (
    <>
      <span onClick={modalState.handleModalOpen}>{props.trigger}</span>
      {props?.showText || ''}
      <Modal
        mask={props.mask}
        title={renderTitle}
        className={className}
        width={resizableWidth}
        open={modalState.visible}
        style={{ ...props?.style }}
        wrapClassName={!props.mask ? 'maskNonePointerEvents' : '' + (props?.wrapClassName || '')}
        footer={!props?.submiterAsHeader && buttonFooter}
        destroyOnClose={props.destroyOnClose}
        maskClosable={props.maskClosable}
        afterClose={props?.afterClose}
        onCancel={modalState.onCancel}
        focusTriggerAfterClose={false}
        keyboard={props.keyboardESC}
        onOk={modalState.onEnter}
        modalRender={modalRender}
        transitionName=""
        z-index={0}
      >
        <PageContainer
          style={{ height: resizableHeight || 'auto' }}
          className={!!resizableHeight ? 'resizableModal' : ''}
          header={{ title: props?.submiterAsHeader && buttonFooter, breadcrumb: {} }}
        >
          {props.children}
        </PageContainer>
      </Modal>
    </>
  );
};
export default BaseModal;
