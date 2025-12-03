/*
 * @Author: SHUANG
 * @Date: 2023-11-15 18:34:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 17:11:25
 * @Description: 标准综合单价库 - 清单明细 - 单价分析表
 */

import { Button } from 'antd';
import { ReactNode } from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps } from 'jd-framework-web/package/components';
import { UnitPriceDetailItem } from '../typings';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

/** @name unitPriceDetailActionCurrent 综合单价目录 当前选中 */

type Props = {
  unitPriceDetailActionCurrent?: UnitPriceDetailItem;
  tableServiceConfig?: BaseTableProps['service'];
  triggerText?: string;
  trigger?: ReactNode;
};

export default (props: Props) => {
  const { tableServiceConfig } = props;
  const { trigger, triggerText } = props;
  /** 当前清单明细 */
  const { unitPriceDetailActionCurrent } = props;
  /** 当前清单明细 ID */
  const unitPriceId = unitPriceDetailActionCurrent?.id || '';
  /** 当前清单明细中 目录ID */
  const unitPriceDbId = unitPriceDetailActionCurrent?.unitPriceDbId || '';

  /** 单价分析表 */
  const generateTable: BaseTableProps<TYPES.UnitPriceAnalysisItem, TYPES.UnitPriceAnalysisQuery> = {
    persistenceKey: 'PAGESTANDARDCOMPREHENSIVEUNITPRICEDETAILANALYSISTABLE',
    service: tableServiceConfig || {
      dataSourceRequest: API.unitPriceAnalysisQueryPageInfo,
      params: { unitPriceDbId, unitPriceId },
      manualRequest: !unitPriceDbId,
    },
    columns: useTableColumns,
    rowSelection: false,
    virtual: false,
    search: false,
  };

  /** 触发按钮 */
  const modalTrigger = trigger || (
    <Button className="BorderButtonCyan">
      <FileTextOutlined /> {triggerText || '综合单价分析表'}
    </Button>
  );

  /** 单价分析表 */
  const ModalRender = (
    <section style={{ height: 480 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: false,
    width: 900,
  };

  return (
    <ModalButton
      modalTitle={triggerText || '综合单价分析表'}
      determineActionCurrent={!unitPriceId}
      modalProps={modalProps}
      trigger={modalTrigger}
      render={ModalRender}
    />
  );
};
