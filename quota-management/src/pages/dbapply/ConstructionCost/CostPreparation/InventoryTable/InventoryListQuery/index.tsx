/*
 * @Author: SHUANG
 * @Date: 2024-04-01 11:09:07
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 09:51:57
 * @Description: 工程造价-工程量清单编制-分部分项清单表 从清单关联映射库到清单中批量新增s
 */
import { useState } from 'react';
import { Button, Modal, Tag, message } from 'antd';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import { BaseTableProps, TableActionType, TreeActionType } from 'jd-framework-web/package/components';
import { RelationDetailItem } from '@/pages/standard/StdRelationNorm/RelationDetailTable/typings';
import { inventoryBatchInsertInventoryByListNormDetail } from '../services';
import { ProductItem } from '@/pages/dbapply/Product/Product/typings';
import StdRelationNorm from '@/pages/standard/StdRelationNorm';
import { InventoryItem } from '../typings';

type Props = {
  /** 当前操作产品 */
  productActionCurrent?: ProductItem;
  /** 分部分项清单明细表 当前操作 */
  inventoryActionCurrent?: InventoryItem;
  /** 分部分项清单目录 REF  */
  inventoryDirectoryTreeRef?: TreeActionType;
  /** 分部分项清单明细表 REF */
  inventoryTableRef?: TableActionType;
};

export default (props: Props) => {
  /**  PROPS 当前产品 */
  const { productActionCurrent } = props;
  const { inventoryActionCurrent } = props;

  const { inventoryTableRef, inventoryDirectoryTreeRef } = props;

  const [modal, contextHolder] = Modal.useModal();

  /** 当前、设置当前 勾选的清单 */
  const [relationDetailSelection, setRelationDetailSelection] = useState<RelationDetailItem[]>();

  /** 显示保存数量 */
  const okText = <>保 存{relationDetailSelection?.length ? `(${relationDetailSelection?.length})` : ''}</>;

  /** 提交方法 */
  const onSubmit: any = async (sele?: RelationDetailItem[]) => {
    const stageId = productActionCurrent?.id || '';
    const projectId = productActionCurrent?.projectId || '';
    const billSort = inventoryActionCurrent?.billSort || '';
    const parentId = inventoryActionCurrent?.parentId || '';
    const currentId = inventoryActionCurrent?.id || '';

    const serviceParams = { projectId, stageId, billSort, parentId, currentId };

    // 所选清单
    const listNormDirectoryId = sele?.[0]?.listNormDirectoryId || '';
    const ids = sele?.map((item) => item.id) || [];
    const res = await inventoryBatchInsertInventoryByListNormDetail({
      ...serviceParams,
      listNormDirectoryId,
      ids,
    });
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || `操作成功`);
      inventoryDirectoryTreeRef?.current?.reload?.();
      inventoryTableRef?.current?.reload?.();
    }
  };

  /** 弹窗保存已选择的清单 */
  const handleOnSubmit: any = async () => {
    if (!relationDetailSelection?.length) {
      const modalInfo = {
        icon: <InfoCircleOutlined />,
        content: '请勾选要增加的数据！',
        title: '继续操作',
        okText: '确定',
      };
      modal.warning(modalInfo);
      return;
    }
    onSubmit(relationDetailSelection);
  };

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
    <Button className="BorderButtonPrimary" icon={<SearchOutlined />}>
      查询标准清单
    </Button>
  );

  const onDoubleClick = (record: RelationDetailItem) => {
    onSubmit([record]);
  };

  /** 引用清单关联定额映射库 */
  const relationDetailTableProps: Partial<BaseTableProps> = {
    toolbarLast: <Tag color="blue">可以双击行快速添加当前清单</Tag>,
    onSelections: setRelationDetailSelection,
    onDoubleClick,
  };

  return (
    <>
      <BaseModal
        width={1100}
        okText={okText}
        trigger={triggerButton}
        onSubmit={handleOnSubmit}
        triggerControl={triggerControl}
        style={{ top: 140, left: '6vw' }}
        title="查询标准清单"
        mask={false}
      >
        <section style={{ height: 560 }}>
          <StdRelationNorm
            relationDetailTableProps={relationDetailTableProps}
            relationDirectoryTreeProps={{ checkable: false }}
            relationNormTableProps={{ rowSelection: false }}
            viewContaineProps={{ scroll: 'percent' }}
            paneContainerProps={{ width: 200 }}
          />
        </section>
      </BaseModal>
      {contextHolder}
    </>
  );
};
