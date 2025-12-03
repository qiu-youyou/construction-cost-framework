/*
 * @Author: SHUANG
 * @Date: 2022-08-22 10:50:09
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:44:51
 * @Description: 批量操作按钮
 */

import { Button, message, Modal } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

/** from components */
import { ActionButtonProps } from './typings';

const defaultProps: ActionButtonProps = {
  buttonText: '操作',
  triggerType: 'modal',
  idsKey: 'id',
  render: '',
};

const ActionIdsButton = (prop: ActionButtonProps<FETCH.UpStatus>) => {
  const [modal, contextHolder] = Modal.useModal();

  /** Props */
  const props = { ...defaultProps, ...prop };

  /** 批量操作 */
  const dataLength = !!props.selections?.length && `(${props.selections?.length})`;

  /** 提交完成 */
  const handleSubmitFinish = (res: FETCH.Res) => {
    if (res?.status !== 'SUCCESS') return;
    message.destroy();
    message.success(res?.message || `${prop.buttonText}成功`);
    /** 默认传递刷新方法 */
    if (props.onRefresh) {
      props.onRefresh();
    }
    if (props.onSubmitFinish) {
      props.onSubmitFinish(props.onRefresh);
    }
  };

  /** DOM 被点击 */
  const onClick = () => {
    /** 如果没有勾选行也没有当前行 */
    if (!dataLength && !props.current) {
      modal.warning({ title: '继续操作', content: `请选择将要${props.buttonText}的数据` });
      return;
    }

    if (!!dataLength) {
      /**  操作条件控制 */
      if (!!props?.actionControl) {
        const controlArr = props?.selections?.filter(
          (item) => item[props?.actionControl?.key || ''] !== props.actionControl?.value,
        );
        // 如果有一项满足
        if (controlArr?.length) {
          message.destroy();
          message.warning(props.actionControl.message);
          return;
        }
      }

      modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content:
          props?.confirmMessage || `当前勾选的 ${dataLength} 项将改为${prop.buttonText}状态, 是否继续?`,
        async onOk() {
          if (!props?.onSubmit || !props.selections) return;
          const ids = props.selections.map((item) => item[props.idsKey || '']);
          const res = await props.onSubmit({ ids: ids });
          handleSubmitFinish(res);
        },
      });
      return;
    }

    /** 操作当前行 */
    if (!!props?.actionControl) {
      if (!!props?.current) {
        if (props.current[prop.actionControl?.key || ''] !== props.actionControl?.value) {
          message.destroy();
          message.warning(props.actionControl.message);
          return;
        }
      }
    }

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: props?.confirmMessage || `当前选中行 将改为${prop.buttonText}状态, 是否继续?`,
      async onOk() {
        if (!props?.onSubmit || !props.current) return;
        const res = await props.onSubmit({ ids: [props.current[props.idsKey || '']] });
        handleSubmitFinish(res);
      },
    });
  };

  /** DOM */
  const ButtonDom = !!props.trigger ? (
    <span onClick={onClick}>{props.trigger}</span>
  ) : (
    <Button onClick={onClick}>
      <CheckCircleOutlined />
      {props.buttonText}
      {!!props.selections?.length && `(${props.selections?.length})`}
    </Button>
  );

  return (
    <>
      {ButtonDom}
      {contextHolder}
    </>
  );
};

export default ActionIdsButton;
