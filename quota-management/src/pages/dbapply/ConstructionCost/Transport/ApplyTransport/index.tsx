/*
 * @Author: SHUANG
 * @Date: 2024-04-26 09:33:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 10:58:47
 * @Description: 工程造价-运保杂费计算 应用运杂费
 */
import { useState } from 'react';
import { Button, Modal, Tag, message } from 'antd';
import { DiffOutlined, InfoCircleOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';
import { ProductItem } from '@/pages/dbapply/Product/Product/typings';
import { TransportItem } from '../TransportMain/typings';
import Transport from '..';

type Props = {
  /** 当前产品 */
  productActionCurrent?: ProductItem;
  /** 当前人材机 */
  primaryCurrent?: { id?: string };
  /** 保存方法 */
  onSubmit?: any;
};

export default (props: Props) => {
  const { primaryCurrent } = props;
  const { productActionCurrent } = props;
  const [modal, contextHolder] = Modal.useModal();

  /**  当前选中 */
  const [current, setCurrent] = useState<TransportItem>();

  /** 提交方法 */
  const onSubmit: any = async (current?: UnitPriceDetailItem) => {
    const res = await props?.onSubmit?.(current);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || `操作成功`);
    }
  };

  /** 弹窗触发保存 */
  const handleOnSubmit: any = async () => {
    if (!current) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请选择一项数据！' };
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }
    onSubmit?.(current);
    return;
  };

  /** 弹窗属性 */
  const triggerControl = async () => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
    if (!primaryCurrent?.id) {
      modal.warning({ title: '继续操作', content: `请选择一行数据，进行操作！` });
      return errorReturn;
    }
    return { ...errorReturn, status: 'SUCCESS' };
  };

  /** 触发按钮 */
  const triggerButton = (
    <Button className="BorderButtonCyan">
      <DiffOutlined /> 运杂费
    </Button>
  );

  return (
    <>
      <BaseModal
        trigger={triggerButton}
        onSubmit={handleOnSubmit}
        triggerControl={triggerControl}
        wrapClassName="overflowHiddenModal"
        style={{ top: 100, left: '-13vw' }}
        title="应用运杂费"
        mask={false}
        width={950}
      >
        <section style={{ height: 460 }}>
          <Transport
            title={<Tag color="blue">可以双击行快速应用当前运杂费</Tag>}
            productActionCurrent={productActionCurrent}
            paneContainerProps2={{ height: '50%' }}
            paneContainerProps={{ width: '70%' }}
            transportMainTableProps={{
              onDoubleClick: (record) => onSubmit?.(record),
              onActionCurrent: setCurrent,
            }}
          />
        </section>
      </BaseModal>
      {contextHolder}
    </>
  );
};
