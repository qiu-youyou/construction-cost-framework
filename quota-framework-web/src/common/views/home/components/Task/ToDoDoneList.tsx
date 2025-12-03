/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:56:57
 * @Description: 已办
 */

import ProList from '@ant-design/pro-list';
import { CheckCircleOutlined } from '@ant-design/icons';
import React, { Suspense, useRef, useState, ReactNode } from 'react';

import { ModalActionType } from '../../../../../components/BaseModal/typings';
import ProcessHistoryTable from '../../../../process/ProcessHistoryTable';
import ProcessChart from '../../../../process/ProcessChart';

import { todoDonequeryPageInfo } from '../../services';
import { ToDoDoneListItem } from '../../typings';
import { beforeSearchSubmit } from './utils';
import { Space } from 'antd';

/** 来自各个系统 */
import ProcessMainForm from '@/common/process/ProcessMainForm';
const ProcessMainFormHidden = React.lazy(() => import('@/common/process/ProcessMainForm'));

const StyleRefuse = {
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  marginRight: 8,
};

const StyleText = { color: '#000000D9' };
const StyleLabel = { color: '#00000073', marginBottom: 2, minHeight: 5 };

const RenderRefuse = ({ color }: { color: string }) => {
  return <span style={{ ...StyleRefuse, backgroundColor: color }} />;
};

const renderTitle = (_: ReactNode, record: ToDoDoneListItem) => {
  return <>{record.businessTypeName}</>;
};

// const renderDescription = (_: ReactNode, record: ToDoDoneListItem) => {
//   return <>{record.projectName}</>;
// };

const renderContent = (_: ReactNode, record: ToDoDoneListItem) => (
  <div key="label" style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div style={{ width: 230, marginRight: 5 }}>
      <div style={StyleLabel}>
        <span style={StyleLabel}>{record?.projectId}</span>
      </div>
      <div style={StyleText}>
        <span style={StyleText}>{record?.businessName}</span>
      </div>
    </div>

    <div style={{ width: 110 }}>
      <div style={StyleLabel}>任务名称</div>
      <div style={StyleText}>{record?.taskName || '-'}</div>
    </div>

    <div style={{ width: 100 }}>
      <div style={StyleLabel}>提交时间</div>
      <div style={StyleText}>{record?.startTime || '-'}</div>
    </div>

    <div style={{ width: 100 }}>
      <div style={StyleLabel}>结束时间</div>
      <div style={StyleText}>{record?.endTime || '-'}</div>
    </div>

    <div style={{ width: 70 }}>
      <div style={StyleLabel}>审批状态</div>

      <div style={StyleText}>
        <RenderRefuse color="#52c41a" />
        已办
      </div>
    </div>
  </div>
);

export default () => {
  const actionRef = useRef<ModalActionType>();

  const [actionCurrent, setActionCurrent] = useState<ToDoDoneListItem>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderActions = (dom: ReactNode, row: ToDoDoneListItem) => (
    <Space>
      <ProcessChart
        key={1}
        button="icon"
        setIsOpen={setIsOpen}
        processInstanceId={row.processInstanceId}
        processDefinitionId={row.processDefinitionId}
      />

      <ProcessHistoryTable
        key={2}
        button="icon"
        setIsOpen={setIsOpen}
        processInstanceId={row.processInstanceId}
      />

      <ProcessMainForm key={3} button="icon" setIsOpen={setIsOpen} toDoItem={row} formType={0} />
    </Space>
  );

  return (
    <>
      <ProList
        rowKey="id"
        className="todoDoneList"
        loading={false}
        metas={{
          title: { title: '业务名称', dataIndex: 'workFlowNameLike', render: renderTitle },
          // description: { render: renderDescription },
          avatar: { title: '单据编号', dataIndex: 'businessCodeLike', render: () => <CheckCircleOutlined /> },
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
          const res = await todoDonequeryPageInfo({ ...parmas, pageNumber });
          if (res?.status !== 'SUCCESS') return { success: false };
          return {
            data: res?.rows?.map((item, index) => ({ ...item, id: index })),
            success: true,
            total: res?.total,
          };
        }}
        onRow={(record) => ({
          onDoubleClick: () => {
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
      />
      <Suspense fallback={<>Loading...</>}>
        <ProcessMainFormHidden
          formType={0}
          button="none"
          setIsOpen={setIsOpen}
          actionRef={actionRef}
          toDoItem={actionCurrent}
        />
      </Suspense>
    </>
  );
};
