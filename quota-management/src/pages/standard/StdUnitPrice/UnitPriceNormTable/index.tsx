/*
 * @Author: SHUANG
 * @Date: 2023-11-16 09:54:59
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-26 14:50:17
 * @Description: 标准综合单价库 - 清单定额
 */
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton'
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components'
import BaseTable from 'jd-framework-web/package/components/BaseTable'

import DbNormBorrow from '@/pages/database/common/DbNormBorrow'
import DbFeeSet from '@/pages/database/common/DbFeeSet'

import QueryMappingRelationNorm from './QueryMappingRelationNorm'
import UnitPriceNormFeeExpTable from './UnitPriceNormFeeExpTable'
import UnitPriceNormFeeTable from './UnitPriceNormFeeTable'

import useTableColumns, { columnsState } from './useTableColumns'
import { StdUnitPriceProps } from '../typings'
import DbNormInfo from './DbNormInfo'
import * as TYPES from './typings'
import * as API from './services'
import * as FET from './fetch'
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane'

export default (props: StdUnitPriceProps & TYPES.PropsUnitPriceNorm) => {
  const { auth } = useAuthButton()
  /** REF */
  const { unitPriceNormTableRef } = props
  const { unitPriceDetailTableRef } = props

  /** 综合单价 当前清单明细 */
  const { unitPriceDetailCurrent } = props
  /** 综合单价 当前清单明细 ID */
  const unitPriceId = unitPriceDetailCurrent?.id || ''
  /** 综合单价 当前综合单价目录 ID */
  const unitPriceDbId = unitPriceDetailCurrent?.unitPriceDbId || ''

  /** 清单定额 当前行、设置当前行 */
  const { unitPriceNormCurrent, setUnitPriceNormCurrent } = props
  /** 清单定额 当前勾选、设置当前勾选 */
  const { unitPriceNormSelection, setUnitPriceNormSelection } = props
  /** 清单定额 当前操作、设置当前操作 */
  const { unitPriceNormActionCurrent, setUnitPriceNormActionCurrent } = props

  /** 操作栏禁用条件 没有当前清单 */
  // const toolbarDisabled = !unitPriceDetailCurrent || !!unitPriceDetailCurrent?.children?.length;

  /** PROPS 重构 TABLE */
  const { tableProps } = props

  /** 当前定额库ID */
  const databaseCurrentDefault: any = {
    id: unitPriceNormActionCurrent?.dbId || unitPriceNormSelection?.[0]?.dbId,
  }

  /** 清单定额表 操作栏 - 定额查询并增加 */
  const dbNormBorrowTrigger = (
    <Button
      type='primary'
      className='PlusButton'
      /**只有最后一层综合单价可以点 */
      disabled={unitPriceDetailCurrent?.unitPriceDetailCode != 'DJ'}
    >
      <PlusOutlined /> 定额查询
    </Button>
  )
  const handleDbNormBorrowOnSubmit = async (p: any[]) =>
    FET.fetchUnitPriceNormSyncInserNorm(p, unitPriceDetailCurrent, unitPriceNormTableRef)

  /** 定额查询 */

  const DbNormBorrowTrigger = (
    <DbNormBorrow
      okText='保 存'
      modalTitle='定额查询'
      isUnitPriceDetailCurrent={true}
      databaseCurrentDefault={databaseCurrentDefault}
      unitPriceDetailCurrent={unitPriceDetailCurrent}
      normCurrentDefault={unitPriceNormActionCurrent}
      onSubmit={handleDbNormBorrowOnSubmit}
      triggerButton={dbNormBorrowTrigger}
      {...props?.dbNormBorrowProps}
    />
  )

  /** 清单定额表 操作栏 - 清单关联定额映射库查询并增加 */
  const { queryMappingRelationNormProps } = props
  const QueryMappingRelationNormTrigger = (
    <QueryMappingRelationNorm
      unitPriceDetailCurrent={unitPriceDetailCurrent}
      onSubmit={handleDbNormBorrowOnSubmit}
      {...queryMappingRelationNormProps}
    />
  )

  /** 清单定额表 操作栏 - 查看定额信息 */
  const DbNormInfoTrigger = <DbNormInfo unitPriceNormActionCurrent={unitPriceNormActionCurrent} />

  /** 清单定额表 操作栏 Toolbar本bar */
  const toolbar: TableToolbarDefine<TYPES.UnitPriceNormItem> = {
    plus: {
      authKey: 'norm-query',
      trigger: DbNormBorrowTrigger,
      triggerType: 'submit',
    },
    plusMore: {
      trigger: QueryMappingRelationNormTrigger,
      authKey: 'norm-map-lib',
      triggerType: 'submit',
    },
    deleted: {
      onSubmit: async args => await FET.fetchUnitPriceNormDeleteByIds(args, unitPriceDetailTableRef),
      authKey: 'norm-delete',
    },
    // details: {
    //   authKey: 'norm-info',
    //   trigger: DbNormInfoTrigger,
    //   triggerType: 'submit',
    // },
    ...tableProps?.toolbar,
  }

  /** 清单定额表 操作栏 设置取费类型 */
  const DbFeeSetTriggerControl = async () =>
    FET.UpdateSetFeeTriggerControl(unitPriceNormSelection, unitPriceNormActionCurrent)
  const DbFeeSetOnSubmit = async (p: any) =>
    FET.fetchUnitPriceNormUpdateBatchSetFee(
      p,
      unitPriceNormSelection,
      unitPriceNormActionCurrent,
      unitPriceNormTableRef,
      unitPriceDetailTableRef,
    )

  /** 清单定额表 操作栏 Toolbar本bar */
  const { dbFeeSetProps, toolbarAfterProps } = props
  const toolbarAfter = (
    <>
      {/* 设置取费类型 */}
      {(toolbarAfterProps?.normFeeSetAuth || auth('norm-fee-set')) && (
        <DbFeeSet
          databaseCurrentDefault={databaseCurrentDefault}
          triggerControl={DbFeeSetTriggerControl}
          onSubmit={DbFeeSetOnSubmit}
          {...dbFeeSetProps}
        />
      )}

      {/* 查看子目取费 */}
      {(toolbarAfterProps?.normFeeItemAuth || auth('norm-fee-item')) && (
        <UnitPriceNormFeeTable unitPriceNormActionCurrent={unitPriceNormActionCurrent} />
      )}

      {/* 查看取费表达式 */}
      {(toolbarAfterProps?.normFeeExpAuth || auth('norm-fee-exp')) && (
        <UnitPriceNormFeeExpTable unitPriceNormActionCurrent={unitPriceNormActionCurrent} />
      )}
    </>
  )

  /** 行编辑 */
  const handleUnitPriceUpdateRow = async (
    v: FETCH.CellEditReq,
    params?: TYPES.UnitPriceNormQuery,
    cellParams?: unknown,
    entity?: TYPES.UnitPriceNormItem,
  ) => {
    const res = await API.unitPriceNormUpdateRow(v, params, cellParams, entity)
    if (res?.status === 'SUCCESS') {
      unitPriceDetailTableRef?.current?.reload?.()
    }
    return res
  }

  /** 综合单价 清单定额表 */
  const generateTable: BaseTableProps<TYPES.UnitPriceNormItem, TYPES.UnitPriceNormQuery> = {
    persistenceKey: 'PAGESTANDARDCOMPREHENSIVEUNITPRICENORMTABLE',
    service: {
      dataSourceRequest: API.unitPriceNormQueryPageInfo,
      cellEditSaveRequest: async (...args) => handleUnitPriceUpdateRow(...args),
      params: { unitPriceDbId, unitPriceId },
      manualRequest: !unitPriceId,
    },
    onActionCurrent: setUnitPriceNormActionCurrent,
    onSelections: setUnitPriceNormSelection,
    rowSelection: auth('norm-delete') && {},
    onCurrent: setUnitPriceNormCurrent,
    actionRef: unitPriceNormTableRef,
    cellEditable: auth('norm-edit'),
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    search: false,
    ...tableProps,
    columnsState,
    toolbarAfter,
    toolbar,
  }

  return !!tableProps?.toolbar ? (
    <BaseTable {...generateTable} />
  ) : (
    <SplitPane mode='vertical'>
      <PaneContainer height='50%'>
        <BaseTable {...generateTable} />
      </PaneContainer>
      <PaneContainer flex>{DbNormInfoTrigger}</PaneContainer>
    </SplitPane>
  )
}
