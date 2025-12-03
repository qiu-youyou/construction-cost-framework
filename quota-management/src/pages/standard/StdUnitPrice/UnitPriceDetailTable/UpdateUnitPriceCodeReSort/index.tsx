/*
 * @Author: SHUANG
 * @Date: 2023-11-15 17:53:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-01 11:24:14
 * @Description: 单价编号顺序重组
 */

import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import { ExclamationCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { TableActionType } from 'jd-framework-web/package/components';

import { UnitPriceDirectoryItem } from '../../UnitPriceDirectoryTree/typings';
import { unitPriceDetailUpdateUnitPriceCodeReSort } from '../services';

type Props = {
  /** 综合单价 当前目录 */
  unitPriceDirectoryCurrent?: UnitPriceDirectoryItem;
  /** 综合单价 清单明细表 REF */
  unitPriceDetailTableRef?: TableActionType;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** 清单明细表 REF */
  const { unitPriceDetailTableRef } = props;
  /** 综合单价 当前目录 */
  const { unitPriceDirectoryCurrent } = props;

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 单价编号顺序重组 */
  const onOk = async () => {
    setLoading(true);
    const unitPriceDbId = unitPriceDirectoryCurrent?.id || '';
    const res = await unitPriceDetailUpdateUnitPriceCodeReSort({ unitPriceDbId });
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      unitPriceDetailTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 单价编号顺序重组 */
  const handleOnSubmit = async () => {
    if (!unitPriceDirectoryCurrent) {
      modal.warning({ title: '继续操作', content: '没有可操作的数据!' });
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
    <Button onClick={handleOnSubmit} className="BorderButtonPrimary" loading={loading}>
      <RedoOutlined /> 单价编号重组
    </Button>
  );

  return (
    <>
      {triggerBtn} {contextHolder}
    </>
  );
};
