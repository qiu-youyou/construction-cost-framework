/*
 * @Author: SHUANG
 * @Date: 2023-11-15 16:12:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-01 11:23:41
 * @Description: 同步映射库清单数据
 */
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { InfoCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';

import StdRelationNorm from '@/pages/standard/StdRelationNorm';
import { RelationDirectoryItem } from '@/pages/standard/StdRelationNorm/RelationDirectoryTree/typings';
import { UnitPriceDirectoryItem } from '../../UnitPriceDirectoryTree/typings';

/**
 * @name unitPriceDirectoryCurrent 综合单价目录 当前选中
 */
type Props = {
  unitPriceDirectoryCurrent?: UnitPriceDirectoryItem;
  onSubmit: (current: RelationDirectoryItem) => Promise<FETCH.Res>;
};

export default (props: Props) => {
  /** 综合单价 当前目录 */
  const { unitPriceDirectoryCurrent } = props;

  const [modal, contextHolder] = Modal.useModal();

  /** 操作栏禁用条件 */
  const toolbarDisabled = !unitPriceDirectoryCurrent;

  /** 当前映射库目录 */
  const [relationDirectoryCurrent, setRelationDirectoryCurrent] = useState<RelationDirectoryItem>();

  /** 标准库 - 清单关联定额映射库 */
  const StdRelationNormRender = (
    <StdRelationNorm setRelationDirectoryCurrent={setRelationDirectoryCurrent} readonly="directory" />
  );

  /** 保存同步映射库清单目录 */
  const handleSyncRelationNormmOnSubmit = () => {
    if (!relationDirectoryCurrent?.id) {
      const modalInfo = {
        icon: <InfoCircleOutlined />,
        content: '请选择需要同步目录！',
        title: '继续操作',
        okText: '确定',
      };
      modal.warning(modalInfo);
      return;
    }
    return props?.onSubmit?.(relationDirectoryCurrent);
  };

  /** 触发按钮 */
  const modalTrigger = (
    <Button type="primary" disabled={toolbarDisabled}>
      <RetweetOutlined /> 同步映射库清单数据
    </Button>
  );

  return (
    <>
      <BaseModal
        width={1200}
        trigger={modalTrigger}
        onSubmit={handleSyncRelationNormmOnSubmit}
        title="同步映射库清单数据"
      >
        <section style={{ height: 600 }}>{StdRelationNormRender}</section>
      </BaseModal>
      {contextHolder}
    </>
  );
};
