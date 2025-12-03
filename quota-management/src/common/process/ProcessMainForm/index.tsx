/*
 * @Author: SHUANG
 * @Date: 2022-09-04 15:16:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-06 09:46:30
 * @Description: 查看流程审批历史
 */

import { Button, Tooltip } from 'antd';
import React, { ReactNode, Suspense, useState } from 'react';
import { EyeOutlined, FieldTimeOutlined, MessageOutlined, ThunderboltOutlined } from '@ant-design/icons';
import type {
  BusinessItem,
  ToDoDoneListItem,
  ToDoListItem,
} from 'jd-framework-web/package/common/views/home/typings';
import { JDModalButton, ModalActionType } from 'jd-framework-web/package/components';
import { saveActionsRows } from 'jd-framework-web/package/components/BaseTable/util';

import { workflowFormUrlMap } from '@/common/constant/workflow';
import { businessQueryOne } from './services';

/** 异步加载主单据 */
// const IssueDetails = React.lazy(() => import('@/pages/demo/WorkflowDemo/IssueDetials/index'));

type Props = {
  /** 查看 ｜ 办理 */
  formType?: SYS.FormType;
  /** 按钮渲染成 文字 ｜按钮｜图标 */
  button?: 'text' | 'button' | 'icon' | 'reply' | 'none';
  toDoItem?: ToDoListItem | ToDoDoneListItem | (BusinessItem & { businessName?: string });
  actionRef?: ModalActionType; // 操作弹窗
  setIsOpen?: (v: boolean) => void;
  reload?: () => void; // 外部列表刷新函数
};

export default (props: Props) => {
  /** 相关当前行 */
  const [current, setCurrent] = useState<any>();

  const onClickFlowHandle = async () => {
    setCurrent(undefined);

    props?.setIsOpen?.(true);
    const faileReturn: FETCH.Row = { status: 'ERROR', rows: {} };
    if (!props?.toDoItem?.businessId) return faileReturn;
    const res = await businessQueryOne(
      workflowFormUrlMap?.[props.toDoItem.businessKey],
      props.toDoItem.businessId,
    );
    if (res?.status !== 'SUCCESS') return res;
    setCurrent(res?.rows);
    return res;
  };

  const onAfterClose = async () => {
    saveActionsRows('SETTLEBILLDETAILSTABLE', [], undefined);
    props?.setIsOpen?.(false);
    props?.reload?.();
  };

  /** 渲染DOM */
  const iconTrigger = (
    <Tooltip title={props?.formType === 0 ? '查看' : '办理'} mouseEnterDelay={0.5}>
      {props?.formType === 0 ? (
        <EyeOutlined
          className="linkAButton"
          style={{ fontSize: 17, transform: 'translateY(-0.3px)' }}
          onClick={onClickFlowHandle}
        />
      ) : (
        <ThunderboltOutlined
          className="linkAButton"
          style={{ fontSize: 15, transform: 'translateY(0.8px)' }}
          onClick={onClickFlowHandle}
        />
      )}
    </Tooltip>
  );

  const triggerButtonMap: { [index: string]: ReactNode } = {
    // 按钮
    button: (
      <Button className="ButtonCyan" onClick={onClickFlowHandle}>
        <FieldTimeOutlined /> {props?.formType === 0 ? '查看' : '办理'}
      </Button>
    ),
    // 图标
    icon: iconTrigger,
    // 答复流程
    reply: (
      <Tooltip title="答复流程" mouseEnterDelay={0.5}>
        <MessageOutlined
          className="linkAButton"
          style={{ fontSize: 15, transform: 'translateY(0.8px)' }}
          onClick={onClickFlowHandle}
        />
      </Tooltip>
    ),
    // 默认
    default: (
      <a className="linkAButton" target="_blank" onClick={onClickFlowHandle}>
        {props?.formType === 0 ? '查看' : '办理'}
      </a>
    ),
  };

  /** 触发按钮 */
  const trigger = triggerButtonMap[props?.button || 'default'];

  /** 流程主单据渲染 */
  const mainRenderMap: { [index: string]: any } = {
    large_issue: (
      <Suspense fallback={<>Loading...</>}>
        {/* <IssueDetails issueCurrent={current} formType={props?.formType || 0} /> */}
      </Suspense>
    ),
  };

  return (
    <JDModalButton
      actionRef={props?.actionRef}
      modalTitle={props?.toDoItem?.businessName}
      determineActionCurrent={props.button == 'button'}
      trigger={props.button === 'none' ? ' ' : trigger}
      render={!!current ? mainRenderMap[props?.toDoItem?.businessKey || ''] : 'loading'}
      modalProps={
        props.button === 'none'
          ? { beforeOpen: onClickFlowHandle, afterClose: onAfterClose }
          : { afterClose: onAfterClose }
      }
    />
  );
};
