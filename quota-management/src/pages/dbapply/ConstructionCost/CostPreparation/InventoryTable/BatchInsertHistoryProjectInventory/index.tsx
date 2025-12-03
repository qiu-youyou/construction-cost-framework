/*
 * @Author: SHUANG
 * @Date: 2024-03-22 16:00:32
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-25 14:07:29
 * @Description: 工程造价-工程量清单编制-分部分项清单表 批量应用历史项目清单
 */
import { useState } from 'react'
import { Button, CheckboxProps, Modal, Tag, message } from 'antd'
import { CheckSquareOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { BaseTableProps } from 'jd-framework-web/package/components'
import BaseModal from 'jd-framework-web/package/components/BaseModal'
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane'
import { ProjectSearchItem, PropsHistoryProjectInventory } from './typings'
import { productBatchInsertHistoryProjectInventory } from './services'
import ProjectSearchTable from './ProjectSearchTable'
import { InventoryItem } from '../typings'
import InventoryTable from '..'

export default (props: PropsHistoryProjectInventory) => {
  /** PROPS 清单表REF */
  const { inventoryTableRef } = props

  /**  PROPS 当前产品 */
  const { productActionCurrent } = props

  /** 分部分项清单明细 操作行 */
  const { inventoryActionCurrent } = props

  /** 当前选择项目阶段、设置当前选择项目阶段  */
  const [projectSearchCurrent, setProjectSearchCurrent] = useState<ProjectSearchItem>()

  /** 当前、设置当前 勾选的清单 */
  const [inventorySelection, setInventorySelection] = useState<InventoryItem[]>()
  const [appleInventoryActionCurrent, setAppleInventoryActionCurrent] = useState<InventoryItem>()

  const [modal, contextHolder] = Modal.useModal()

  /** 显示保存数量 */
  const okText = <>保 存{inventorySelection?.length ? `(${inventorySelection?.length})` : ''}</>

  /** 触发按钮 */
  const triggerButton = (
    <Button className='BorderButtonGeekBlue' icon={<CheckSquareOutlined />}>
      应用历史项目清单
    </Button>
  )

  /** 保存当前选择的清单 */
  const onSubmit = async (sele: InventoryItem[]) => {
    /** 工程 产品 */
    const currentProjectId = productActionCurrent?.projectId || ''
    const currentStageId = productActionCurrent?.id || ''
    /** 当前清单行 */
    const currentParentId = inventoryActionCurrent?.parentId || '0'
    const billSort = inventoryActionCurrent?.billSort || ''
    const currentId = inventoryActionCurrent?.id || ''

    /** 所选清单 */
    const projectId = sele?.[0]?.projectId || ''
    const stageId = sele?.[0]?.stageId || ''
    const ids = sele?.map(item => item.id)

    const curParams = { currentProjectId, currentStageId, currentParentId, currentId, billSort }
    const selParams = { projectId, stageId, ids }
    const res = await productBatchInsertHistoryProjectInventory({ ...curParams, ...selParams })

    if (res?.status) {
      message.success(res?.message || `操作成功`)
      inventoryTableRef?.current?.reload?.()
    }
    return res
  }

  /** 弹窗保存已选择的清单 */
  const handleOnSubmit: any = async () => {
    if (!inventorySelection?.length) {
      const modalInfo = {
        icon: <InfoCircleOutlined />,
        content: '请勾选要增加的数据！',
        title: '继续操作',
        okText: '确定',
      }
      modal.warning(modalInfo)
      return
    }
    onSubmit(inventorySelection)
  }

  /** 控制智能选择 子级 */
  const getCheckboxProps: (
    record: ProjectSearchItem,
  ) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>> = record => {
    return { disabled: !!record?.children?.length }
  }

  const onDoubleClick = (record: InventoryItem) => {
    if (!!record?.children?.length) message.info('只能选择最后一个层级')
    else onSubmit([record])
  }

  /** 引用分部分项清单表 */
  const InventoryTableProps: Partial<BaseTableProps> = {
    toolbarLast: <Tag color='blue'>可以双击行快速应用当前清单</Tag>,
    toolbar: { expand: { buttonText: '全部' } },
    onActionCurrent: setAppleInventoryActionCurrent,
    onSelections: setInventorySelection,
    rowSelection: { getCheckboxProps },
    toolbarAfter: false,
    cellEditable: false,
    onDoubleClick,
  }

  return (
    <>
      <BaseModal
        width={1100}
        okText={okText}
        trigger={triggerButton}
        onSubmit={handleOnSubmit}
        style={{ top: 100, left: '4vw' }}
        title='批量应用历史项目清单'
        mask={false}
      >
        <section style={{ height: 560 }}>
          <SplitPane mode='vertical'>
            <PaneContainer height='40%'>
              <ProjectSearchTable
                setProjectSearchCurrent={setProjectSearchCurrent}
                projectSearchCurrent={projectSearchCurrent}
              />
            </PaneContainer>
            <PaneContainer flex>
              <InventoryTable
                productActionCurrent={projectSearchCurrent as any}
                inventoryDirectoryCurrent={{ parentId: '0', id: '0' } as any}
                tableProps={InventoryTableProps}
              />
            </PaneContainer>
          </SplitPane>
        </section>
      </BaseModal>
      {contextHolder}
    </>
  )
}
