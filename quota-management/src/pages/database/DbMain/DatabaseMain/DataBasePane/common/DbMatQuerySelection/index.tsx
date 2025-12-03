/*
 * @Author: SHUANG
 * @Date: 2023-10-25 13:52:19
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-25 17:10:24
 * @Description: MAT明细 （机械台班、混凝土配合比、人材机含量）查询并选择增加到含量表
 */
import { ReactNode, useRef, useState } from 'react'
import { Button, Modal, Space, TabsProps, message } from 'antd'
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons'
import BaseCard from 'jd-framework-web/package/components/BaseCard'
import { BaseTableProps, ModalActionType } from 'jd-framework-web/package/components'
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton'
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane'

import { DbMatClassifyItem } from '../../DbMat/DbMatClassifyTree/typings'
import { DbMatItem } from '../../DbMat/DbMatMainTable/typings'
import { DbNormItem } from '../../DbNorm/DbNormTable/typings'

import { DbMatContentQueryParams } from '../DbMatContentByClassify/services'
import DbMatContentByClassify from '../DbMatContentByClassify'
import DbMatClassifyTree from '../../DbMat/DbMatClassifyTree'
import { DatabaseDbItem } from '../../../typings'

/**
 * 当前目录类型（人材机 机械台班 混凝土配合比）
 * rcj[人材机]、machine[机械台班]、concrete[混凝土]
 */
export type ClassifyRjcType = 'rcj' | 'machine' | 'concrete'

export type DbMatQuerySelectonProps = {
  isNorm?: boolean
  /** 是否通过数据库 */
  queryByDb?: boolean
  /** 当前数据库 通过定额库查询必传 */
  databaseCurrent?: DatabaseDbItem
  /** 默认的当前数据库 */
  databaseCurrentDefault?: DatabaseDbItem
  /** 当前主表数据（Norm定额 ｜ MAT材料） */
  primaryCurrent?: DbNormItem | DbMatItem | any

  /** 根据该数组 渲染 tabpane */
  classifyRjcTypePane: ClassifyRjcType[]
  /** 根据该数组 渲染 tabLabel 按照 classifyRjcTypePane 顺序*/
  classifyRjcTypePaneLabel?: ReactNode[]
  /** 点击添加到含量触发的提交方法 */
  onSubmit?: (matDataSelection: DbMatItem[]) => Promise<FETCH.Res>
  /** 出发保存的方法 比 submit 早 */
  onSave?: () => Promise<FETCH.Res>
  /** 明细查询方法 */
  matMainDataSourceRequest: (params: DbMatContentQueryParams) => Promise<FETCH.Res<DbMatItem>>
  dbMatMainUseServices?: () => any
  dbMatMainTableProps?: Partial<BaseTableProps>
  dbMatContentTableProps?: Partial<BaseTableProps>
  /** 设置当前章节 */
  setMatCatalogCurrent?: React.Dispatch<React.SetStateAction<DbMatClassifyItem | undefined>>
  /** 不显示 按钮 */
  noFoolter?: boolean
  /** 确定按钮显示文字 */
  okText?: ReactNode
  /** 触发按钮自定义 */
  trigger?: ReactNode
  /** 按钮的触发控制 */
  triggerControl?: () => void

  /** 弹窗文字 */
  modalTitle?: string
  modalStyle?: any

  /*人材机左侧树结构默认选中 */
  dbChapterDefaultCurrent?: { id: string }
}

