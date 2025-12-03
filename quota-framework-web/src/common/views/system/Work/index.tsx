/*
 * @Author: SHUANG
 * @Date: 2023-08-14 16:31:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:41:59
 * @Description: 反馈工单
 */
import { Modal } from 'antd';
import { useModel } from 'umi';
import { useRef, useState } from 'react';

import {
  BaseTableProps,
  TableToolbarDefine,
  TableActionType,
} from '../../../../components/BaseTable/typings';
import BaseTable from '../../../../components/BaseTable';
import ViewContainer from '../../../../components/ViewContainer';

import { sysWorkDeleteByIds, sysWorkQueryPageInfo } from './services';
import useTableColumns from './useTableColumns';
import { WorkListItem } from './typings';
import WorkDetails from './WorkDetails';
import { InfoCircleOutlined } from '@ant-design/icons';

export default () => {
  const [modal, contextHolder] = Modal.useModal();

  const tableActionRef = useRef<TableActionType>();

  const { initialState } = useModel('@@initialState');

  /** 表格刷新 */
  const tableReload = () => tableActionRef.current?.reload?.();

  /** 当前单据 */
  const [workCurrent, setWorkCurrent] = useState<WorkListItem>();

  /** 当前主单据详情 */
  const WorkMainForm = ({ formType }: { formType: SYS.FormType }) => (
    <WorkDetails formType={formType} workCurrent={workCurrent} />
  );

  /** 删除操作 */
  const handleToolbarDelete = async (params: FETCH.UpStatus, current: any, selection: any) => {
    const actionArr = !!current ? [current] : selection;
    const filterArr = actionArr.filter((item: WorkListItem) => item.workStatus === '已处理');
    if (filterArr.length > 0) {
      modal.warning({
        title: '继续操作',
        content: '已选择数据中 包含已处理状态 该状态不允许删除！',
        okText: '确定',
      });
      return { status: 'ERROR', message: '已选择数据中 包含已处理状态 该状态不允许删除！' };
    }

    // 只有创建人 和 指派人可以删除
    const userid = initialState?.currentUser?.userid;

    const filterByCreateManId = actionArr.filter((item: WorkListItem) => item.createManId !== userid);
    const filterBySubmitterId = actionArr.filter((item: WorkListItem) => item.assignPersonnelCode !== userid);

    if (filterByCreateManId?.length > 0 && filterBySubmitterId?.length > 0) {
      modal.warning({
        title: '继续操作',
        content: '非创建人或指派人 不允许删除 !',
        okText: '确定',
      });
      return { status: 'ERROR', message: '非创建人或指派人 不允许删除 !' };
    }

    return await sysWorkDeleteByIds(params);
  };

  /** 编辑操作 */
  const triggerControl = () => {
    const errorValue: FETCH.Row = { status: 'ERROR', rows: {} };
    const Successvalue: FETCH.Row = { status: 'SUCCESS', rows: {} };
    const userid = initialState?.currentUser?.userid;

    if (userid !== workCurrent?.createManId && userid !== workCurrent?.assignPersonnelCode) {
      modal.warning({
        title: '继续操作',
        content: '非创建人或指派人 不允许编辑！',
        okText: '确定',
      });
      return errorValue;
    }
    return Successvalue;
  };

  /** 操作主单据 */
  const modalProps = { afterClose: tableReload };

  const toolbar: TableToolbarDefine<WorkListItem> = {
    plus: { render: <WorkMainForm formType={1} />, modalProps },
    edit: { render: <WorkMainForm formType={2} />, modalProps: { ...modalProps, triggerControl } },
    details: { render: <WorkMainForm formType={0} /> },
    deleted: { onSubmit: handleToolbarDelete },
  };

  const generateTable: BaseTableProps<WorkListItem> = {
    persistenceKey: 'COMMONVIEWSSYSTEMWORKTABLE',
    service: { dataSourceRequest: sysWorkQueryPageInfo },
    onActionCurrent: setWorkCurrent,
    columns: useTableColumns(),
    actionRef: tableActionRef,
    toolbarAuthority: true,
    toolbar,
  };

  return (
    <>
      <ViewContainer>
        <BaseTable {...generateTable} />
      </ViewContainer>
      {contextHolder}
    </>
  );
};
