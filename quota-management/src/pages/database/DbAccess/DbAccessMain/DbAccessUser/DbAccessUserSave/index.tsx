/*
 * @Author: SHUANG
 * @Date: 2023-10-26 14:36:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-01 14:15:31
 * @Description: 选择人员授权权限
 */
import { Button } from 'antd';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { userQueryPageInfo } from 'jd-framework-web/package/common/views/system/User/services';
import { UserListItem } from 'jd-framework-web/package/common/views/system/User/typings';

import useTableColumns from './useTableColumns';
import { DbAccessProps } from '../../typings';
import { fetchOnSubmit } from './fetch';

type Props = { onSubmit: (userSelection: UserListItem[]) => Promise<FETCH.Res<any>> };

export default (props: DbAccessProps & Props) => {
  /** 数据接收 */
  const { dbAccessDirCurrent } = props;

  /** 当前数据库ID */
  const dbId = dbAccessDirCurrent?.dbId || '';

  /** 当前权限目录ID */
  const editDirectoryId = dbAccessDirCurrent?.id || '';

  /** 已勾选用户 */
  const [userSelection, setUserSelection] = useState<UserListItem[]>();

  /** 触发保存授权 */
  const handleOnSubmit = async () => fetchOnSubmit(userSelection, props?.onSubmit);

  /** 触发按钮 */
  const modalTrigger = (
    <Button type="primary">
      <UserOutlined /> 人员授权
    </Button>
  );

  return (
    <BaseModal
      width={900}
      okText="授权"
      title="人员授权"
      trigger={modalTrigger}
      onSubmit={handleOnSubmit}
      style={{ top: 130, left: '11vw' }}
    >
      <section style={{ height: 380 }}>
        <BaseTable
          persistenceKey="PAGESDATABASEACCESSUSERSAVETABLE"
          service={{ dataSourceRequest: userQueryPageInfo, params: { dbId, editDirectoryId } }}
          onSelections={setUserSelection}
          columns={useTableColumns}
          virtual={false}
        />
      </section>
    </BaseModal>
  );
};
