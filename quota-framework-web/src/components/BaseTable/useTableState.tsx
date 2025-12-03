import { message, Tooltip } from 'antd';
import { CopyTwoTone } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-table';
import { TableRowSelection } from '@ant-design/pro-table/lib/typing';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/** from components */
import { BaseTableProps, FetchParamsType, TableColumnsDefine } from './typings';
import {
  deepTraversa,
  generateRowKeyIsFontId,
  getActionsOption,
  getActionsRows,
  getDefaultCheckedItems,
  getRestoreCheckedItems,
  getRestoreCurrent,
  saveActionsRows,
  transforDataSourceConciseRecur,
} from './util';
import { RowSelectMethod } from 'antd/lib/table/interface';

let noLoading = false;
const useTableState = (props: BaseTableProps, refTable?: { current?: ActionType }) => {
  const [loading, setLoading] = useState<boolean>(false);
  /** 当前选中行 */
  const [current, setCurrent] = useState<any>();

  /** 当前勾选行 */
  const [selections, setSelections] = useState<any[]>();
  const [selectionsMethod, setSelectionsMethod] = useState<RowSelectMethod | 'cancel'>();

  /** 当前操作行 */
  const [actionCurrent, setActionCurrent] = useState<any>();

  /** 当前页码 */
  const [pageParams, setPageParams] = useState<{ pageSize: number; pageNumber: number }>();

  const [searchParams, setSearchParams] = useState<any>();

  /** 数据源 */
  const [dataSource, setDataSource] = useState<any[]>();
  const [dataSourceConcise, setDataSourceConcise] = useState<any[]>();
  /**接口合计行数据 */
  const [dataSourceSummary, setDataSourceSummary] = useState<{}>();

  const [dataSourceTotal, setDataSourceTotal] = useState<number>();
  /** 表格展开操作 */
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>();

  /** 高级查询用 */
  const [customSearch, setCustomSearch] = useState({});

  const [actionsType, setActionsType] = useState<'copy' | 'mv' | undefined>(
    getActionsOption(props?.persistenceKey),
  );

  const [actionsRows, setActionsRows] = useState<any[]>(getActionsRows(props?.persistenceKey));

  /** 请求表格数据主要方法 */
  const dataSourceRequest = async (params: FetchParamsType, sort?: any) => {
    try {
      const { rowKey, service } = props;

      if (service?.manualRequest) return { data: [], success: true };
      if (!service?.dataSourceRequest) return { success: false };

      /** 处理排序参数 */
      let sortParams = {};
      const sortKey = Object.keys(sort)?.[0];
      const sortFun = sort?.[sortKey]?.slice(0, -3);
      if (!sortKey) sortParams = {};
      else sortParams = { st: `${sortKey}:${sortFun}` };

      const { current: pageNumber, pageSize } = params;
      setPageParams({ pageSize, pageNumber });
      setSearchParams({ ...params, pageSize, pageNumber, ...customSearch });

      if (!noLoading) setLoading(true);
      const res = await service.dataSourceRequest({
        ...params,
        pageSize,
        pageNumber,
        ...customSearch,
        ...sortParams,
      });
      // 请求成功，清除 timeout
      // clearTimeout(timeoutId);
      setLoading(false);
      noLoading = false;

      const { rows } = res;

      if (res?.status !== 'SUCCESS') {
        setDataSource([]);
        setDataSourceConcise([]);
        if (props?.calcTotal) {
          setDataSourceTotal(res?.total);
        }
        setCurrent(undefined);
        return { success: false };
      }
      if (props?.requestSummary) {
        setDataSourceSummary(res?.other);
      }

      /** 如果没有唯一值作为 rowkey */
      const data = !rowKey ? generateRowKeyIsFontId(rows) : rows;

      const dataConcise: any[] = [];
      transforDataSourceConciseRecur(res?.rows, dataConcise);
      setDataSource(data);
      setDataSourceConcise(dataConcise);

      if (props?.calcTotal) {
        setDataSourceTotal(res?.total);
      }

      /**恢复当前行 */
      const findCurrent = getRestoreCurrent(data, current, props?.rowKey || 'frontId');
      setCurrent(findCurrent);

      /** 恢复勾选 */
      if (!!props?.rowSelection && !!props?.rowSelection?.revert && !!selections?.length) {
        const items = getRestoreCheckedItems(data, selections, props?.rowKey || 'frontId');
        setSelections(items);
      }

      if (typeof props.defaultCurrent === 'boolean' && props.defaultCurrent && !findCurrent) {
        setCurrent(data[0]);
      }

      /** 如果 defaultCurrent 有值 那么默认选中并滚动到该位置 */
      if (typeof props.defaultCurrent === 'object' && !!props.defaultCurrent) {
        const rowKey = props?.rowKey || 'frontId';
        const findIndex = dataConcise?.findIndex((item) => item?.[rowKey] == props?.defaultCurrent?.[rowKey]);
        if (findIndex !== -1) {
          setCurrent(props?.defaultCurrent);
          tableScrollTo(findIndex);
        } else {
          /**恢复当前行 */
          const findCurrent = getRestoreCurrent(data, current, props?.rowKey || 'frontId');
          setCurrent(findCurrent);
          if (!findCurrent) {
            setCurrent(data[0]);
          }
        }
      }

      /** 默认选中 check 为 true 的数据 */
      if (typeof props.defaultSelection === 'boolean' && props.defaultSelection) {
        const items = getDefaultCheckedItems(data);
        setSelections(items);
      }

      /** 如果有展开配置属性 默认展开所有节点 */
      if (
        typeof props?.expandable?.defaultExpandAllRows === 'boolean' &&
        !props.expandable?.defaultExpandAllRows
      ) {
      } else if (!!props.expandable) {
        const keys: any[] = [];
        data?.forEach((item) => keys.push(deepTraversa(item, [], props?.rowKey || 'frontId')));
        setExpandedRowKeys(keys.flat());
      }

      return { data, success: true, total: res?.total };
    } catch (error) {
    } finally {
      // clearTimeout(timeoutId);
      setLoading(false);
      noLoading = false;
    }
  };

  /** 获取 数据源
   * 当携带的 Paramas 发生改变会重新 请求数据
   * manualRequest true 手动出发请求排除掉 */
  useEffect(() => {
    (async () => {
      if (props.service?.manualRequest) return;
      if (!props.service?.params) return;
      await refTable?.current?.reloadAndRest?.();
      tableScrollTo(0);
    })();
  }, [props.service?.manualRequest, ...Object.values(props?.service?.params || {})]);

  // 刷新
  const refresh = () => {
    noLoading = true;
    if (refTable?.current?.reload) return refTable.current.reload();
    // dataSourceRequest({ ...queryParams });
  };

  const reloadNoLoading = () => {
    noLoading = true;
    if (refTable?.current?.reload) refTable.current.reload();
    // dataSourceRequest({ ...queryParams });
  };

  /** 自定义高级查询 */
  const handleCustomSearch = (customSearch: any) => {
    noLoading = false;
    setCustomSearch(customSearch);

    refTable?.current?.reloadAndRest?.();
  };

  /** 搜索前添加 Like 字符串处理 */
  const beforeSearchSubmit = (params: any, columns: TableColumnsDefine<any>) => {
    noLoading = false;

    if (JSON.stringify(customSearch) !== '{}') {
      setCustomSearch({});
      refTable?.current?.reloadAndRest?.();
      return;
    }

    if (typeof props?.beforeSearchSubmit === 'function') return props.beforeSearchSubmit(params, columns);

    const valueTypeMap: { [index: string]: any } = {};
    columns.forEach((item: any) => {
      if (item.search !== false) {
        valueTypeMap[item.dataIndex] = item?.valueType;
      }
    });

    const finalParams: { [index: string]: any } = {};
    for (const key in params) {
      if (key !== 'current' && key !== 'pageSize' && key !== '_timestamp')
        if (params?.[key] === 0 || !!params?.[key]) {
          if (valueTypeMap[key] === 'dateRange') {
            finalParams[key + 'Start_'] = params[key]?.[0];
            finalParams[key + 'End_'] = params[key]?.[1];
          } else if (valueTypeMap[key] !== 'select' && valueTypeMap[key] !== 'radioButton') {
            // && valueTypeMap[key] !== 'date'
            finalParams[key + 'Like'] = params[key];
          } else {
            finalParams[key] = params[key];
          }
        }
    }
    return { searchParams: JSON.stringify(finalParams) };
  };

  /** 缓存当前复制的数据 存在跨越表格粘贴 */
  const handleSetActionsRows = (arr: any[], option?: 'copy' | 'mv') => {
    setActionsRows(arr);
    setActionsType(option);
    /** 目前只有清单结算表 需要做此处理 */
    saveActionsRows(props?.persistenceKey, arr, option);
  };

  const handleClickCopy = async () => {
    if (!props?.toolbar) return;
    const { clickTrigger } = props?.toolbar?.copy?.fieldProps || {};
    if (typeof clickTrigger === 'function') {
      const res = await clickTrigger(selections, 'copy');
      if (res?.status !== 'SUCCESS') return;
    }
    handleSetActionsRows(selections || [], 'copy');
  };

  const handleClickCut = async () => {
    if (!props?.toolbar) return;
    const { clickTrigger } = props?.toolbar?.copy?.fieldProps || {};
    if (typeof clickTrigger === 'function') {
      const res = await clickTrigger(selections, 'mv');
      if (res?.status !== 'SUCCESS') return;
    }
    handleSetActionsRows(selections || [], 'mv');
  };

  const handleClickPaste = async (record?: any) => {
    if (!props?.toolbar) return;
    const pasteCurrent = record || current;

    const billSort = pasteCurrent?.billSort || '';
    const currentId = pasteCurrent?.[!props.rowKey ? 'frontId' : props.rowKey] || '';

    const res = await props?.toolbar?.copy?.onSubmit?.(
      {
        copyIds: actionsRows?.map((item) => item[!props.rowKey ? 'frontId' : props.rowKey]),
        actionsType,
        option: actionsType,
        currentId,
        billSort,
      },
      pasteCurrent,
      actionsRows,
    );
    if (res?.status !== 'SUCCESS') return;
    message.success(res?.message || `操作成功`);
    handleSetActionsRows([], undefined);
    // setSelections([]);
    refresh();
  };

  /** 如果有复制数据 清空复制状态 */
  const handleClickCancel = () => {
    if (!!actionsRows?.length) {
      handleSetActionsRows([], undefined);
    } else {
      setSelectionsMethod('cancel');
      setSelections([]);
    }
  };

  /** 复制 剪切 粘贴 */
  const actionsSelectionConfig: TableRowSelection = {
    hideSelectAll: !!actionsRows?.length,
    columnTitle:
      props?.rowSelection?.columnTitle ||
      (actionsRows?.length ? <span style={{ color: '#1890ff' }}>粘贴</span> : ''),
    renderCell: (checked, record, index, originNode) => {
      if (typeof props?.rowSelection?.renderCell === 'function') {
        return props?.rowSelection?.renderCell?.();
      }
      const actionNode = (
        <span className="paste-tip">
          <Tooltip title="粘贴到该行">
            <CopyTwoTone style={{ fontSize: '14px' }} onClick={() => handleClickPaste(record)} />
          </Tooltip>
        </span>
      );
      return <span>{actionsRows?.length ? actionNode : originNode}</span>;
    },
  };

  /** 因为不知道是否存在勾选行了 需要判断 */
  const determineActionCurrent = (isDoubleClick?: false) => {
    /** 双击的时候 如果有勾选行 但是也强制操作行为当前行 */
    if (isDoubleClick) {
      setActionCurrent(current);
      props?.onActionCurrent?.(current);
      return;
    }
    /** 如果没有勾选行 当前行为操作行 */
    if (!selections?.length) {
      setActionCurrent(current);
      props?.onActionCurrent?.(current);
      return;
    }
    /** 如果勾选行有且只有一个 那么他就是操作行 */
    if (selections?.length === 1) {
      setActionCurrent(selections[0]);
      props?.onActionCurrent?.(selections[0]);
      return;
    }
    /** 如果勾选行 大于 1 没有操作行 组件中会提示没有操作行 */
    if (selections?.length > 1) {
      setActionCurrent(undefined);
      props?.onActionCurrent?.(undefined);
      return;
    }
  };

  /** Table 滚动到某个位置 */
  const tableScrollTo = (index: number) => {
    if (!props?.persistenceKey) return;
    if (!dataSource) return;
    const proTableEl = document.getElementById(props?.persistenceKey);
    if (!proTableEl) return;
    const tbodyEl = proTableEl.querySelector('.ant-table-body');
    if (!tbodyEl) return;
    tbodyEl.scrollTop = index * 27;
  };

  /** 当前行发生改变触发 */
  useEffect(() => {
    props?.onCurrent?.(current);
    determineActionCurrent();
  }, [current]);

  /** 当前勾选发生改变触发 */
  useEffect(() => {
    props?.onSelections?.(selections, selectionsMethod);
    /** 如果勾选行发生 只有一行勾选行 把勾选行作为操作行 */
    determineActionCurrent();
  }, [selections]);

  /** 规定当前表格 斑马条纹 选中当前行 勾选行等 */
  const rowClassName = (rowItem: any, index: number) => {
    /** 处理当前行 */
    if (!!current) {
      const rowKey = !props.rowKey ? 'frontId' : props.rowKey;
      if (current?.[rowKey] === rowItem?.[rowKey]) {
        // 当前行是作废状态
        if (current?.mainAnnul === 'Y') return 'ant-table-row-mainAnnulY-currented';
        // 当前行是接口删除状态
        if (current?.mainAnnul === 'D') return 'ant-table-row-mainAnnulD-currented';
        // 当前行是删除状态
        if (current?.deletionIdentity === 'Y' || current?.deleteStatus == 1)
          return 'ant-table-row-deletion-currented';
        // 当前行颜色
        if (current?.[rowKey] === rowItem?.[rowKey]) return 'ant-table-row-currented';
      }
    }

    /** 处理父级 行 */
    if (!!props.expandable && rowItem?.detailTypeCode === 'V') {
      // 当前行是作废状态
      if (rowItem?.mainAnnul === 'Y') return 'ant-table-row-parent ant-table-row-mainAnnulY';
      // 当前行是接口删除状态
      if (rowItem?.mainAnnul === 'D') return 'ant-table-row-parent ant-table-row-mainAnnulD';
      // 当前行是删除状态
      if (rowItem?.deletionIdentity === 'Y' || rowItem?.deleteStatus == 1)
        return ' ant-table-row-parent ant-table-row-deletion';

      return 'ant-table-row-parent';
    }

    // 当前行是作废状态
    if (rowItem?.mainAnnul === 'Y')
      return index % 2 === 1 ? 'ant-table-row--striped ant-table-row-mainAnnulY' : 'ant-table-row-mainAnnulY';
    // 当前行是接口删除状态
    if (rowItem?.mainAnnul === 'D')
      return index % 2 === 1 ? 'ant-table-row--striped ant-table-row-mainAnnulD' : 'ant-table-row-mainAnnulD';
    // 当前行是删除状态
    if (rowItem?.deletionIdentity === 'Y' || rowItem?.deleteStatus == 1)
      return index % 2 === 1 ? 'ant-table-row--striped ant-table-row-deletion' : 'ant-table-row-deletion';

    /** 复制剪切行 样式 */
    if (
      actionsRows.some(
        (item) =>
          item[!props.rowKey ? 'frontId' : props.rowKey] ===
          rowItem[!props.rowKey ? 'frontId' : props.rowKey],
      )
    )
      return actionsType === 'copy' ? 'ant-table-row-copy' : 'ant-table-row-cut';

    if (!props.pattern?.striped) return '';
    if (!!props.expandable) return '';

    return index % 2 === 1 ? 'ant-table-row--striped' : '';
  };

  return {
    loading,
    current,
    setCurrent,
    selections,
    pageParams,
    searchParams,
    dataSource,
    dataSourceTotal,
    dataSourceConcise,
    setDataSource,
    setSelections,
    setSelectionsMethod,
    setActionCurrent,
    actionCurrent,
    expandedRowKeys,
    setExpandedRowKeys,
    handleSetActionsRows,
    actionsSelectionConfig,
    determineActionCurrent,
    dataSourceRequest,
    beforeSearchSubmit,
    handleCustomSearch,
    handleClickCut,
    handleClickCopy,
    handleClickCancel,
    handleClickPaste,
    actionsRows,
    rowClassName,
    refresh,
    reloadNoLoading,
    dataSourceSummary,
    tableScrollTo,
  };
};

export default useTableState;

export type TableStateDefine = {
  dataSource: any;
  dataSourceConcise: any;
  pageParams: any;
  searchParams: any;
  handleCustomSearch: (v: { customKey?: string | undefined; customQuery?: string | undefined }) => void;
  current?: any;
  setCurrent: any;
  selections?: any[];
  actionCurrent?: any;
  dataSourceTotal?: number;
  expandedRowKeys?: any[];
  setExpandedRowKeys: Dispatch<SetStateAction<any[] | undefined>>;
  setSelections: Dispatch<SetStateAction<any[] | undefined>>;
  setSelectionsMethod: Dispatch<SetStateAction<RowSelectMethod>>;
  actionsSelectionConfig: TableRowSelection;
  determineActionCurrent: any;
  handleClickCut: () => void;
  handleClickCopy: () => void;
  handleClickCancel: () => void;
  handleClickPaste: (record?: any) => void;
  actionsRows: any[];
  rowClassName?: (_: any, index: number) => any;
  dataSourceRequest?: (
    params: any,
  ) => Promise<
    | { success: boolean; data?: undefined; total?: undefined }
    | { data: any; success: boolean; total: number | undefined }
  >;
  tableScrollTo: (index: number) => void;
  refresh?: () => Promise<any>;
};
