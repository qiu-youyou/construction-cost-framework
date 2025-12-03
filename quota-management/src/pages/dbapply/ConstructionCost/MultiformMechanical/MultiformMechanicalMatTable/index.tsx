/*
 * @Author: SHUANG
 * @Date: 2024-03-25 14:21:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 13:47:48
 * @Description: 工程造价-组时机械明细
 */
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableActionType, TableToolbarDefine } from 'jd-framework-web/package/components';

import { matMainQueryPageInfoNotExistsMat } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatContentTable/useServices';
import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import DbMatBranchInsert from '@/pages/database/common/DbMatBranchInsert';
import { MultiformMechanicalProps } from '../typings';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as API from './services';
import { useRef } from 'react';

export default (props: MultiformMechanicalProps) => {
  const { readonly } = props;
  /** 分部分项清单明细表 当前选中 */
  const { multiformMechanicalCurrent } = props;
  const { multiformMechanicalTableRef } = props;

  const [modal, contextHolder] = Modal.useModal();

  const multiformMechanicalMatTableRef = useRef<TableActionType>();

  /** 工程ID 阶段ID */
  const groupTimeId = multiformMechanicalCurrent?.id || '';
  const projectId = multiformMechanicalCurrent?.projectId || '';
  const stageId = multiformMechanicalCurrent?.stageId || '';

  /** SERVICE 参数 */
  const serviceParams = { groupTimeId, projectId, stageId };

  /** 新增空行方法 */
  const fetchMultiformMechanicalMatSaveBlankRow = async (params?: any) => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
    if (!multiformMechanicalCurrent) {
      modal.warning({ title: '继续操作', content: '请选择组时机械数据进行操作!' });
      return errorReturn;
    }
    const res = await API.multiformMechanicalMatSaveBlankRow(params);
    return res;
  };

  /** 从材料库新增 */
  const fetchMultiformMechanicalMatInsertByBasicNormMatIds = async (matDataSelection: DbMatItem[]) => {
    const dbId = matDataSelection?.[0]?.dbId || '';
    const ids = matDataSelection?.map((item) => item.id) || [];
    const params: TYPES.MultiformMechanicalMatInsertByBasicNormMatIds = {
      ...serviceParams,
      dbId, // 材料库ID
      ids, // 主键集合
    };
    const res = await API.multiformMechanicalMatInsertByBasicNormMatIds(params);
    if (res?.status === 'SUCCESS') {
      multiformMechanicalTableRef?.current?.reload();
      multiformMechanicalMatTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 行编辑方法 */
  const fetchMultiformMechanicalMatUpdateRow = async (
    data: FETCH.CellEditReq,
    params?: TYPES.MultiformMechanicalMatQuery,
  ) => {
    const res = await API.multiformMechanicalMatUpdateRow(data, params);
    if (res?.status === 'SUCCESS') {
      multiformMechanicalTableRef?.current?.reload();
    }
    return res;
  };

  /** 引用查询人材机 添加到含量 */
  const triggerButton = (
    <Button type="primary" className="PlusButton">
      <PlusOutlined /> 查询人材机
    </Button>
  );
  const toolbarPlusTrigger = (
    <DbMatBranchInsert
      onSubmit={fetchMultiformMechanicalMatInsertByBasicNormMatIds}
      matMainDataSourceRequest={matMainQueryPageInfoNotExistsMat}
      classifyRjcTypePane={['rcj', 'machine', 'concrete']}
      primaryCurrent={multiformMechanicalCurrent}
      trigger={triggerButton}
      okText="确 定"
    />
  );

  /** 组时机械定义 操作栏 */
  const toolbar: TableToolbarDefine<TYPES.MultiformMechanicalMatItem> = {
    plus: { trigger: toolbarPlusTrigger, triggerType: 'submit' },
    plusLine: { onSubmit: fetchMultiformMechanicalMatSaveBlankRow },
    deleted: { onSubmit: API.multiformMechanicalMatDeleteByIds },
  };

  /** 组时机械定义 表 */
  const generateTable: BaseTableProps<TYPES.MultiformMechanicalMatItem, TYPES.MultiformMechanicalMatQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_CONSTRUCTIONCOST_MULTIFORMMECHANICALMAT_TABLE',
    service: {
      dataSourceRequest: API.multiformMechanicalMatQueryPageInfo,
      cellEditSaveRequest: fetchMultiformMechanicalMatUpdateRow,
      manualRequest: !groupTimeId,
      params: serviceParams,
    },
    actionRef: multiformMechanicalMatTableRef,
    toolbarAuthority: readonly,
    columns: useTableColumns,
    cellEditable: !readonly,
    search: false,
    toolbar,
  };

  return (
    <>
      <BaseTable {...generateTable} />
      {contextHolder}
    </>
  );
};
