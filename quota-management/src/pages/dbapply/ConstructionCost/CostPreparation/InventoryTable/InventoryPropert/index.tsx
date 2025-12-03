/*
 * @Author: SHUANG
 * @Date: 2024-01-11 14:17:27
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-25 17:53:34
 * @Description: 工程造价-工程量清单编制-分部分项清单表 项目特征
 */

import { Button } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton'
import { BaseTableProps, TableActionType, TableToolbarDefine } from 'jd-framework-web/package/components'
import BaseTable from 'jd-framework-web/package/components/BaseTable'

import useTableColumns from './useTableColumns'
import useFormColumns from './useFormColumns'
import { InventoryItem } from '../typings'
import * as TYPES from './typings'
import * as API from './services'

type Props = {
  /** 分部分项清单 当前选中 */
  inventoryActionCurrent?: InventoryItem
  /** 分部分项清单表 REF */
  inventoryTableRef?: TableActionType
}

export default (props: Props) => {
  /** PROPS 分部分项清单 */
  const { inventoryTableRef } = props
  const { inventoryActionCurrent } = props

  /** 当前选中 分部分项清单 */
  const stageId = inventoryActionCurrent?.stageId || ''
  const projectId = inventoryActionCurrent?.projectId || ''
  const inventoryPriceId = inventoryActionCurrent?.id || ''

  const inventoryActionCurrentParams = { stageId, projectId, inventoryPriceId }

  /** 设置清单特征 */
  const fetchInventoryPropertSave = async (params: TYPES.InventoryPropertQuery) => {
    const res = await API.inventoryPropertSave(params)
    if (res?.status == 'SUCCESS') {
      inventoryTableRef?.current?.reload()
    }
    return res
  }

  /** 编辑清单特征 */
  const fetchInventoryPropertUpdateRow = async (params: FETCH.CellEditReq) => {
    const res = await API.inventoryPropertUpdateRow({ ...inventoryActionCurrentParams, ...params })
    if (res?.status == 'SUCCESS') {
      inventoryTableRef?.current?.reload()
    }
    return res
  }

  /** 清单项目特征表 */
  const generateTable: BaseTableProps<TYPES.InventoryPropertItem, TYPES.InventoryPropertQuery> = {
    persistenceKey: 'PAGES_DBAPPLY_COSTPREPARATION_INVENTORYTABLE_ITEMPROPERTIES',
    toolbar: {
      plus: { triggerType: 'submit', onSubmit: fetchInventoryPropertSave },
      deleted: {
        onSubmit: async p => {
          const res = await API.inventoryPropertDeleteByIds(p)
          if (res?.status === 'SUCCESS') {
            inventoryTableRef?.current?.reload?.()
          }
          return res
        },
      },
      editMore: {
        current: {
          ...inventoryActionCurrent,
          txt: inventoryActionCurrent?.inventoryProperty?.replace(/[;;]/g, '$&\r\n'),
        },
        schemaFormProps: { wrapperCol: { span: 'auto' }, grid: true },
        modalProps: { width: 480, style: { top: 220, left: '8vw' } },
        onSubmit: fetchInventoryPropertSave,
        columns: useFormColumns,
        buttonText: '设置清单特征',
      },
    },
    service: {
      dataSourceRequest: API.inventoryPropertQueryPageInfo,
      cellEditSaveRequest: fetchInventoryPropertUpdateRow,
      params: inventoryActionCurrentParams,
    },
    columns: useTableColumns,
    rowSelection: false,
    cellEditable: true,
    search: false,
  }

  /** 弹窗属性 */
  const modalProps = { defaultFullScreen: false, width: 700 }

  /** 触发按钮 */
  const triggerButton = (
    <Button className='BorderButtonBlue' icon={<FileTextOutlined />}>
      项目特征
    </Button>
  )

  const tableRender = (
    <section style={{ height: 400 }}>
      <BaseTable {...generateTable} />
    </section>
  )

  return (
    <ModalButton
      determineActionCurrent={!inventoryPriceId}
      trigger={triggerButton}
      modalProps={modalProps}
      modalTitle='项目特征'
      render={tableRender}
    />
  )
}
