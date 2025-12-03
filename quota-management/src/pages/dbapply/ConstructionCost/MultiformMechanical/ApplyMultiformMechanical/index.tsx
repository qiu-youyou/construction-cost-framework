/*
 * @Author: SHUANG
 * @Date: 2024-03-28 18:14:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 10:27:14
 * @Description: 工程造价-机械台班组时费 应用机械台班组时费
 */
import { useState } from 'react';
import { Button, Modal, Tag, message } from 'antd';
import { InfoCircleOutlined, TagOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';
import { MultiformMechanicalItem } from '../MultiformMechanicalTable/typings';
import { ProductItem } from '@/pages/dbapply/Product/Product/typings';
import MultiformMechanical from '..';

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

  /** 组时机械定义 当前选中 */
  const [multiformMechanicalAction, setMultiformMechanicalAction] = useState<MultiformMechanicalItem>();

  /** 提交方法 */
  const onSubmit: any = async (current?: UnitPriceDetailItem) => {
    const res = await props?.onSubmit?.(current);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || `操作成功`);
    }
  };

  /** 弹窗触发保存 */
  const handleOnSubmit: any = async () => {
    if (!multiformMechanicalAction) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请选择一项数据！' };
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }
    onSubmit?.(multiformMechanicalAction);
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
    <Button className="BorderButtonCyan" icon={<TagOutlined />}>
      应用组时费
    </Button>
  );

  return (
    <>
      <BaseModal
        trigger={triggerButton}
        onSubmit={handleOnSubmit}
        triggerControl={triggerControl}
        style={{ top: 100, left: '-13vw' }}
        title="应用机械台班组时费"
        width={800}
        mask={false}
      >
        <section style={{ height: 460 }}>
          <MultiformMechanical
            paneContainerProps={{ height: '50%' }}
            productActionCurrent={productActionCurrent}
            tableProps={{
              toolbarLast: <Tag color="blue">可以双击行快速应用当前组时费</Tag>,
              onActionCurrent: setMultiformMechanicalAction,
              onDoubleClick: (record) => onSubmit?.(record),
            }}
          />
        </section>
      </BaseModal>
      {contextHolder}
    </>
  );
};
