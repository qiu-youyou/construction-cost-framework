/*
 * @Author: SHUANG
 * @Date: 2022-07-18 10:53:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-16 16:47:11
 * @Description:
 */
import { Button } from 'antd';
import { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';

import BaseModal from '../../../../../components/BaseModal';
import BaseTable from '../../../../../components/BaseTable';

import { roleQueryPageInfo } from '../../Role/services';
import useRoleTableColumns from '../../Role/useTableColumns';
import { RoleListItem } from '../../Role/typings';

type PropsDefine = {
  orgId: string;
  onSubmit: (selection: RoleListItem[]) => Promise<FETCH.Res>;
};

export default (props: PropsDefine) => {
  const [selection, setSelection] = useState<RoleListItem[]>();
  const [current, setCurrent] = useState<RoleListItem>();

  const onSubmit = async () => {
    const res = await props.onSubmit(selection?.length ? selection : !!current ? [current] : []);
    return res;
  };

  return (
    <BaseModal
      width={900}
      okText="授权"
      title="角色授权"
      onSubmit={onSubmit}
      trigger={
        <Button type="primary">
          <UsergroupAddOutlined /> 角色授权
        </Button>
      }
    >
      <section style={{ height: 480 }}>
        <BaseTable
          persistenceKey="COMMONVIEWSSYSTEMORGANROLECOMSTABLE"
          service={{ dataSourceRequest: roleQueryPageInfo, params: { orgId: props.orgId } }}
          onSelections={(selection) => setSelection(selection)}
          onCurrent={(record) => setCurrent(record)}
          rowSelection={{ columnWidth: 25 }}
          columns={useRoleTableColumns}
          virtual={false}
        />
      </section>
    </BaseModal>
  );
};
