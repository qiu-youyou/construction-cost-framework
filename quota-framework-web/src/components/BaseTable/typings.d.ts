/*
 * @Author: SHUANG
 * @Date: 2022-06-02 09:46:45
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-25 17:51:28
 * @Description: 该组件是基于 ant 基础二次封装的，详细的基础文档请查阅 ant
 */
import { ReactNode } from 'react';
import type { TablePaginationConfig, TooltipProps } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import type { SearchConfig } from '@ant-design/pro-table/lib/components/Form/FormRender';
import { ColumnsStateType, TableRowSelection } from '@ant-design/pro-table/lib/typing';
import { ExpandableConfig, RowSelectMethod } from 'antd/lib/table/interface';
import { ToolBarProps } from '@ant-design/pro-table/lib/components/ToolBar';
import { RowEditableConfig } from '@ant-design/pro-utils';

/** from components */
import { ActionButtonProps } from '../ActionButton/typings';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

/**
 * TABLE PROPS
 * T 列表项类型， U 对应params 类型 , F 对应编辑表单类型，
 */
export type BaseTableProps<T = any, U = any, F = any, ValueType = 'text'> = {
  /**
   * @name rowKey
   * @description 表格数据行 唯一key, 默认id, 如果为 false 内部默认生成随机id使用
   * @type string | false
   * @default id
   */
  rowKey?: string | false;

  /**
   * @name className
   * @description 自定义 class
   * @type string
   */
  className?: string;

  /**
   * @name persistenceKey
   * @description 每个Table唯一 用于判断是否是同一个 table, 也是持久化列的 key
   * @type string
   */
  persistenceKey: string;

  /**
   * @name columns
   * @description 表格列定义
   * @type TableColumnsDefine<T>
   */
  columns: TableColumnsDefine<T>;

  /**
   * @name columnsDynamic
   * @description 是否开启动态列 支持 columns useState变量 传入
   * @type boolean
   * @default false
   */
  columnsDynamic?: boolean;

  /**
   * @name service
   * @description 表格关于网络请求的配置
   * @type TableServiceDefine<T, U>
   */
  service?: TableServiceDefine<T, U>;

  /**
   * @name search
   * @description 表格搜索表单的配置
   * @type TableSearchDefine
   */
  search?: TableSearchDefine;

  /**
   * @name pagination
   * @description 表格分页器的配置
   * @type TablePaginationDefine
   */
  pagination?: TablePaginationDefine;

  /**
   * @name editable
   * @description 表格的单元格编辑功能配置
   * @type RowEditableConfig
   */
  editable?: RowEditableConfig<unknown>;

  /**
   * @name cellEditable
   * @description 表格是否开启行编辑 影响性能 想让列配置的 edit生效 必须为true
   * @type boolean
   * @default false
   */
  cellEditable?: boolean;

  /**
   * @name rowSelection
   * @description 批量选择行的配置 所有表格默认有 selection 列 不需要请配置 false
   * @type TableSelectionDefine
   */
  rowSelection?: TableSelectionDefine;

  /**
   * @name defaultSelection
   * @description 是否默认选中 check为true 的节点, 如果传入的是节点将默认选中
   * @type boolean | RowItem[]
   * @default true
   */
  defaultSelection?: boolean | T[];

  /**
   * @name onSelections
   * @description 批量选择行发生改变事件
   * @type (selections?: rowItem[], selectionsMethod?: RowSelectMethod) => void
   * @type RowSelectMethod = "none" | "all" | "multiple" | "invert" | "single" | "cancel"
   */
  onSelections?: (selections?: T[], selectionsMethod?: RowSelectMethod | 'cancel') => void;

  /**
   * @name rowCurrent
   * @description 表格是否支持当前行 所有表格默认支持当前行高亮 不需要配置 false
   * @type boolean
   * @default true
   */
  rowCurrent?: boolean;

  /**
   * @name defaultCurrent
   * @description 表格是否默认选中第一行数据 如果传入节点默认选中节点
   * @type boolean | RowItem
   * @default true
   */
  defaultCurrent?: boolean | T;

  /**
   * @name onCurrent
   * @description  表格当前行发生改变
   * @type (v?: RowItem) => void
   */
  onCurrent?: (v?: T) => void;

  /**
   * @name onCurrent
   * @description 表格每一行发生单击时出触发
   * @type (v?: RowItem) => void
   */
  onClick?: (v?: T, index?: number) => void;

  /**
   * @name onActionCurrent
   * @description 表格当前操作行发生改变时触发
   */
  onActionCurrent?: (v?: T) => void;

  /**
   * @name onDoubleClick
   * @description 行双击事件 这里期待和你一个约定好的返回值 将会触发行操作不同的效果
   * @default 默认通过权限判断出发 编辑 或是查看 可以自定义
   */
  onDoubleClick?: (v?: T, index?: number) => void | TableRowOnDoubleClickDefine;

  /**
   * @name expandable
   * @description 树形表格的展开和收缩
   * @default 组件内部已经有一套逻辑
   */
  expandable?: ExpandableConfig<T>;

  /**
   * @name columnsState
   * @description 表格自定配置能力
   * @type ColumnsStateType
   */
  columnsState?: ColumnsStateType;

  /**
   * @name pattern
   * @description 关于 Table 的样式配置
   * @type TablePatternDefine
   */
  pattern?: TablePatternDefine;

  /**
   * @name 自定义处理合计行
   * @description 如果你觉得组件内部默认处理的不够完美 你可以通过该函数自定义
   */
  summary?: string[];

  /**
   * @name requestSummary
   * @description 通过后端接口返回other显示和合计行
   */
  requestSummary?: boolean;

  /**
   * @name summaryCalc
   * @description 自定义处理合计行
   */
  summaryCalc?: (pageData?: any) => ReactNode;

  /**
   * @name localRetrieval
   * @description 开启表格的本地检索功能 类似于浏览器的 ctrl + F (实验性)
   * @type
   */
  localRetrieval?: any;

  /**
   * @name toolbarExtra
   * @description Table 头部右侧工具栏 自定义渲染部分 （实验性）
   * @type
   */
  toobarExtra?: any;

  /**
   * @name toolBarRender
   * @description Table 工具栏区域、false 为隐藏、也可以传入自定义函数
   * @type
   */
  toolBarRender?: ToolBarProps<T>['toolBarRender'] | false;

  /**
   * @name moduleKey
   * @description Table 的模块名称 如果传入那么该模块相关功能将会显示 比如帮助文档 帮助视频等 （实验性）
   */
  moduleKey?: string;

  /**
   * @name virtual
   * @description 是否开启虚拟滚动方案 实现 100000 条数据渲染
   * @type boolean
   * @default true
   */
  virtual?: boolean;

  /** 有时我们要手动触发 table 的 reload 等操作，可以使用 actionRef */
  actionRef?: TableActionType<T>;

  /**
   * @name toolbarAuthority
   * @description toobar是否拥有权限 如果你想根据默认权限表生成配置为true 如果你想控制不配置即可
   * @default false
   */
  toolbarAuthority?: boolean;

  /**
   * @name columnEmptyText
   * @description 列值为空时 显示的文本
   * @type string
   * @default ''
   */
  columnEmptyText?: string;

  /**
   * @name columnDigitNilText
   * @description 列值为0时 显示的文本 只有 digit 列支持
   * @type string
   * @default 0
   */
  columnDigitNilText?: string;

  /**
   * @name columnSortable
   * @description table 所有列是否支持排序 排序统一配置 你也可以在 columnItem 中配置
   * @type boolean
   * @default false
   */
  columnSortable?: boolean;

  /** 操作区域渲染配置 */
  toolbar?: false | TableToolbarDefine<F, U>;

  /** 第一 */
  toolbarFirst?: ReactNode;
  /**  在前面自定义渲染 */
  toolbarBefore?: ReactNode;
  /** 在主要按钮的后面 */
  toolbarPrimary?: ReactNode;
  /**  在后面自定义渲染 */
  toolbarAfter?: ReactNode;
  /** 在后面自定义渲染 */
  toolbarEnd?: ReactNode;
  /** 在最后自定义渲染 */
  toolbarLast?: ReactNode;
  /** 在中间自定义渲染 状态按钮和 操作按钮中间 */
  toolbarCenter?: ReactNode;

  /**
   * @name rowClassName
   * @description 表格每一行自定义类名 已经提供了一部分样式
   * @type (v?: RowItem, index?: number) => TableRowClassDefine
   */
  rowClassName?: (v?: T, index?: number) => TableRowClassDefine;

  /** 工具栏显示视频播放 以及帮助文档 传入模块key */
  // moduleKey?: ModuleKey;

  /**
   * @name maxHeight
   * @description Table的最大高度 定义表格最大高度,经常用于固定在一个card内的Table
   */
  maxHeight?: number;

  /**
   * @name minHeight
   * @description Table的最小高度 定义表格最小高度,经常用于固定在一个card内的Table
   */
  minHeight?: number;

  /**
   * @name initNextTick
   * @description 等待。。。再渲染
   */
  initNextTick?: boolean;

  /** 根据 total 计算表格高度 一般用于树形表格 */
  calcTotal?: any;

  /** 搜索之前进行一些修改 */
  beforeSearchSubmit?: (params: T, columns: TableColumnsDefine<T>) => any;

  /**
   * @name noLoading
   * @discription 禁用loading
   * @default false
   * @type boolean
   */
  noLoading?: boolean;

  /**
   * @name showSorterTooltip
   * @description 表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性
   * @type boolean | Tooltip props
   * @default true
   */
  showSorterTooltip?: boolean | TooltipProps;
};

