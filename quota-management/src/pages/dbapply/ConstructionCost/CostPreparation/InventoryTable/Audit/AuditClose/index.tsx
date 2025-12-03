/*
 * @Author: SHUANG
 * @Date: 2024-04-03 14:37:16
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 15:43:12
 * @Description: 工程造价-工程量清单编制-审核手动闭合
 */

import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import { CloseSquareOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { TableActionType } from 'jd-framework-web/package/components';

import { ProductItem } from '@/pages/dbapply/Product/Product/typings';
import { inventoryUpdateCloseAuditRemarksByIds } from '../services';
import { InventoryItem } from '../../typings';

type Props = {
  /** 当前产品 */
  productActionCurrent?: ProductItem;
  /** 分部分项清单REF */
  inventoryTableRef?: TableActionType;
  /** 当前操作清单 */
  inventoryActionCurrent?: InventoryItem;
  /** 批量操作清单 */
  inventorySelection?: InventoryItem[];
};

export default (props: Props) => {
  /**  PROPS 当前产品 */
  const { inventoryTableRef } = props;
  const { productActionCurrent } = props;

  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';

  const { inventorySelection, inventoryActionCurrent } = props;

  const current = inventoryActionCurrent || inventorySelection?.[0];

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  const [modal, contextHolder] = Modal.useModal();

  /** 单价编号顺序重组 */
  const onOk = async () => {
    setLoading(true);
    const ids = inventoryActionCurrent
      ? [inventoryActionCurrent?.id]
      : inventorySelection?.map((item) => item.id) || [];
    const res = await inventoryUpdateCloseAuditRemarksByIds({ projectId, stageId, ids });
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      inventoryTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 单价编号顺序重组 */
  const handleOnSubmit = async () => {
    if (!current) {
      modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
      return;
    }
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `闭合审核意见, 是否继续?`,
      onOk,
    });
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button onClick={handleOnSubmit} className="BorderButtonOrange" loading={loading}>
      <CloseSquareOutlined /> 闭合审核意见
    </Button>
  );

  return (
    <>
      {triggerBtn} {contextHolder}
    </>
  );
};
