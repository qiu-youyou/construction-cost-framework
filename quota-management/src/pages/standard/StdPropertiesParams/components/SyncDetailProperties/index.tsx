/*
 * @Author: SHUANG
 * @Date: 2023-11-13 18:42:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-01 11:20:22
 * @Description: 清单项目特征与定额参数特征映射库
 */
import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { propertiesParamSyncDetailProperties } from '../../services';

/** 提交方法 */
type Props = { onSubmit: () => void };

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 同步清单项目特征 */
  const onOk = async () => {
    setLoading(true);
    const res = await propertiesParamSyncDetailProperties();
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      props?.onSubmit?.();
    }
    return res;
  };

  /** 同步清单项目特征 */
  const handleOnClick = async () => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `可能会对当前数据造成影响, 是否继续?`,
      onOk,
    });
  };

  /** 触发按钮 */
  const modalTrigger = (
    <Button type="primary" onClick={handleOnClick} loading={loading}>
      <RetweetOutlined /> 同步清单项目特征
    </Button>
  );

  return (
    <>
      {modalTrigger}
      {contextHolder}
    </>
  );
};
