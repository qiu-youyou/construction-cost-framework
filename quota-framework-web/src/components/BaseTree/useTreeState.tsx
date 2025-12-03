import { TreeDataNode, message } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/** from components */
import { getRestoreCurrent, transforDataSourceConciseRecur } from '../BaseTable/util';
import { getDefaultCheckedItems, setDisabledCheckedItems } from './util';
import { BaseTreeProps, TreeActionType } from './typings';

const useSourceData = (props: BaseTreeProps, treeRef?: TreeActionType) => {
  /** 当前选中行 */
  const [current, setCurrent] = useState<DataNode>();
  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);
  /** 当前选中节点 */
  const [selections, setSelections] = useState<DataNode[]>();
  /** 数据源 如果传入dataSourc 则为 dataSource */
  const [dataSource, setDataSource] = useState<DataNode[]>(props.dataSource || []);
  const [dataSourceConcise, setDataSourceConcise] = useState<DataNode[]>([]);
  /** 又一次触发请求 根据参数 */
  const [refreshDateByParams, setRefreshDateByParams] = useState<string>();

  const [actionsRows, setActionsRows] = useState<any[]>();
  const [actionsType, setActionsType] = useState<'copy' | 'mv' | undefined>();

  /** 获取数据 */
  const dataSourceRequest = async (resetCurrent?: boolean, resetAction?: boolean) => {
    const { service } = props;
    if (!service?.dataSourceRequest) return;
    if (!dataSource?.length) {
      setLoading(true);
    }
    const { params } = service;
    const res = await service.dataSourceRequest({ ...params });
    setLoading(false);
    if (res?.status !== 'SUCCESS') {
      setDataSource([]);
      setDataSourceConcise([]);
      setCurrent(undefined);
      return;
    }

    /** 如果是boolean 如果默认选中第一行 */
    if (!!actionsType && !resetAction) {
      setDataSource(setDisabledCheckedItems(res?.rows, true));
    } else {
      setDataSource(res?.rows);
    }

    if (typeof props.defaultCurrent === 'boolean' && props.defaultCurrent && resetCurrent) {
      setCurrent(res?.rows?.[0]);
    } else if (
      /** 恢复当前行 */
      typeof props.defaultCurrent === 'boolean' &&
      props.defaultCurrent &&
      !!current
    ) {
      const findCurrent = getRestoreCurrent(res?.rows, current, props?.fieldNames?.key || 'id');
      setCurrent(findCurrent);
    }

    if (typeof props.defaultCurrent === 'boolean' && props.defaultCurrent && !current) {
      setCurrent(res?.rows?.[0]);
    }

    /** 如果 defaultCurrent 有值 那么默认选中并滚动到该位置 */
    if (typeof props.defaultCurrent === 'object' && !!props.defaultCurrent) {
      const findCurrent = getRestoreCurrent(res?.rows, props?.defaultCurrent, props?.fieldNames?.key || 'id');

      if (!!findCurrent) {
        setCurrent(findCurrent);
        treeRef?.current?.scrollTo?.({
          key: props?.defaultCurrent[props?.fieldNames?.key || 'id'],
          align: 'top',
          offset: 20,
        });
      } else {
        if (resetCurrent) {
          setCurrent(res?.rows?.[0]);
        } else if (!!current) {
          const findCurrent = getRestoreCurrent(res?.rows, current, props?.fieldNames?.key || 'id');
          setCurrent(findCurrent);
        }
        if (!current) {
          setCurrent(res?.rows?.[0]);
        }
      }
    }

    /** 默认选中 check 为 true 的数据 */
    if (typeof props.defaultSelection === 'boolean' && props.defaultSelection) {
      const items = getDefaultCheckedItems(res?.rows);
      setSelections(items);
    }

    if (props?.localRetrieval) {
      const dataConcise: any[] = [];
      transforDataSourceConciseRecur(res?.rows, dataConcise);
      setDataSourceConcise(dataConcise);
    }
    if (!!actionsType && !resetAction) {
      setSelections(actionsRows);
    }
  };

  /** 刷新 */
  const refresh = () => {
    return dataSourceRequest();
  };

  const refreshAndReset = () => {
    setCurrent(undefined);
    dataSourceRequest();
  };

  /** 缓存当前复制的数据 存在跨越表格粘贴 */
  const handleSetActionsRows = (arr: any[], option?: 'copy' | 'mv') => {
    setActionsRows(arr);
    setActionsType(option);
    if (!!option) {
      setDataSource(setDisabledCheckedItems(dataSource, true));
    } else {
      setDataSource(setDisabledCheckedItems(dataSource, false));
    }
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
    const currentId = pasteCurrent?.[props?.fieldNames?.key || 'id'] || '';

    const res = await props?.toolbar?.copy?.onSubmit?.(
      {
        copyIds: actionsRows?.map((item) => item[props?.fieldNames?.key || 'id']),
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
    setSelections([]);
    dataSourceRequest(undefined, true);
  };

  /** 如果有复制数据 清空复制状态 */
  const handleClickCancel = () => {
    if (!!actionsRows?.length) {
      handleSetActionsRows([], undefined);
      setSelections([]);
    } else {
      setSelections([]);
    }
  };

  /** 获取 数据源
   * 当携带的 Paramas 发生改变会重新 请求数据
   * manualRequest true 手动出发请求排除掉 */
  useEffect(() => {
    (async () => {
      if (!!props?.loadData) return;
      if (!!props.dataSource) return;
      if (props.service?.manualRequest) return;
      await dataSourceRequest(true);
      setRefreshDateByParams(new Date().getTime() + '');
    })();
  }, [props.service?.manualRequest, ...Object.values(props?.service?.params || {})]);

  /** 当前行发生改变触发 */
  useEffect(() => {
    if (!props?.onCurrent) return;

    props?.onCurrent?.(current);
  }, [current]);

  /** 当勾选行发生改变触发 */
  useEffect(() => {
    if (!props?.onSelections) return;

    props?.onSelections?.(selections);
  }, [selections]);

  useEffect(() => {
    if (!props?.dataSource) return;
    setDataSource(props.dataSource);

    if (typeof props.defaultCurrent === 'boolean' && props.defaultCurrent && !current) {
      setCurrent(props?.dataSource?.[0]);
    }
    if (props?.localRetrieval) {
      const dataConcise: any[] = [];
      transforDataSourceConciseRecur(props.dataSource, dataConcise);
      setDataSourceConcise(dataConcise);
    }
  }, [props.dataSource]);

  return {
    current,
    setCurrent,
    selections,
    setSelections,
    refreshDateByParams,
    dataSourceConcise,
    dataSource,
    actionsType,
    actionsRows,
    loading,
    refreshAndReset,
    refresh,
    handleClickCopy,
    handleClickCut,
    handleClickPaste,
    handleClickCancel,
    handleSetActionsRows,
  };
};

export default useSourceData;

export type TreeStateDefine = {
  current: TreeDataNode | undefined;
  setCurrent: Dispatch<SetStateAction<TreeDataNode | undefined>>;
  selections: TreeDataNode[] | undefined;
  setSelections: Dispatch<SetStateAction<TreeDataNode[] | undefined>>;
  refreshDateByParams?: string;
  dataSourceConcise: TreeDataNode[];
  dataSource: TreeDataNode[];
  actionsRows: TreeDataNode[];
  actionsType?: 'copy' | 'move';
  loading: boolean;
  refreshAndReset: () => void;
  refresh: () => Promise<any>;
  handleClickCut: () => void;
  handleClickCopy: () => void;
  handleClickPaste: (v?: any) => void;
  handleClickCancel: () => void;
  handleSetActionsRows: (v?: any) => void;
};
