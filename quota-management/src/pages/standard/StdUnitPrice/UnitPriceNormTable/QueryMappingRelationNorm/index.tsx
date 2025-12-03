/*
 * @Author: SHUANG
 * @Date: 2023-11-22 11:11:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 14:09:12
 * @Description: 综合单价-定额明细 清单关联定额映射库查询
 */
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';

import StdRelationNorm from '@/pages/standard/StdRelationNorm';
import { RelationNormItem } from '@/pages/standard/StdRelationNorm/RelationNormTable/typings';
import { UnitPriceDetailItem } from '../../UnitPriceDetailTable/typings';

/**
 * @name unitPriceDetailCurrent 综合单价清单 当前选中
 */
export type QueryMappingRelationNormProps = {
  unitPriceDetailCurrent?: UnitPriceDetailItem;
  onSubmit: (relationNormSelection: RelationNormItem[]) => Promise<FETCH.Res>;
};

export default (props: QueryMappingRelationNormProps) => {
  const [modal, contextHolder] = Modal.useModal();

  /** 综合单价 当前清单 */
  const { unitPriceDetailCurrent } = props;

  /** 操作栏禁用条件 没有当前清单 */
  const toolbarDisabled = !unitPriceDetailCurrent || !!unitPriceDetailCurrent?.children?.length;

  /** 清单关联定额映射库 已勾选定额 */
  const [relationNormSelection, setRelationNormSelection] = useState<RelationNormItem[]>();

  /** 标准库 - 清单关联定额映射库 */
  const StdRelationNormRender = (
    <StdRelationNorm setRelationNormSelection={setRelationNormSelection} readonly="norm" />
  );

  /** 触发按钮 */
  const triggerControl = () => {
    if (toolbarDisabled) {
      modal.warning({ title: '继续操作', content: '请选择综合单价进行操作!' });
      return { status: 'ERROR' };
    }
    return { status: 'SUCCESS' };
  };

  /** 保存同步映射库清单目录 */
  const handleSyncRelationNormmOnSubmit = () => {
    if (!relationNormSelection?.length) {
      const modalInfo = {
        icon: <InfoCircleOutlined />,
        content: '请勾选定额进行保存！',
        title: '继续操作',
        okText: '确定',
      };
      modal.warning(modalInfo);
      return;
    }
    return props?.onSubmit?.(relationNormSelection);
  };

  /** 触发按钮 */
  const modalTrigger = (
    <Button className="PlusButton">
      <PlusOutlined /> 清单关联定额映射库查询
    </Button>
  );

  return (
    <>
      <BaseModal
        width={1200}
        trigger={modalTrigger}
        onSubmit={handleSyncRelationNormmOnSubmit}
        triggerControl={triggerControl}
        okText={`保 存${!!relationNormSelection?.length ? `(${relationNormSelection?.length})` : ''}`}
        title="清单关联定额映射库查询"
      >
        <section style={{ height: 600 }}>{StdRelationNormRender}</section>
      </BaseModal>
      {contextHolder}
    </>
  );
};
