/*
 * @Author: SHUANG
 * @Date: 2023-01-03 10:50:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 16:34:32
 * @Description: 系统通知
 */

import { useRef, useState } from 'react';
import {
  BaseTableProps,
  TableToolbarDefine,
  TableActionType,
} from '../../../../components/BaseTable/typings';
import ViewContainer from '../../../../components/ViewContainer';
import BaseTable from '../../../../components/BaseTable';

import useAuthButton from '../../../../utils/auth/useAuthButton';

import PreviewButton from './BulletinDetails/previewButton';
import useTableColumns from './useTableColumns';
import BulletinDetails from './BulletinDetails';
import { BulletinListItem } from './typings';
import * as API from './services';

const modalProps = { width: 900, noFooter: true, defaultFullScreen: true };

export default () => {
  const { auth } = useAuthButton();
  const tableActionRef = useRef<TableActionType>();
  const [announcementCurrent, setBulletinCurrent] = useState<BulletinListItem>();

  const tableReload = () => {
    tableActionRef.current?.reload?.();
  };

  const editBulletinDetails = (
    <BulletinDetails
      formType={announcementCurrent?.billStatus == '7' ? 0 : 2}
      announcementCurrent={announcementCurrent}
      reload={tableReload}
    />
  );

  const detailsBulletinDetails = <BulletinDetails announcementCurrent={announcementCurrent} formType={0} />;

  /** 生成 Table */
  const toolbar: TableToolbarDefine<BulletinListItem> = {
    plus: {
      modalProps,
      modalTitle: '添加公告',
      render: <BulletinDetails formType={1} reload={tableReload} />,
    },
    edit: { modalProps, modalTitle: '编辑公告', render: editBulletinDetails },
    details: { modalProps, modalTitle: '查看公告', render: detailsBulletinDetails },
    enable: { authKey: 'release', buttonText: '发布', onSubmit: API.updateStatusByIdsEnable },
    disable: { authKey: 'revoke', buttonText: '撤销', onSubmit: API.updateStatusByIdsDisable },
    deleted: {
      actionControl: { key: 'billStatus', value: '7', message: '已发布的数据不允许删除!', equal: true },
      onSubmit: API.sysNewsDeleteByIds,
    },
  };

  const toolbarCenter = auth('preview') && <PreviewButton id={announcementCurrent?.id} />;

  const generateTable: BaseTableProps<BulletinListItem> = {
    persistenceKey: 'COMMONVIEWSMESSAGEBULLETINTABLE',
    service: { dataSourceRequest: API.sysNewsQueryPageInfo },
    onActionCurrent: (record) => setBulletinCurrent(record),
    actionRef: tableActionRef,
    columns: useTableColumns,
    toolbarAuthority: true,
    toolbarCenter,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
