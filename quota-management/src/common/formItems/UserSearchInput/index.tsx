/*
 * @Author: SHUANG
 * @Date: 2024-01-31 16:39:14
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-24 13:47:52
 * @Description: 查询人员 选择人员信息
 */
import { Button, Tooltip, Input, Modal, Tag, Space } from 'antd'
import { CSSProperties, useRef, useState } from 'react'
import { CloseCircleFilled, CloseCircleOutlined, SearchOutlined } from '@ant-design/icons'
import BaseModal from 'jd-framework-web/package/components/BaseModal'
import BaseTable from 'jd-framework-web/package/components/BaseTable'
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components'
import { UserListItem } from 'jd-framework-web/package/common/views/system/User/typings'
import { userQueryPageInfo } from 'jd-framework-web/package/common/views/system/User/services'

import useUserTableColumns from '@/pages/database/DbAccess/DbAccessMain/DbAccessUser/DbAccessUserSave/useTableColumns'
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane'
import BaseCard from 'jd-framework-web/package/components/BaseCard'

type Props = {
  // formItem 默认当前值
  value?: string
  // 当前已经选择的用户信息
  valueUserInfo?: any[]
  // formItem 默认事件
  onChange?: (value: string, userSelection?: UserListItem[]) => void
}

let selectionBefore: any[] = []

export default (props: Props) => {
  /** PROPS */
  const { valueUserInfo } = props
  const { value, onChange } = props

  const [modal, contextHolder] = Modal.useModal()

  /** Table Ref */
  const userSearchTableRef = useRef<TableActionType>()

  /** 已勾选用户 */
  const [userSelection, setUserSelection] = useState<UserListItem[]>()

  /** 查询用户方法 */
  const fetchUserQueryPageInfo = async (params: FETCH.Req) => {
    const res = await userQueryPageInfo(params)
    setTimeout(() => {
      selectionBefore = !!userSelection ? [...userSelection] : []
      userSearchTableRef?.current?.setTableSelection?.(selectionBefore)
    }, 0)

    return res
  }

  /** 默认已选用户 */
  const handleUserSelectionDefault = () => {
    selectionBefore = []
    if (!valueUserInfo) return { status: 'SUCCESS' }
    /** 默认反选 */
    const userSelectionDefault: any = valueUserInfo?.map((item: any) => ({
      userRealname: item?.userFullName || '',
      userCode: item?.userCode || '',
      id: item?.userId || '',
      selectionDefault: true,
    }))
    setUserSelection(userSelectionDefault)
    return { status: 'SUCCESS' }
  }

  /** 处理勾选逻辑 */
  const handleOnSelection = (selection?: UserListItem[], seleMethods?: string) => {
    if (selection === undefined) return
    if (seleMethods === 'cancel') {
      selectionBefore = []
      setUserSelection?.([])
      return
    }
    if (selection?.length === 0) return

    const selectionData = selection?.filter(item => item !== undefined)

    /** 当前所有勾选 小于 历史勾选是 为取消勾选 */
    if (selection?.length < selectionBefore?.length) {
      const newSele = selectionBefore?.filter(
        item => item?.selectionDefault || selectionData.some(value => value?.id == item?.id),
      )
      /** 删除的不是当前表中包含的数据 */
      if (newSele?.length === userSelection?.length) {
        selectionBefore = [...selectionData]
        setUserSelection?.(selectionData)
      } else {
        selectionBefore = [...newSele]
        setUserSelection?.(selectionBefore)
      }

      return
    }

    if (selectionData?.length > 0) {
      /** 合并 selectionBefore 和 newSele 两个数组合并； 不合并id相同的项目 */
      const newSele = selectionData?.concat(
        selectionBefore?.filter(item => !selectionData.some(item2 => item2?.id === item?.id)),
      )
      setUserSelection?.(newSele)
      return
    }
    setUserSelection?.(selectionData)
  }

  /** 点击叉号移除某个用户 */
  const handleRemoveUser = (user: UserListItem) => {
    const newSele = userSelection?.filter(item => item?.id !== user?.id)
    selectionBefore = newSele || []
    setUserSelection(newSele)
    userSearchTableRef?.current?.setTableSelection?.(newSele)
  }

  /** 用户列表 引用 */
  const generateTable: BaseTableProps = {
    search: { span: 8 },
    persistenceKey: 'COMMON_FORMITEMS_USERSEARCHTABLE',
    service: { dataSourceRequest: fetchUserQueryPageInfo, params: {} },
    rowSelection: { revert: false },
    onSelections: handleOnSelection,
    actionRef: userSearchTableRef,
    columns: useUserTableColumns,
    virtual: false,
  }

  /** 触发保存授权 */
  const handleOnSubmit = async () => {
    onChange?.('', userSelection || [])
    return { status: 'SUCCESS' }
  }

  /** 清空INPUT */
  const handleClearInput = () => {
    onChange?.('', [])
  }

  /** 触发按钮 */
  const TriggerButton = (
    <Tooltip title='选择用户'>
      <Button className='BorderButtonPrimary'>
        <SearchOutlined />
      </Button>
    </Tooltip>
  )

  /** 输入框样式 */
  const inputStyle: CSSProperties = {
    width: 'calc(100% - 26px)',
    marginRight: 2,
    height: 'auto',
  }

  /** 清空图标样式 */
  const clearIconStyle: CSSProperties = {
    right: 32,
  }

  return (
    <>
      <div className='form-item-custom'>
        <Input.TextArea value={value} style={inputStyle} rows={2} disabled />

        {!!value && (
          <span style={clearIconStyle} className='ClearInputButton' onClick={handleClearInput}>
            <CloseCircleFilled />
          </span>
        )}

        <BaseModal
          width={900}
          title='选择人员'
          trigger={TriggerButton}
          onSubmit={handleOnSubmit}
          triggerControl={handleUserSelectionDefault}
          okText={'确定'}
          style={{ top: 120, left: '8vw' }}
        >
          <section style={{ height: 420 }}>
            <SplitPane>
              <PaneContainer flex>
                <BaseTable {...generateTable} />
              </PaneContainer>

              <PaneContainer width={170}>
                <BaseCard
                  extraFullScreen={false}
                  title={'已选人员：' + (userSelection?.length ? `(${userSelection?.length})` : '')}
                >
                  <Space size={[5, 5]} wrap style={{ padding: 10 }}>
                    {userSelection?.map(item => (
                      <Tag key={item.id} color='#006ac9' closable onClose={() => handleRemoveUser(item)}>
                        {item?.userRealname || ''}
                      </Tag>
                    ))}
                  </Space>
                </BaseCard>
              </PaneContainer>
            </SplitPane>
          </section>
        </BaseModal>
      </div>
      {contextHolder}
    </>
  )
}
