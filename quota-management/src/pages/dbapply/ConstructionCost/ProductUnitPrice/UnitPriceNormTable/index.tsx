/*
 * @Author: SHUANG
 * @Date: 2024-03-07 16:02:48
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-24 11:24:40
 * @Description: 工程造价-工程量清单编制-综合单价 定额
 */
/** 引用标准库 综合单价 */
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components'

/** 引用基础定额库 */
import { DbNormItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings'
import { RelationNormItem } from '@/pages/standard/StdRelationNorm/RelationNormTable/typings'
import { DbFeeDirectoryItem } from '@/pages/database/DbFee/DbFeeDirectoryTree/typings'

/** 引用基础综合单价库 */
import UnitPriceNormTable from '@/pages/standard/StdUnitPrice/UnitPriceNormTable'

import { CostPreparationProps } from '../../CostPreparation/typings'
import UnitPriceNormFeeExpTable from './UnitPriceNormFeeExpTable'
import UnitPriceAnalysisTable from './UnitPriceAnalysisTable'
import UnitPriceNormFeeTable from './UnitPriceNormFeeTable'
import NormStoreInTemporary from './NormStoreInTemporary'
import useFormColumns from './useFormColumns'
import DbNormInfo from './DbNormInfo'
import * as TYPES from './typings'
import * as API from './services'

export default (props: CostPreparationProps) => {
  const { readonly } = props

  /**分布分项明细表 REF */
  const { inventoryTableRef } = props

  /** 综合单价明细表 当前选中 */
  const { unitPriceDetailCurrent } = props

  /** 综合单价清单定额 当前勾选, 综合单价定额 当前选中操作 */
  const { unitPriceNormActionCurrent } = props

  /** 综合单价明细表 、定额表 REF */
  const { unitPriceNormTableRef, unitPriceDetailTableRef } = props

  /** 清单定额 当前行、当前勾选 */
  const { unitPriceNormCurrent, unitPriceNormSelection } = props

  /** 工程ID 阶段ID 单价ID  */
  const unitPriceId = unitPriceDetailCurrent?.id || ''
  const stageId = unitPriceDetailCurrent?.stageId || ''
  const projectId = unitPriceDetailCurrent?.projectId || ''

  /** 定额查询 批量新增定额 */
  const fetchUnitPriceNormSyncInserNorm = async (normSelection?: DbNormItem[] | RelationNormItem[]) => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] }
    if (!normSelection) return errorReturn

    // 将 normSelection 中每项的dbId提取出来 不提取重复的
    const normDbIdsSele = normSelection?.map(item => item.dbId) || []
    const normDbIds = new Set(normDbIdsSele)

    /** 不同DBID 发送队列 */
    const promiseQueue = []
    for (const dbId of normDbIds) {
      const normSelectionFilter = normSelection.filter(item => item.dbId === dbId)
      const ids = normSelectionFilter?.map((item: any) => item?.normId || item.id) || []
      const params = { unitPriceId, dbId, ids, projectId, stageId }
      const finalParams: TYPES.ProductUnitPriceNormSave = params
      promiseQueue.push(API.productUnitPriceNormSave(finalParams))
    }
    const res = await Promise.all(promiseQueue)

    if (res?.[0]?.status === 'SUCCESS') {
      unitPriceNormTableRef?.current?.reload?.()
      unitPriceDetailTableRef?.current?.reload?.()
      inventoryTableRef?.current?.reload?.()
    }
    return res?.[0]
  }

  /** 批量设置取费 */
  const fetchUnitPriceNormUpdateBatchSetFee = async (dbFeeDirectoryCurrent?: DbFeeDirectoryItem) => {
    /** 当前操作的的定额明细 */
    const hasSelection = !!unitPriceNormSelection?.length
    const unitPriceNormArr = hasSelection
      ? unitPriceNormSelection
      : unitPriceNormActionCurrent
      ? [unitPriceNormActionCurrent]
      : []

    const feeId = dbFeeDirectoryCurrent?.dbId || ''
    const feeDirectoryId = dbFeeDirectoryCurrent?.id || ''
    const ids: any = unitPriceNormArr?.map(item => item?.id)

    const params = { feeDirectoryId, unitPriceId, feeId, ids, projectId, stageId }
    const finalParams: TYPES.UpdateBatchSetFeeParams = params
    const res = await API.productUnitPriceNormUpdateBatchSetFee(finalParams)

    if (res?.status === 'SUCCESS') {
      unitPriceNormTableRef?.current?.reload?.()
      unitPriceDetailTableRef?.current?.reload?.()
      inventoryTableRef?.current?.reload?.()
    }
    return res
  }

  /** 删除方法 */
  const fetchProductUnitPriceNormDeleteByIds = async (p: FETCH.UpStatus) => {
    const res = await API.productUnitPriceNormDeleteByIds(p)
    /** 刷新综合单价表 */
    if (res?.status === 'SUCCESS') {
      unitPriceDetailTableRef?.current?.reload?.()
      inventoryTableRef?.current?.reload?.()
    }
    return res
  }

  /** 行编辑方法 */
  const fetchProductUnitPriceNormUpdateRow = async (p: FETCH.CellEditReq, sp?: any) => {
    const res = await API.productUnitPriceNormUpdateRow(p, sp)
    /** 刷新综合单价表 */
    if (res?.status === 'SUCCESS') {
      unitPriceDetailTableRef?.current?.reload?.()
      inventoryTableRef?.current?.reload?.()
    }
    return res
  }

  /** 调整系数方法 */
  const fetchUpdateBatchSetRate = async (p: TYPES.UpdateBatchSetRateParams) => {
    const normSelection = !!unitPriceNormSelection?.length
      ? unitPriceNormSelection
      : unitPriceNormCurrent && [unitPriceNormCurrent]
    const ids = normSelection?.map(item => item.id) || []
    const scope = 'selected'
    return await API.productUnitPriceNormUpdateBatchSetRate({ ...p, ids, scope })
  }

  /** 刷新定额表及综合单价表 */
  const reloadUnitPriceAndNormTable = () => {
    unitPriceNormTableRef?.current?.reload?.()
    unitPriceDetailTableRef?.current?.reload?.()
    inventoryTableRef?.current?.reload?.()
  }

  /** 清单定额表 操作栏 - 查看定额信息 */
  const DbNormInfoTrigger = (
    <DbNormInfo
      unitPriceNormActionCurrent={unitPriceNormActionCurrent}
      afterClose={reloadUnitPriceAndNormTable}
    />
  )

  /** TOOLBAR */
  const buttonText = '调整系数'
  const current = unitPriceNormSelection?.[0] || unitPriceNormCurrent
  const toolbar: TableToolbarDefine = {
    edit: { columns: useFormColumns, buttonText, current, onSubmit: fetchUpdateBatchSetRate },
    details: { trigger: DbNormInfoTrigger, triggerType: 'submit' },
    deleted: { onSubmit: fetchProductUnitPriceNormDeleteByIds },
  }

  /** TOOLBAR 查看子目取费\查看取费表达式 */
  const toolbarLast = (
    <>
      {/* 字母取费 */}
      <UnitPriceNormFeeTable
        unitPriceNormActionCurrent={unitPriceNormActionCurrent}
        afterClose={reloadUnitPriceAndNormTable}
      />

      {/* 取费表达式 */}
      <UnitPriceNormFeeExpTable unitPriceNormActionCurrent={unitPriceNormActionCurrent} />

      {/* 单价分析表 */}
      <UnitPriceAnalysisTable unitPriceNormActionCurrent={unitPriceNormActionCurrent} byNorm />

      <span className='gap-wrapper'>｜</span>

      {/* 定额存入临时库 */}
      <NormStoreInTemporary
        unitPriceNormActionCurrent={unitPriceNormActionCurrent}
        unitPriceDetailCurrent={unitPriceDetailCurrent}
        unitPriceNormSelection={unitPriceNormSelection}
        unitPriceNormTableRef={unitPriceNormTableRef}
      />
    </>
  )

  /** 重写 综合单价 定额含量表 */
  const UnitPriceNromTableProps: Partial<BaseTableProps> = {
    persistenceKey: 'PAGES_CONSTRUCTIONCOST_COSTPREPARATION_UNITPRICEDETAILNORMTABLE',
    service: {
      dataSourceRequest: API.productUnitPriceNormQueryPageInfo,
      cellEditSaveRequest: fetchProductUnitPriceNormUpdateRow,
      params: { unitPriceId, projectId, stageId },
      manualRequest: !unitPriceId,
    },
    toolbarLast: !readonly && toolbarLast,
    toolbarAuthority: readonly,
    cellEditable: !readonly,
    rowSelection: {},
    minHeight: 50,
    toolbar,
  }

  return (
    <UnitPriceNormTable
      toolbarAfterProps={{ normFeeSetAuth: !readonly }}
      dbNormBorrowProps={{ onSubmit: fetchUnitPriceNormSyncInserNorm }}
      queryMappingRelationNormProps={{ onSubmit: fetchUnitPriceNormSyncInserNorm }}
      dbFeeSetProps={{ onSubmit: fetchUnitPriceNormUpdateBatchSetFee }}
      tableProps={UnitPriceNromTableProps}
      {...props}
    />
  )
}
