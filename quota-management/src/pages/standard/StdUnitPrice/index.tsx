/*
 * @Author: SHUANG
 * @Date: 2023-11-15 10:26:20
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-26 17:33:49
 * @Description: 标准综合单价库
 */
import { TabsProps } from 'antd'
import { useRef, useState } from 'react'
import BaseCard from 'jd-framework-web/package/components/BaseCard'
import { TableActionType } from 'jd-framework-web/package/components'
import ViewContainer from 'jd-framework-web/package/components/ViewContainer'
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane'

import { UnitPriceDirectoryItem } from './UnitPriceDirectoryTree/typings'
import { UnitPriceDetailItem } from './UnitPriceDetailTable/typings'
import { UnitPriceNormItem } from './UnitPriceNormTable/typings'

import UnitPricePropertiesTable from './UnitPricePropertiesTable'
import UnitPriceDirectoryTree from './UnitPriceDirectoryTree'
import UnitPriceDetailTable from './UnitPriceDetailTable'
import UnitPriceNormTable from './UnitPriceNormTable'
import { PropsStdUnitPrice } from './typings'
import TableEditTextArea from '@/common/formItems/TableEditTextArea'
import { unitPriceDetailUpdateRow } from './UnitPriceDetailTable/services'
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton'

export default (props: PropsStdUnitPrice) => {
  const { auth } = useAuthButton()
  /** PROPS */
  const { viewContaineProps, paneContainerProps } = props

  /** 清单明细 TABLEREF */
  const unitPriceDetailTableRef = useRef<TableActionType>()
  /** 清单定额 TABLEREF */
  const unitPriceNormTableRef = useRef<TableActionType>()

  /** 综合单价目录 当前选中  */
  const [unitPriceDirectoryCurrent, setUnitPriceDirectoryCurrent] = useState<UnitPriceDirectoryItem>()

  /** 综合单价 清单明细 当前选中 操作行 */
  const [unitPriceDetailActionCurrent, setUnitPriceDetailActionCurrent] = useState<UnitPriceDetailItem>()
  /** 综合单价 清单明细 当前选中 */
  const [unitPriceDetailCurrent, setUnitPriceDetailCurrent] = useState<UnitPriceDetailItem>()

  /** 综合单价 清单定额 当前选中 操作行 */
  const [unitPriceNormActionCurrent, setUnitPriceNormActionCurrent] = useState<UnitPriceNormItem>()
  /** 综合单价 清单定额 当前勾选 */
  const [unitPriceNormSelection, setUnitPriceNormSelection] = useState<UnitPriceNormItem[]>()
  /** 综合单价 清单定额 当前选中 */
  const [unitPriceNormCurrent, setUnitPriceNormCurrent] = useState<UnitPriceNormItem>()

  /** 综合单价 清单定特征*/
  const UnitPricePropertiesTableRender = (
    <UnitPricePropertiesTable
      unitPriceDetailTableRef={unitPriceDetailTableRef}
      unitPriceDetailCurrent={unitPriceDetailCurrent}
    />
  )

  /** 综合单价 清单定额 */
  const UnitPriceNormTableRender = (
    <UnitPriceNormTable
      unitPriceNormTableRef={unitPriceNormTableRef}
      unitPriceDetailTableRef={unitPriceDetailTableRef}
      setUnitPriceNormActionCurrent={setUnitPriceNormActionCurrent}
      unitPriceNormActionCurrent={unitPriceNormActionCurrent}
      setUnitPriceNormSelection={setUnitPriceNormSelection}
      setUnitPriceNormCurrent={setUnitPriceNormCurrent}
      unitPriceNormSelection={unitPriceNormSelection}
      unitPriceDetailCurrent={unitPriceDetailCurrent}
      unitPriceNormCurrent={unitPriceNormCurrent}
      tableProps={{ minHeight: 50 }}
    />
  )

  /**表格编辑文本框 */
  const handleOnSave = async (record: { value: string }, filedName: string) => {
    const id = unitPriceDetailCurrent?.id || ''
    const unitPriceDbId = unitPriceDirectoryCurrent?.id || ''
    const listNormDirectoryId = unitPriceDirectoryCurrent?.listNormDirectoryId || ''

    const newValue = record.value
    const res = await unitPriceDetailUpdateRow(
      { id, filedName, newValue },
      { unitPriceDbId, listNormDirectoryId },
    )
    if (res.status === 'SUCCESS') unitPriceDetailTableRef?.current?.reload?.()
    return res
  }

  /**工程内容 */
  const unitPriceWorkRender = (
    <TableEditTextArea
      defaultText={unitPriceDetailCurrent?.unitPriceWork || ''}
      onSave={record => handleOnSave(record, 'unitPriceWork')}
      buttonAuth={auth('list-properties-edit') && !!unitPriceDetailCurrent?.id}
    />
  )

  /**清单计算规则 */
  const unitPriceCalcRuleRender = (
    <TableEditTextArea
      defaultText={unitPriceDetailCurrent?.unitPriceCalcRule || ''}
      onSave={record => handleOnSave(record, 'unitPriceCalcRule')}
      buttonAuth={auth('list-properties-edit') && unitPriceDetailCurrent?.id}
    />
  )

  /** 综合单价 清单定额 项目特征 PANEITEMS */
  const NormPropertiesPaneItems: TabsProps['items'] = [
    { key: 'norm', label: '定额含量', children: UnitPriceNormTableRender },
    { key: 'properties', label: '项目特征', children: UnitPricePropertiesTableRender },
    { key: 'unitPriceWork', label: '工作内容', children: unitPriceWorkRender },
    { key: 'unitPriceCalcRule', label: '清单计算规则', children: unitPriceCalcRuleRender },
  ]

  /** 设置当前选中章节 */
  const handleSetUnitPriceDirectoryCurrent: any = (record?: UnitPriceDirectoryItem) => {
    setUnitPriceDirectoryCurrent(record)
    props?.setUnitPriceDirectoryCurrent?.(record)
  }

  const handleSetUnitPriceDetailCurrent: any = (record?: UnitPriceDetailItem) => {
    setUnitPriceDetailCurrent(record)
    props?.setUnitPriceDetailCurrent?.(record)
  }

  return (
    <ViewContainer {...viewContaineProps}>
      <SplitPane {...props}>
        <PaneContainer width={380} {...paneContainerProps}>
          <BaseCard title='目录'>
            <UnitPriceDirectoryTree
              setUnitPriceDirectoryCurrent={handleSetUnitPriceDirectoryCurrent}
              unitPriceDirectoryCurrent={unitPriceDirectoryCurrent}
            />
          </BaseCard>
        </PaneContainer>

        <PaneContainer flex>
          <SplitPane mode='vertical'>
            <PaneContainer height='40%'>
              <BaseCard title='标准综合单价'>
                <UnitPriceDetailTable
                  unitPriceDirectoryCurrent={unitPriceDirectoryCurrent}
                  setUnitPriceDetailActionCurrent={setUnitPriceDetailActionCurrent}
                  unitPriceDetailActionCurrent={unitPriceDetailActionCurrent}
                  setUnitPriceDetailCurrent={handleSetUnitPriceDetailCurrent}
                  unitPriceDetailTableRef={unitPriceDetailTableRef}
                  unitPriceDetailCurrent={unitPriceDetailCurrent}
                  {...props}
                  {...props?.propsUnitPriceDetail}
                />
              </BaseCard>
            </PaneContainer>

            <PaneContainer flex>
              <BaseCard tabs={{ items: NormPropertiesPaneItems }} noHeader />
            </PaneContainer>
          </SplitPane>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  )
}
