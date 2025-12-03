/*
 * @Author: SHUANG
 * @Date: 2023-11-16 15:15:56
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-26 14:55:09
 * @Description: 定额信息表
 */
import { Button } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import DbNormPane from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane'
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components'
import { UnitPriceNormItem } from '../typings'
import * as TYPES from './typings'
import * as API from './services'
import { useRef } from 'react'

type Props = { unitPriceNormActionCurrent?: UnitPriceNormItem }

export default (props: Props) => {
  const { unitPriceNormActionCurrent } = props
  const dbNormCurrent: any = unitPriceNormActionCurrent
  const databaseCurrent: any = { id: unitPriceNormActionCurrent?.dbId }

  const dbNormMatContentTableRef = useRef<TableActionType>()

  /** 清单定额 当前定额ID */
  const unitPriceNormId = unitPriceNormActionCurrent?.id || ''
  /** 清单定额 当前清单明细 ID */
  const unitPriceId = unitPriceNormActionCurrent?.unitPriceId || ''
  /** 清单定额 当前综合单价目录 ID */
  const unitPriceDbId = unitPriceNormActionCurrent?.unitPriceDbId || ''

  /** 引用 定额信息明细 人材机含量表 重写 SERVICE */
  const dbNormMatContentServiceConfig: BaseTableProps<
    TYPES.UnitPriceNormMatItem,
    TYPES.UnitPriceNormMatQuery
  >['service'] = {
    dataSourceRequest: API.unitPriceMatQueryTreeAll,
    cellEditSaveRequest: async params => {
      const id = params?.id || ''
      const filedName = params?.filedName || ''
      const newValue = params?.newValue || ''
      const finalParams: any = { unitPriceId, unitPriceDbId, unitPriceNormId, id, filedName, newValue }
      const res = await API.unitPriceMatUpdateRow(finalParams)
      if (res?.status === 'SUCCESS') {
        dbNormMatContentTableRef?.current?.reload?.()
      }
      return res
    },
    params: { unitPriceId, unitPriceDbId, unitPriceNormId },
    manualRequest: !unitPriceNormId,
  }

  /** 定额信息明细 定额对应参数 重写 SERVICE */
  const dbNormParamsServiceConfig: BaseTableProps<
    TYPES.UnitPriceNormParamsItem,
    TYPES.UnitPriceNormMatQuery
  >['service'] = {
    dataSourceRequest: API.unitPriceParamsQueryPageInfo,
    params: { unitPriceId, unitPriceDbId, unitPriceNormId },
    manualRequest: !unitPriceNormId,
  }

  /** 定额信息明细 查看人材料机配合比 重写 SERVICE */
  const mixProportionServiceConfig: BaseTableProps['service'] = {
    dataSourceRequest: API.unitPriceMatQueryTreeAll,
    params: { unitPriceId, unitPriceDbId, unitPriceNormId },
    manualRequest: !unitPriceNormId,
  }

  /** 定额明细信息 PANE */
  const DbNormPaneRender = (
    <section style={{ height: 520 }}>
      <DbNormPane
        dbNormMatContentServiceConfig={dbNormMatContentServiceConfig}
        mixProportionServiceConfig={mixProportionServiceConfig}
        dbNormParamsServiceConfig={dbNormParamsServiceConfig}
        dbNormMatContentTableRef={dbNormMatContentTableRef}
        databaseCurrent={databaseCurrent}
        dbNormCurrent={dbNormCurrent}
      />
    </section>
  )

  /** 弹窗属性 */
  const modalProps = { defaultFullScreen: false, width: 1150 }

  /** 触发按钮 */
  const triggerBtn = (
    <Button className='EditButton'>
      <EyeOutlined /> 查看定额信息
    </Button>
  )

  return (
    <DbNormPane
      dbNormMatContentServiceConfig={dbNormMatContentServiceConfig}
      mixProportionServiceConfig={mixProportionServiceConfig}
      dbNormParamsServiceConfig={dbNormParamsServiceConfig}
      dbNormMatContentTableRef={dbNormMatContentTableRef}
      databaseCurrent={databaseCurrent}
      dbNormCurrent={dbNormCurrent}
    />
  )
  // (
  // <ModalButton
  //   modalTitle='查看定额信息'
  //   determineActionCurrent={!unitPriceNormId}
  //   render={DbNormPaneRender}
  //   modalProps={modalProps}
  //   trigger={triggerBtn}
  // />
  // )
}
