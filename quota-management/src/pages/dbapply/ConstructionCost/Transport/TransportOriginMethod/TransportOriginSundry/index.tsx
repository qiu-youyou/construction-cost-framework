/*
 * @Author: SHUANG
 * @Date: 2024-04-19 14:10:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 15:59:28
 * @Description: 工程造价-运保杂费计算 杂费输入表
 */

import { Button } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseModalProps, BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import EditButton from 'jd-framework-web/package/components/ActionButton/EditButton';

import { TransportOriginSundryItem, TransportOriginOtherQuery } from '../typings';
import { TransportProps } from '../../typings';
import useTableColumns from './useTableColumns';
import * as API from './services';

export default (props: TransportProps) => {
  const { transportOriginMethodCurrent } = props;

  /** 关联参数 */
  const metId = transportOriginMethodCurrent?.id || '';
  const oriId = transportOriginMethodCurrent?.oriId || '';
  const traId = transportOriginMethodCurrent?.traId || '';
  const stageId = transportOriginMethodCurrent?.stageId || '';
  const projectId = transportOriginMethodCurrent?.projectId || '';
  const traTaxRate = transportOriginMethodCurrent?.traTaxRate;

  const serviceParams = { metId, oriId, traId, stageId, projectId, traTaxRate };

  /** 运杂费用表 TOOLBAR */
  const toolbar: TableToolbarDefine<TransportOriginSundryItem> = {
    plusLine: { onSubmit: API.transportOriginSundrySaveBlankRow },
    deleted: { onSubmit: API.transportOriginSundryDeleteByIds },
  };

  /** 运杂费用表 */
  const generateTable: BaseTableProps<TransportOriginSundryItem, TransportOriginOtherQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_TRANSPORT_ORIGIN_SUNDRY_TABLE',
    service: {
      dataSourceRequest: API.transportOriginSundryQueryPageInfo,
      cellEditSaveRequest: API.transportOriginSundryUpdateRow,
      params: serviceParams,
      manualRequest: !metId,
    },
    columns: useTableColumns,
    requestSummary: true,
    cellEditable: true,
    search: false,
    toolbar,
  };

  /** 关闭弹窗 */
  const afterClose = () => {
    const { transportMainTableRef, transportOriginTableRef, transportOriginMethodTableRef } = props;
    transportMainTableRef?.current?.reload?.();
    transportOriginTableRef?.current?.reload?.();
    transportOriginMethodTableRef?.current?.reload?.();
  };

  /** 触发按钮 */
  const triggerButton = (
    <Button className="BorderButtonGreen" icon={<CalculatorOutlined />}>
      杂费计算
    </Button>
  );

  const renderForm = (
    <section style={{ height: 400 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  /** 弹窗属性 */
  const modalProps: BaseModalProps = {
    defaultFullScreen: false,
    noFooter: true,
    footer: null,
    afterClose,
    width: 600,
  };
  return (
    <EditButton
      render={renderForm}
      current={transportOriginMethodCurrent}
      trigger={triggerButton}
      modalProps={modalProps}
      modalTitle="杂费输入表"
    />
  );
};
