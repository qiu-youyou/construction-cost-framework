import { Button, message, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { useImperativeHandle, useRef, useState } from 'react';

/** from components */
import BaseSchemaForm from '../BaseSchemaForm';
import { ModalActionType } from '../BaseModal/typings';
import { ActionButtonProps } from './typings';
import BaseModal from '../BaseModal';

const defaultProps: ActionButtonProps = {
  buttonText: '编辑',
  triggerType: 'modal',
  idsKey: 'id',
  render: '',
};

/** 初始值 */
let defaultInitialValues: { [index: string]: any } = {};

const EditButton = (prop: ActionButtonProps) => {
  /** Props */
  const props = { ...defaultProps, ...prop };
  const actionRef = useRef<ModalActionType>();

  const [modal, contextHolder] = Modal.useModal();

  /** 表单初始值 */
  const [initialValues, setInitialValues] = useState<Store>();

  /** 根据columns生成表单初始值 */
  const handleInitialValues = (current: { [index: string]: any }) => {
    const { columns } = props;
    if (!columns?.length) return;
    defaultInitialValues = {};
    const initial = [...columns];
    const values: { [index: string]: any } = {};
    initial.forEach((item: any) => {
      if (!!item?.dataIndex && !item?.initialValue) {
        values[item.dataIndex] = current[item.dataIndex];
      }
      if (!!item?.dataIndex && item?.hideInForm) {
        defaultInitialValues[item.dataIndex] = current[item.dataIndex];
      }
      // 不然会出现 invalild date
      if (item?.valueType === 'date') {
        values[item.dataIndex] = current[item.dataIndex] || undefined;
      }
    });
    setInitialValues(values);
  };

  /** 点击按钮 */
  const ButtonDomOnClick = () => {
    if (!actionRef?.current?.open) return;

    /** 没有可操作行 */
    if (!props?.current) {
      modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
      setInitialValues({});
      return;
    }

    handleInitialValues(props?.current);
    actionRef?.current?.open();

    return;
  };

  /** 提交表单 */
  const onFinish = async (value: any) => {
    // 空值字段为 空字符串
    for (const key in initialValues) {
      if (value[key] === undefined) {
        value[key] = '';
      }
    }
    const values = { ...props.params, ...value, ...defaultInitialValues };
    if (!props?.onSubmit) return true;
    const res = await props.onSubmit(values, props?.current, props?.selections);
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
      if (actionRef?.current?.open) {
        handleInitialValues(props?.current);
        actionRef?.current?.open();
      }
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
    <Button className="EditButton" disabled={props?.disabled} onClick={ButtonDomOnClick}>
      <EditOutlined /> {props.buttonText}
    </Button>
  );

  /** 如果传入Render 默认全屏  */
  const renderModalDefaultProps = prop?.render && { width: 900, defaultFullScreen: true, noFooter: true };

  const ModalDom = (
    <>
      {ButtonDom}
      <BaseModal
        footer={null}
        onCancel={onCancel}
        actionRef={actionRef}
        title={props.modalTitle || props.buttonText}
        {...renderModalDefaultProps}
        {...props.modalProps}
      >
        {props.render || (
          <BaseSchemaForm
            initialValues={initialValues}
            columns={props?.columns || []}
            onFinish={onFinish}
            {...props.schemaFormProps}
          />
        )}
      </BaseModal>
      {contextHolder}
    </>
  );

  return ModalDom;
};

export default EditButton;
