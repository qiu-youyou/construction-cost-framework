/* eslint-disable no-case-declarations */
import { isNumber, throttle } from 'lodash'
import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'

interface InitialStateProps {
  rowHeight: number
  curScrollTop: number
  scrollHeight: number
  tableScrollY: number
}
const initialState: InitialStateProps = {
  // 行高度
  rowHeight: 27,
  // 当前的scrollTop
  curScrollTop: 0,
  // 可滚动区域的高度
  scrollHeight: 0,
  // scrollY值
  tableScrollY: 0,
}
function reducer (state: InitialStateProps, action: { type: string; [x: string]: any }) {
  switch (action.type) {
    // 改变trs 即 改变渲染的列表trs
    case 'changeTrs':
      // 获取值
      let curScrollTop = action.curScrollTop
      let scrollHeight = action.scrollHeight
      const tableScrollY = action.tableScrollY

      if (scrollHeight <= 0) {
        scrollHeight = 0
      }

      if (state.scrollHeight !== 0) {
        if (tableScrollY === state.tableScrollY) {
          scrollHeight = state.scrollHeight
        }
      }

      if (state.scrollHeight && curScrollTop > state.scrollHeight) {
        curScrollTop = state.scrollHeight
      }

      return {
        ...state,
        curScrollTop,
        scrollHeight,
        tableScrollY,
      }

    case 'reset':
      return {
        ...state,
        curScrollTop: 0,
        scrollHeight: 0,
      }
    default:
      throw new Error()
  }
}

interface ScrollContextProps {
  dispatch: undefined | ((arg: { type: string; [x: string]: any }) => void)
  renderLen: number
  start: number
  offsetStart: number
  rowHeight: number
  totalLen: number
}
const ScrollContext = createContext<ScrollContextProps>({
  dispatch: undefined,
  renderLen: 1,
  start: 0,
  offsetStart: 0,
  rowHeight: 40,
  totalLen: 0,
})

function VWrapper (props: any): JSX.Element {
  const { children, ...restProps } = props

  const { renderLen, start, offsetStart } = useContext(ScrollContext)

  const contents = children[1]

  let tempNode = null
  if (Array.isArray(contents) && contents.length) {
    tempNode = [
      children[0],
      contents.slice(start, start + renderLen).map(item => {
        if (Array.isArray(item)) {
          // 兼容antd v4.3.5 --- rc-table 7.8.1及以下
          return item[0]
        } else {
          // 处理antd ^v4.4.0  --- rc-table ^7.8.2
          return item
        }
      }),
    ]
  } else {
    tempNode = children
  }

  return (
    <tbody {...restProps} style={{ transform: `translateY(-${offsetStart}px)` }}>
      {tempNode}
    </tbody>
  )
}
let tableScrollY = 0
// 获取树结构长度的方法
function getTreeLength (data: any) {
  var length = 1 // 计算当前节点
  if (data?.children?.length > 0) {
    data?.children?.forEach((ele: any) => {
      length += getTreeLength(ele) //递归计算每个子节点的长度
    })
  }
  return length
}
function getAllTreeLengths (tree: any[]) {
  var lengths = 0
  tree?.forEach((ele: any) => {
    lengths += getTreeLength(ele)
  })

  return lengths
}

function VTable (props: any): JSX.Element {
  const { style, children, ...rest } = props
  const { width, ...restStyle } = style

  const [state, dispatch] = useReducer(reducer, initialState)

  const wrapTableRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)

  // 数据的总条数
  const [totalLen, setTotalLen] = useState<number>(getAllTreeLengths(children[1]?.props?.data) || 0)

  useEffect(() => {
    if (isNumber(getAllTreeLengths(children[1]?.props?.data))) {
      setTotalLen(getAllTreeLengths(children[1]?.props?.data))
    }
  }, [children])

  // table总高度
  const tableHeight = useMemo<string | number>(() => {
    let temp: string | number = 'auto'
    if (state.rowHeight && totalLen) {
      temp = state.rowHeight * totalLen + 10
    }
    return temp
  }, [state.rowHeight, totalLen])

  // table的scrollY值
  let gettableScrollY = (wrapTableRef.current?.parentNode as HTMLElement)?.offsetHeight
  if (gettableScrollY != 0) tableScrollY = gettableScrollY

  if (isNumber(tableHeight) && tableHeight < tableScrollY) {
    tableScrollY = tableHeight
  }

  // 处理tableScrollY <= 0的情况
  if (tableScrollY <= 0) {
    tableScrollY = 0
  }

  // 渲染的条数
  const renderLen = useMemo<number>(() => {
    let temp = 1
    if (state.rowHeight && totalLen && tableScrollY) {
      if (tableScrollY <= 0) {
        temp = 0
      } else {
        const tempRenderLen = ((tableScrollY / state.rowHeight) | 0) + 1 + 2
        temp = tempRenderLen > totalLen ? totalLen : tempRenderLen
      }
    }
    return temp
  }, [state.rowHeight, totalLen, tableScrollY])

  // 渲染中的第一条
  let start = state.rowHeight ? (state.curScrollTop / state.rowHeight) | 0 : 0
  // 偏移量
  let offsetStart = state.rowHeight ? state.curScrollTop % state.rowHeight : 0

  // 用来优化向上滚动出现的空白
  if (state.curScrollTop && state.rowHeight && state.curScrollTop > state.rowHeight) {
    if (start > totalLen - renderLen) {
      // 可能以后会做点操作
      offsetStart = 0
    } else if (start > 1) {
      start = start - 1
      offsetStart += state.rowHeight
    }
  } else {
    start = 0
  }

  useEffect(() => {
    // totalLen变化, 那么搜索条件一定变化, 数据也一定变化.
    const parentNode = wrapTableRef.current?.parentNode as HTMLElement
    if (parentNode) {
      parentNode.scrollTop = parentNode.scrollTop - 1
      // parentNode.scrollTop = 0;
    }
    dispatch({ type: 'reset' })
  }, [totalLen])

  useEffect(() => {
    const throttleScroll = throttle(e => {
      const scrollTop: number = e?.target?.scrollTop ?? 0
      if (scrollTop !== state.curScrollTop) {
        const scrollHeight = e.target.scrollHeight - tableScrollY
        dispatch({
          type: 'changeTrs',
          curScrollTop: scrollTop,
          scrollHeight,
          tableScrollY,
        })
      }
    }, 60)

    const ref = wrapTableRef?.current?.parentNode as HTMLElement

    if (ref) {
      ref.addEventListener('scroll', throttleScroll)
    }

    return () => {
      ref.removeEventListener('scroll', throttleScroll)
    }
  }, [wrapTableRef, state.curScrollTop, tableScrollY, state.scrollHeight])

  return (
    <div
      className='virtuallist'
      ref={wrapTableRef}
      style={{
        width: '100%',
        position: 'relative',
        height: tableHeight,
        boxSizing: 'border-box',
        paddingTop: state.curScrollTop,
      }}
    >
      <ScrollContext.Provider
        value={{
          dispatch,
          rowHeight: state.rowHeight,
          start,
          offsetStart,
          renderLen,
          totalLen,
        }}
      >
        <table
          {...rest}
          ref={tableRef}
          style={{
            ...restStyle,
            width,
            position: 'relative',
          }}
        >
          {children}
        </table>
      </ScrollContext.Provider>
    </div>
  )
}

export default function useVirtualTable (props: { total?: number }): any {
  return {
    table: VTable,
    body: {
      wrapper: VWrapper,
    },
  }
}
