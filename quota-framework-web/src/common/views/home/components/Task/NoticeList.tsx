/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-22 14:22:25
 * @Description:
 */
import ProList from '@ant-design/pro-list';
import { SoundOutlined } from '@ant-design/icons';
import React, { ReactNode, Suspense, useRef, useState } from 'react';

import { ModalActionType } from '../../../../../components/BaseModal/typings';

import { noticeViewUpdate } from '../../../../views/message/Notice/services';
import { noticeQueryPageInfo } from '../../services';
import { NoticeListItem } from '../../typings';
import { beforeSearchSubmit } from './utils';

/** 来自各个系统 */
const FlowHandleHidden = React.lazy(() => import('@/common/process/ProcessMainForm'));

const StyleRefuse = {
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  marginRight: 8,
};

const StyleText = { color: '#000000D9' };
const StyleLabel = { color: '#00000073', marginBottom: 2 };

const RenderRefuse = ({ color }: { color: string }) => {
  return <span style={{ ...StyleRefuse, backgroundColor: color }} />;
};

const renderTitle = (_: ReactNode, record: NoticeListItem) => {
  return <>{record.businessName}</>;
};

const renderDescription = (_: ReactNode, record: NoticeListItem) => {
  return <>{record.projectName}</>;
};
const StyleDangerText = {};

const renderContent = (_: ReactNode, record: NoticeListItem) => (
  <div key="label" style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div style={{ width: 120, marginRight: 5 }}>
      <div style={StyleLabel}>
        <span style={record?.projectCode ? StyleDangerText : {}}>{record?.projectCode}</span>
      </div>
      <div style={StyleText}>
        <span style={record?.billName ? StyleDangerText : {}}>{record?.billName}</span>
      </div>
    </div>

    <div style={{ width: 140 }}>
      <div style={StyleLabel}>
        <span style={record?.taskName ? StyleDangerText : {}}>任务名称</span>
      </div>
      <div style={StyleText}>
        <span style={record?.taskName ? StyleDangerText : {}}>{record?.taskName}</span>
      </div>
    </div>

    <div style={{ width: 100 }}>
      <div style={StyleLabel}>发送通知人</div>
      <div style={StyleText}>{record?.createMan || '-'}</div>
    </div>

    <div style={{ width: 140 }}>
      <div style={StyleLabel}>通知时间</div>
      <div style={StyleText}>{record?.createDatetime || '-'}</div>
    </div>

    <div style={{ width: 150 }}>
      <div style={StyleLabel}>消息内容</div>
      <div style={StyleText}>{record?.content || '-'}</div>
    </div>

    <div style={{ width: 60 }}>
      <div style={StyleLabel}>通知状态</div>
      <div style={StyleText}>
        {!!record.billStatus ? <RenderRefuse color="#ff1e34" /> : <RenderRefuse color="#52c41a" />}
        {!!record.billStatus ? '未查阅' : '已查阅'}
      </div>
    </div>
  </div>
);

export default (props: { getTaskStamp: any }) => {
  const actionRef = useRef<ModalActionType>();
  const proListActionRef = useRef<any>();

  const [actionCurrent, setActionCurrent] = useState<any>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <ProList
        loading={false}
        rowKey="businessId"
        className="noticeList"
        metas={{
          title: { title: '业务名称', dataIndex: 'workFlowNameLike', render: renderTitle },
          description: {
            title: '单据编号',
            dataIndex: 'businessCodeLike',
            valueType: 'text',
            render: renderDescription,
          },
          avatar: { title: '单据名称', dataIndex: 'businessNameLike', render: () => <SoundOutlined /> },
          content: { title: '通知人', dataIndex: 'createManLike', render: renderContent },
          actions: { title: '通知时间', dataIndex: 'dateTime', valueType: 'dateRange', render: () => <></> },
        }}
        search={{ labelWidth: 55, span: 3, searchGutter: 5 }}
        beforeSearchSubmit={beforeSearchSubmit}
        request={async (parmas) => {
          const { current: pageNumber } = parmas;
          const res = await noticeQueryPageInfo({ ...parmas, pageNumber });
          if (res?.status !== 'SUCCESS') return { success: false };
          props?.getTaskStamp?.();
          return { data: res?.rows, success: true, total: res?.total };
        }}
        onRow={(record) => ({
          onDoubleClick: (e: any) => {
            if (isOpen) {
              setActionCurrent(undefined);
              return;
            }
            setActionCurrent({ ...record, workflowFormUrl: record.accessAddress });
            setTimeout(() => {
              noticeViewUpdate(record?.noticeId);
              actionRef.current?.open?.();
            }, 27);
          },
        })}
        pagination={{ size: 'small', pageSize: 20 }}
        actionRef={proListActionRef}
      />
      <Suspense fallback={<>Loading...</>}>
        <FlowHandleHidden
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
