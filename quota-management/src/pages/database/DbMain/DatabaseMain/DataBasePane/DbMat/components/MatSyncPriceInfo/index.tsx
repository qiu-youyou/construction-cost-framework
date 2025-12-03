/*
 * @Author: SHUANG
 * @Date: 2023-11-13 15:29:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-05 14:34:49
 * @Description: 同步人材机价格信息
 */
import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { BaseTableProps } from 'jd-framework-web/package/components';
import { ExclamationCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { dbMatUpdateDetailMatByDbId } from '../../DbMatMainTable/useServices';
import { DatabaseDbItem } from '../../../../typings';

type Props = {
  databaseCurrent?: DatabaseDbItem;
  buttonProps?: Partial<BaseTableProps>;
};

export default (props: Props) => {
  /** 当前数据库 */
  const { databaseCurrent, buttonProps } = props;

  const [modal, contextHolder] = Modal.useModal();

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 同步人材机价格信息 */
  const onOk = async () => {
    /** 当前库ID */
    setLoading(true);
    const dbId = databaseCurrent?.id || '';
    let res: any;
    if (typeof buttonProps?.service?.dataSourceRequest === 'function') {
      res = await buttonProps?.service?.dataSourceRequest({ dbId });
    } else {
      res = await dbMatUpdateDetailMatByDbId({ dbId });
    }
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
    }
    return res;
  };

  /** 同步人材机价格信息 */
  const handleOnClick = async () => {
    if (!databaseCurrent) {
      modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
      return;
    }
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `可能会对当前数据造成影响, 是否继续?`,
      onOk,
    });
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button onClick={handleOnClick} className="BorderButtonLime" loading={loading}>
      <RetweetOutlined /> 同步人材机价格信息
    </Button>
  );

  return (
    <>
      {triggerBtn}
      {contextHolder}
    </>
  );
};
