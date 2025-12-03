/*
 * @Author: SHUANG
 * @Date: 2024-04-19 14:10:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 15:57:57
 * @Description: 工程造价-运保杂费计算 分段运输费用
 */

import { Button } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseModalProps, BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import EditButton from 'jd-framework-web/package/components/ActionButton/EditButton';

import { TransportOriginOtherItem, TransportOriginOtherQuery } from '../../typings';
import useTableColumns from './useTableColumns';
import { TransportProps } from '../../../typings';
import * as API from './services';

export default (props: TransportProps) => {
  const { transportOriginFreightRef } = props;
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
  const toolbar: TableToolbarDefine<TransportOriginOtherItem> = {
    plusLine: { onSubmit: API.transportOriginOtherSaveBlankRow },
    deleted: { onSubmit: API.transportOriginOtherDeleteByIds },
  };

  /** 运杂费用表 */
  const generateTable: BaseTableProps<TransportOriginOtherItem, TransportOriginOtherQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_TRANSPORT_ORIGIN_OTHER_TABLE',
    service: {
      dataSourceRequest: API.transportOriginOtherQueryPageInfo,
      cellEditSaveRequest: API.transportOriginOtherUpdateRow,
      params: serviceParams,
      manualRequest: !metId,
    },
    columns: useTableColumns,
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

  /** 弹窗属性 */
  const modalProps: BaseModalProps = {
    defaultFullScreen: false,
    noFooter: true,
    footer: null,
    width: 1300,
    afterClose,
  };

  /** 触发按钮 */
  const triggerButton = (
    <Button className="BorderButtonGreen" icon={<CalculatorOutlined />}>
      运费计算
    </Button>
  );

  const renderForm = (
    <section style={{ height: 400 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  return (
    <EditButton
      render={renderForm}
      current={transportOriginMethodCurrent}
      actionRef={transportOriginFreightRef}
      trigger={triggerButton}
      modalProps={modalProps}
      modalTitle="分段运输费用"
    />
  );
};
