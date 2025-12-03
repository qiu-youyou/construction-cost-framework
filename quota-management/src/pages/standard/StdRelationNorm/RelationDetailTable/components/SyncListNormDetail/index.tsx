/*
 * @Author: SHUANG
 * @Date: 2023-11-07 10:42:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-13 18:46:31
 * @Description: 查询成本信息系统分部分项目录
 */
import { Button } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import { relationDetailQueryPageListByBranchDirectory } from '../../services';
import { RelationSubItemByCostSystemItem } from '../../typings';
import useTableColumns from './useTableColumns';
import { fetchOnSubmit } from './fetch';

type Props = { onSubmit: (branch?: RelationSubItemByCostSystemItem) => Promise<FETCH.Res> };

export default (props: Props) => {
  /** 当前选中分部分项 */
  const [branchCurrent, setBranchCurrent] = useState<RelationSubItemByCostSystemItem>();

  /** 弹窗触发保存当前选中分部分项目录 */
  const handleOnSubmitSaveBranch = async () => fetchOnSubmit(branchCurrent, props?.onSubmit);

  /** 查询成本信息系统分部分项目录 表 */
  const generateTable: BaseTableProps<RelationSubItemByCostSystemItem> = {
    persistenceKey: 'PAGESTANDARDRELATIONNORMDETAILSYNCLISTTABLE',
    service: { dataSourceRequest: relationDetailQueryPageListByBranchDirectory },
    rowSelection: { type: 'radio', columnWidth: 30 },
    onCurrent: setBranchCurrent,
    columns: useTableColumns,
    search: false,
  };

  /** 触发按钮 */
  const modalTrigger = (
    <Button type="primary">
      <UploadOutlined /> 导入清单
    </Button>
  );

  return (
    <BaseModal
      width={900}
      okText="导入"
      title="选择分部分项目录"
      trigger={modalTrigger}
      onSubmit={handleOnSubmitSaveBranch}
    >
      <section style={{ height: 380 }}>
        <BaseTable {...generateTable} />
      </section>
    </BaseModal>
  );
};
