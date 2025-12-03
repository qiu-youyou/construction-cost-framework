/*
 * @Author: SHUANG
 * @Date: 2023-11-06 11:24:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 17:16:47
 * @Description: 清单关联定额映射库 - 清单 - 定额
 */
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import { DbNormItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';

import DbNormBorrow from '@/pages/database/common/DbNormBorrow';

import { fetchRelationNormInsert } from './fetch';
import useTableColumns from './useTableColumns';
import { RelationNormProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

export default (props: RelationNormProps) => {
  const { readonly } = props;
  const { relationNormTableRef } = props;
  /** 当前清单 */
  const { relationDetailCurrent } = props;

  const { relationNormTableProps } = props;
  /** 当前清单ID */
  const detailId = relationDetailCurrent?.id || '';
  /** 当前映射库目录ID */
  const listNormDirectoryId = relationDetailCurrent?.listNormDirectoryId || '';
  /** 已勾选定额明细、设置已勾选定额明细 */
  const { relationNormSelection, setRelationNormSelection } = props;
  const { relationNormActionCurrent, setRelationNormActionCurrent } = props;

  /** 操作栏禁用条件 */
  const toolbarDisabled = !relationDetailCurrent || !!relationDetailCurrent?.children?.length;

  /** 清单映射定额 - 定额查询并增加 - 触发按钮 */
  const dbNormBorrowTrigger = (
    <Button type="primary" className="PlusButton" disabled={toolbarDisabled}>
      <PlusOutlined /> 定额查询
    </Button>
  );

  /** 清单映射定额 - 定额查询并增加 */
  const handleFetchRelationNormInsert = async (p: DbNormItem[]) =>
    fetchRelationNormInsert(p, relationDetailCurrent, relationNormTableRef);

  /** 清单映射定额 - 定额查询并增加 */
  const DbNormBorrowTrigger = (
    <DbNormBorrow
      databaseCurrentDefault={{ id: relationNormActionCurrent?.dbId || '' } as any}
      normCurrentDefault={relationNormActionCurrent}
      onSubmit={handleFetchRelationNormInsert}
      triggerButton={dbNormBorrowTrigger}
      modalTitle="定额查询"
      okText="保 存"
    />
  );

  /** 人材机含量列表 操作栏 */
  const toolbar: TableToolbarDefine<TYPES.RelationNormItem> = {
    plus: { trigger: DbNormBorrowTrigger, triggerType: 'submit', disabled: toolbarDisabled },
    deleted: { onSubmit: API.relationNormDeleteByIds, disabled: toolbarDisabled },
  };

  const rowSelection = !readonly || readonly === 'norm' ? { columnWidth: 40 } : false;

  const generateTable: BaseTableProps<TYPES.RelationNormItem, TYPES.RelationNormQuery> = {
    persistenceKey: 'PAGESTANDARDRELATIONNORMNORMTABLE',
    service: {
      dataSourceRequest: API.relationNormQueryPageInfo,
      params: { detailId, listNormDirectoryId },
      manualRequest: !detailId,
    },
    onActionCurrent: setRelationNormActionCurrent,
    onSelections: setRelationNormSelection,
    actionRef: relationNormTableRef,
    toolbar: !readonly && toolbar,
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    search: false,
    rowSelection,
    ...relationNormTableProps,
  };

  return <BaseTable {...generateTable} />;
};
