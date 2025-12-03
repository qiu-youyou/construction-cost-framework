/*
 * @Author: SHUANG
 * @Date: 2024-03-08 15:13:48
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-26 17:33:44
 * @Description: 工程造价-综合单价
 */
import { TabsProps } from 'antd'
import { useRef, useState } from 'react'
import BaseCard from 'jd-framework-web/package/components/BaseCard'
import { TableActionType } from 'jd-framework-web/package/components'
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane'

/** 引用综合单价 */
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings'
import { UnitPriceNormItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/typings'

import UnitPricePropertiesTable from './UnitPricePropertiesTable'
import UnitPriceDetailTable from './UnitPriceDetailTable'
import UnitPriceNormTable from './UnitPriceNormTable'
import { ConstructionCostProps } from '../typings'
import { ProductUnitPriceProps } from './typings'
import TableEditTextArea from '@/common/formItems/TableEditTextArea'
import { productUnitPriceUpdateRow } from './UnitPriceDetailTable/services'

export default (props: ConstructionCostProps & ProductUnitPriceProps) => {
  /** 从单价编号查询 */
  const { readonly } = props
  const { isByUnitPriceCode } = props
  /**获取产品列表当前行 */
  const { productActionCurrent } = props

  /** 综合单价 定额表 TABLEREF */
  const unitPriceNormTableRef = useRef<TableActionType>()

  /** 综合单价表 TABLEREF */
  const unitPriceDetailTableRef = useRef<TableActionType>()

  /** 综合单价明细 当前选中 */
  const [unitPriceDetailCurrent, setUnitPriceDetailCurrent] = useState<UnitPriceDetailItem>()

  /** 综合单价明细 当前勾选 */
  const [unitPriceDetailSelection, setUnitPriceDetailSelection] = useState<UnitPriceDetailItem[]>()

  /** 综合单价明细 当前选中 操作行 */
  const [unitPriceDetailActionCurrent, setUnitPriceDetailActionCurrent] = useState<UnitPriceDetailItem>()

  /** 综合单价 清单定额 当前选中 操作行 */
  const [unitPriceNormActionCurrent, setUnitPriceNormActionCurrent] = useState<UnitPriceNormItem>()

  /** 综合单价 清单定额 当前勾选 */
  const [unitPriceNormSelection, setUnitPriceNormSelection] = useState<UnitPriceNormItem[]>()

  /** 综合单价 清单定额 当前选中 */
  const [unitPriceNormCurrent, setUnitPriceNormCurrent] = useState<UnitPriceNormItem>()

  /** 产品 综合单价 表 */
  const UnitPriceDetailTableRender = (
    <UnitPriceDetailTable
      setUnitPriceDetailActionCurrent={setUnitPriceDetailActionCurrent}
      unitPriceDetailActionCurrent={unitPriceDetailActionCurrent}
      setUnitPriceDetailSelection={setUnitPriceDetailSelection}
      setUnitPriceDetailCurrent={setUnitPriceDetailCurrent}
      unitPriceDetailSelection={unitPriceDetailSelection}
      unitPriceDetailTableRef={unitPriceDetailTableRef}
      unitPriceDetailCurrent={unitPriceDetailCurrent}
      readonly={readonly}
      {...props}
    />
  )

  /** 产品 综合单价 - 定额表 */
  const UnitPriceNormTableRender = (
    <UnitPriceNormTable
      unitPriceNormTableRef={unitPriceNormTableRef}
      inventoryTableRef={props?.inventoryTableRef}
      unitPriceDetailTableRef={unitPriceDetailTableRef}
      setUnitPriceNormActionCurrent={setUnitPriceNormActionCurrent}
      unitPriceNormActionCurrent={unitPriceNormActionCurrent}
      setUnitPriceNormSelection={setUnitPriceNormSelection}
      setUnitPriceNormCurrent={setUnitPriceNormCurrent}
      unitPriceNormSelection={unitPriceNormSelection}
      unitPriceDetailCurrent={unitPriceDetailCurrent}
      unitPriceNormCurrent={unitPriceNormCurrent}
      readonly={readonly}
    />
  )

  /** 综合单价 清单定特征*/
  const UnitPricePropertiesTableRender = (
    <UnitPricePropertiesTable
      unitPriceDetailTableRef={unitPriceDetailTableRef}
      unitPriceDetailCurrent={unitPriceDetailCurrent}
      readonly={readonly}
    />
  )

  /**表格编辑文本框 */
  const handleOnSave = async (record: { value: string }, filedName: string) => {
    const id = unitPriceDetailCurrent?.id || ''
    const projectId = productActionCurrent?.projectId || ''
    const stageId = productActionCurrent?.id || ''

    const newValue = record.value
    const res = await productUnitPriceUpdateRow({ id, filedName, newValue }, { projectId, stageId })
    if (res.status === 'SUCCESS') unitPriceDetailTableRef?.current?.reload?.()
    return res
  }

  /**工程内容 */
  const unitPriceWorkRender = (
    <TableEditTextArea
      defaultText={unitPriceDetailCurrent?.unitPriceWork || ''}
      onSave={record => handleOnSave(record, 'unitPriceWork')}
      buttonAuth={!readonly && !!unitPriceDetailCurrent?.id}
    />
  )

  /**清单计算规则 */
  const unitPriceCalcRuleRender = (
    <TableEditTextArea
      defaultText={unitPriceDetailCurrent?.unitPriceCalcRule || ''}
      onSave={record => handleOnSave(record, 'unitPriceCalcRule')}
      buttonAuth={!readonly && !!unitPriceDetailCurrent?.id}
    />
  )

  /** 综合单价 定额明细 */
  const NormPaneItems: TabsProps['items'] = [
    { key: 'norm', label: '定额含量', children: UnitPriceNormTableRender },
    { key: 'properties', label: '项目特征', children: UnitPricePropertiesTableRender },
    { key: 'unitPriceWork', label: '工作内容', children: unitPriceWorkRender },
    { key: 'unitPriceCalcRule', label: '清单计算规则', children: unitPriceCalcRuleRender },
  ]

  return (
    <SplitPane mode='vertical'>
      <PaneContainer height={isByUnitPriceCode ? 100 : '56%'}>
        <BaseCard noHeader={isByUnitPriceCode} title='综合单价' {...props?.cardProps}>
          {UnitPriceDetailTableRender}
        </BaseCard>
      </PaneContainer>

      <PaneContainer flex>
        <BaseCard tabs={{ items: NormPaneItems }} noHeader />
      </PaneContainer>
    </SplitPane>
  )
}
