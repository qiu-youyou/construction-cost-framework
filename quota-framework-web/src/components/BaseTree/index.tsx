import { Empty, Input, Skeleton, Tree } from 'antd'
import { ParamsType } from '@ant-design/pro-provider'
import { Key, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'

/** from components */
import useTreeAction from './useTreeAction'
import useTreeState from './useTreeState'
import BaseCard from '../BaseCard'
import * as TYPES from './typings'
import * as DATA from './data'
import { DownOutlined } from '@ant-design/icons'

/** 当前搜索关键字 匹配数据  Current search keyword  Matching data */
type NavigetType = { search: string; filterData: any[]; index: number }
let navigetToCurent: NavigetType = { search: '', filterData: [], index: 0 }

const { Search } = Input
/** 空树状态 */
const RenderEmpty = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

/** Loading 状态 */
const RenderSkeleton = <Skeleton active paragraph={{ rows: 10 }} />

const BaseTree: <T, Params extends ParamsType = ParamsType, ValueType = 'text'>(
  props: TYPES.BaseTreeProps<T, Params, ValueType>,
) => JSX.Element = prop => {
  const treeRef = useRef<any>()
  const baseTreeSectionChidren = useRef<any>()

  const [treeHeight, setTreeHeight] = useState<number>(0)

  useEffect(() => {
    setTreeHeight(baseTreeSectionChidren.current.clientHeight)
  }, [])

  /** 生成默认配置 */
  const props = {
    switcherIcon: <DownOutlined style={{ color: '#000' }} />,
    ...DATA.defaultProps,
    ...prop,
  }

  const treeState = useTreeState(props, treeRef)
  const treeAction = useTreeAction(props, treeState)

  /** 生成渲染字段配置 默认key 为 id, 嵌套默认为 chilren */
  const fieldNamesProps = !!props.fieldNames ? props.fieldNames : DATA.defaultProps.fieldNames

  const fieldNames = {
    title: fieldNamesProps?.title || '',
    key: fieldNamesProps?.key || '',
    children: 'children',
  }

  /** 节点渲染 */
  const titleRender = (node: any) => {
    return (
      <>
        {!!treeState?.actionsType && (
          <span className='BaseTreeExtraActionShow'>{treeAction.nodePasteButton(node)}</span>
        )}
        {props?.titleRender ? props.titleRender(node) : fieldNames?.title && node[fieldNames.title]}
        <span className='BaseTreeExtraAction'>{treeAction.nodeActions(node)}</span>
      </>
    )
  }

  /** 当前节点发生 */
  const onSelectHandle = (selectedKeys: Key[], info: TYPES.TreeOnRowDefine) => {
    if (!info.selected) return
    const { selectedNodes } = info
    const selectedNode = selectedNodes?.[0]
    /** 寻找父级节点 */
    treeState.setCurrent(selectedNode)
    if (!props?.onClick) return
    props.onClick(selectedKeys, info)
  }

  /** 节点发生勾选 */
  const onCheckHandle = (checkedKeys: any, info: TYPES.TreeOnCheckDefine) => {
    const { checkedNodes } = info
    treeState.setSelections(checkedNodes)
    if (!props?.onCheck) return
    props.onCheck(checkedKeys, info)
  }

  /** ActionRef */
  const initUseImperativeHandle = () => ({
    setTreeCurrent: (record: any) => {
      treeState.setCurrent(record)
    },
    setTreeSelections: (selections: any[]) => {
      treeState.setSelections(selections)
    },
    setTreePasteSelections: (selections: any[], actionsType?: 'copy' | 'mv') => {
      treeState.handleSetActionsRows(selections || [], actionsType || treeState?.actionsType)
    },
    setTreeExpanded: (keys: string[]) => {
      treeAction.expand.setExpandedKeys(keys)
    },
    reload: treeState.refresh,
  })

  /** 搜索到定位到某个节点 */
  const navigetToCurentBySearch = (search: string) => {
    /** 如果与上次检索关键字相同 根据已筛选的数据做定位
     * 如果 已经跳转到了最后一行 回到第一行 否则继续跳转到下一行 */
    if (search === navigetToCurent.search) {
      const { index, filterData } = navigetToCurent
      if (index === filterData.length - 1) {
        navigetToCurent.index = 0
        treeState.setCurrent(filterData[navigetToCurent.index])

        treeRef?.current?.scrollTo?.({
          key: filterData[navigetToCurent.index][fieldNames.key],
          align: 'top',
          offset: 20,
        })
        return
      }
      navigetToCurent.index++
      treeState.setCurrent(filterData[navigetToCurent.index])

      treeRef?.current?.scrollTo?.({
        key: filterData[navigetToCurent.index][fieldNames.key],
        align: 'top',
        offset: 20,
      })
      return
    }
    const filterData: any[] = treeState.dataSourceConcise.filter((item: any) =>
      item?.[fieldNames.title]?.includes(search),
    )
    if (!filterData?.length) return
    const index = 0
    navigetToCurent = { search, filterData, index }
    treeState.setCurrent(filterData[0])

    treeRef?.current?.scrollTo?.({
      key: filterData[0][fieldNames.key],
      align: 'top',
      offset: 20,
    })
  }

  useImperativeHandle(prop?.actionRef, initUseImperativeHandle)

  const titleRenderConfig = !!props?.loadData ? {} : { titleRender }

  /** render */
  const TreeRender = (
    <>
      {!!props?.localRetrieval && (
        <>
          {!!props?.localRetrievalPrefix && (
            <span style={{ margin: '4px 0', display: 'inline-block' }}>{treeAction.expand.triggerIcon}</span>
          )}
          <Search
            placeholder='搜索'
            style={{
              width: !!props?.localRetrievalPrefix ? 'calc(100% - 28px)' : '100%',
              margin: !!props?.localRetrievalPrefix ? '3px 0 0 3px' : '3px 0',
            }}
            onSearch={v => {
              if (v.trim() === '') return
              navigetToCurentBySearch(v.trim())
            }}
          />
        </>
      )}
      <Tree
        ref={treeRef}
        showLine={props.showLine}
        checkable={props.checkable}
        fieldNames={{ ...fieldNames }}
        switcherIcon={props.switcherIcon}
        defaultExpandAll={props.defaultExpandAll}
        onExpand={keys => {
          treeAction.expand.setExpandedKeys(keys)
        }}
        checkedKeys={treeState.selections?.map((item: { [index: string]: any }) => item?.[fieldNames?.key])}
        selectedKeys={[treeState.current?.[fieldNames?.key]]}
        expandedKeys={treeAction.expand.expandedKeys}
        autoExpandParent={props?.autoExpandParent}
        checkStrictly={props?.checkStrictly}
        treeData={treeState.dataSource}
        loadData={props?.loadData}
        onSelect={onSelectHandle}
        onCheck={onCheckHandle}
        {...titleRenderConfig}
        // height={props.height}
        height={props.height || (!!props?.localRetrieval ? treeHeight - 33 : treeHeight)}
        blockNode={true}
        showIcon={true}
        virtual={true}
      />
    </>
  )

  /** Tree 渲染规则为 Loading 状态下为骨架屏幕，空数据为空数据 */
  return (
    <section className='base-tree-section'>
      <BaseCard
        headerBordered={false}
        extraCollapsed={false}
        extraFullScreen={false}
        title={treeAction.headerBarActions}
        extra={treeAction.toolbarActions}
        noHeader={props.noHeader}
      >
        <div ref={baseTreeSectionChidren} className='base-tree-section-chidren'>
          {treeState.loading ? RenderSkeleton : treeState.dataSource?.length ? TreeRender : RenderEmpty}
        </div>
      </BaseCard>
    </section>
  )
}

export default BaseTree
