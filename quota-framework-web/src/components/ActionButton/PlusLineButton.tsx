/*
 * @Author: SHUANG
 * @Date: 2022-09-01 19:14:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 17:32:37
 * @Description: 新增按钮
 */
import { useRef, useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

/** from components */
import { ModalActionType } from '../BaseModal/typings';
import BaseSchemaForm from '../BaseSchemaForm';
import { ActionButtonProps } from './typings';
import BaseModal from '../BaseModal';

const defaultProps: ActionButtonProps = {
  buttonText: '新增',
  triggerType: 'submit',
  columns: [],
  render: '',
  idsKey: 'id',
};

const PlusLineButton = (prop: ActionButtonProps) => {
  /** 结构 Props */
  const props = { ...defaultProps, ...prop };
  const actionRef = useRef<ModalActionType>();

  const [loading, setLoading] = useState<boolean>(false);

  /** 点击按钮 */
  const ButtonDomOnClick = async () => {
    /** 触发弹窗 */
    if (props.triggerType === 'modal') {
      if (!actionRef?.current?.open) return;
      actionRef?.current?.open();
      return;
    }

    /** 直接触发 OnSubmit */
    if (!props?.onSubmit) return;
    const billSort = props?.current?.billSort || '';
    const currentId = props?.current?.[props.idsKey || 'id'] || '';

    try {
      setLoading(true);
      const res = await props.onSubmit(
        { ...props.params, billSort, currentId },
        props?.current,
        props?.selections,
      );
      if (res?.status !== 'SUCCESS') return;
      message.destroy();
      message.success(res?.message || '操作成功');
      /** 默认传递刷新方法 */
      if (props.onRefresh) {
        props.onRefresh();
      }
      if (props.onSubmitFinish) {
        props.onSubmitFinish(props.onRefresh);
      }
    } finally {
      setLoading(false);
    }
  };

  /** 提交表单 */
  const onFinish = async (values: any) => {
    if (!props?.onSubmit) return true;
    const res = await props.onSubmit({ ...values, ...props.params }, props?.current, props?.selections);
    if (res?.status !== 'SUCCESS') return false;
    message.destroy();
    message.success(res?.message || '操作成功');
    /** 默认传递刷新方法 */
    if (props.onRefresh) {
      props.onRefresh();
    }
    if (props.onSubmitFinish) {
      props.onSubmitFinish(props.onRefresh);
    }
    if (!actionRef?.current?.close) return true;
    actionRef?.current?.close();
    return true;
  };

  /** 按钮DOM */
  const ButtonDom = props.trigger ? (
    <span onClick={ButtonDomOnClick}>{props.trigger}</span>
  ) : (
    <Button
      type="primary"
      className="PlusLineButton"
      disabled={props?.disabled}
      onClick={ButtonDomOnClick}
      loading={loading}
    >
      <PlusOutlined /> {props.buttonText}
    </Button>
  );

  /** 如果传入Render 默认全屏  */
  const renderModalDefaultProps = prop?.render && { width: 900, defaultFullScreen: true, noFooter: true };

  const ModalDom = (
    <>
      {ButtonDom}

      <BaseModal
        footer={null}
        actionRef={actionRef}
        title={props.modalTitle || props.buttonText}
        {...renderModalDefaultProps}
        {...props.modalProps}
      >
        {props.render || (
          <BaseSchemaForm columns={props?.columns || []} onFinish={onFinish} {...props.schemaFormProps} />
        )}
      </BaseModal>
    </>
  );

  return ModalDom;
};

export default PlusLineButton;