/** params */
type FetchParamsType = any;

/** 列配置 */

/** 扩展配置 */
type CusProColumns<T> = ProColumns<T> & {
  /** @name cellEdit 返回一个 boolean 控制是否可编辑 allowEdit ; */
  cellEdit?: boolean | ((entity: T, index: number) => boolean);
  sortable?: boolean;

  /** @name selectWritingIn 选择器是否支持输入 */
  selectWritingIn?: boolean;

  children?: CusProColumns<T>[];
  /** 这里弃用了render */
  customRender?: ProColumns<T>['render'];
  /** 这里弃用了 fieldProps */
  customFieldProps?: ProColumns['fieldProps'];
};

export type TableColumnsDefine<T> = CusProColumns<T>[];

/** 搜索
 * @name filterType 过滤表单类型
 * @name searchText 查询按钮的文本
 * @name resetText 重置按钮的文本
 * @name submitText 提交按钮的文本
 * @name labelWidth 标签的宽度
 * @name span 配置查询表单的列数
 * @name className 封装的搜索 Form 的 className
 * @name collapseRender 收起按钮的 render
 * @name defaultCollapsed 默认是否收起
 * @name collapsed 是否收起
 * @name onCollapse 收起按钮的事件
 * @name optionRender 自定义操作栏
 * @name showHiddenNum 是否显示收起之后显示隐藏个数
 */
