/*
 * @Author: SHUANG
 * @Date: 2023-11-06 10:11:14
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-24 15:08:47
 * @Description: 清单关联定额映射库 目录
 */

import BaseTree from 'jd-framework-web/package/components/BaseTree'
import { TableToolbarDefine } from 'jd-framework-web/package/components'
import StatusText from 'jd-framework-web/package/common/textTag/StatusText'
import { BaseTreeProps } from 'jd-framework-web/package/components/BaseTree/typings'

import { RelationNormProps } from '../typings'
import useFormColumns from './useFormColumns'
import * as TYPES from './typings'
import * as API from './services'
import { Tag } from 'antd'

export default (props: RelationNormProps) => {
  /** 接收数据 */
  const { readonly } = props
  const { relationDirectoryTreeProps } = props
  const { setRelationDirectoryCurrent } = props

  /** Tree 的自定义标题渲染 */
  const titleRender = ({ listNormRelatedName, billStatus }: TYPES.RelationDirectoryItem) => [
    <span key='id'>{listNormRelatedName}</span>,
    <StatusText key='status' type='text' status={billStatus} />,
  ]

  /** Tree 的操作按钮 */
  const toolbar: TableToolbarDefine<TYPES.RelationDirectoryItem> = {
    plus: { columns: useFormColumns, onSubmit: API.relationDirectorySave },
    edit: { columns: useFormColumns, onSubmit: API.relationDirectorySave },
    disable: { onSubmit: API.relationDirectoryUpdateStatusByIds },
    enable: { onSubmit: API.relationDirectoryUpdateStatusByIds },
    deleted: { onSubmit: API.relationDirectoryDeleteByIds },
    sort: { onSubmit: API.relationDirectorySortSwap },
    expand: { auth: true },
  }

  const toolbarReadOnly: TableToolbarDefine = { expand: { auth: true } }

  const toolbarBefore = !!readonly ? (
    <Tag color='blue'>请选择{readonly === 'directory' ? '目录' : '定额'}</Tag>
  ) : (
    <></>
  )

  /** Tree Mat目录 */
  const generateTree: BaseTreeProps<TYPES.RelationDirectoryItem> = {
    fieldNames: { key: 'id', children: 'children', title: 'listNormRelatedName' },
    service: { dataSourceRequest: API.relationDirectoryQueryTreeAll },
    onCurrent: record => setRelationDirectoryCurrent?.(record),
    toolbar: !readonly ? toolbar : toolbarReadOnly,
    toolbarAuthority: true,
    defaultExpandAll: true,
    localRetrieval: true,
    checkable: !readonly,
    toolbarBefore,
    titleRender,
    ...relationDirectoryTreeProps,
  }

  return <BaseTree {...generateTree} />
}
