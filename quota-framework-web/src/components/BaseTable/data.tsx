import { Table } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { ExpandableConfig } from 'antd/lib/table/interface';

/** from components */
import { handelDefaultColumns } from './util';
import {
  BaseTableProps,
  CusProColumns,
  TableColumnsDefine,
  TablePaginationDefine,
  TablePatternDefine,
  TableSearchDefine,
  TableSelectionDefine,
  TableServiceDefine,
} from './typings';

/** 默认传入 */
export const defaultProps: Partial<BaseTableProps<any, any>> = {
  rowKey: 'id',
  search: {},
  pagination: {},
  pattern: { striped: true },
  rowSelection: { revert: true },
  defaultCurrent: true,
  defaultSelection: false,
  initNextTick: true,
  columnEmptyText: '',
  columnDigitNilText: '0',
  columnSortable: false,
  columnsDynamic: false,
  virtual: true,
  editable: {
    type: 'multiple',
    actionRender: (row: any, config: any, dom: { save: any; cancel: any }) => [dom.save, dom.cancel],
  },
  showSorterTooltip: true,
};

/** 如果传递分页 那么生成分页其余默认参数 */
export const generatePagination = (pagination?: TablePaginationDefine) => {
  const generate: TablePaginationDefine = !!pagination && {
    ...pagination,
    showSizeChanger: true,
    size: pagination?.size,
    position: pagination?.position || ['bottomRight'],
    showQuickJumper: pagination?.showQuickJumper === false ? false : true,
    pageSizeOptions: pagination?.pageSizeOptions || [50, 100, 300, 500, 1000],
    pageSize: pagination?.pageSize || 50,
  };
  return generate;
};

/** 如果传递搜索配置 生成其余参数 */
export const generateSearch = (search?: TableSearchDefine) => {
  const generate: TableSearchDefine = !!search && {
    ...search,
    filterType: 'query',
    labelWidth: search.labelWidth || 90,
    span: search.span || { xs: 24, sm: 24, md: 12, lg: 8, xl: 6, xxl: 6 },
    defaultCollapsed: search.defaultCollapsed && true,
    showHiddenNum: search.showHiddenNum || false,
    // autocomplete: 'on',
  };
  return !!search && generate;
};

/** 如果允许表格勾选 生成其余参数 */
export const generateSelection = (selection?: TableSelectionDefine) => {
  const selections = [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE];
  const generate: TableSelectionDefine = !!selection && {
    ...selection,
    fixed: selection.fixed === false ? false : true,
    columnWidth: selection.columnWidth || '50px',
    selections: selection.selections || selections,
    preserveSelectedRowKeys: true,
  };
  return !!selection && generate;
};

/** Service 生成默认 */
export const generateService = (service?: TableServiceDefine<any, any>) => {
  const generate: TableServiceDefine<any, any> = {
    params: service?.params,
    debounceTime: service?.debounceTime || 10,
    manualRequest: service?.manualRequest || false,
    revalidateOnFocus: service?.revalidateOnFocus || false,
  };
  return generate;
};

/** Pattern 生成默认 */
export const generatePattern = (pattern?: TablePatternDefine) => {
  const generate: TablePatternDefine = {
    striped: pattern?.striped === false ? false : true,
    defaultSize: pattern?.defaultSize || 'small',
    bordered: pattern?.bordered === false ? false : true,
    cardBordered: pattern?.cardBordered || false,
    scrollToFirstRowOnChange: pattern?.scrollToFirstRowOnChange,
    scrollX: pattern?.scrollX || '100%',
    scrollY: pattern?.scrollY || '100%',
  };
  return generate;
};

/** Expandale 生成默认 */
export const generateExpandable = (expandable?: ExpandableConfig<any>) => {
  const generate: ExpandableConfig<any> = {
    expandIcon: ({ expanded, onExpand, record }) => {
      const isExpanded = <DownOutlined onClick={(e) => onExpand(record, e)} />;
      const noExpanded = <RightOutlined onClick={(e) => onExpand(record, e)} />;
      const icon = expanded ? isExpanded : noExpanded;
      const hasChildren = <span style={{ marginRight: '5px' }}>{icon}</span>;
      const noChildren = <span style={{ marginRight: '5px', opacity: 0 }}>{icon}</span>;
      return <>{record?.children?.length ? hasChildren : record?.hasChildren ? hasChildren : noChildren}</>;
    },
    indentSize: 8,
    ...expandable,
  };
  return generate;
};

export const generateColumns = (
  columns: TableColumnsDefine<any>,
  hasSearch: boolean,
  columnSortable?: boolean,
) => {
  if (!columns) return [];
  const columnsCopy = [...columns];

  /**  如果 dataIndex 为 index 自动生成连续序号 */
  if (columns?.[0]?.dataIndex === 'index') {
    const indexColumn: CusProColumns<any> = {
      width: 50,
      title: '序号',
      align: 'center',
      editable: false,
      customRender: (v1, v2, index, action) => {
        if (!action?.pageInfo) return index + 1;
        const { pageInfo } = action;
        return (pageInfo?.current - 1) * pageInfo?.pageSize + index + 1;
      },
      // 保留传入的配置
      ...columns[0],
      search: false,
    };
    columnsCopy[0] = indexColumn;
  }

  const columnsOther: any[] = [];
  const columnsRes = handelDefaultColumns(columnsCopy, columnsOther, hasSearch, columnSortable); // 递归处理子级
  return [...columnsOther, ...columnsRes];
};
