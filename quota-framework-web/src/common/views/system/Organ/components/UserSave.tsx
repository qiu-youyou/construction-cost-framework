/*
 * @Author: SHUANG
 * @Date: 2022-07-18 10:53:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-24 15:14:25
 * @Description:
 */

import { Button } from 'antd';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';

import BaseModal from '../../../../../components/BaseModal';
import BaseTable from '../../../../../components/BaseTable';

import useUserTableColumns from '../../User/useTableColumns';
import { userQueryPageInfo } from '../../User/services';
import { UserListItem } from '../../User/typings';

type PropsDefine = {
  orgId: string;
  onSubmit: (selection: UserListItem[]) => Promise<FETCH.Res>;
};

export default (props: PropsDefine) => {
  const [selection, setSelection] = useState<UserListItem[]>();
  const [current, setCurrent] = useState<UserListItem>();

  const onSubmit = async () => {
    const res = await props.onSubmit(selection?.length ? selection : !!current ? [current] : []);
    return res;
  };

  return (
    <BaseModal
      width={900}
      okText="授权"
      title="人员授权"
      onSubmit={onSubmit}
      trigger={
        <Button type="primary">
          <UserOutlined />
          人员授权
        </Button>
      }
    >
      <section style={{ height: 480 }}>
        <BaseTable
          service={{ params: { orgId: props.orgId }, dataSourceRequest: userQueryPageInfo }}
          persistenceKey="COMMONVIEWSSYSTEMORGANUSERCOMSTABLE"
          onSelections={(selection) => setSelection(selection)}
          onCurrent={(record) => setCurrent(record)}
          columns={useUserTableColumns}
        />
      </section>
    </BaseModal>
  );
};
