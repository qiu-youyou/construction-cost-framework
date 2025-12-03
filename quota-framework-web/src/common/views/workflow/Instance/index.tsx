/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 16:29:04
 * @Description:
 */
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { BaseTableProps, TableActionType } from '../../../../components/BaseTable/typings';
import ActionIdsButton from '../../../../components/ActionButton/ActionIdsButton';
import ViewContainer from '../../../../components/ViewContainer';
import BaseTable from '../../../../components/BaseTable';

import useAuthButton from '../../../../utils/auth/useAuthButton';

import { LAYOUTCOL } from '../../../constant/layoutCol';
import useTableColumns from './useTableColumns';

const { columns: tableColumns } = useTableColumns();
import * as TYPES from './typings';
import * as API from './services';

export default () => {
  const { auth } = useAuthButton();
  const tableActionRef = useRef<TableActionType>();
  const [current, setCurrent] = useState<TYPES.InstanceListItem>();
  const [selections, setSelections] = useState<TYPES.InstanceListItem[]>();

  /** 表格刷新方法 */
  const tableRefresh = () => {
    tableActionRef?.current?.reload?.();
  };

  const activateInstanceButton = (
    <Button className="ButtonCyan">
      <CheckCircleOutlined /> 激活实例
    </Button>
  );
  const activateInstance = (
    <ActionIdsButton
      buttonText="激活"
      idsKey="processInstanceId"
      trigger={activateInstanceButton}
      onSubmit={API.activateInstance}
      onRefresh={tableRefresh}
      selections={selections}
      current={current}
    />
  );

  /** 挂起实例 */
  const suspendInstanceButton = (
    <Button className="ButtonOrange">
      <ClockCircleOutlined /> 挂起实例
    </Button>
  );
  const suspendInstance = (
    <ActionIdsButton
      buttonText="挂起"
      idsKey="processInstanceId"
      trigger={suspendInstanceButton}
      onSubmit={API.suspendInstance}
      onRefresh={tableRefresh}
      selections={selections}
      current={current}
    />
  );

  /** 结束实例 */
  const endInstanceButton = (
    <Button className="ButtonRed">
      <CloseCircleOutlined /> 结束实例
    </Button>
  );
  const endInstance = (
    <ActionIdsButton
      buttonText="结束"
      idsKey="processInstanceId"
      trigger={endInstanceButton}
      onSubmit={API.endInstance}
      onRefresh={tableRefresh}
      selections={selections}
      current={current}
    />
  );

  /** 流程实例 激活 挂起 结束 */
  const toolbarBefore = (
    <>
      {auth('activate') && activateInstance} {auth('suspend') && suspendInstance}
      {auth('end') && endInstance}
    </>
  );

  const generateTable: BaseTableProps<TYPES.InstanceListItem> = {
    persistenceKey: 'COMMONVIEWSWORKFLOWINSTANCETABLE',
    search: { labelWidth: 55, span: LAYOUTCOL.colPropsMin },
    service: { dataSourceRequest: API.queryListInstance },
    rowSelection: { columnWidth: 55 },
    onSelections: setSelections,
    onCurrent: setCurrent,
    actionRef: tableActionRef,
    columns: tableColumns,
    virtual: false,
    rowKey: false,
    toolbarBefore,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
