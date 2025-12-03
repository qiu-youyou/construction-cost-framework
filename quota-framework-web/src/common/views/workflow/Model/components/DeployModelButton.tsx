/*
 * @Author: SHUANG
 * @Date: 2022-08-18 11:41:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:44:17
 * @Description: 部署按钮功能
 */
import { Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { workflowDeploymentModel } from '../services';
import { ModelListItem } from '../typings';

type PropsDefine = {
  currentRow?: ModelListItem;
  selections?: ModelListItem[];
  reload?: () => void; // 保存成功时触发的函数
};

export default (props: PropsDefine) => {
  const [modal, contextHolder] = Modal.useModal();

  const onClick = () => {
    if (!props?.currentRow?.id)
      return modal.warning({ title: '继续操作', content: '请选择一行数据进行操作' });
    if (!!props?.selections && props?.selections?.length > 1)
      return modal.warning({ title: '继续操作', content: '请勾选某一行数据进行操作' });

    modal.confirm({
      title: '部署模型',
      icon: <ExclamationCircleOutlined />,
      content: '确定要部署吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await workflowDeploymentModel({ id: props?.currentRow?.id || '' });
        if (res?.status !== 'SUCCESS') return;
        message.success(res.message || '部署成功');

        props.reload?.();
      },
    });
    return;
  };

  return (
    <>
      <Button className="ButtonLime" onClick={onClick}>
        <InboxOutlined /> 部署
      </Button>
      {contextHolder}
    </>
  );
};
