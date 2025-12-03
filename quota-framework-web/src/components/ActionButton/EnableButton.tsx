/*
 * @Author: SHUANG
 * @Date: 2022-07-12 10:15:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:47:23
 * @Description: 启用按钮
 */
import { Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined, UnlockOutlined } from '@ant-design/icons';

/** from components */
import { ActionButtonProps } from './typings';

const defaultProps: ActionButtonProps = {
  buttonText: '启用',
  triggerType: 'modal',
  idsKey: 'id',
  render: '',
};

const EnableButton = (prop: ActionButtonProps) => {
  /** Props */
  const props = { ...defaultProps, ...prop };

  const [modal, contextHolder] = Modal.useModal();

  /** 批量操作 */
  const dataLength = !!props.selections?.length && `(${props.selections?.length})`;

  /** 提交完成 */
  const handleSubmitFinish = (res: FETCH.Res) => {
    if (res?.status !== 'SUCCESS') return;
    message.destroy();
    message.success(res?.message || `${props.buttonText}成功`);
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

    /** 如果是批量操作 */
    if (!!dataLength) {
      modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: `当前勾选的 ${dataLength} 项将改为${props.buttonText}状态, 是否继续?`,
        async onOk() {
          if (!props?.onSubmit || !props.selections) return;
          const ids = props.selections.map((item) => item[props.idsKey || '']);
          const res = await props.onSubmit({ ids: ids, billStatus: 3 }, props?.current, props?.selections);
          handleSubmitFinish(res);
        },
      });
      return;
    }

    /** 操作当前行 */
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `当前选中行 将改为${props.buttonText}状态, 是否继续?`,
      async onOk() {
        if (!props?.onSubmit || !props.current) return;
        const res = await props.onSubmit(
          { ids: [props.current[props.idsKey || '']], billStatus: 3 },
          props?.current,
          props?.selections,
        );
        handleSubmitFinish(res);
      },
    });
  };

  /** DOM */
  const ButtonDom = !!props.trigger ? (
    <span onClick={onClick}>{props.trigger}</span>
  ) : (
    <Button className="EnableButton" onClick={onClick} disabled={props?.disabled}>
      <UnlockOutlined />
      {props.buttonText}
    </Button>
  );

  return (
    <>
      {ButtonDom}
      {contextHolder}
    </>
  );
};

export default EnableButton;
