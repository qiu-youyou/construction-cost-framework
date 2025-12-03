/*
 * @Author: SHUANG
 * @Date: 2023-08-15 14:09:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 17:56:29
 * @Description: 新增层级按钮
 */

import { useRef, useState } from 'react';
import { Button, Dropdown, message, Modal } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';

/** from components */
import { ModalActionType } from '../BaseModal/typings';
import { BaseDropDownProps } from '../BaseDropDown';
import BaseSchemaForm from '../BaseSchemaForm';
import { ActionButtonProps } from './typings';
import BaseModal from '../BaseModal';

const defaultProps: ActionButtonProps = {
  buttonText: '新增',
  triggerType: 'modal',
  idsKey: 'id',
  render: '',
};

/** 层级添加按钮 */
const PlusLevelButton = (prop: ActionButtonProps) => {
  /** 结构 Props */
  const props = { ...defaultProps, ...prop };

  const [modal, contextHolder] = Modal.useModal();

  const actionRef = useRef<ModalActionType>();
  const [levelKey, setLevelKey] = useState<string>('1');
  const [loading, setLoading] = useState<boolean>(false);

  /** 提交表单 */
  const onFinish = async (values: any, levelKeyAction: string) => {
    if (!props?.onSubmit) return true;
    const res = await props.onSubmit(
      {
        ...values,
        ...props.params,
        parentId: levelKeyAction === '1' ? props.current?.parentId || 0 : props.current?.[props.idsKey || ''],
      },
      props?.current,
      props?.selections,
      levelKeyAction,
    );
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

  const handleDropItemClick = async (key: string) => {
    if (loading) return;
    setLevelKey(key);

    // 添加子级
    if (key === '2' && !props.current) {
      modal.warning({ title: '继续操作', content: '请选中需添加的父节点' });
      return;
    }
    /** 触发弹窗 */
    if (props?.triggerType === 'modal') {
      if (!actionRef?.current?.open) return;
      actionRef?.current?.open();
      return;
    }
    /** 直接触发 OnSubmit */
    try {
      setLoading(true);
      await onFinish({}, key);
    } finally {
      setLoading(false);
    }
  };

  /** 按钮DOM */
  const buttonDomMenuSet: BaseDropDownProps['menu'] = {
    onClick: ({ key }) => handleDropItemClick(key),
    items: [
      { key: '1', label: <Button type="link">新增同级</Button> },
      { key: '2', label: <Button type="link">新增下级</Button> },
    ],
  };

  const ButtonDom = props.trigger || (
    <Dropdown menu={buttonDomMenuSet} disabled={props?.disabled}>
      <Button type="primary" loading={loading}>
        <PlusOutlined /> {props.buttonText} <DownOutlined />
      </Button>
    </Dropdown>
  );

  const ModalDom = (
    <>
      {ButtonDom}
      <BaseModal
        footer={null}
        actionRef={actionRef}
        title={(props.modalTitle || props.buttonText) + (levelKey === '1' ? '-同级' : '-子级')}
        {...props.modalProps}
      >
        {props.render || (
          <BaseSchemaForm
            columns={props?.columns || []}
            onFinish={(v) => onFinish(v, levelKey)}
            {...props.schemaFormProps}
          />
        )}
      </BaseModal>
      {contextHolder}
    </>
  );

  return ModalDom;
};

export default PlusLevelButton;
