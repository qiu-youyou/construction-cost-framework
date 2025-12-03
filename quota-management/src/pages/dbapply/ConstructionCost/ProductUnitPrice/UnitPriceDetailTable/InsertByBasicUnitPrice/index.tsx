/*
 * @Author: SHUANG
 * @Date: 2024-03-07 11:14:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 10:16:13
 * @Description: 工程造价-工程量清单编制-综合单价 - 从基础库新增
 */
import { useRef, useState } from 'react';
import { Button, CheckboxProps, Modal, message } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import { ModalActionType } from 'jd-framework-web/package/components';

import { productUnitPriceInsertByBasic } from '../services';
import { ProductUnitPriceInsertByBasic } from '../typings';

import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';
import StdUnitPrice from '@/pages/standard/StdUnitPrice';

import { CostPreparationProps } from '../../../CostPreparation/typings';

type Props = CostPreparationProps & { buttonClassName?: string };

export default (props: Props) => {
  /** 当前操作产品 */
  const { buttonClassName } = props;
  const { productActionCurrent } = props;
  /** 分部分项清单、综合单价 REF */
  const { inventoryTableRef, unitPriceDetailTableRef } = props;

  const modalRef = useRef<ModalActionType>();

  const [modal, contextHolder] = Modal.useModal();

  /** 工程ID 阶段ID 价格编号  */
  const stageId = productActionCurrent?.id || '';

  const projectId = productActionCurrent?.projectId || '';

  const [unitPriceDetailSelection, setUnitPriceDetailSelection] = useState<UnitPriceDetailItem[]>();

  /** 提交方法 */
  const onSubmit = async (selection?: UnitPriceDetailItem[]) => {
    const ids = selection?.map((item) => item.id) || [];
    const unitPriceDbId = selection?.[0]?.unitPriceDbId || '';
    const params: ProductUnitPriceInsertByBasic = { projectId, stageId, ids, unitPriceDbId };
    const res = await productUnitPriceInsertByBasic(params);
    if (res?.status === 'SUCCESS') {
      modalRef?.current?.close?.();
      message.destroy();
      message.success(res?.message || `操作成功`);
      inventoryTableRef?.current?.reload?.();
      unitPriceDetailTableRef?.current?.reload?.();
    }
  };

  /** 弹窗触发保存 */
  const handleOnSubmit: any = async () => {
    if (!unitPriceDetailSelection?.length) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请勾选需要增加的数据！再进行该操作！' };
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }
    onSubmit?.(unitPriceDetailSelection);
    return;
  };

  /** 控制智能选择 子级 */
  const getCheckboxProps: (
    record: UnitPriceDetailItem,
  ) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>> = (record) => {
    return { disabled: !!record?.children?.length };
  };

  /** 显示保存数量 */
  const okText = <>保 存{unitPriceDetailSelection?.length ? `(${unitPriceDetailSelection?.length})` : ''}</>;

  /** 触发按钮 */
  const triggerButton = (
    <Button className={buttonClassName || 'BorderButtonPrimary'} icon={<PlusOutlined />}>
      查询标准综合单价库
    </Button>
  );

  return (
    <>
      <BaseModal
        okText={okText}
        onSubmit={handleOnSubmit}
        trigger={triggerButton}
        actionRef={modalRef}
        title="查询标准综合单价库"
        width={1100}
      >
        <section style={{ height: 530 }}>
          <StdUnitPrice
            propsUnitPriceDetail={{ tableProps: { rowSelection: { getCheckboxProps } } }}
            setUnitPriceDetailSelection={setUnitPriceDetailSelection}
            viewContaineProps={{ scroll: 'percent' }}
            paneContainerProps={{ width: 200 }}
          />
        </section>
      </BaseModal>
      {contextHolder}
    </>
  );
};
