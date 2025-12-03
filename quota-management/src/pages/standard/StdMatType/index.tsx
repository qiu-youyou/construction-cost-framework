/*
 * @Author: SHUANG
 * @Date: 2023-11-10 09:10:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 14:00:56
 * @Description: 标准库-材料统计分类库
 */
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import { attachmentUpload } from 'jd-framework-web/package/common/annex/AnnexTable/services';
import ViewContainer, { ViewContainePropsType } from 'jd-framework-web/package/components/ViewContainer';

import { jondaReportExcel } from '@/common/services/system';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';

type Props = { tableProps?: Partial<BaseTableProps>; viewContaineProps?: ViewContainePropsType };

export default (props: Props) => {
  const { tableProps } = props;
  const { auth } = useAuthButton();

  const { viewContaineProps } = props;

  /** 材料统计分类库表 操作栏 */
  const uploadParams = { bizType: 5, beanName: 'reportFileUploadServiceImpl' };
  const exportParams = { _u: 'file:d917e774f254479c8141af59ee36070f.ureport.xml	', _n: '材料类型明细' };

  /** TOOLBAR */
  const toolbar: TableToolbarDefine = {
    plusLine: { authKey: 'plus', onSubmit: API.otherTypeMatSaveBlankRow },
    deleted: { onSubmit: API.otherTypeMatDeleteByIds },
    export: { exportParams, onSubmit: jondaReportExcel, determineActionCurrent: false },
    import: { uploadParams, onSubmit: attachmentUpload },
  };

  /** 材料统计分类库表 */
  const generateTable: BaseTableProps<TYPES.OtherMatTypeItem> = {
    persistenceKey: 'PAGESTANDARDOTHERMATTYPETABLE',
    service: {
      dataSourceRequest: API.otherTypeMatQueryPageInfo,
      cellEditSaveRequest: API.otherTypeMatUpdateRow,
    },
    rowSelection: { columnWidth: 20 },
    cellEditable: auth('edit'),
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    toolbar,
    ...tableProps,
  };

  return (
    <ViewContainer {...viewContaineProps}>
      <BaseCard title="材料统计分类库">
        <BaseTable {...generateTable} />
      </BaseCard>
    </ViewContainer>
  );
};
