/*
 * @Author: SHUANG
 * @Date: 2024-01-15 11:10:53
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-26 17:49:08
 * @Description: 工程造价-工程量清单编制-单价明细表
 */
import { Button } from 'antd'
import { useEffect } from 'react'
import { FileSearchOutlined } from '@ant-design/icons'
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components'

/** 引用标准综合单价库 */
import useTableColumns from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/useTableColumns'
import UnitPriceDetailTable from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable'

import UnitPriceAnalysisTable from '../UnitPriceNormTable/UnitPriceAnalysisTable'
import { CostPreparationProps } from '../../CostPreparation/typings'
import InsertByBasicUnitPrice from './InsertByBasicUnitPrice'
import { ProductUnitPriceProps } from '../typings'
import StoreInTemporary from './StoreInTemporary'
import * as API from './services'

export default (props: CostPreparationProps & ProductUnitPriceProps) => {
  const { readonly } = props
  /** 分部分项清单明细表 当前选中 */
  const { productActionCurrent } = props

  /**分布分项清单 REF */
  const { inventoryTableRef } = props

  /** 综合单价表 REF */
  const { unitPriceDetailTableRef } = props

  /** 当前勾选综合单价 */
  const { unitPriceDetailSelection } = props

  /** 当前操作 综合单价明细 */
  const { unitPriceDetailActionCurrent } = props

  /** 从单价编号查询 */
  const { unitPriceCode, isByUnitPriceCode } = props

  const { unitPriceDetailTableProps } = props

  /** 工程ID 阶段ID */
  const stageId = productActionCurrent?.id || ''
  const projectId = productActionCurrent?.projectId || ''

  /** TOOLBAR：从标准综合单价库新增 */
  const InsertByBasicUnitPriceTrigger = <InsertByBasicUnitPrice buttonClassName='ButtonPrimary' {...props} />

  /* TOOLBAR 单价分析表 */
  const toolbarAfter = <UnitPriceAnalysisTable unitPriceDetailActionCurrent={unitPriceDetailActionCurrent} />

  /** TOOLBAR 存入临时库 */
  const toolbarLast = (
    <StoreInTemporary
      unitPriceDetailActionCurrent={unitPriceDetailActionCurrent}
      unitPriceDetailSelection={unitPriceDetailSelection}
      unitPriceDetailTableRef={unitPriceDetailTableRef}
      productActionCurrent={productActionCurrent}
    />
  )

  /** TOOLBAR */
  /** TOOLBAR 自动匹配综合单价库 */
  const EditTrigger = (
    <Button className='EditButton' icon={<FileSearchOutlined />}>
      自动匹配标准综合单价库
    </Button>
  )

  const toolbar: TableToolbarDefine = {
    plusMore: { auth: !isByUnitPriceCode, triggerType: 'submit', trigger: InsertByBasicUnitPriceTrigger },
    plusLine: { auth: !isByUnitPriceCode, onSubmit: API.productUnitPriceSaveBlankRow },
    edit: { auth: !isByUnitPriceCode, triggerType: 'submit', trigger: EditTrigger },
    deleted: { auth: !isByUnitPriceCode, onSubmit: API.productUnitPriceDelete },
  }

  const columns = [
    { title: '序号', dataIndex: 'index' },
    ...useTableColumns?.filter(item => item.dataIndex !== 'showNumber'),
  ]

  useEffect(() => {
    if (!isByUnitPriceCode) return
    if (!unitPriceCode) {
      props?.setUnitPriceDetailCurrent?.(undefined)
    }
  }, [unitPriceCode])
  /** 行编辑方法 */
  const fetchProductUnitPriceUpdateRow = async (p: FETCH.CellEditReq, sp?: any) => {
    const res = await API.productUnitPriceUpdateRow(p, sp)
    /** 刷新综合单价表 */
    if (res?.status === 'SUCCESS') {
      inventoryTableRef?.current?.reload?.()
    }
    return res
  }
  // 默认列配置
  const columnsState = {
    defaultValue: { unitPriceWork: { show: false }, unitPriceCalcRule: { show: false } },
  }

  const UnitPriceDetailTableProps: Partial<BaseTableProps> = {
    persistenceKey: 'PAGES_CONSTRUCTIONCOST_PRODUCT_UNITPRICEDETAILTABLE',
    service: {
      params: !!isByUnitPriceCode ? { unitPriceCode, projectId, stageId } : { projectId, stageId },
      manualRequest: isByUnitPriceCode ? !unitPriceCode : !stageId,
      cellEditSaveRequest: fetchProductUnitPriceUpdateRow,
      dataSourceRequest: isByUnitPriceCode
        ? API.productUnitPriceQueryPageInfoByCode
        : API.productUnitPriceQueryPageInfo,
    },
    pagination: isByUnitPriceCode ? false : {},
    toolbarAfter: !readonly && toolbarAfter,
    toolbarLast: !readonly && toolbarLast,
    toolbarAuthority: readonly,
    cellEditable: !readonly,
    expandable: undefined,
    rowSelection: {},
    minHeight: 50,
    columnsState,
    toolbar,
    columns,
    ...unitPriceDetailTableProps,
  }

  return <UnitPriceDetailTable {...props} tableProps={UnitPriceDetailTableProps} />
}
