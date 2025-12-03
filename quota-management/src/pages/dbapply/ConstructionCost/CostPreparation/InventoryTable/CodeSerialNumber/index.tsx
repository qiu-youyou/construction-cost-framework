/*
 * @Author: SHUANG
 * @Date: 2024-03-21 14:16:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-29 12:01:57
 * @Description: 工程造价-工程量清单编制-分部分项清单表 自动生成单价编号
 */

import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { TreeActionType } from 'jd-framework-web/package/components';

import { ProductItem } from '@/pages/dbapply/Product/Product/typings';
import { updateInventoryCodeSerialNumber } from '../services';

type Props = {
  /** 当前产品 */
  productActionCurrent?: ProductItem;
  /** 分部分项目录REF */
  inventoryDirectoryTreeRef?: TreeActionType;
  /** 分部分项清单REF */
  inventoryTableRef?: TreeActionType;
};

export default (props: Props) => {
  /**  PROPS 当前产品 */
  const { productActionCurrent } = props;

  /** 清单明细表 REF */
  const { inventoryTableRef, inventoryDirectoryTreeRef } = props;

  const [modal, contextHolder] = Modal.useModal();

  const projectId = productActionCurrent?.projectId || '';
  const stageId = productActionCurrent?.id || '';

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 单价编号顺序重组 */
  const onOk = async () => {
    setLoading(true);
    const res = await updateInventoryCodeSerialNumber({ projectId, stageId });
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      inventoryTableRef?.current?.reload?.();
      inventoryDirectoryTreeRef?.current?.reload?.();
    }
    return res;
  };

  /** 单价编号顺序重组 */
  const handleOnSubmit = async () => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `可能会对当前数据造成影响, 是否继续?`,
      onOk,
    });
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button onClick={handleOnSubmit} className="BorderButtonLime" loading={loading}>
      <RedoOutlined /> 生成清单编码
    </Button>
  );

  return (
    <>
      {triggerBtn} {contextHolder}
    </>
  );
};