export type TableSearchDefine = SearchConfig | false;

/**
 * 分页
 * @name size 分页器 尺寸
 * @name postion 分页器在表格四周的位置
 * @name showQuickJumper 显示 跳转到第几页 按钮
 * @name pageSizeOptions 分页器 切换页数
 * @name pageSize 分页起 每页大小
 */
export type TablePaginationDefine = TablePaginationConfig | false;

/** 行编辑 */
export type TableEditableDefine = RowEditableConfig<unknown>;

/**
 * 行选择
 * @name type 多选/单选 checkbox
 * @name checkStrictly 父子数据选中状态不再关联 true
 * @name columnTitle 自定义列表选择框标题
 * @name columnWidth columnWidth
 * @name fixed 把选择框列固定在左边 true
 * @name hideSelectAll 	隐藏全选勾选框与自定义选择项 false
 * @name selections selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
 * @name revert 刷新数据后 是否默认恢复勾选 true
 */
export type TableSelectionDefine = (TableRowSelection & { revert?: boolean }) | false;

/** 行事件 */
export type TableRowOnClickDefine = {};

export type TableRowOnDoubleClickDefine = {
  trigger: 'edit' | 'editOther' | 'editMore' | 'details' | 'target' | 'none';
};

/** BaseTable 样式 */
export type TablePatternDefine = {
  /** @name striped 表格是否拥有斑马条纹样式 */
  striped?: boolean;

  /** @name bordered 表格每个单元格是否拥有边框 */
  bordered?: boolean;

  /** @name bordered Table 和 Search 外围 Card 组件的边框 */
  cardBordered?: boolean;

  /**  @name scrollToFirstRowOnChange */
  scrollToFirstRowOnChange?: boolean;

  /**  @name defaultSize 默认的表格大小 *
  defaultSize?: 'small' | 'middle' | 'large';

  scrollX?: string | number | true | 'max-content';
  scrollY?: string | number;
};

/**
 * 操作按钮配置
 * @name trigger 触发的Dom
 * @name triggerType 触发效果 默认 弹窗 状态改变为 confirm
 * @name render 内容渲染 弹窗模式下生效
 * @name modalTitle 弹窗的标题 当为 弹窗模式下生效
 * @name auth 是否有权限
 * @name current 当前选中行
 * @name dataLength 已经选中的数据条数 在状态按钮下有效
 * @name idsKey 默认为 RowKey
 * @name onSubmit 提交方法 (params: { ids: string[]; billStatus: 3 | 4 }) => Promise
 */
type ItemTypeCus = ItemType & { onSubmit?: ActionButtonProps['onSubmit'] };
export type TableToolbarDefine<F = unknown, U = any> = {
  /** 添加按钮 */
  plus?: ActionButtonProps<F & U>;
  /**
   * 添加空行 params 中携带 {currentId & billSort}
   * @name currentId 目标行 ID
   * @name billSort 目标行 排序
   */
  plusLine?: ActionButtonProps<F & U>;
  /** 添加层级 */
  plusLevel?: ActionButtonProps<F & U>;
  /** 添加更多 */
  plusMore?: ActionButtonProps<F & U>;
  plusOther?: ActionButtonProps<F & U>;
  /** 编辑按钮 */
  edit?: ActionButtonProps<F & U>;
  editMore?: ActionButtonProps<F & U>;
  editOther?: ActionButtonProps<F & U>;
  /** 查看按钮 */
  details?: ActionButtonProps;
  detailsMore?: ActionButtonProps;

  /** 启用 */
  enable?: ActionButtonProps<FETCH.UpStatus>;
  /** 禁用按钮 */
  disable?: ActionButtonProps<FETCH.UpStatus>;
  /** 计算按钮 */
  calc?: ActionButtonProps<U>;
  /** 删除按钮 */
  deleted?: ActionButtonProps<FETCH.UpStatus & U>;

  /** 展开折叠 */
  expand?: ActionButtonProps;
  expandStart?: ActionButtonProps;
  /** 数据重排 */
  sort?: ActionButtonProps;
  sortStart?: ActionButtonProps;
  /** 高级查询 */
  seniorSearch?: ActionButtonProps;
  /** 导入 */
  import?: ActionButtonProps;
  /** 导出 */
  export?: ActionButtonProps & {
    /**
     * @name options
     * @description 当 exportType 为 'option' 时生效
     * @default  {
                  onClick: (item, download) => download(res),
                  items: [
                    { key: 'N', label: <Button type="link">导出当页</Button> },
                    { key: 'Y', label: <Button type="link">导出全部</Button> },
                  ],
                };
     * @type BaseDropDownProps['menu']
     */
    options?: {
      items: ItemTypeCus[];
      onClick?: (item: { key: string }, download?: (res: any) => void) => void;
    };
  };

  exportOther?: TableToolbarDefine['export'];

  /** 书签定位 */
  bookmark?: ActionButtonProps & {
    fieldProps?: {
      /**
       * @name fieldKey
       * @default detailMark
       * @description 标记为书签的key
       * @type string
       */
      fieldKey?: string;
      /**
       * @name fieldValue
       * @default Y
       * @description 标记为书签的值
       * @type any
       */
      fieldValue?: any;
      /**
       * @name customRender
       * @description 自定义渲染
       * @type Function
       */
      customRender?: (props: {
        findCurrentRowByFbookmarkBefore: () => void;
        findCurrentRowByFbookmarkAfter: () => void;
      }) => ReactNode;
    };
  };

  /** 复制 剪切 粘贴
   * @name copyIds 被操作的数据的key 数组  - string[];
   * @name actionsType 操作类型 剪切 ｜ 复制 -  'mv' | 'copy';
   * @name option 兼容 actionsType -  'mv' | 'copy';
   * @name currentId 目标行Key - string | number;
   * @name billSort 目标行顺序标识 - string | number;
   */
  copy?: ActionButtonProps & {
    fieldProps?: {
      /**
       * @name clickTrigger
       * @description 按钮点击时触发 一个失败的Promise可阻断触发效果
       * @type (selections, actionType) => Promise<FETCH.Res>
       */
      clickTrigger?: (
        selections?: any[], // 被操作行
        actionType?: 'copy' | 'mv', // 复制 ｜ 剪切
      ) => Promise<FETCH.Res>;
    };
  };
};

/** 手动触发 */
export type TableActionType<T = any> = {
  current: any;
  /** @name reload 刷新当前表 保持当前关联的参数状态 及分页 */
  reload?: (resetPageIndex?: boolean) => void;
  reloadNoLoading?: (resetPageIndex?: boolean) => void;
  /** @name setTableCurrent 设置表格当前行 */
  setTableCurrent?: (record?: T) => void;
  /** @name setTableSelection 设置表格勾选行 */
  setTableSelection?: (record?: T) => void;
  /** @name clearTablePasteSelection 清除表格粘贴勾选行 */
  clearTablePasteSelections?: () => void;
  /** Table 滚动到某个位置 */
  tableScrollTo?: (index: number) => void;
  /** ref类型 | 勾选项 与数据源 checked 相比的变化项 依赖于数据源的 checked 如无 需添加 */
  selectChangedItems?: { current: T[] };
};

/** 表格请求配置 */
export type TableServiceDefine<RowItem, Parameter = any> = {
  /** @name params dataSourceRequest的携带参数，修改之后会触发更新 新增编辑也会携带 */
  params?: Parameter;

  /** @name debounceTime 防抖时间 */
  debounceTime?: number;

  /** @name manualRequest 是否手动触发请求 */
  manualRequest?: boolean;

  /** @name 窗口聚焦时自动重新请求 可编辑表格不生效 */
  revalidateOnFocus?: boolean;

  /** @name dataSourceRequest 表格的原始数据加载方法 回调参数即可接收到相关参数 */
  dataSourceRequest?: (
    v: { pageSize?: number; pageNumber?: number } & Parameter,
  ) => Promise<FETCH.Res<RowItem>>;

  /**  @name cellParams 行内编辑除固定参数外的的参数 */
  cellParams?: Parameter;

  cellEditSaveRequest?: (
    v: FETCH.CellEditReq,
    params?: Parameter,
    cellParams?: Parameter,
    entity?: RowItem,
    entitySource?: RowItem
  ) => Promise<FETCH.Res<RowItem> | FETCH.Row<RowItem>>;
};

/** 行类名 自带样式 */
export type TableRowClassDefine =
  | 'ant-table-row-currented'
  | 'ant-table-row-mainAnnulY-currented'
  | 'ant-table-row-mainAnnulD-currented'
  | 'ant-table-row-deletion-currented'
  | 'ant-table-row-mainAnnulY'
  | 'ant-table-row-mainAnnulD'
  | 'ant-table-row-deletion'
  | 'ant-table-row--striped'
  | 'ant-table-row-copy'
  | 'ant-table-row-cut'
  | '';
