/*
 * @Author: LMC
 * @Date: 2024-04-26 09:22:05
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-26 17:40:38
 * @Description: 公共的TextArea 用于编辑
 */

import { Button, Space, Tooltip, message } from 'antd'
import { CSSProperties, useEffect, useState } from 'react'
import { ProFormTextArea } from '@ant-design/pro-components'
import { CloseOutlined, EditOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons'

type Props = {
  /**默认文本 */
  defaultText: string
  /**保存接口 */
  onSave: (record: { value: string }) => Promise<FETCH.Res>
  /**编辑权限 */
  buttonAuth?: boolean
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

export default ({ defaultText, onSave, buttonAuth }: Props) => {
  /** 当前描述 */
  const [value, setValue] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)

  /** 保存当前修改 */
  const handleOnClickSave = async () => {
    setLoading(true)
    const res = await onSave({ value })
    setLoading(false)
    if (res?.status === 'SUCCESS') {
      setDisabled(true)
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
    setValue(defaultText || '')
  }

  /** 点击重置 */
  const handleOnClickReset = () => {
    setValue(defaultText || '')
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
    setValue(defaultText || '')
  }, [defaultText])

  return (
    <section className='resetDescTextAreaSection'>
      {buttonAuth && (
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