export default (props: DbMatQuerySelectonProps) => {
  const [modal, contextHolder] = Modal.useModal()

  /** 弹窗 */
  const modalRef = useRef<ModalActionType>()

  /** 接收数据 */
  const { isNorm, queryByDb, databaseCurrent } = props
  const { noFoolter, primaryCurrent, classifyRjcTypePane } = props
  /**树结构默认选中 */
  const { dbChapterDefaultCurrent } = props

  /** loading */
  const [saveLoading, setSaveLoading] = useState<boolean>()

  /** 勾选要保存的数据 */
  const [matDataSelection, setMatDataSelection] = useState<DbMatItem[]>()

  /** 当前 对应 当前章节 */
  const [matCatalogCurrent, setMatCatalogCurrent] = useState<DbMatClassifyItem>()

  /** 当前 激活 tab类型 对应目录类型 */
  const [classifyRjcType, setClassifyRjcType] = useState<ClassifyRjcType>(classifyRjcTypePane[0])

  /** 当前主表 (定额 | 机械台班 | 混凝土) 当前明细ID */
  const primaryCurrentId = primaryCurrent?.id

  /** 当前数据库ID 如果通过数据库查询 取当前数据库ID 否则通过 primary 取 */
  /** primary 可能是定额 可能是主材 */
  const dbId = !!props?.queryByDb ? databaseCurrent?.id : primaryCurrent?.dbId

  /** 设置当前目录类型 */
  const onChange = (activeKey: any) => setClassifyRjcType(activeKey)

  /** 人材机添加到含量 */
  const handleOnSubmit = async () => {
    if (typeof props?.onSave === 'function') {
      setSaveLoading(true)
      const res = await props?.onSave?.()
      setSaveLoading(false)
      if (res?.status !== 'SUCCESS') return
      /**  关闭弹窗 */
      message.success(res?.message || '操作成功')
      modalRef?.current?.close?.()
      return
    }
    if (!matDataSelection?.length) {
      const modalInfo = {
        icon: <InfoCircleOutlined />,
        content: '请勾选需要增加的数据！再进行该操作！',
        title: '继续操作',
        okText: '确定',
      }
      modal.warning(modalInfo)
      return
    }
    setSaveLoading(true)
    const res = await props?.onSubmit?.(matDataSelection)
    setSaveLoading(false)
    if (res?.status !== 'SUCCESS') return
    /**  关闭弹窗 */
    message.success(res?.message || '操作成功')
    modalRef?.current?.close?.()
  }

  const handleBeforeOpen = () => {
    setMatDataSelection([])
    setClassifyRjcType(classifyRjcTypePane[0])
  }

  /** 取消操作 */
  const handleOnCancel = () => {
    modalRef?.current?.close?.()
    setMatDataSelection([])
    setClassifyRjcType(classifyRjcTypePane[0])
  }

  /** 设置当前章节 */
  const handleSetMatCatalogCurrent: any = (record?: DbMatClassifyItem) => {
    setMatCatalogCurrent(record)
    props?.setMatCatalogCurrent?.(record)
  }

  /** 关联目录和明细 */
  const panechildrenRender = (
    <SplitPane>
      <PaneContainer width={310}>
        <DbMatClassifyTree
          dbChapterDefaultCurrent={dbChapterDefaultCurrent}
          databaseCurrent={{ id: dbId, access: databaseCurrent?.access } as DatabaseDbItem}
          setDbMatClassifyCurrent={handleSetMatCatalogCurrent}
          classifyRjcType={classifyRjcType}
        />
      </PaneContainer>
      <PaneContainer flex>
        <DbMatContentByClassify
          databaseCurrent={{ id: dbId, access: databaseCurrent?.access } as DatabaseDbItem}
          matMainDataSourceRequest={props?.matMainDataSourceRequest}
          dbMatContentTableProps={props?.dbMatContentTableProps}
          dbMatMainUseServices={props?.dbMatMainUseServices}
          dbMatMainTableProps={props?.dbMatMainTableProps}
          matCatalogCurrent={matCatalogCurrent}
          setSelection={setMatDataSelection}
          classifyRjcType={classifyRjcType}
          primaryCurrent={primaryCurrent}
          selection={matDataSelection}
          queryByDb={queryByDb}
          isNorm={isNorm}
        />
      </PaneContainer>
    </SplitPane>
  )

  /** 根据传入 tab 生成 pane  */
  const paneItems: TabsProps['items'] = []
  const paneItemsMap: any = {
    machine: { key: 'machine', label: '机械台班', children: panechildrenRender },
    concrete: { key: 'concrete', label: '混凝土配合比', children: panechildrenRender },
    rcj: { key: 'rcj', label: '人材机', children: panechildrenRender },
  }

  classifyRjcTypePane?.forEach((item, index) => {
    paneItems.push(paneItemsMap[item])
  })

  /** card pane */
  const destroyInactiveTabPane = true
  const CardPaneRender = (
    <BaseCard
      tabs={{ destroyInactiveTabPane, animated: false, items: paneItems, onChange }}
      noHeader={!props?.classifyRjcTypePaneLabel?.length}
      title={props?.classifyRjcTypePaneLabel?.[0]}
    />
  )

  /** 操作按钮 */
  const actionBtn = (
    <div className='SchemaFormFooter' style={{ padding: '2px 6px 0 6px' }}>
      <Space>
        <Button onClick={handleOnCancel}>取消</Button>
        <Button type='primary' loading={saveLoading} onClick={handleOnSubmit}>
          {props?.okText || '增加到含量表'}
          {!!matDataSelection?.length && `(${matDataSelection?.length})`}
        </Button>
      </Space>
    </div>
  )

  /** 触发按钮 */
  const triggerBtn = props?.trigger || (
    <Button disabled={!primaryCurrentId} type='primary' className='PlusButton'>
      <PlusOutlined /> 查询人材机
    </Button>
  )

  /** 人材机选择 */
  const ModalRender = (
    <section className='ant-form' style={{ height: 580, padding: 0 }}>
      <div style={{ height: noFoolter ? 'calc(100% - 2px)' : 'calc(100% - 26px)' }}>{CardPaneRender}</div>
      {!noFoolter && actionBtn}
    </section>
  )

  /** 触发控制 */
  const triggerControl = () => {
    if (typeof props?.triggerControl === 'function') return props?.triggerControl?.()
    return { status: 'SUCCESS' }
  }

  /** 弹窗属性 */
  const style = props?.modalStyle || { top: 120, left: '4vw' }
  const modalProps = {
    defaultFullScreen: false,
    afterClose: handleBeforeOpen,
    triggerControl,
    width: 1200,
    style,
  }

  return (
    <>
      <ModalButton
        trigger={triggerBtn}
        modalTitle={props?.modalTitle || '查询人材机'}
        determineActionCurrent={!primaryCurrentId}
        modalProps={modalProps}
        render={ModalRender}
        actionRef={modalRef}
      />
      {contextHolder}
    </>
  )
}
