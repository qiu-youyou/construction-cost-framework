/*
 * @Author: SHUANG
 * @Date: 2024-03-15 17:30:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 10:24:52
 * @Description: 工程造价-人材机汇总与调价 查看相关定额
 */
import { Button } from 'antd';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';
import { matSummaryQueryNormByProductPriceNormMatCode } from '../MatSummaryTable/services';
import { MatSummaryNormItem, MatSummaryQuery } from '../MatSummaryTable/typings';
import MatSumRelatedInventory from '../MatSumRelatedInventory';
import useTableColumns from './useTableColumns';
import { MatSummaryProps } from '../typings';

export default (props: MatSummaryProps) => {
  /** 当前材料汇总明细 */
  const { matSummaryCurrent } = props;

  const matIsMain = matSummaryCurrent?.matIsMain || '';
  const projectId = matSummaryCurrent?.projectId || '';
  const stageId = matSummaryCurrent?.stageId || '';
  const matCode = matSummaryCurrent?.matCode || '';

  /** SERVICE 关联参数 */
  const serviceParams = { projectId, stageId, matIsMain, matCode };

  /** 当前选中相关定额 */
  const [matSummaryNormCurrent, setMatSummaryNormCurrent] = useState<MatSummaryNormItem>();

  /** 反查定额 */
  const generateTable: BaseTableProps<MatSummaryNormItem, MatSummaryQuery> = {
    persistenceKey: 'PAGES_CONSTRUCTION_COST_MAT_SUMMARY_NORM_TABLE',
    toolbarFirst: <MatSumRelatedInventory matSummaryNormCurrent={matSummaryNormCurrent} />,
    service: {
      dataSourceRequest: matSummaryQueryNormByProductPriceNormMatCode,
      manualRequest: !matCode,
      params: serviceParams,
    },
    onCurrent: setMatSummaryNormCurrent,
    columns: useTableColumns,
    rowSelection: false,
    search: false,
    rowKey: false,
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
    style: { top: 140 },
    width: 1200,
    mask: false,
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="ButtonPrimary">
      <SearchOutlined /> 查看相关定额
    </Button>
  );

  return (
    <ModalButton
      trigger={triggerBtn}
      modalTitle="查看相关定额"
      determineActionCurrent={!matCode}
      modalProps={modalProps}
      render={ModalRender}
    />
  );
};
