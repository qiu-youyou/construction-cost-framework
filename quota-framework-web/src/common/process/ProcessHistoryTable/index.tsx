/*
 * @Author: SHUANG
 * @Date: 2022-09-04 15:16:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-18 11:10:24
 * @Description: 查看流程审批历史
 */
import { ReactNode } from 'react';
import { Button, Tooltip } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';

import { BaseTableProps } from '../../../components/BaseTable/typings';
import ModalButton from '../../../components/ActionButton/ModalButton';
import BaseTable from '../../../components/BaseTable';

import { queryCommentList, QueryCommentParams } from './services';
import useTableColumns from './useTableColumns';

type Props = {
  button?: 'text' | 'button' | 'icon' | 'table'; // 按钮渲染成 文字 ｜按钮｜图标
  setIsOpen?: (v: boolean) => void; // 修复奇怪bug
  processInstanceId?: string; // 流程实例ID
};

/** 渲染DOM */
const triggerButtonMap: { [index: string]: ReactNode } = {
  button: (
    <Button className="ButtonCyan">
      <FieldTimeOutlined className="linkAButton" style={{ fontSize: 16 }} /> 审批历史
    </Button>
  ),
  icon: (
    <Tooltip title="查看审批历史" mouseEnterDelay={0.5}>
      <FieldTimeOutlined className="linkAButton" style={{ fontSize: 17 }} />
    </Tooltip>
  ),
  default: (
    <a className="linkAButton" target="_blank" key="l">
      审批历史
    </a>
  ),
};

export default (props: Props) => {
  /** 必须包含流程参数 */
  if (props?.button !== 'table' && !props?.processInstanceId) return <></>;

  /** 触发按钮 */
  const trigger = triggerButtonMap[props?.button || 'default'];

  /** 历史记录表 */
  const generateFlowTable: BaseTableProps<{}, QueryCommentParams> = {
    persistenceKey: 'COMMONVIEWSCOMPONENTSFLOWTABLE',
    service: { params: { processInstanceId: props?.processInstanceId }, dataSourceRequest: queryCommentList },
    columns: useTableColumns(),
    defaultCurrent: false,
    rowSelection: false,
    virtual: false,
    search: false,
  };

  /** beforeOpen afterClose 修复了很奇怪的bug 不要觉得没用 */
  const beforeOpen = () => {
    props?.setIsOpen?.(true);
  };
  const afterClose = () => {
    props?.setIsOpen?.(false);
  };

  /** 弹窗 */
  const modalHistoryTable = (
    <ModalButton
      trigger={trigger}
      modalTitle="审批历史"
      determineActionCurrent={props.button === 'button'}
      modalProps={{
        wrapClassName: 'COMMON_PROCESS_PROCESSHISTORYTABLE_WRAPMODAL',
        defaultFullScreen: false,
        beforeOpen,
        afterClose,
        width: 1200,
      }}
      render={
        <section style={{ height: 500 }}>
          <BaseTable {...generateFlowTable} />
        </section>
      }
    />
  );

  /** 列表 */
  const historyTable = <BaseTable {...generateFlowTable} />;

  return props?.button === 'table' ? historyTable : modalHistoryTable;
};
