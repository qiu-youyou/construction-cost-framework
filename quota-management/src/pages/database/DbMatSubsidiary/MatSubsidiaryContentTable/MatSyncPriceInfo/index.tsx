/*
 * @Author: SHUANG
 * @Date: 2023-11-14 18:25:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-01 11:14:32
 * @Description: 同步调整定额基价
 */

import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { TableActionType } from 'jd-framework-web/package/components';
import { ExclamationCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { SubsidiaryMatDetailItem } from '@/pages/standard/StdSubsidiaryMat/SubsidiaryMatDetailTable/typings';
import { matSubsidiaryUpdateMatPriceBySubsidiaryIds } from '../services';

type Props = {
  /** 当前选择 */
  matSubsidirayDetailSelection?: SubsidiaryMatDetailItem[];
  /** 人材机明细 Table Ref */
  matSubsidirayContentTableRef?: TableActionType;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** 当前数据库 */
  const { matSubsidirayDetailSelection } = props;
  const { matSubsidirayContentTableRef } = props;
  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 同步调整定额基价 */
  const onOk = async () => {
    setLoading(true);
    const subsidiaryIds = matSubsidirayDetailSelection?.map((item) => item.id) || [];
    const res = await matSubsidiaryUpdateMatPriceBySubsidiaryIds({ subsidiaryIds });
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      matSubsidirayContentTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 同步调整定额基价 */
  const handleOnClick = async () => {
    if (!matSubsidirayDetailSelection?.length) {
      modal.warning({ title: '继续操作', content: '请选择数据进行操作!' });
      return;
    }
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `同步调整定额基价, 是否继续?`,
      onOk,
    });
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button onClick={handleOnClick} className="BorderButtonLime" loading={loading}>
      <RetweetOutlined /> 同步调整定额基价
    </Button>
  );

  return (
    <>
      {triggerBtn}
      {contextHolder}
    </>
  );
};
