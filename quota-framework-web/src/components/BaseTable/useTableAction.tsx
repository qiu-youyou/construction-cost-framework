import { Key, useRef, useState } from 'react';
import { AutoComplete, Button, Input, Space, Tooltip } from 'antd';
import { ArrowDownOutlined, ArrowsAltOutlined, ArrowUpOutlined, ShrinkOutlined } from '@ant-design/icons';

/** from components */
import useAuthButton from '../../utils/auth/useAuthButton';
import PlusButton from '../ActionButton/PlusButton';
import PlusLineButton from '../ActionButton/PlusLineButton';
import PlusLevelButton from '../ActionButton/PlusLevelButton';
import EditButton from '../ActionButton/EditButton';
import DetailsButton from '../ActionButton/DetailsButton';
import EnableButton from '../ActionButton/EnableButton';
import DisableButton from '../ActionButton/DisableButton';
import DeleteButton from '../ActionButton/DeleteButton';
import UploadFileButton from '../ActionButton/UploadFileButton';
import ExportButton from '../ActionButton/ExportButton';
import CalcButton from '../ActionButton/CalcButton';
import MoveButton from '../ActionButton/MoveButton';
import CustomQuery from '../CustomQuery';

import { ModalActionType } from '../BaseModal/typings';
import { TableStateDefine } from './useTableState';
import useToolSearch from '../useToolSearch';
import { BaseTableProps } from './typings';

import HelpDocument from '../HelpDocument';
import HelpVideo from '../HelpVideo';

/** 当前搜索关键字 匹配数据  Current search keyword  Matching data */
type NavigetType = { search: string; filterData: any[]; index: number };
let navigetToCurent: NavigetType = { search: '', filterData: [], index: 0 };

