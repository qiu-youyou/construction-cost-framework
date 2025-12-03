/*
 * @Author: SHUANG
 * @Date: 2022-08-23 11:44:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:52:44
 * @Description: 通知公告列表
 */
import { ProList } from '@ant-design/pro-components';
import { NotificationOutlined } from '@ant-design/icons';
import React, { ReactNode, Suspense, useRef, useState } from 'react';

import { ModalActionType } from '../../../../../components/BaseModal/typings';
import { sysQueryNewsPageInfo } from '../../services';
import { NewsListItem } from '../../typings';

const AnnouncementPreview = React.lazy(
  () => import('../../../../views/message/Bulletin/BulletinDetails/previewButton'),
);

export default () => {
  const actionRef = useRef<ModalActionType>();
  const [actionCurrent, setActionCurrent] = useState<NewsListItem>();

  const handleOpenPreview = (record: NewsListItem) => {
    setActionCurrent(record);
    setTimeout(() => {
      actionRef.current?.open?.();
    }, 27);
  };

  const renderTitle = (_: ReactNode, record: NewsListItem) => {
    return (
      <span style={{ cursor: 'pointer' }} onClick={() => handleOpenPreview(record)}>
        {record?.title} ({record.createDatetime})
      </span>
    );
  };

  return (
    <>
      <ProList
        rowKey="id"
        loading={false}
        className="newsList"
        metas={{
          title: { render: renderTitle },
          avatar: { render: () => <NotificationOutlined /> },
        }}
        request={async () => {
          const res = await sysQueryNewsPageInfo();
          if (res?.status !== 'SUCCESS') return { success: false };
          return { data: res?.rows, success: true, total: res.total };
        }}
        onRow={(record: any) => ({
          onDoubleClick: () => handleOpenPreview(record),
        })}
        pagination={{ size: 'small', pageSize: 20 }}
      />
      <Suspense fallback={<>Loading...</>}>
        <AnnouncementPreview id={actionCurrent?.id} actionRef={actionRef} button="none" />
      </Suspense>
    </>
  );
};
