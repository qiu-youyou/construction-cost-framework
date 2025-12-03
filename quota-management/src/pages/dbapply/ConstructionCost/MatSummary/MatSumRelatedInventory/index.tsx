/*
 * @Author: SHUANG
 * @Date: 2024-03-18 14:24:44
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 16:33:25
 * @Description: 工程造价-人材机汇总与调价 查看相关清单
 */

import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import useTableColumns from '@/pages/dbapply/ConstructionCost/CostPreparation/InventoryTable/useTableColumns';
import { matSummaryQueryInventoryByProductPriceNormCode } from '../MatSummaryTable/services';
import { InventoryItem } from '../../CostPreparation/InventoryTable/typings';
import { MatSummaryNormItem } from '../MatSummaryTable/typings';

type Props = { matSummaryNormCurrent?: MatSummaryNormItem };

export default (props: Props) => {
  /** 当前选中相关清单 */
  const { matSummaryNormCurrent } = props;

  const stageId = matSummaryNormCurrent?.stageId || '';
  const projectId = matSummaryNormCurrent?.projectId || '';
  const normCode = matSummaryNormCurrent?.normCode || '';

  /** SERVICE 关联惨素 */
  const serviceParmas = { projectId, stageId, normCode };

  /** COLUMNS */
  const columns = [
    { title: '序号', dataIndex: 'index' },
    ...useTableColumns({ auditStatus: false }).filter(
      (item) => item?.dataIndex !== 'inventoryLog' && item?.dataIndex !== 'showNumber',
    ),
  ];

  /** 反查清单 */
  const generateTable: BaseTableProps<InventoryItem> = {
    persistenceKey: 'PAGES_CONSTRUCTION_COST_MAT_SUMMARY_INVENTORY_TABLE',
    service: {
      dataSourceRequest: matSummaryQueryInventoryByProductPriceNormCode,
      manualRequest: !normCode,
      params: serviceParmas,
    },
    rowSelection: false,
    search: false,
    columns,
  };

  /** 人材机选择 */
  const ModalRender = (
    <section style={{ height: 420 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: false,
    style: { top: 170, left: '6vw' },
    width: 1200,
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonPrimary">
      <EyeOutlined /> 查看相关清单
    </Button>
  );
  return (
    <ModalButton
      trigger={triggerBtn}
      modalTitle="查看相关清单"
      determineActionCurrent={!matSummaryNormCurrent}
      modalProps={modalProps}
      render={ModalRender}
    />
  );
};
