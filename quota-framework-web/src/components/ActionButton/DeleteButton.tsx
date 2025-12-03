/*
 * @Author: SHUANG
 * @Date: 2023-08-15 14:09:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:45:25
 * @Description: 删除按钮
 */
import { Button, message, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

/** from components */
import { ActionButtonProps } from './typings';

const defaultProps: ActionButtonProps = {
  buttonText: '删除',
  triggerType: 'modal',
  idsKey: 'id',
  render: '',
};

const DeleteButton = (prop: ActionButtonProps) => {
  const [modal, contextHolder] = Modal.useModal();

  /** Props */
  const props = { ...defaultProps, ...prop };

  /** 批量操作 */
  const dataLength = !!props.selections?.length && `(${props.selections?.length})`;

  /** 提交完成 */
  const handleSubmitFinish = (res: FETCH.Res) => {
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
  };

  /** DOM 被点击 */
  const onClick = () => {
    if (!dataLength && !props.current) {
      modal.warning({ title: '继续操作', content: `请选择将要${props.buttonText}的数据` });
      return;
    }

    /** 如果是批量操作 */
    if (!!dataLength) {
      /**  删除条件控制 */
      if (!!props?.actionControl) {
        const equal = props.actionControl?.equal;
        let controlArr: undefined | any[] = [];
        if (equal) {
          controlArr = props?.selections?.filter(
            (item) => item[props?.actionControl?.key || ''] === props.actionControl?.value,
          );
        } else {
          controlArr = props?.selections?.filter(
            (item) => item[props?.actionControl?.key || ''] !== props.actionControl?.value,
          );
        }
        // 如果有一项满足
        if (controlArr?.length)
          return modal.info({
            title: '提示',
            icon: <InfoCircleOutlined style={{ color: '#d48806' }} />,
            content: props.actionControl.message,
            okText: '确定',
          });
      }

      modal.confirm({
        okType: 'danger',
        title: props.buttonText,
        okText: props.buttonText,
        icon: <ExclamationCircleOutlined style={{ color: '#cf1322' }} />,
        content: `当前勾选的 ${dataLength} 项将被${props.buttonText},是否继续?`,
        async onOk() {
          if (!props?.onSubmit || !props?.selections) return;
          const ids = props.selections.map((item) => item[props.idsKey || '']);
          const params = { ids: ids, ...props.params };
          const res = await props.onSubmit(params, props?.current, props?.selections);
          handleSubmitFinish(res);
        },
      });
      return;
    }

    /** 操作当前行 */

    /** 删除控制 */
    if (!!props?.actionControl) {
      if (!!props?.current) {
        const equal = props.actionControl?.equal;
        if (equal) {
          if (props.current[prop.actionControl?.key || ''] === props.actionControl?.value)
            return modal.info({
              title: '提示',
              icon: <InfoCircleOutlined style={{ color: '#d48806' }} />,
              content: props.actionControl.message,
              okText: '确定',
            });
        } else {
          if (props.current[prop.actionControl?.key || ''] !== props.actionControl?.value)
            return modal.info({
              title: '提示',
              icon: <InfoCircleOutlined style={{ color: '#d48806' }} />,
              content: props.actionControl.message,
              okText: '确定',
            });
        }
      }
    }

    modal.confirm({
      okType: 'danger',
      title: props.buttonText,
      okText: props.buttonText,
      icon: <ExclamationCircleOutlined style={{ color: '#cf1322' }} />,
      content: `当前选中行 将被${props.buttonText}, 是否继续?`,
      async onOk() {
        if (!props?.onSubmit || !props.current) return;
        const params = { ids: [props.current[props.idsKey || '']], ...props.params };
        const res = await props.onSubmit(params, props?.current, props?.selections);
        handleSubmitFinish(res);
      },
    });
  };

  /** DOM */
  const ButtonDom = !!props.trigger ? (
    <span onClick={onClick}>{props.trigger}</span>
  ) : (
    <Button type="primary" danger disabled={props?.disabled} onClick={onClick}>
      <DeleteOutlined />
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

export default DeleteButton;
