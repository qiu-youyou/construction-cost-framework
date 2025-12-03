/*
 * @Author: SHUANG
 * @Date: 2023-11-15 10:37:08
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-25 10:17:26
 * @Description: 标准综合单价库 - 目录
 */

import BaseTree from 'jd-framework-web/package/components/BaseTree'
import StatusText from 'jd-framework-web/package/common/textTag/StatusText'
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton'
import { BaseTreeProps, TableToolbarDefine } from 'jd-framework-web/package/components'

import { StdUnitPriceProps } from '../typings'
import useFormColumns from './useFormColumns'
import * as TYPES from './typings'
import * as API from './services'

export default (props: StdUnitPriceProps) => {
  const { auth } = useAuthButton()

  /** 接收数据 */
  const { setUnitPriceDirectoryCurrent } = props

  /** Tree 的自定义标题渲染 */
  const titleRender = ({ unitPriceDbCode, unitPriceDbName, billStatus }: TYPES.UnitPriceDirectoryItem) => [
    <span key='id'>
      {unitPriceDbCode} {unitPriceDbName}
    </span>,
    <StatusText key='status' type='text' status={billStatus} />,
  ]

  /** Tree 的操作按钮 */
  const idsKey = 'id'
  const toolbar: TableToolbarDefine<TYPES.UnitPriceDirectoryItem> = {
    plus: { authKey: 'directory-plus', columns: useFormColumns, onSubmit: API.unitPriceDirectorySave },
    edit: { authKey: 'directory-edit', columns: useFormColumns, onSubmit: API.unitPriceDirectorySave },
    disable: { authKey: 'directory-disable', onSubmit: API.unitPriceDirectoryUpdateStatusByIds, idsKey },
    enable: { authKey: 'directory-enable', onSubmit: API.unitPriceDirectoryUpdateStatusByIds, idsKey },
    deleted: { authKey: 'directory-delete', onSubmit: API.unitPriceDirectoryDeleteByIds, idsKey },
    sort: { authKey: 'directory-sort', onSubmit: API.unitPriceDirectorySortSwap },
  }

  /** 获取目录数据 */
  const fetchUnitPriceDirectoryQueryTreeAll = async () => {
    const res = await API.unitPriceDirectoryQueryTreeAll()
    /** 递归处理每一条数据 增加一个属性 */
    const handleData = (data: TYPES.UnitPriceDirectoryItem[]) => {
      data.forEach((item, index) => {
        item.customId = `${item?.id}${item?.listNormDirectoryId}`
        if (item?.children) {
          handleData(item?.children)
        }
      })
    }
    handleData(res?.rows)
    return res
  }

  /** Tree Mat目录 */
  const generateTree: BaseTreeProps<TYPES.UnitPriceDirectoryItem> = {
    fieldNames: { key: 'customId', children: 'children', title: 'unitPriceDbName' },
    service: { dataSourceRequest: fetchUnitPriceDirectoryQueryTreeAll },
    onCurrent: record => setUnitPriceDirectoryCurrent?.(record),
    checkable: auth('directory-delete'),
    toolbarAuthority: true,
    defaultExpandAll: true,
    localRetrieval: true,
    titleRender,
    toolbar,
  }

  return <BaseTree {...generateTree} />
}
