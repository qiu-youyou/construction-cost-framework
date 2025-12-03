/*
 * @Author: SHUANG
 * @Date: 2023-07-10 16:11:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 17:53:58
 * @Description: 计算按钮
 */
import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { CalculatorOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

/** from components */
import { ActionButtonProps } from './typings';

const defaultProps: ActionButtonProps = {
  buttonText: '计算',
  triggerType: 'modal',
  idsKey: 'id',
  render: '',
};

const CalcButton = (prop: ActionButtonProps) => {
  /** Props */
  const props = { ...defaultProps, ...prop };
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const [modal, contextHolder] = Modal.useModal();

  /** 计算方法会返回 service 中传递的所有参数 */
  const handleOnOk = async () => {
    if (!props?.onSubmit) return;
    setBtnLoading(true);
    const res = await props.onSubmit({ ...props.params }, props?.current, props?.selections);
    setBtnLoading(false);

    if (res?.status !== 'SUCCESS') return;
    message.destroy();
    message.success(res?.message || '计算成功');

    /** 默认传递刷新方法 */
    if (props.onRefresh) {
      props.onRefresh();
    }
    if (props.onSubmitFinish) {
      props.onSubmitFinish(props.onRefresh);
    }
  };

  const onClick = async () => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `当前数据可能会受到影响，是否继续?`,
      onOk: handleOnOk,
    });
  };

  /** DOM */
  const ButtonDom = !!props.trigger ? (
    <span onClick={onClick}>{props.trigger}</span>
  ) : (
    <Button className="BorderButtonLime" disabled={props?.disabled} loading={btnLoading} onClick={onClick}>
      <CalculatorOutlined style={{ fontSize: 13, transform: 'translateY(1.3px)' }} /> {props.buttonText}
    </Button>
  );

  return (
    <>
      {ButtonDom}
      {contextHolder}
    </>
  );
};

export default CalcButton;
