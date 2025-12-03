/*
 * @Author: SHUANG
 * @Date: 2024-01-11 15:03:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 09:52:20
 * @Description: 工程造价-工程量清单编制-分部分项清单表 关联WBS
 */
import { useState } from 'react';
import { Button, Modal, Tag, message } from 'antd';
import { InfoCircleOutlined, SwapOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import { TableActionType } from 'jd-framework-web/package/components';

import { OtherTypeApiItem } from '@/pages/standard/StdTypeTarget/typings';
import StdTypeTarget from '@/pages/standard/StdTypeTarget';

import { InventoryCreateRelevancyParams, InventoryItem } from '../typings';
import { inventoryCreateRelevancyByIds } from '../services';

type Props = {
  /** 分部分项清单 当前选中 */
  inventoryActionCurrent?: InventoryItem;
  /** 分部分项清单表 REF */
  inventoryTableRef?: TableActionType;
};

export default (props: Props) => {
  /** PROPS 分部分项清单 */
  const { inventoryTableRef } = props;
  const { inventoryActionCurrent } = props;

  const [modal, contextHolder] = Modal.useModal();

  /** 当前选中分部分项清单 */
  const id = inventoryActionCurrent?.id || '';
  const stageId = inventoryActionCurrent?.stageId || '';
  const projectId = inventoryActionCurrent?.projectId || '';

  const inventoryActionCurrentParams = { id, stageId, projectId };

  /** 当前选中 */
  const [current, setCurrent] = useState<OtherTypeApiItem>();

  /** 提交方法 */
  const onSubmit = async (current?: OtherTypeApiItem) => {
    const params: InventoryCreateRelevancyParams = {
      ...inventoryActionCurrentParams,
      relevancyType: 'index', // 写死
      indexCode: current?.kpiCode || '',
      indexName: current?.kpiName || '',
    };
    const res = await inventoryCreateRelevancyByIds(params);
    if (res?.status === 'SUCCESS') {
      message.destroy();
      message.success(res?.message || `操作成功`);
      inventoryTableRef?.current?.reload?.();
    }
  };

  /** 弹窗触发保存 */
  const handleOnSubmit: any = async () => {
    if (!current) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请选择操作的数据！' };
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }
    onSubmit?.(current);
    return;
  };

  /** 工程量分类库 */
  const StdTypeTargetRender = (
    <section style={{ height: 320 }}>
      <StdTypeTarget
        toolbarSlot={<Tag color="blue">可以双击行快速设置当前指标分类</Tag>}
        setOtherTypeApiCurrent={setCurrent}
        onDoubleClick={handleOnSubmit}
        readonly
      />
    </section>
  );

  /** 弹窗属性 */
  const triggerControl = async () => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
    if (!inventoryActionCurrent) {
      modal.warning({ title: '继续操作', content: `请选择清单，进行操作！` });
      return errorReturn;
    }
    return { ...errorReturn, status: 'SUCCESS' };
  };

  /** 触发按钮 */
  const triggerButton = (
    <Button className="BorderButtonBlue" icon={<SwapOutlined />}>
      设置指标分类
    </Button>
  );

  return (
    <>
      <BaseModal
        width={600}
        trigger={triggerButton}
        onSubmit={handleOnSubmit}
        triggerControl={triggerControl}
        style={{ top: 300, left: '14vw' }}
        title="设置指标分类"
        okText="确 定"
        mask={false}
      >
        {StdTypeTargetRender}
      </BaseModal>
      {contextHolder}
    </>
  );
};
