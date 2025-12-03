/*
 * @Author: SHUANG
 * @Date: 2024-01-11 10:31:45
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-24 10:53:55
 * @Description: 工程造价-造价编制
 */

import { TabsProps } from 'antd'
import { useRef, useState } from 'react'
import BaseCard from 'jd-framework-web/package/components/BaseCard'
import { TableActionType, TreeActionType } from 'jd-framework-web/package/components'
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane'

import { InventoryDirectoryItem } from './InventoryDirectory/typings'
import { InventoryItem } from './InventoryTable/typings'
import { ConstructionCostProps } from '../typings'

import InventoryDirectory from './InventoryDirectory'
import ProductUnitPrice from '../ProductUnitPrice'
import InventoryTable from './InventoryTable'

/** 审核状态 */
const AUDITSTATUS = '1'

export default (props: ConstructionCostProps) => {
  /** 当前产品 */
  const { readonly } = props
  const { productActionCurrent } = props

  /** 分部分项目录 明细表 TABLEREF */
  const inventoryTableRef = useRef<TableActionType>()

  /** 分部分项目录 TREEREF */
  const inventoryDirectoryTreeRef = useRef<TreeActionType>()

  /** 分部分项清单 当前选中 当前行 */
  const [inventoryCurrent, setInventoryCurrent] = useState<InventoryItem>()

  /** 分部分项清单 当前选中 勾选行 */
  const [inventorySelection, setInventorySelection] = useState<InventoryItem[]>()

  /** 分部分项清单 当前选中 操作行 */
  const [inventoryActionCurrent, setInventoryActionCurrent] = useState<InventoryItem>()

  /** 分部分项目录 当前选中 */
  const [inventoryDirectoryCurrent, setInventoryDirectoryCurrent] = useState<InventoryDirectoryItem>()

  /** 当前产品状态 */
  const productStatus = productActionCurrent?.billStatus || ''

  /** 分部分项目录 */
  const InventoryDirectoryRender = (
    <InventoryDirectory
      setInventoryDirectoryCurrent={setInventoryDirectoryCurrent}
      inventoryDirectoryTreeRef={inventoryDirectoryTreeRef}
      {...props}
    />
  )

  /** 分部分项清单 */
  const InventoryTableRender = (
    <InventoryTable
      auditStatus={productStatus === AUDITSTATUS}
      inventoryDirectoryTreeRef={inventoryDirectoryTreeRef}
      inventoryDirectoryCurrent={inventoryDirectoryCurrent}
      setInventoryActionCurrent={setInventoryActionCurrent}
      inventoryActionCurrent={inventoryActionCurrent}
      setInventorySelection={setInventorySelection}
      setInventoryCurrent={setInventoryCurrent}
      inventorySelection={inventorySelection}
      inventoryTableRef={inventoryTableRef}
      inventoryCurrent={inventoryCurrent}
      {...props}
    />
  )

  /** 引用项目综合单价 */
  const ProductUnitPriceRender = (
    <ProductUnitPrice
      unitPriceCode={inventoryCurrent?.unitPriceCode}
      productActionCurrent={productActionCurrent}
      inventoryTableRef={inventoryTableRef}
      readonly={readonly}
      isByUnitPriceCode
    />
  )

  /** 综合单价 辅助审核 */
  const tabsPane: TabsProps['items'] = [{ key: 'price', label: '综合单价', children: ProductUnitPriceRender }]

  if (productStatus === AUDITSTATUS) {
    tabsPane.push({ key: 'audit', label: '辅助审核', children: <></> })
  }

  const defaultActiveKey = productStatus === AUDITSTATUS ? 'audit' : 'price'

  return (
    <SplitPane>
      <PaneContainer width={220}>
        <BaseCard title='分部分项目录'>
          <>{InventoryDirectoryRender}</>
        </BaseCard>
      </PaneContainer>

      <PaneContainer flex>
        <SplitPane mode='vertical'>
          <PaneContainer height='47%'>
            <>{InventoryTableRender}</>
          </PaneContainer>

          <PaneContainer flex>
            <BaseCard tabs={{ items: tabsPane, defaultActiveKey }} noHeader />
          </PaneContainer>
        </SplitPane>
      </PaneContainer>
    </SplitPane>
  )
}
