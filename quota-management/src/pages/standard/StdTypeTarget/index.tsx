/*
 * @Author: SHUANG
 * @Date: 2023-11-10 09:10:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-17 13:59:31
 * @Description: 标准库-工程量分类库
 */
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import { jondaReportExcel } from '@/common/services/system';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

export default (props: TYPES.PropsStdTypeTarget) => {
  const { auth } = useAuthButton();

  const { readonly, toolbarSlot } = props;

  /** 当前行 设置当前行 */
  const { otherTypeApiCurrent, setOtherTypeApiCurrent } = props;

  /** 工程量分类库表 操作栏 */
  const exportParams = { _u: 'file:1b888176c010403fb04fc0736e9079df.ureport.xml', _n: '指标类型明细' };

  const toolbar: TableToolbarDefine = {
    plusLine: { authKey: 'plus', onSubmit: API.otherTypeApiSaveBlankRow },
    deleted: { onSubmit: API.otherTypeApiDeleteByIds },
    export: { exportParams, onSubmit: jondaReportExcel, determineActionCurrent: false },
  };

  /** 工程量分类库表 */
  const generateTable: BaseTableProps<TYPES.OtherTypeApiItem> = {
    persistenceKey: 'PAGESTANDARDOTHERTYPETARGETTABLE',
    service: {
      dataSourceRequest: API.otherTypeApiQueryPageInfo,
      cellEditSaveRequest: API.otherTypeApiUpdateRow,
    },
    rowSelection: !readonly && { columnWidth: 25 },
    cellEditable: !readonly && auth('edit'),
    onDoubleClick: props?.onDoubleClick,
    onCurrent: setOtherTypeApiCurrent,
    toolbar: !readonly && toolbar,
    toolbarBefore: toolbarSlot,
    columns: useTableColumns,
    toolbarAuthority: true,
    search: { span: 8 },
    virtual: false,
  };

  return (
    <ViewContainer scroll={!readonly ? 'vh' : 'percent'}>
      <BaseCard title="工程量分类库">
        <BaseTable {...generateTable} />
      </BaseCard>
    </ViewContainer>
  );
};