const useTableAction = (props: BaseTableProps, tableState: TableStateDefine) => {
  const detailsButtonRef = useRef<ModalActionType>();
  const editButtonRef = useRef<ModalActionType>();
  const editOtherButtonRef = useRef<ModalActionType>();
  const editMoreButtonRef = useRef<ModalActionType>();

  const localSearchKey = 'LISTSEARCHLOCAL' + props?.persistenceKey;
  const toolSearch = useToolSearch(localSearchKey);

  const tableScrollToCurrent = (index: number) => {
    const SUBRECSTABLE = document.getElementById(props?.persistenceKey || '');
    const tbody = SUBRECSTABLE?.getElementsByClassName('ant-table-body');
    if (!tbody?.length) return;
    tbody[0].scrollTop = 22 * index;
  };

  /** 寻找当前行 */
  const findCurrentByDataSource = (key: number) => {
    let findItem;
    let findIndex = 0;

    tableState?.dataSourceConcise?.forEach((item: any, index: number) => {
      if (item?.[props?.rowKey || 'frontId'] === key) {
        findItem = item;
        findIndex = index;
      }
    });

    tableState?.setCurrent(findItem);
    tableScrollToCurrent(findIndex);
  };

  /** 筛选当前检索项 并定位到当前查找到的行
   * Filter the currently retrieved items and navigate to the currently found row */
  const navigetToCurentBySearch = (search: string) => {
    /** 如果与上次检索关键字相同 根据已筛选的数据做定位
     * 如果 已经跳转到了最后一行 回到第一行 否则继续跳转到下一行 */
    if (search === navigetToCurent.search) {
      const { index, filterData } = navigetToCurent;
      if (index === filterData.length - 1) {
        navigetToCurent.index = 0;
        findCurrentByDataSource(filterData[navigetToCurent.index]?.[props?.rowKey || 'frontId']);
        return;
      }
      navigetToCurent.index++;
      findCurrentByDataSource(filterData[navigetToCurent.index]?.[props?.rowKey || 'frontId']);
      return;
    }
    const filterData = tableState.dataSourceConcise.filter(
      (item: any) =>
        item?.[props?.localRetrieval?.searchKey?.[0] || '']?.includes(search) ||
        item?.[props?.localRetrieval?.searchKey?.[1] || '']?.includes(search),
    );

    if (!filterData?.length) return;
    const index = 0;
    navigetToCurent = { search, filterData, index };
    findCurrentByDataSource(filterData[0]?.[props?.rowKey || 'frontId']);
  };

  /** 书签定位 */
  const findCurrentRowByFbookmarkAfter = () => {
    /** 下一个书签 */
    const findIndex = tableState?.dataSourceConcise?.findIndex(
      (item: any) => item?.[props?.rowKey || 'frontId'] === tableState.current?.[props?.rowKey || 'frontId'],
    );
    if (findIndex === -1) return;
    if (!props?.toolbar) return;
    const markKey = props?.toolbar?.bookmark?.fieldProps?.fieldKey || 'detailMark';
    const markValue = props?.toolbar?.bookmark?.fieldProps?.fieldValue || 'Y';
    for (let i = findIndex + 1; i < tableState?.dataSourceConcise.length; i++) {
      if (tableState?.dataSourceConcise[i][markKey] === markValue) {
        findCurrentByDataSource(tableState?.dataSourceConcise[i]?.[props?.rowKey || 'frontId']);
        return;
      }
    }
  };

  /** 书签定位 */
  const findCurrentRowByFbookmarkBefore = () => {
    /**  上一个书签 */
    const findIndex = tableState?.dataSourceConcise?.findIndex(
      (item: any) => item?.[props?.rowKey || 'frontId'] === tableState.current?.[props?.rowKey || 'frontId'],
    );
    if (findIndex === -1) return;
    if (!props?.toolbar) return;
    const markKey = props?.toolbar?.bookmark?.fieldProps?.fieldKey || 'detailMark';
    const markValue = props?.toolbar?.bookmark?.fieldProps?.fieldValue || 'Y';
    for (let i = findIndex - 1; i >= 0; i--) {
      if (tableState?.dataSourceConcise[i][markKey] === markValue) {
        findCurrentByDataSource(tableState?.dataSourceConcise[i]?.[props?.rowKey || 'frontId']);
        return;
      }
    }
  };

  /** 递归克隆节点Key */
  const deepTraversa = (node: any, nodelist?: Key[]) => {
    const keysList = nodelist || [];
    if (node !== null) {
      keysList.push(node?.[props.rowKey || 'frontId']);
      for (let i = 0; i < node?.children?.length; i++) {
        deepTraversa(node?.children[i], keysList);
      }
    }
    return keysList;
  };

  // 展开收起事件
  const toggleExpandAll = () => {
    if (!!tableState.expandedRowKeys?.length) {
      tableState.tableScrollTo(0);
      tableState?.setExpandedRowKeys([]);
      return;
    }
    const keys: any[] = [];

    tableState.dataSource?.forEach?.((item: any) => keys.push(deepTraversa(item)));

    tableState?.setExpandedRowKeys(keys.flat());
  };

  /** 生成默认的按钮 如果传入auth 受控，否则查询权限表 */
  const { toolbar: toolbarEx } = props;
  const toolbarProps: { [index: string]: any } | undefined | false = toolbarEx;

  /** 如果权限受默认权限表控制 */
  let toolbarDefaultAuth = (authKey: string) => {};
  if (props.toolbarAuthority) {
    const { auth } = useAuthButton();
    toolbarDefaultAuth = auth;
  }

  if (!!toolbarProps) {
    for (const key in toolbarProps) {
      /** 如果权限受默认权限表控制 */
      if (props?.toolbarAuthority) {
        toolbarProps[key].auth = toolbarDefaultAuth(toolbarProps[key]?.authKey || key);
      } else if (toolbarProps[key].auth === undefined) {
        /** 默认显示按钮 */
        toolbarProps[key].auth = true;
      }
      toolbarProps[key].onRefresh = tableState.refresh;
    }
  }

  const toolbar = toolbarProps || {};

  /** 行事件 */
  const onRow = (record?: any, index?: number) => ({
    /** 单击行 */
    onClick: () => {
      tableState.setCurrent(record);
      if (!props?.onClick) return;
      props.onClick(record, index);
    },

    /** 双击行 */
    onDoubleClick: (e: any) => {
      if (document.getElementsByClassName('COMMON_PROCESS_PROCESSHISTORYTABLE_WRAPMODAL')?.length) return;
      if (document.getElementsByClassName('COMMON_PROCESS_PROCESSCHART_WRAPMODAL')?.length) return;
      if (e?.target?.className === 'ant-checkbox-input') return;
      tableState.determineActionCurrent(true);
      /** 根据返回值判断双击触发的操作 */
      const clickProps = props?.onDoubleClick?.(record, index);
      // 没有返回值 根据权限默认出发 编辑 ｜ 查看
      setTimeout(() => {
        if (!clickProps?.trigger) {
          /** 有编辑权限触发编辑 无编辑权限 触发查看 */
          if (toolbar?.edit?.auth && toolbar?.edit?.triggerType !== 'submit') {
            editButtonRef?.current?.open?.();
          } else {
            if (toolbar?.details?.auth && toolbar?.details?.triggerType !== 'submit') {
              detailsButtonRef?.current?.open?.();
            }
          }
        }
        if (clickProps?.trigger === 'none') return;
        /** 触发详情 */
        if (clickProps?.trigger === 'details') {
          detailsButtonRef?.current?.open?.();
        }
        /** 触发编辑 */
        if (clickProps?.trigger === 'edit') {
          editButtonRef?.current?.open?.();
        }
        if (clickProps?.trigger === 'editOther') {
          editOtherButtonRef?.current?.open?.();
        }
        if (clickProps?.trigger === 'editMore') {
          editMoreButtonRef?.current?.open?.();
        }
      }, 0);
    },
  });

  /**  选择项渲染到 工具栏 */
  const toolbarActionsSelection = (
    <>
      {!!toolbarProps && toolbarProps?.copy?.auth && (
        <>
          {!!tableState.selections?.length && !tableState.actionsRows?.length && (
            <>
              <Button type="link" className="LinkButtonCopy" onClick={tableState.handleClickCopy}>
                复制({tableState.selections?.length})
              </Button>

              <Button
                type="link"
                className="LinkButtonCut"
                style={{ marginLeft: -5 }}
                onClick={tableState.handleClickCut}
              >
                剪切({tableState.selections?.length})
              </Button>
            </>
          )}

          {!!tableState.actionsRows?.length && (
            <Button
              type="link"
              className="LinkButtonPast"
              onClick={() => tableState.handleClickPaste(tableState?.current)}
            >
              粘贴({tableState.actionsRows?.length})项
            </Button>
          )}
        </>
      )}

      {!!tableState.selections?.length && !toolbar?.copy?.auth && (
        <Button type="link" key="CheckOut">
          已选 ({tableState.selections?.length})
        </Button>
      )}

      {(!!tableState.selections?.length || !!tableState.actionsRows?.length) && (
        <Button type="text" key="CloseOut" onClick={tableState.handleClickCancel}>
          取消
        </Button>
      )}
    </>
  );

  const toolbarActions = [
    <>
      {!!props?.toobarExtra && (
        <Button type="link" key="toobarExtra">
          {props?.toobarExtra}
        </Button>
      )}
    </>,

    !!props?.moduleKey && <HelpVideo key="helpvideo" moduleKey={props?.moduleKey} />,
    !!props?.moduleKey && <HelpDocument key="helpdoc" moduleKey={props?.moduleKey} />,
  ];

  /** 渲染到标题区域的操作 */
  const headerBarActions = (
    <Space size={2}>
      {!!toolbar?.expandStart && (
        <Button onClick={toggleExpandAll}>
          {!!tableState?.expandedRowKeys?.length ? (
            <Tooltip title="折叠全部">
              <ShrinkOutlined style={{ fontSize: 14 }} />
              {toolbar?.expandStart?.buttonText && (
                <span style={{ marginLeft: 2 }}>折叠{toolbar?.expandStart?.buttonText}</span>
              )}
            </Tooltip>
          ) : (
            <Tooltip title="展开全部">
              <ArrowsAltOutlined style={{ fontSize: 14 }} />
              {toolbar?.expandStart?.buttonText && (
                <span style={{ marginLeft: 2 }}>展开{toolbar?.expandStart?.buttonText}</span>
              )}
            </Tooltip>
          )}
        </Button>
      )}

      {/* 数据重排 */}
      {toolbar?.sortStart?.auth && (
        <>
          <MoveButton
            moveType="top"
            current={tableState.actionCurrent}
            dataSource={tableState.dataSource}
            {...toolbar.sortStart}
          />

          <MoveButton
            moveType="button"
            current={tableState.actionCurrent}
            dataSource={tableState.dataSource}
            {...toolbar.sortStart}
          />
        </>
      )}

      {props?.toolbarFirst}

      {props?.toolbarBefore}

      {/*  添加 */}
      {toolbar?.plus?.auth && (
        <PlusButton
          idsKey={props.rowKey}
          params={props?.service?.params}
          current={tableState.actionCurrent}
          {...toolbar.plus}
        />
      )}

      {/* 添加层级 */}
      {toolbar?.plusLevel?.auth && (
        <PlusLevelButton
          idsKey={props.rowKey}
          current={tableState.actionCurrent}
          params={props?.service?.params}
          {...toolbar.plusLevel}
        />
      )}

      {toolbar?.plusLine?.auth && (
        <PlusLineButton
          idsKey={props.rowKey}
          current={tableState.actionCurrent}
          params={props?.service?.params}
          {...toolbar.plusLine}
        />
      )}

      {toolbar?.plusOther?.auth && (
        <PlusButton
          idsKey={props.rowKey}
          current={tableState.actionCurrent}
          params={props?.service?.params}
          {...toolbar.plusOther}
        />
      )}

      {toolbar?.plusMore?.auth && (
        <PlusButton
          idsKey={props.rowKey}
          current={tableState.actionCurrent}
          params={props?.service?.params}
          {...toolbar.plusMore}
        />
      )}

      {/* 编辑 */}
      {toolbar?.edit?.auth && (
        <EditButton
          actionRef={editButtonRef}
          current={tableState.actionCurrent}
          determineActionCurrent={tableState.determineActionCurrent}
          params={props?.service?.params}
          {...toolbar.edit}
        />
      )}

      {/* 编辑 */}
      {toolbar?.editOther?.auth && (
        <EditButton
          actionRef={editOtherButtonRef}
          current={tableState.actionCurrent}
          determineActionCurrent={tableState.determineActionCurrent}
          params={props?.service?.params}
          {...toolbar.editOther}
        />
      )}

      {/* 编辑 */}
      {toolbar?.editMore?.auth && (
        <EditButton
          actionRef={editMoreButtonRef}
          current={tableState.actionCurrent}
          determineActionCurrent={tableState.determineActionCurrent}
          params={props?.service?.params}
          {...toolbar.editMore}
        />
      )}

      {/* 查看 */}
      {toolbar?.details?.auth && (
        <DetailsButton
          actionRef={detailsButtonRef}
          current={tableState.actionCurrent}
          determineActionCurrent={tableState.determineActionCurrent}
          {...toolbar.details}
        />
      )}

      {toolbar?.detailsMore?.auth && (
        <DetailsButton
          current={tableState.actionCurrent}
          determineActionCurrent={tableState.determineActionCurrent}
          {...toolbar.detailsMore}
        />
      )}

      {props?.toolbarPrimary}

      {/* 导入 */}
      {toolbar?.import?.auth && <UploadFileButton {...toolbar.import} />}

      {/* 导出 */}
      {toolbar?.export?.auth && (
        <ExportButton
          determineActionCurrent={tableState.determineActionCurrent}
          current={tableState.actionCurrent}
          tableSearchParams={tableState.searchParams}
          pageParams={tableState.pageParams}
          {...toolbar.export}
        />
      )}

      {/* 导出其他 */}
      {toolbar?.exportOther?.auth && (
        <ExportButton
          determineActionCurrent={tableState.determineActionCurrent}
          current={tableState.actionCurrent}
          tableSearchParams={tableState.searchParams}
          pageParams={tableState.pageParams}
          {...toolbar.exportOther}
        />
      )}

      {props?.toolbarCenter}

      {/* 启用 */}
      {toolbar?.enable?.auth && (
        <EnableButton
          idsKey={props?.rowKey}
          current={tableState.current}
          selections={tableState.selections}
          {...toolbar.enable}
        />
      )}

      {/* 禁用 */}
      {toolbar?.disable?.auth && (
        <DisableButton
          idsKey={props?.rowKey}
          current={tableState.current}
          selections={tableState.selections}
          {...toolbar.disable}
        />
      )}

      {/* 删除 */}
      {toolbar?.deleted?.auth && (
        <DeleteButton
          idsKey={props?.rowKey}
          current={tableState.current}
          selections={tableState.selections}
          onSubmitFinish={() => tableState.setSelections([])}
          params={props?.service?.params}
          {...toolbar.deleted}
        />
      )}

      {/* 分割线 */}
      {(props?.toolbarAfter || props?.toolbarAfter?.length) && <span className="gap-wrapper">｜</span>}

      {/* 自定义节点 */}
      {props?.toolbarAfter}

      {/* 计算按钮 */}
      {toolbar?.calc?.auth && (
        <CalcButton idsKey={props?.rowKey} params={props?.service?.params} {...toolbar.calc} />
      )}

      {/* 分割线 */}
      {(toolbar?.bookmark?.auth || toolbar?.sort?.auth) && <span className="gap-wrapper">｜</span>}

      {/* 数据重排 */}
      {toolbar?.sort?.auth && (
        <>
          <MoveButton
            moveType="top"
            current={tableState.actionCurrent}
            dataSource={tableState.dataSource}
            {...toolbar.sort}
          />

          <MoveButton
            moveType="button"
            current={tableState.actionCurrent}
            dataSource={tableState.dataSource}
            {...toolbar.sort}
          />
        </>
      )}

      {/* 书签查找 */}
      {toolbar.bookmark?.auth &&
        (toolbar?.bookmark?.fieldProps?.customRender?.({
          findCurrentRowByFbookmarkBefore,
          findCurrentRowByFbookmarkAfter,
        }) || (
          <>
            <Button onClick={findCurrentRowByFbookmarkBefore}>
              <Tooltip title="向上查找书签">
                <ArrowUpOutlined />
              </Tooltip>
            </Button>

            <Button onClick={findCurrentRowByFbookmarkAfter}>
              <Tooltip title="向下查找书签">
                <ArrowDownOutlined />
              </Tooltip>
            </Button>
          </>
        ))}

      {/* 折叠展开 */}
      {!!toolbar?.expand && (
        <Button onClick={toggleExpandAll}>
          {!!tableState?.expandedRowKeys?.length ? (
            <Tooltip title="折叠全部">
              <ShrinkOutlined style={{ fontSize: 14 }} />
              {toolbar?.expand?.buttonText && (
                <span style={{ marginLeft: 2 }}>折叠{toolbar?.expand?.buttonText}</span>
              )}
            </Tooltip>
          ) : (
            <Tooltip title="展开全部">
              <ArrowsAltOutlined style={{ fontSize: 14 }} />
              {toolbar?.expand?.buttonText && (
                <span style={{ marginLeft: 2 }}>展开{toolbar?.expand?.buttonText}</span>
              )}
            </Tooltip>
          )}
        </Button>
      )}

      {/* 分割线 */}
      {(props?.toolbarLast || props?.toolbarLast?.length) && <span className="gap-wrapper">｜</span>}
      {props?.toolbarLast}

      {toolbarActionsSelection}
    </Space>
  );

  /** 自定义高级查询 */
  const seniorSearch = !!toolbar?.seniorSearch?.customKey && (
    <CustomQuery
      key="CustomQuery"
      customKey={toolbar?.seniorSearch?.customKey}
      customSearch={tableState.handleCustomSearch}
    />
  );

  /** 本地检索 */
  const [searchBarActionsOpen, setSearchBarActionsOpen] = useState<boolean>(false);
  const searchBarActions = !!props?.localRetrieval && (
    <AutoComplete
      onFocus={() => setSearchBarActionsOpen(true)}
      onChange={() => setSearchBarActionsOpen(true)}
      popupClassName="certain-category-search-dropdown"
      onDropdownVisibleChange={toolSearch.getSearchOptions}
      dropdownMatchSelectWidth={180}
      options={toolSearch.options}
      style={{ width: 180 }}
      backfill={true}
      open={searchBarActionsOpen}
    >
      <Input.Search
        onSearch={(v) => {
          if (v.trim() === '') {
            setSearchBarActionsOpen(true);
            return;
          }
          setSearchBarActionsOpen(false);
          toolSearch.setSearchOptions(v.trim());
          navigetToCurentBySearch(v.trim());
        }}
        placeholder={props?.localRetrieval?.placeholder}
      />
    </AutoComplete>
  );

  return {
    onRow,
    headerBarActions,
    searchBarActions,
    toolbarActions,
    seniorSearch,
  };
};

export default useTableAction;
