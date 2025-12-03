/*
 * @Author: SHUANG
 * @Date: 2022-06-01 17:11:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-18 10:49:26
 * @Description: 表格基础组件
 */
import { history } from 'umi';
import useVirtualTable from './virtualTable';
import { DownOutlined } from '@ant-design/icons';
import { CSSProperties, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ProTable, { ActionType, ListToolBarProps } from '@ant-design/pro-table';
import ProSkeleton from '@ant-design/pro-skeleton';

/** from components */
import useColumnsState from './useColumnsState';
import useTableAction from './useTableAction';
import useTableState from './useTableState';
import useColumns from './useColumns';
import useSummary from './useSummary';
import ResizableTitle from './resizable';
import { getTableScroll } from './util';
import * as TYPES from './typings';
import * as DATA from './data';

type Props = <DataType extends Record<string, any>, ValueType = 'text'>(
  props: TYPES.BaseTableProps<DataType, any, ValueType, ValueType>,
) => JSX.Element;

const Skeleton = (
  <div className="BaseTableSkeleton">
    <ProSkeleton type="descriptions" list={10} />
  </div>
);

/** 基本表格 */
const BaseTable: Props = (prop) => {
  /** table ref */
  const refTable = useRef<ActionType>();
  /** table 包裹外层元素 ref */
  const refBaseTable = useRef<HTMLDivElement>(null);

  /** 默认props */
  const props = { ...DATA.defaultProps, ...prop };
  if (!!prop?.rowSelection) {
    props.rowSelection = { ...DATA.defaultProps.rowSelection, ...prop?.rowSelection };
  }

  const tableState = useTableState(props, refTable);
  const tableAction = useTableAction(props, tableState);

  /** 表格动态列 */
  const { persistenceKey, columnsState: columnsStateProps } = props;
  const columnsState = useColumnsState(persistenceKey, columnsStateProps);

  /** 表格即点即编 */
  const { columnsStateMap } = columnsState;
  const { columns, editableKeys } = useColumns(props, tableState.refresh, refBaseTable);

  /** 表格动态列合计行 */
  const { handleSummary } = useSummary(props, columns, columnsStateMap, tableState.dataSourceSummary);

  /**  生成默认配置 */
  const pagination = DATA.generatePagination(props.pagination);
  const service = DATA.generateService(props.service);
  const pattern = DATA.generatePattern(props.pattern);

  /** 当搜索栏高度发生改变重新计算表格高度 */
  const search = !!props.search && {
    ...DATA.generateSearch(props.search),
    onCollapse: () => getTableScroll(refBaseTable?.current, !!props?.requestSummary || !!props.summary),
    optionRender: (_v1: any, _v2: any, dom: any) => [...dom, tableAction.seniorSearch],
    collapseRender: (collapsed: boolean) => (
      <>
        {collapsed ? '展开' : '收起'} <DownOutlined rotate={!collapsed ? 180 : undefined} />
      </>
    ),
  };

  /** 当前多选 */
  const rowSelection: TYPES.TableSelectionDefine = !!props.rowSelection && {
    ...DATA.generateSelection(props.rowSelection),
    selectedRowKeys:
      props.rowSelection?.type === 'radio'
        ? props?.rowSelection?.defaultSelectedRowKeys || [
            tableState?.current?.[!props.rowKey ? 'frontId' : props.rowKey],
          ]
        : tableState.selections?.map((item) => item?.[!props.rowKey ? 'frontId' : props.rowKey]),
    onChange: (_, rows, info) => {
      if (!!props?.rowSelection && props.rowSelection?.type === 'radio') {
        tableState.setCurrent(rows?.[0]);
      } else {
        selectChangedItems.current = [];
        // tableState.dataSource 为接口请求的数据源
        tableState.dataSource?.forEach((item) => {
          const id = item.id ? 'id' : 'frontId';
          // 数据源的 item 是否已被勾选   rows为已勾选数组 isHasItemByRows=true 数据源该项在列表已勾选
          const isHasItemByRows = rows.some((rowItem) => item?.[id] === rowItem?.[id]);
          if (isHasItemByRows) {
            //如果数据源中选中 列表已勾选 无变化
            if (item.checked) return;
            // 反之则是变化项
            selectChangedItems.current.push(item);
          } else {
            //列表未勾选 数据源也未选中 无变化
            if (!item.checked) return;
            // 反之则是变化项
            selectChangedItems.current.push(item);
          }
        });
        // 传递变化项
        tableState.setSelections(rows);
        tableState.setSelectionsMethod(info.type);
      }
    },
    ...tableState.actionsSelectionConfig,
  };

  /** 树形表格配置 */
  const generateExpandable = DATA.generateExpandable(props.expandable);
  const expandable = !props.expandable
    ? {}
    : {
        ...generateExpandable,
        expandedRowKeys: tableState.expandedRowKeys,
        onExpandedRowsChange: (expanded: any) => tableState.setExpandedRowKeys([...expanded]),
        ...props.expandable,
      };

  /** 工具栏渲染 */
  const toolbar: ListToolBarProps = {
    search: tableAction.searchBarActions,
    actions: [...tableAction.toolbarActions],
  };

  /** 自定义渲染 使用虚拟滚动 */
  const [components, setcomponents] = useState<any>({ header: { cell: ResizableTitle } });
  useEffect(() => {
    // if (props.calcTotal === undefined) return;
    if (props?.virtual === false) return;
    const virtualTable = useVirtualTable({
      total: props?.calcTotal ? tableState?.dataSourceTotal : undefined,
    });
    setcomponents({
      header: { cell: ResizableTitle },
      body: { wrapper: props?.virtual && virtualTable.body.wrapper },
      table: props?.virtual && virtualTable.table,
    });
  }, [history?.location?.pathname, tableState?.dataSourceTotal]);

  /** 表格容器内自适应 */
  const scroll = {
    x: pattern.scrollX,
    y: pattern.scrollY,
    scrollToFirstRowOnChange: pattern.scrollToFirstRowOnChange,
  };

  /** Table 传入固定高度 */
  const maxTableHeight: CSSProperties = props?.maxHeight ? { height: props?.maxHeight } : {};
  const minTableHeight: CSSProperties = props?.minHeight ? { minHeight: props?.minHeight } : {};

  useEffect(() => {
    if (!refBaseTable?.current) return;
    /** 页面加载完成 计算当前Table 宽度 */
    getTableScroll(refBaseTable?.current, !!props?.requestSummary || !!props.summary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  /** 勾选项 与数据源 checked 相比的变化项 */
  const selectChangedItems = useRef<any[]>([]);

  /** Action Ref */
  const initUseImperativeHandle = () => ({
    reload: tableState.refresh,
    reloadNoLoading: tableState.reloadNoLoading,
    setTableCurrent: (record: any) => {
      setTimeout(() => tableState?.setCurrent(record), 27);
    },
    setTableSelection: (records: any[]) => {
      tableState?.setSelections(records);
    },
    clearTablePasteSelections: () => {
      tableState?.handleSetActionsRows([], undefined);
    },
    tableScrollTo: (index: number) => {
      setTimeout(() => tableState.tableScrollTo(index), 100);
    },
    selectChangedItems,
  });
  useImperativeHandle(props?.actionRef, initUseImperativeHandle);

  const TableRender = (
    <ProTable
      search={search}
      columns={columns}
      id={persistenceKey}
      actionRef={refTable}
      pagination={pagination}
      /** service 表格请求相关 */
      params={service?.params}
      request={tableState.dataSourceRequest}
      beforeSearchSubmit={(_) => tableState.beforeSearchSubmit(_, columns)}
      revalidateOnFocus={service?.revalidateOnFocus}
      manualRequest={service?.manualRequest}
      debounceTime={service?.debounceTime}
      /** RowKey ID */
      rowKey={!props.rowKey ? 'frontId' : props.rowKey}
      /** 表格操作 */
      headerTitle={tableAction.headerBarActions}
      toolBarRender={props?.toolBarRender}
      rowSelection={rowSelection}
      onRow={tableAction.onRow}
      tableAlertRender={false}
      components={components}
      toolbar={toolbar}
      /** pattern 基本样式相关 */
      showSorterTooltip={props?.showSorterTooltip}
      columnEmptyText={props?.columnEmptyText}
      cardBordered={pattern?.cardBordered}
      defaultSize={pattern?.defaultSize}
      bordered={pattern?.bordered}
      scroll={scroll}
      /** 合计行 */
      /** 树形表格 */
      expandable={expandable}
      summary={handleSummary}
      columnsState={
        !!persistenceKey
          ? {
              onChange: columnsState.columnsStateOnChange,
              value: columnsState.columnsStateMap,
              defaultValue: props?.columnsState?.defaultValue,
            }
          : {}
      }
      loading={props?.noLoading === true ? false : tableState.loading}
      rowClassName={props?.rowClassName || tableState.rowClassName}
      /** 即点即编 */
      editable={{ editableKeys: [editableKeys], ...props.editable }}
      className={props?.className}
    />
  );

  return (
    <div ref={refBaseTable} className="base-table-section" style={{ ...maxTableHeight, ...minTableHeight }}>
      {props.initNextTick ? TableRender : Skeleton}
    </div>
  );
};

export default BaseTable;
