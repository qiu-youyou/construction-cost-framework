/*
 * @Author: SHUANG
 * @Date: 2024-02-26 14:21:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 14:37:06
 * @Description: 应用到其他取费表
 */

import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { TableActionType } from 'jd-framework-web/package/components';
import { ExclamationCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { dbFeeDetailBatchUpdateBaseFeeRate } from '../services';
import { DbFeeDetailItem } from '../typings';

type Props = {
  /** 当前选择 */
  dbFeeDetailSelection?: DbFeeDetailItem[];
  /** Table Ref */
  dbFeeDetailTableRef?: TableActionType;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** 当前数据库 */
  const { dbFeeDetailSelection } = props;
  const { dbFeeDetailTableRef } = props;
  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 同步调整定额基价 */
  const onOk = async () => {
    setLoading(true);
    const jsonStr =
      dbFeeDetailSelection?.map((item) => ({
        dbId: item?.dbId || '',
        feeName: item?.feeName || '',
        baseFeeRate: item?.baseFeeRate || '',
      })) || [];
    const res = await dbFeeDetailBatchUpdateBaseFeeRate({ jsonStr: JSON.stringify(jsonStr) });
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      dbFeeDetailTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 同步调整定额基价 */
  const handleOnClick = async () => {
    if (!dbFeeDetailSelection?.length) {
      modal.warning({ title: '继续操作', content: '请选择数据进行操作!' });
      return;
    }
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `应用到其他取费表, 是否继续?`,
      onOk,
    });
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button onClick={handleOnClick} className="BorderButtonLime" loading={loading}>
      <RetweetOutlined /> 应用到其他取费表
    </Button>
  );

  return (
    <>
      {triggerBtn}
      {contextHolder}
    </>
  );
};
