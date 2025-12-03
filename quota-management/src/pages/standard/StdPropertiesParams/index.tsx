/*
 * @Author: SHUANG
 * @Date: 2023-11-10 14:48:52
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 17:54:32
 * @Description: 清单项目特征与定额参数特征映射库
 */
import { useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import { TableActionType } from 'jd-framework-web/package/components';
import SyncDetailProperties from './components/SyncDetailProperties';
import QueryNormParams from './components/QueryNormParams';
import { fetchPropertiesParamsUpdateRow } from './fetch';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

export default () => {
  const { auth } = useAuthButton();

  /** TABLE REF */
  const propertiesParamsRef = useRef<TableActionType>();

  /** 当前清单特征行 */
  const [propertiesParamsCurrent, setPropertiesParamsCurrent] = useState<TYPES.PropertiesParamsItem>();

  /** 保存当前参数 */
  const onSubmitPropertiesParamsSave = async (p: any) =>
    fetchPropertiesParamsUpdateRow(p, propertiesParamsCurrent, propertiesParamsRef);

  /** 查询项目特征 增加 */
  const SyncDetailPropertiesTrigger = (
    <SyncDetailProperties onSubmit={() => propertiesParamsRef?.current?.reload?.()} />
  );

  /** 查询定额参数 增加 */
  const QueryNormParamsTrigger = <QueryNormParams onSubmit={onSubmitPropertiesParamsSave} />;

  /** 材料统计分类库表 操作栏 */
  const toolbar: TableToolbarDefine = {
    plusLine: { authKey: 'plus', onSubmit: API.propertiesParamsSaveBlankRow },
    plusMore: { authKey: 'sync-features', trigger: SyncDetailPropertiesTrigger, triggerType: 'submit' },
    detailsMore: { authKey: 'norm-params', trigger: QueryNormParamsTrigger, triggerType: 'submit' },
    deleted: { onSubmit: API.propertiesParamsDeleteByIds },
    sort: { onSubmit: API.propertiesParamsSortSwap },
  };

  /** 清单项目特征与定额参数特征映射表 */
  const generateTable: BaseTableProps<TYPES.PropertiesParamsItem> = {
    persistenceKey: 'PAGESTANDARDPROPERTIESPARAMSDETAILTABLE',
    service: {
      dataSourceRequest: API.propertiesParamsQueryPageInfo,
      cellEditSaveRequest: API.propertiesParamsUpdateRow,
    },
    rowSelection: { columnWidth: 20 },
    onCurrent: setPropertiesParamsCurrent,
    actionRef: propertiesParamsRef,
    cellEditable: auth('edit'),
    columns: useTableColumns,
    toolbarAuthority: true,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseCard title="清单项目特征与定额参数特征映射库">
        <BaseTable {...generateTable} />
      </BaseCard>
    </ViewContainer>
  );
};
