/*
 * @Author: SHUANG
 * @Date: 2023-11-06 10:27:45
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-01 11:59:56
 * @Description: 清单关联定额映射库 - 清单
 */

import { useState } from 'react';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import { fetchRelationDetailQueryTreeAll, fetchRelationDetailSyncListNormDetail } from './fetch';
import RelationDetailDeleteByBusiness from './components/RelationDetailDeleteByBusiness';
import RelationDetailProperties from './components/RelationDetailProperties';
import SyncListNormDetail from './components/SyncListNormDetail';
import useTableColumns from './useTableColumns';
import { RelationNormProps } from '../typings';
import * as TYPES from './typings';

export default (props: RelationNormProps) => {
  const { auth } = useAuthButton();

  const { readonly } = props;
  const { relationDetailTableRef } = props;
  const { relationDetailTableProps } = props;

  /** 当前目录，设置当前清单 */
  const { relationDirectoryCurrent, setRelationDetailCurrent } = props;

  /** 当前映射库目录ID */
  const listNormDirectoryId = relationDirectoryCurrent?.id || '';

  /** 清单表当前操作行 */
  const [relationDetailActionCurrent, setRelationDetailActionCurrent] = useState<TYPES.RelationDetailItem>();

  /** 查询成本信息系统分部分项目录 */
  const handleSyncListOnSubmit = async (p?: TYPES.RelationSubItemByCostSystemItem) =>
    fetchRelationDetailSyncListNormDetail(p, relationDirectoryCurrent, relationDetailTableRef);

  /** 查询成本信息系统分部分项目录 导入清单 */
  const SyncListNormDetailTrigger = <SyncListNormDetail onSubmit={handleSyncListOnSubmit} />;

  /** 清单查看项目特征 */
  const RelationDetailPropertiesTrigger = (
    <RelationDetailProperties relationDetailActionCurrent={relationDetailActionCurrent} />
  );

  /** 清空当前目录下的明细 */
  const handleDeletByBusiness = () => relationDetailTableRef?.current?.reload?.();

  /** 当前目录清空导入清单 */
  const RelationDetailDeleteByBusinessTrigger = (
    <RelationDetailDeleteByBusiness
      relationDirectoryCurrent={relationDirectoryCurrent}
      onSubmit={handleDeletByBusiness}
    />
  );

  const toolbar: TableToolbarDefine<TYPES.RelationDetailItem> = {
    plus: { authKey: 'import-list', trigger: SyncListNormDetailTrigger, triggerType: 'submit' },
    details: { authKey: 'features', trigger: RelationDetailPropertiesTrigger, triggerType: 'submit' },
    detailsMore: { authKey: 'clear', trigger: RelationDetailDeleteByBusinessTrigger, triggerType: 'submit' },
    expand: { buttonText: '全部' },
  };

  const toolbarReadOnly: TableToolbarDefine = { expand: { buttonText: '全部' } };

  /** 清单明细表 */
  const generateTable: BaseTableProps<TYPES.RelationDetailItem, TYPES.RelationDetailQuery> = {
    persistenceKey: 'PAGESTANDARDRELATIONNORMDETAILTABLE',
    service: {
      dataSourceRequest: fetchRelationDetailQueryTreeAll,
      manualRequest: !listNormDirectoryId,
      params: { listNormDirectoryId },
    },

    onCurrent: setRelationDetailCurrent,
    onActionCurrent: setRelationDetailActionCurrent,
    toolbar: !readonly ? toolbar : toolbarReadOnly,
    rowSelection: !readonly ? {} : false,
    actionRef: relationDetailTableRef,
    columns: useTableColumns,
    toolbarAuthority: true,
    pagination: false,
    calcTotal: true,
    expandable: {},
    search: false,
    ...relationDetailTableProps,
  };

  return <BaseTable {...generateTable} />;
};
