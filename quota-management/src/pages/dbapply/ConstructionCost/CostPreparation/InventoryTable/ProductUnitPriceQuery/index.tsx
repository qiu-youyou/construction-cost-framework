/*
 * @Author: SHUANG
 * @Date: 2024-03-28 16:50:48
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-24 11:37:07
 * @Description: 工程造价-工程量清单编制-分部分项清单表 查询项目综合单价
 */
import { useState } from 'react'
import { Button, Modal, Tag, message } from 'antd'
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { TableActionType } from 'jd-framework-web/package/components'
import BaseModal from 'jd-framework-web/package/components/BaseModal'

import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings'
import { ProductItem } from '@/pages/dbapply/Product/Product/typings'
import { InventoryItem, InventoryQuery } from '../typings'
import ProductUnitPrice from '../../../ProductUnitPrice'
import { inventoryUpdateRow } from '../services'

type Props = {
  /** 当前产品 */
  productActionCurrent?: ProductItem
  /** 分部分项清单 当前选中 */
  inventoryActionCurrent?: InventoryItem
  /** 分部分项清单表 REF */
  inventoryTableRef?: TableActionType
  /** 关联参数 */
  serviceParams?: InventoryQuery
}

export default (props: Props) => {
  /** 当前操作 清单 */
  const { serviceParams } = props
  const { inventoryTableRef } = props

  const { inventoryActionCurrent } = props

  const [modal, contextHolder] = Modal.useModal()

  /** 综合单价明细 当前选中 操作行 */
  const [unitPriceDetailActionCurrent, setUnitPriceDetailActionCurrent] = useState<UnitPriceDetailItem>()

  /** 提交方法 */
  const onSubmit: any = async (current?: UnitPriceDetailItem) => {
    if (!serviceParams) return
    const filedName = 'unitPriceCode'
    const newValue = current?.unitPriceCode || ''
    const id = inventoryActionCurrent?.id || ''
    const parmas: FETCH.CellEditReq = { filedName, newValue, id }
    const res = await inventoryUpdateRow(parmas, serviceParams)
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || `操作成功`)
      inventoryTableRef?.current?.reload?.()
    }
  }

  /** 弹窗触发保存 */
  const handleOnSubmit: any = async () => {
    if (!unitPriceDetailActionCurrent) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请选择一项数据！' }
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' })
      return
    }
    onSubmit?.(unitPriceDetailActionCurrent)
    return
  }

  /** 弹窗属性 */
  const triggerControl = async () => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] }
    if (!inventoryActionCurrent) {
      modal.warning({ title: '继续操作', content: `请选择清单，进行操作！` })
      return errorReturn
    }
    return { ...errorReturn, status: 'SUCCESS' }
  }

  /**关闭弹窗刷新分布分项清单 REF */
  const afterClose = () => {
    inventoryTableRef?.current?.reload?.()
  }

  /** 触发按钮 */
  const triggerButton = (
    <Button className='BorderButtonPrimary' icon={<SearchOutlined />}>
      查询综合单价
    </Button>
  )

  return (
    <>
      <BaseModal
        trigger={triggerButton}
        afterClose={afterClose}
        onSubmit={handleOnSubmit}
        triggerControl={triggerControl}
        title='查询项目综合单价-设置单价编号'
        style={{ top: 140, left: '6vw' }}
        width={1100}
        mask={false}
      >
        <section style={{ height: 530 }}>
          <ProductUnitPrice
            cardProps={{ title: <Tag color='blue'>可以双击行快速设置当前清单编码</Tag> }}
            unitPriceDetailTableProps={{ onDoubleClick: record => onSubmit(record) }}
            setUnitPriceDetailActionCurrent={setUnitPriceDetailActionCurrent}
            unitPriceDetailActionCurrent={unitPriceDetailActionCurrent}
            productActionCurrent={props?.productActionCurrent}
          />
        </section>
      </BaseModal>
      {contextHolder}
    </>
  )
}
