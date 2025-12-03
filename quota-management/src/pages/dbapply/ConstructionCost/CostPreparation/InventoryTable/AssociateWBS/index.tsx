/*
 * @Author: SHUANG
 * @Date: 2024-01-11 15:26:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 09:51:25
 * @Description: 工程造价-工程量清单编制-分部分项清单表-关联WBS
 */
import { useState } from 'react';
import { Button, Modal, Tag, message } from 'antd';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import { TableActionType } from 'jd-framework-web/package/components';
import { InfoCircleOutlined, PaperClipOutlined } from '@ant-design/icons';

import { WbsDetailItem } from '@/pages/standard/StdWbs/WbsDetailTable/typings';
import StdWbs from '@/pages/standard/StdWbs';

import { InventoryCreateRelevancyParams, InventoryItem } from '../typings';
import { inventoryCreateRelevancyByIds } from '../services';

type Props = {
  /** 分部分项清单 当前选中 */
  inventoryActionCurrent?: InventoryItem;
  /** 分部分项清单表 REF */
  inventoryTableRef?: TableActionType;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** PROPS 分部分项清单 */
  const { inventoryTableRef } = props;
  const { inventoryActionCurrent } = props;

  /** 当前选中分部分项清单 */
  const id = inventoryActionCurrent?.id || '';
  const stageId = inventoryActionCurrent?.stageId || '';
  const projectId = inventoryActionCurrent?.projectId || '';

  const inventoryActionCurrentParams = { id, stageId, projectId };

  /** 当前选中 */
  const [current, setCurrent] = useState<WbsDetailItem>();

  /** 提交方法 */
  const onSubmit = async (current?: WbsDetailItem) => {
    const params: InventoryCreateRelevancyParams = {
      ...inventoryActionCurrentParams,
      wbsCode: current?.wbsCode || '',
      wbsName: current?.wbsName || '',
      relevancyType: 'wbs', // 写死
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

  /** 标准WBS库 */
  const StdWbsRender = (
    <section style={{ height: 320 }}>
      <StdWbs
        toolbarSlot={<Tag color="blue">可以双击行快速设置当前WBS</Tag>}
        setWbsDetailCurrent={setCurrent}
        onDoubleClick={handleOnSubmit}
        viewContainerScroll="percent"
        splitWidth={140}
      />
    </section>
  );

  /** 触发按钮 */
  const triggerButton = (
    <Button className="BorderButtonBlue" icon={<PaperClipOutlined />}>
      关联WBS
    </Button>
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

  return (
    <>
      <BaseModal
        width={800}
        trigger={triggerButton}
        triggerControl={triggerControl}
        style={{ top: 280, left: '13vw' }}
        onSubmit={handleOnSubmit}
        title="清单对应WBS结构设置"
        okText="确 定"
        mask={false}
      >
        {StdWbsRender}
      </BaseModal>
      {contextHolder}
    </>
  );
};
