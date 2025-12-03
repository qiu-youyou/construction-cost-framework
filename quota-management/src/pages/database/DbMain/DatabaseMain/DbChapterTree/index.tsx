/*
 * @Author: SHUANG
 * @Date: 2023-10-16 11:24:20
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-25 17:15:23
 * @Description: 定额库定额册
 */
import BaseTree from 'jd-framework-web/package/components/BaseTree'
import { BaseTreeProps, TableToolbarDefine } from 'jd-framework-web/package/components'

import { handleDbChapterDelete, handleDbChapterPlusLevel } from './fetch'
import { dbChapterQueryTreeNodeAll } from './services'
import useFormColumns from './useFormColumns'
import { DataBaseProps } from '../typings'
import * as TYPES from './typings'

export default (props: DataBaseProps & TYPES.PropsDbChapterTree) => {
  /** 接收数据 */
  const { databaseCurrent } = props
  const { checkable, checkStrictly } = props
  const { dbChapterCurrent, setDbChapterCurrent } = props
  const { dbChapterCheckedKeys, setDbChapterCheckedKeys } = props
  const { dbChapterHalfCheckedKeys, setDbChapterHalfCheckedKeys } = props
  const { dbChapterDataSource, setDbChapterDataSource } = props
  const { dbChapterDefaultCurrent } = props

  /** 定额库 章节 权限 */
  const chapterAccess = !!databaseCurrent?.access?.includes('chapter')

  /** Tree 的操作按钮 */
  const toolbar: TableToolbarDefine<TYPES.DbChapterSaveParams> = {
    plusLevel: {
      onSubmit: (p, v1, v2, level) => handleDbChapterPlusLevel(p, databaseCurrent, dbChapterCurrent, level),
      columns: useFormColumns,
    },
    edit: {
      onSubmit: (p, v1, v2, level) => handleDbChapterPlusLevel(p, databaseCurrent, dbChapterCurrent, level),
      columns: useFormColumns,
    },
    deleted: { onSubmit: p => handleDbChapterDelete(p, databaseCurrent) },
  }

  /** Tree 的自定义标题渲染 */
  const TreeTitleRender = ({ chapterCode, chapterName }: TYPES.DbChapterItem) => [
    <span key='id'>
      {chapterCode} {chapterName}
    </span>,
  ]

  /** 获取 章节数据 */
  const fetchDbChapterQueryTreeNodeAll = async (params: FETCH.Req<TYPES.DbChapterQuery>) => {
    const res = await dbChapterQueryTreeNodeAll(params)
    setDbChapterDataSource?.(res?.rows)
    return res
  }

  /** Tree 手册 */
  const generateTree: BaseTreeProps<TYPES.DbChapterItem, TYPES.DbChapterQuery> = {
    defaultCurrent: !dbChapterDefaultCurrent || (dbChapterDefaultCurrent as any),
    fieldNames: { key: 'id', children: 'children', title: 'chapterName' },
    onCurrent: record => setDbChapterCurrent?.(record),
    service: {
      dataSourceRequest: fetchDbChapterQueryTreeNodeAll,
      params: { dbId: databaseCurrent?.id || '' },
      manualRequest: !databaseCurrent?.id,
    },
    onCheck: (keys: any, info: any) => {
      setDbChapterCheckedKeys?.(keys)
      setDbChapterHalfCheckedKeys?.(info?.halfCheckedKeys)
    },
    checkable: checkable || chapterAccess,
    checkStrictly: !props?.checkStrictly,
    toolbar: chapterAccess && toolbar,
    titleRender: TreeTitleRender,
    defaultExpandAll: true,
    localRetrieval: true,
  }

  return <BaseTree {...generateTree} />
}
