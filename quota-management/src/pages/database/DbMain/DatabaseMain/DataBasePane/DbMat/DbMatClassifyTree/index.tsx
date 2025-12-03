/*
 * @Author: SHUANG
 * @Date: 2023-10-20 09:59:29
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-25 17:40:05
 * @Description: 定额库(人材机 机械台班 混凝土配合比) 目录
 */

import { useEffect, useState } from 'react'
import { BaseTreeProps, TableToolbarDefine } from 'jd-framework-web/package/components'
import BaseTree from 'jd-framework-web/package/components/BaseTree'

import { ClassifyRjcType, DataBaseProps } from '../../../typings'
import useFormColumns from './useFormColumns'
import useServices from './useServices'
import * as TYPES from './typings'

export default (props: DataBaseProps & { classifyRjcType: ClassifyRjcType }) => {
  /** 接收数据 */
  const { databaseCurrent } = props
  const { setDbMatClassifyCurrent } = props
  const { classifyRjcType: classifyRjcTypeProps } = props
  const { dbChapterDefaultCurrent } = props

  const API = useServices()

  /** 定额库 定额维护权限 */
  const rcjAccess = !!databaseCurrent?.access?.includes('rcj')

  /** 当前目录类型 */
  const [classifyRjcType, setClassifyRjcType] = useState<ClassifyRjcType>(classifyRjcTypeProps)

  /** Tree 的操作按钮 */
  const toolbar: TableToolbarDefine<TYPES.DbMatClassifyItem> = {
    deleted: { onSubmit: async p => API.dbMatClassifyDeleteByIds(p, databaseCurrent) },
    plusLevel: { columns: useFormColumns, onSubmit: API.dbMatClassifySave },
    edit: { columns: useFormColumns, onSubmit: API.dbMatClassifySave },
  }

  /** Tree 的自定义标题渲染 */
  const TreeTitleRender = ({ classifyCode, classifyName }: TYPES.DbMatClassifyItem) => [
    <span key='id'>
      {classifyCode} {classifyName}
    </span>,
  ]

  const deepTraversa: any = (
    dataSource?: TYPES.DbMatClassifyItem[],
    classifyCodeProps?: TYPES.dbMatClassifyCodeType,
    isLeaf?: boolean,
  ) => {
    return dataSource?.map(item => {
      const classifyCode = classifyCodeProps || item?.id
      if (isLeaf) item['classifyCodeParent'] = classifyCode
      if (item?.children?.length) {
        const children = deepTraversa(item?.children, classifyCode, true)
        return { ...item, children }
      }
      return { ...item }
    })
  }

  /** 查询 MAT 树结构并确定数据类型 */
  const handleDbMatClassifyQuery = async (params: FETCH.Req<TYPES.DbMatClassifyQuery>) => {
    const res = await API.dbMatClassifyQueryTreeNodeAll({ ...params })
    const rows = deepTraversa(res?.rows)
    return { ...res, rows }
  }

  /** Tree Mat目录 */
  const generateTree: BaseTreeProps<TYPES.DbMatClassifyItem, TYPES.DbMatClassifyQuery> = {
    defaultCurrent: !dbChapterDefaultCurrent || (dbChapterDefaultCurrent as any),
    titleRender: TreeTitleRender,
    fieldNames: { key: 'id', children: 'children', title: 'classifyName' },
    onCurrent: record => setDbMatClassifyCurrent?.(record),
    service: {
      dataSourceRequest: handleDbMatClassifyQuery,
      params: { dbId: databaseCurrent?.id || '', classifyRjcType },
      manualRequest: !databaseCurrent?.id,
    },
    toolbar: rcjAccess && toolbar,
    defaultExpandAll: true,
    localRetrieval: true,
    checkable: rcjAccess,
  }

  /** 只有改变的时候才查询 */
  useEffect(() => {
    if (classifyRjcTypeProps !== classifyRjcType) {
      setClassifyRjcType(classifyRjcTypeProps)
    }
  }, [classifyRjcTypeProps])

  return <BaseTree {...generateTree} />
}
