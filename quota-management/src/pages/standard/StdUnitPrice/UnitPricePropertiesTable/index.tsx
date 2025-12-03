/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:58:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-19 16:15:07
 * @Description: 标准综合单价库 - 清单特征
 */
import { Modal } from 'antd';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import useTableColumns from './useTableColumns';
import { StdUnitPriceProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

export default (props: StdUnitPriceProps & TYPES.PropsUnitPriceProperties) => {
  const { auth } = useAuthButton();
  /** 综合单价 当前清单明细 */
  const { unitPriceDetailCurrent } = props;
  /** 综合单价 清单明细表 */
  const { unitPriceDetailTableRef } = props;
  /** 综合单价 当前清单明细 ID */
  const unitPriceId = unitPriceDetailCurrent?.id || '';
  /** 综合单价 当前综合单价目录 ID */
  const unitPriceDbId = unitPriceDetailCurrent?.unitPriceDbId || '';
  /** 操作栏禁用条件 没有当前清单 */
  const toolbarDisabled = !unitPriceDetailCurrent || !!unitPriceDetailCurrent?.children?.length;

  const [modal, contextHolder] = Modal.useModal();

  /** PROPS 重构 TABLE */
  const { tableProps } = props;
  const toolbarProps = tableProps?.toolbar || {};

  /** 保存方法 */
  const fetchUnitPricePropertiesSaveBlankRow = async (p: TYPES.UnitPricePropertiesQuery) => {
    if (toolbarDisabled) {
      modal.warning({ title: '继续操作', content: '请选择综合单价进行操作!' });
      return { status: 'ERROR' };
    }
    const res = await (toolbarProps?.plusLine?.onSubmit?.(p) || API.unitPricePropertiesSaveBlankRow(p));
    return res;
  };

  /*** 删除方法 */
  const fetchUnitPricePropertiesDeleteByIds = async (args: any) => {
    const res = await (toolbarProps?.deleted?.onSubmit?.(args) ||
      (await API.unitPricePropertiesDeleteByIds(args)));
    if (res?.status === 'SUCCESS') unitPriceDetailTableRef?.current?.reload?.();
    return res;
  };

  /** 清单特征表 操作栏 Toolbar本bar */
  const toolbar: TableToolbarDefine<TYPES.UnitPricePropertiesItem> = {
    plusLine: { onSubmit: fetchUnitPricePropertiesSaveBlankRow, authKey: 'list-properties-plus' },
    deleted: { onSubmit: fetchUnitPricePropertiesDeleteByIds, authKey: 'list-properties-delete' },
  };

  /** 综合单价 清单特征表 */
  const generateTable: BaseTableProps<TYPES.UnitPricePropertiesItem, TYPES.UnitPricePropertiesQuery> = {
    persistenceKey: 'PAGESTANDARDCOMPREHENSIVEUNITPRICEPROPERTIESTABLE',
    rowSelection: auth('list-properties-delete') && { columnWidth: 35 },
    service: {
      dataSourceRequest: API.unitPricePropertiesQueryPageInfo,
      cellEditSaveRequest: async (...args) => {
        const res = await API.unitPricePropertiesUpdateRow(...args);
        if (res?.status === 'SUCCESS') unitPriceDetailTableRef?.current?.reload?.();
        return res;
      },
      params: { unitPriceDbId, unitPriceId },
      manualRequest: !unitPriceId,
    },
    cellEditable: auth('list-properties-edit'),
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    search: false,
    ...tableProps,
    toolbar,
  };

  return (
    <>
      <BaseTable {...generateTable} />
      {contextHolder}
    </>
  );
};
