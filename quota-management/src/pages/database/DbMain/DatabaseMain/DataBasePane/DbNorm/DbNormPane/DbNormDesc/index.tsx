/*
 * @Author: SHUANG
 * @Date: 2023-10-19 17:28:58
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-26 09:19:03
 * @Description: 注，工作内容，适用范围
 */
import { Button, Space, Tooltip, message } from 'antd'
import { CSSProperties, useEffect, useState } from 'react'
import { ProFormTextArea } from '@ant-design/pro-components'
import { CloseOutlined, EditOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons'

import { DbNormExtItem, DbNormExtItemKey, DbNormItem } from '../../DbNormTable/typings'
import useServices from '../../DbNormTable/useServices'
import { DatabaseDbItem } from '../../../../typings'
import useFetch from './useFetch'

/**
 * @name dbNormExt 描述信息
 * @name dbNormExtKey 当前操作面板
 * @name queryDbNormExt 刷新当前描述
 */
type Props = {
  dbNormExt?: DbNormExtItem
  dbNormExtKey?: DbNormExtItemKey
  queryDbNormExt?: () => Promise<void>
  dbNormCurrent?: DbNormItem
  databaseCurrent?: DatabaseDbItem
  /** 定额明细扩展表使用到的接口 */
  dbNormDescUseServices?: () => any
}

const actionBtnStyle: CSSProperties = {
  background: '#f5f5f5',
  position: 'absolute',
  zIndex: 1,
  right: 6,
  left: 6,
  top: 5,
}

const iconStyle: CSSProperties = { fontSize: 14, transform: 'translateY(1px)' }

export default (props: Props) => {
  const { dbNormDescUseServices } = props
  const API = dbNormDescUseServices?.() || useServices()
  const FET = useFetch({ API })

  /** 接收数据 */
  const { dbNormExt, dbNormExtKey } = props

  /** 当前定额明细 当前定额库 */
  const { dbNormCurrent, databaseCurrent } = props

  /** 当前描述 */
  const [value, setValue] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)

  /** 定额库 定额维护权限 */
  const normAccess = !!databaseCurrent?.access?.includes('norm')

  /** 保存当前修改 */
  const handleOnClickSave = async () => {
    if (!dbNormExtKey) return
    setLoading(true)
    const res = await FET.handleDbNormExtSave(dbNormExtKey, value, dbNormCurrent)
    setLoading(false)
    if (res?.status === 'SUCCESS') {
      setDisabled(true)
      props?.queryDbNormExt?.()
      message.success(res?.message || '操作成功')
    }
  }

  /** 点击编辑 */
  const handleOnClickEdit = () => {
    setDisabled(false)
  }

  /** 点击取消 */
  const handleOnClickCancel = () => {
    setDisabled(true)
    setValue(!!dbNormExtKey ? dbNormExt?.[dbNormExtKey] || '' : ``)
  }

  /** 点击重置 */
  const handleOnClickReset = () => {
    setValue(!!dbNormExtKey ? dbNormExt?.[dbNormExtKey] || '' : ``)
  }

  /** 操作按钮 */
  const ActionSaveButton = (
    <Space size={1}>
      <Tooltip title='取消'>
        <Button type='link' onClick={handleOnClickCancel}>
          <CloseOutlined style={iconStyle} />
        </Button>
      </Tooltip>

      <Tooltip title='重置'>
        <Button type='link' onClick={handleOnClickReset}>
          <UndoOutlined style={iconStyle} />
        </Button>
      </Tooltip>

      <Tooltip title='保存'>
        <Button type='link' onClick={handleOnClickSave} loading={loading}>
          <SaveOutlined style={iconStyle} />
        </Button>
      </Tooltip>
    </Space>
  )

  const ActionEditButton = (
    <Tooltip title='编辑'>
      <Button type='link' onClick={handleOnClickEdit}>
        <EditOutlined style={iconStyle} />
      </Button>
    </Tooltip>
  )

  const actionSaveStyle: CSSProperties = !disabled
    ? { background: '#fff', boxShadow: '0 2px 5px rgb(43 60 75 / 13%)' }
    : {}

  /** 定额改变重新获取 */
  useEffect(() => {
    setValue(!!dbNormExtKey ? dbNormExt?.[dbNormExtKey] || '' : ``)
  }, [dbNormExt, dbNormExtKey])

  return (
    <section className='resetDescTextAreaSection'>
      {normAccess && !!dbNormCurrent?.id && (
        <div style={{ ...actionBtnStyle, ...actionSaveStyle }}>
          <>{disabled ? ActionEditButton : ActionSaveButton}</>
        </div>
      )}
      <ProFormTextArea
        placeholder=' '
        fieldProps={{
          onChange: e => setValue(e.target.value),
          className: 'resetDescTextArea',
          showCount: true,
          autoSize: true,
          value,
        }}
        disabled={disabled}
      />
    </section>
  )
}
