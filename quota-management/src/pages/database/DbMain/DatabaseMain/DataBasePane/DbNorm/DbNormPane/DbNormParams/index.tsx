/*
 * @Author: SHUANG
 * @Date: 2023-10-20 09:06:57
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-25 16:16:06
 * @Description: 企业定额库维护 - 定额参数
 */
import BaseTable from 'jd-framework-web/package/components/BaseTable'
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components'

import { DbNormProps, PropsDbNormInfo } from '../../typings'
import useTableColumns from './useTableColumns'

import useServices from './useServices'
import * as TYPES from './typings'

export default (props: DbNormProps & PropsDbNormInfo) => {
  /** 定额明细表 */
  const { dbNormTableRef } = props
  /** 当前定额明细 当前定额库 */
  const { dbNormCurrent, databaseCurrent } = props

  const { dbNormParamsTableProps, dbNormParamsUseServices } = props

  const API = dbNormParamsUseServices?.() || useServices()

  /** 库ID 章节ID 定额明细ID */
  const dbId = dbNormCurrent?.dbId || ''
  const normId = dbNormCurrent?.id || ''
  const chapterId = dbNormCurrent?.chapterId || ''

  /** 定额库 定额维护权限 */
  const normAccess = !!databaseCurrent?.access?.includes('norm')

  /** 删除方法 重新获取定额明细 */
  const fetchDbNormParamsDeleteByIds = async (data: FETCH.UpStatus) => {
    const res = await API.dbNormParamsDeleteByIds(data)
    if (res?.status === 'SUCCESS') {
      dbNormTableRef?.current?.reload?.()
    }
    return res
  }

  /** 行编辑方法 重新获取定额明细 */
  const fetchDbNormParamsUpdateRow = async (data: FETCH.CellEditReq, params?: TYPES.DbNormParamsQuery) => {
    const res = await API.dbNormParamsUpdateRow(data, params)
    if (res?.status === 'SUCCESS') {
      dbNormTableRef?.current?.reload?.()
    }
    return res
  }

  /** 操作栏 */
  const toolbar: TableToolbarDefine<TYPES.DbNormParamsQuery> = {
    plusLine: { disabled: !normId, onSubmit: API.dbNormParamsSaveBlankRow },
    deleted: { onSubmit: async p => fetchDbNormParamsDeleteByIds(p), disabled: !normId },
  }

  /** 定额列表 */
  const generateTable: BaseTableProps<TYPES.DbNormParamsItem, TYPES.DbNormParamsQuery> = {
    persistenceKey: 'PAGESDATABASEDBNORMPARAMSTABLE',
    columns: dbNormParamsTableProps?.columns || useTableColumns,
    service: props?.dbNormParamsServiceConfig || {
      cellEditSaveRequest: async (d, p) => fetchDbNormParamsUpdateRow(d, p),
      dataSourceRequest: API.dbNormParamsQueryPagenfo,
      params: { dbId, chapterId, normId },
      manualRequest: !normId,
      ...dbNormParamsTableProps?.service,
    },
    rowSelection: normAccess && { columnWidth: 30 },
    toolbar: normAccess && toolbar,
    cellEditable: normAccess,
    virtual: false,
    search: false,
    minHeight: 50,
  }

  return <BaseTable {...generateTable} />
}
