/*
 * @Author: SHUANG
 * @Date: 2024-03-18 17:21:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-18 17:50:59
 * @Description: 工程造价-人材机汇总与调价 材料类型汇总
 */

import { Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';
import { MatSummaryQuery, MatTypeSummaryItem } from '../MatSummaryTable/typings';
import { matSummaryQueryMatTypeSummary } from '../MatSummaryTable/services';
import { ProductItem } from '@/pages/dbapply/Product/Product/typings';
import useTableColumns from './useTableColumns';

type Props = { productActionCurrent?: ProductItem };

export default (props: Props) => {
  /** 当前材料汇总明细 */
  const { productActionCurrent } = props;

  const projectId = productActionCurrent?.projectId || '';
  const stageId = productActionCurrent?.id || '';

  /** SERVICE 关联参数 */
  const serviceParams = { projectId, stageId };

  /** 反查定额 */
  const generateTable: BaseTableProps<MatTypeSummaryItem, MatSummaryQuery> = {
    persistenceKey: 'PAGES_CONSTRUCTION_COST_MAT_SUMMARY_MATTYPE_SUMMARY_TABLE',
    service: {
      dataSourceRequest: matSummaryQueryMatTypeSummary,
      manualRequest: !stageId,
      params: serviceParams,
    },
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
    style: { top: 120 },
    width: 800,
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="EditButton">
      <FileTextOutlined /> 材料分类汇总
    </Button>
  );

  return (
    <ModalButton
      trigger={triggerBtn}
      modalTitle="材料分类汇总"
      determineActionCurrent={!stageId}
      modalProps={modalProps}
      render={ModalRender}
    />
  );
};
