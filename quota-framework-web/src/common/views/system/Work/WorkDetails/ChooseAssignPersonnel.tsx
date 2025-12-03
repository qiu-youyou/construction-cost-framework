/*
 * @Author: SHUANG
 * @Date: 2023-08-21 15:53:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 17:59:27
 * @Description: 选择指派人员
 */
import { Button } from 'antd';
import { useState } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';

import { BaseTableProps, TableColumnsDefine } from '../../../../../components/BaseTable/typings';
import BaseModal from '../../../../../components/BaseModal';
import BaseTable from '../../../../../components/BaseTable';

import { userQueryPageInfo } from '../../User/services';
import { UserListItem } from '../../User/typings';

export type FunLocationDefine = {
  value?: string;
  onChange?: (value?: string, item?: UserListItem) => void;
  disabled?: boolean;
};

export default (props: FunLocationDefine) => {
  const [current, setCurrent] = useState<UserListItem>();

  /** 清除当前编辑框 */
  const handleOnClickClear = (e: any) => {
    e.stopPropagation();
    props?.onChange?.();
  };

  const clearTrigger = !props?.disabled && (
    <CloseCircleFilled
      onClick={handleOnClickClear}
      className="ant-input-clear-icon"
      style={{ float: 'right', transform: 'translateY(4px)' }}
    />
  );

  const onSubmit = async () => {
    if (!current) return { status: 'ERROR', message: '请选择一项数据！' };
    const assignPersonnel = current?.userRealname;
    props?.onChange?.(assignPersonnel, current);
    return { status: 'SUCCESS' };
  };

  const onCancel = () => {};

  const onCurrent = (record?: UserListItem) => {
    if (!record) return;
    setCurrent(record);
  };

  const columns: TableColumnsDefine<UserListItem> = [
    {
      title: '用户名',
      dataIndex: 'userName',
      align: 'center',
      width: 100,
    },
    {
      title: '真实姓名',
      dataIndex: 'userRealname',
      width: 120,
    },
    {
      title: '用户描述',
      dataIndex: 'remarks',
      search: false,
    },
  ];

  const generateTable: BaseTableProps<UserListItem> = {
    persistenceKey: 'COMMONVIEWSSYSTEMWORKCHOOSEPERSONNELTABLE',
    service: { dataSourceRequest: userQueryPageInfo },
    rowSelection: { type: 'radio', defaultSelectedRowKeys: [current?.id || ''] },
    defaultCurrent: false,
    virtual: false,
    onCurrent,
    columns,
  };

  const trigger = (
    <Button block className="ant-btn-custom-choose" style={{ textAlign: 'left' }} disabled={props?.disabled}>
      {props?.value || <span className="ant-btn-block-palcehoder">选择人员</span>}
      {!!props?.value && clearTrigger}
    </Button>
  );

  return (
    <BaseModal width={800} title="选择人员" trigger={trigger} onSubmit={onSubmit} onCancel={onCancel}>
      <section style={{ height: 400 }}>
        <BaseTable {...generateTable} />
      </section>
    </BaseModal>
  );
};
