/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-25 15:11:44
 * @Description: 待办
 */
import { history } from 'umi';
import ProList from '@ant-design/pro-list';
import { FieldTimeOutlined } from '@ant-design/icons';
import React, { Suspense, useEffect, ReactNode, useRef, useState } from 'react';

import { getLocationUrl, setLocationUrl } from '../../../../../utils/util/location';

import { ModalActionType } from '../../../../../components/BaseModal/typings';
import { noticeViewUpdate } from '../../../../views/message/Notice/services';
import FlowTable from '../../../../process/ProcessHistoryTable';
import ProcessChart from '../../../../process/ProcessChart';

import { BusinessItem, ToDoListItem } from '../../typings';
import { queryTaskAssignee } from '../../services';
import { beforeSearchSubmit } from './utils';
import { Space } from 'antd';

/** 来自各系统 */
const ProcessMainFormHidden = React.lazy(() => import('@/common/process/ProcessMainForm'));
import { workflowDescUrlMap } from '@/common/constant/workflow';
import FlowHandle from '@/common/process/ProcessMainForm';

const StyleRefuse = {
  display: 'inline-block',
  borderRadius: '50%',
  marginRight: 8,
  height: 8,
  width: 8,
};

const StyleText = { color: '#000000D9' };
const StyleLabel = { color: '#00000073', marginBottom: 2 };
const StyleDangerText = { color: '#de2635' };

const RenderRefuse = ({ color }: { color: string }) => {
  return <span style={{ ...StyleRefuse, backgroundColor: color }} />;
};

const renderTitle = (_: ReactNode, record: ToDoListItem) => {
  return (
    <span style={Number(record?.timeLimit) < 0 ? { ...StyleDangerText, transform: 'translateY(50%)' } : {}}>
      {record?.businessTypeName}
    </span>
  );
};

const renderContent = (_: ReactNode, record: ToDoListItem) => (
  <div key="label" style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div style={{ width: 240, marginRight: 5 }}>
      <div style={StyleLabel}>
        <span style={Number(record?.timeLimit) < 0 ? StyleDangerText : {}}>{record?.projectId}</span>
      </div>
      <div style={StyleText}>
        <span style={Number(record?.timeLimit) < 0 ? StyleDangerText : {}}>{record?.businessName}</span>
      </div>
    </div>

    <div style={{ width: 130 }}>
      <div style={StyleLabel}>
        <span style={Number(record?.timeLimit) < 0 ? StyleDangerText : {}}>任务名称</span>
      </div>
      <div style={StyleText}>
        <span style={Number(record?.timeLimit) < 0 ? StyleDangerText : {}}>{record?.taskName}</span>
      </div>
    </div>

    <div style={{ width: 100 }}>
      <div style={StyleLabel}>
        <span style={Number(record?.timeLimit) < 0 ? StyleDangerText : {}}>提交时间</span>
      </div>
      <div style={StyleText}>
        <span style={Number(record?.timeLimit) < 0 ? StyleDangerText : {}}>{record?.createTime}</span>
      </div>
    </div>

    {/* <div style={{ width: 75 }}>
      <div style={StyleLabel}>
        <span style={Number(record?.timeLimit) < 0 ? StyleDangerText : {}}>距离编审期限</span>
      </div>
      <div style={StyleText}>
        <span style={Number(record?.timeLimit) < 0 ? StyleDangerText : {}}>{record?.timeLimit}天</span>
      </div>
    </div> */}

    <div style={{ width: 60 }}>
      <div style={StyleLabel}>
        <span style={Number(record?.timeLimit) < 0 ? StyleDangerText : {}}>审批状态</span>
      </div>

      <div style={StyleText}>
        {record?.refuseFlag ? <RenderRefuse color="#f5222d" /> : <RenderRefuse color="#ffc53d" />}
        {record?.refuseFlag ? '被退回' : '待办'}
      </div>
    </div>
  </div>
);

export default (props: { getTaskStamp: any }) => {
  const actionRef = useRef<ModalActionType>();

  const proListActionRef = useRef<any>();

  const [actionCurrent, setActionCurrent] = useState<ToDoListItem | BusinessItem>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderActions = (dom: ReactNode, row: ToDoListItem) => (
    <Space>
      <ProcessChart
        key={1}
        button="icon"
        setIsOpen={setIsOpen}
        processInstanceId={row.processInstanceId}
        processDefinitionId={row.processDefinitionId}
      />
      <FlowTable key={2} button="icon" setIsOpen={setIsOpen} processInstanceId={row.processInstanceId} />
      <FlowHandle
        key={3}
        formType={2}
        button="icon"
        toDoItem={row}
        setIsOpen={setIsOpen}
        reload={proListActionRef?.current?.reload}
      />
    </Space>
  );

  // 携带了参数
  useEffect(() => {
    if (getLocationUrl() === history.location.pathname) return;
    if (history.location.pathname.includes('/home') && history.location.pathname?.length > 6) {
      // 通过 ‘/ 截取
      const locationUrl = history.location.pathname.split('/');
      if (locationUrl?.length !== 4 && locationUrl?.length !== 6) return;
      const businessKey = locationUrl[2];
      const businessId = locationUrl[3];
      const businessTypeName = workflowDescUrlMap[businessKey];
      if (!businessTypeName || !businessKey || !businessId) return;
      if (isOpen) {
        setActionCurrent(undefined);
        return;
      }
      setActionCurrent({ businessKey, businessId, businessTypeName });
      setTimeout(() => {
        setLocationUrl(history.location.pathname);
        /** 如果是通知类型 */
        if (locationUrl[4] === 'notice' && !!locationUrl[5]) {
          noticeViewUpdate(locationUrl[5]);
        }
        actionRef.current?.open?.();
      }, 27);
    }
  }, []);

  return (
    <>
      <ProList
        rowKey="id"
        className="todoList"
        loading={false}
        metas={{
          title: { title: '业务名称', dataIndex: 'workFlowNameLike', render: renderTitle },
          // description: { render: renderDescription },
          avatar: { title: '单据编号', dataIndex: 'businessCodeLike', render: () => <FieldTimeOutlined /> },
          content: { title: '单据名称', dataIndex: 'businessNameLike', render: renderContent },
          actions: {
            title: '提交时间',
            dataIndex: 'dateTime',
            valueType: 'dateRange',
            render: renderActions,
          },
        }}
        search={{ labelWidth: 55, span: 4, searchGutter: 10 }}
        beforeSearchSubmit={beforeSearchSubmit}
        request={async (parmas) => {
          const { current: pageNumber } = parmas;
          const res = await queryTaskAssignee({ ...parmas, pageNumber });
          if (res?.status !== 'SUCCESS') return { success: false };
          props?.getTaskStamp?.();
          return {
            data: res?.rows?.map((item, index) => ({ ...item, id: index })),
            success: true,
            total: res?.total,
          };
        }}
        onRow={(record) => ({
          onDoubleClick: (e: any) => {
            if (isOpen) {
              setActionCurrent(undefined);
              return;
            }
            setActionCurrent(record);
            setTimeout(() => {
              actionRef.current?.open?.();
            }, 27);
          },
        })}
        pagination={{ size: 'small', pageSize: 20 }}
        actionRef={proListActionRef}
      />
      <Suspense fallback={<>Loading...</>}>
        <ProcessMainFormHidden
          formType={2}
          button="none"
          actionRef={actionRef}
          toDoItem={actionCurrent}
          setIsOpen={setIsOpen}
          reload={proListActionRef?.current?.reload}
        />
      </Suspense>
    </>
  );
};
