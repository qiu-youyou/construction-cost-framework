/*
 * @Author: SHUANG
 * @Date: 2023-11-01 17:42:18
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-24 17:58:06
 * @Description: 定额 - 借用定额
 */
import { useRequest } from 'umi'
import { useEffect, useRef, useState } from 'react'
import { Button, Modal, Space, message } from 'antd'
import BaseCard from 'jd-framework-web/package/components/BaseCard'
import { InfoCircleOutlined, SwapOutlined } from '@ant-design/icons'
import { ModalActionType, TableActionType } from 'jd-framework-web/package/components'
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton'
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane'

import { DbNormItem } from '../../DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings'
import DbNormTable from '../../DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable'
import DbNormPane from '../../DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane'
import { DbChapterItem } from '../../DbMain/DatabaseMain/DbChapterTree/typings'
import { databaseDbQueryPageInfo } from '../../DbMain/DatabaseMain/services'
import DbChapterTree from '../../DbMain/DatabaseMain/DbChapterTree'
import { DatabaseDbItem } from '../../DbMain/DatabaseMain/typings'
import DataBaseSearch from '../DataBaseSearch'
import { DbNromBorrowProps } from './typings'
import DbSelector from '../DbSelector'

export default (props: DbNromBorrowProps) => {
  /** 弹窗 */
  const modalRef = useRef<ModalActionType>()
  const [modal, contextHolder] = Modal.useModal()

  /** 当前定额 */
  const [dbNormCurrent, setDbNormCurrent] = useState<DbNormItem>()

  /** 数据库 */
  const [dbDataSource, setDbDataSource] = useState<DatabaseDbItem[]>()

  /** 当前勾选定额 */
  const [dbNormSelection, setDbNormSelection] = useState<DbNormItem[]>()

  /** 当前定额库 */
  const [databaseCurrent, setDatabaseCurrent] = useState<DatabaseDbItem>()

  /** 当前定额册章节 */
  const [dbChapterCurrent, setDbChapterCurrent] = useState<DbChapterItem>()

  /** 接收数据 */
  const { noFoolter, modalTitle, dbSelectorDisabled, dbSelectorHidden } = props

  /** 定额明细表 REF */
  const dbNormTableRef = props?.dbNormTableRef || useRef<TableActionType>()

  /** 传入的定额 */
  const { normCurrentDefault } = props

  /** 获取定额库数据 */
  const { loading, data } = useRequest(async () => await databaseDbQueryPageInfo({ pageSize: 1000 }), {
    manual: props.dbDataSourceRequestManual,
  })

  /** 设置当前选中定额库 并指定为无维护权限 */
  const handleSetDatabaseCurrent: any = (record?: DatabaseDbItem) => {
    if (!!record) setDatabaseCurrent({ ...record, access: undefined })
  }

  /** 设置当前默认选中的定额库 */
  const handleSetDefaultDatabaseCurrent = (source?: DatabaseDbItem[]) => {
    setDbDataSource(source)
    if (!!props?.databaseCurrentDefault?.id) handleSetDatabaseCurrent({ ...props.databaseCurrentDefault })
    else handleSetDatabaseCurrent(source?.[0])
  }

  /** 获取到定额库后默认设置第一项为当前定额库 */
  useEffect(() => {
    if (props?.dbDataSourceRequestManual) return
    handleSetDefaultDatabaseCurrent(data)
  }, [loading])

  useEffect(() => {
    if (!props?.dbDataSourceRequestManual) return
    handleSetDefaultDatabaseCurrent(props?.dbDataSource)
  }, [props.dbDataSource])

  /** PROPS */
  const DbSelectorProps = { dbDataSource, databaseCurrent, setDatabaseCurrent: handleSetDatabaseCurrent }
  const DbNormProps = { databaseCurrent, dbChapterCurrent, dbNormCurrent, setDbNormCurrent }

  /** 当前定额章节册发生改变 同步向外触发事件 */
  const handleSetDbChapterCurrent: any = (record: DbChapterItem) => {
    setDbChapterCurrent(record)
    props?.setDbChapterCurrent?.(record)
  }

  /** loading */
  const [saveLoading, setSaveLoading] = useState<boolean>()

  /** 借用定额 所选的定额 */
  const onSubmit = async () => {
    if (typeof props?.onSave === 'function') {
      setSaveLoading(true)
      const res = await props?.onSave?.()
      setSaveLoading(false)
      if (res?.status !== 'SUCCESS') return
      message.success(res?.message || '操作成功')
      modalRef?.current?.close?.()
      return
    }
    if (!dbNormSelection?.length) {
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
    const res = await props?.onSubmit?.(dbNormSelection)
    setSaveLoading(false)
    if (res?.status !== 'SUCCESS') return
    message.success(res?.message || '操作成功')
    dbNormTableRef?.current?.setTableSelection?.([])
    /**  关闭弹窗 */
    modalRef?.current?.close?.()
  }

  /** 关闭 */
  const afterClose = () => {
    setDbNormSelection([])
  }

  /** 取消操作 */
  const handleOnCancel = () => {
    modalRef?.current?.close?.()
    setDbNormSelection([])
  }

  /** 定额库选择器 */
  const DbSelectorRender = !dbSelectorHidden && (
    <>
      <DbSelector dbSelectorDisabled={dbSelectorDisabled} width={250} {...DbSelectorProps} />
      {!dbSelectorDisabled && <DataBaseSearch {...DbSelectorProps} />}
    </>
  )

  /** 操作按钮 */
  const actionBtn = (
    <div className='SchemaFormFooter' style={{ padding: '2px 6px 0 6px' }}>
      <Space>
        <Button onClick={handleOnCancel}>取消</Button>
        <Button type='primary' loading={saveLoading} onClick={onSubmit}>
          <span>{props?.okText || '借用定额'}</span>
          {!!dbNormSelection?.length ? `(${dbNormSelection?.length})` : ''}
        </Button>
      </Space>
    </div>
  )

  /** 触发控制 */
  const triggerControl = () => {
    /** 操作栏禁用条件 没有当前清单 */
    const { unitPriceDetailCurrent } = props
    const toolbarDisabled = !unitPriceDetailCurrent || !!unitPriceDetailCurrent?.children?.length
    if (props?.isUnitPriceDetailCurrent && toolbarDisabled) {
      modal.warning({ title: '继续操作', content: '请选择综合单价进行操作!' })
      return { status: 'ERROR' }
    }

    handleSetDefaultDatabaseCurrent(props?.dbDataSource || data)
    if (typeof props?.triggerControl === 'function') return props?.triggerControl?.()
    return { status: 'SUCCESS' }
  }

  /** 默认选中的定额 */
  const persistenceKey = 'PAGES_DATABASE_DBNORMBORROW_DBNORMBORROWTABLE'
  const dbNormDefaultCurrent = !normCurrentDefault ? true : normCurrentDefault

  /** 默认选中的章节 */
  const dbChapterDefaultCurrent = !normCurrentDefault
    ? true
    : {
        id: normCurrentDefault.chapterId,
        dbId: normCurrentDefault?.dbId,
      }

  /** 触发DOM */
  const TriggerButton = props.triggerButton || (
    <Button className='BorderButtonBlue'>
      <SwapOutlined /> 借用定额
    </Button>
  )

  /** 弹窗属性 */
  const modalProps = {
    triggerControl,
    defaultFullScreen: false,
    width: 1200,
    afterClose,
  }

  return (
    <>
      <ModalButton
        actionRef={modalRef}
        modalProps={modalProps}
        trigger={TriggerButton}
        determineActionCurrent={false}
        modalTitle={modalTitle || '借用定额'}
        render={
          <section className='ant-form' style={{ height: 580, padding: 0 }}>
            <section style={{ height: noFoolter ? 'calc(100% - 2px)' : 'calc(100% - 26px)' }}>
              <SplitPane>
                {/* 定额库章节目录 */}
                <PaneContainer width={310}>
                  <BaseCard extraFullScreen={false} title={DbSelectorRender}>
                    <DbChapterTree
                      dbChapterDefaultCurrent={dbChapterDefaultCurrent as any}
                      setDbChapterCurrent={handleSetDbChapterCurrent}
                      dbChapterCurrent={dbChapterCurrent}
                      databaseCurrent={databaseCurrent}
                    />
                  </BaseCard>
                </PaneContainer>

                <PaneContainer flex>
                  <SplitPane mode='vertical'>
                    {/* 定额库章节目录 - 定额明细 */}
                    <PaneContainer height='52%'>
                      <DbNormTable
                        dbNormTableProps={{ ...props?.dbNormTableProps, persistenceKey }}
                        dbNormDefaultCurrent={dbNormDefaultCurrent as any}
                        setDbNormSelection={setDbNormSelection}
                        dbNormTableRef={dbNormTableRef}
                        {...DbNormProps}
                        normReadonly
                      />
                    </PaneContainer>

                    {/* 定额库章节目录 - 定额明细 定额明细对应结构 */}
                    <PaneContainer flex>
                      <DbNormPane {...DbNormProps} />
                    </PaneContainer>
                  </SplitPane>
                </PaneContainer>
              </SplitPane>
            </section>
            {!noFoolter && actionBtn}
          </section>
        }
      />
      {contextHolder}
    </>
  )
}
