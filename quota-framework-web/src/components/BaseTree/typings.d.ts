/*
 * @Author: SHUANG
 * @Date: 2022-06-16 15:29:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 14:30:08
 * @Description:
 */
import { Key, ReactNode } from 'react';
import { FieldNames } from 'rc-tree/lib/interface';

/** from components */
import { TableToolbarDefine, TableServiceDefine } from '../BaseTable/typings';

/** API 接口相关 */
export type TreeServiceDefine<T = any, U = any> = TableServiceDefine<T, U>;

/** onRowType */
export type TreeOnRowDefine<T = any> = {
  event?: 'select';
  selected?: boolean;
  node?: T;
  selectedNodes?: T;
  nativeEvent?: MouseEvent;
};

/** onCheckType */
export type TreeOnCheckDefine<T = any> = {
  event?: 'check';
  checked?: boolean;
  node?: T;
  checkedNodes?: T[];
  halfCheckedKeys?: boolean;
};

/** 对外报漏 Action 方法 */
export type TreeActionType<T = any> = {
  current: T;
  reload?: () => void;
  setTreeCurrent?: (record?: T) => void;
  setTreeSelections?: (record?: T[]) => void;
  setTreePasteSelections?: (record?: T[], actionsType?: 'copy' | 'mv') => void;
  clearTreePasteSelections?: () => void;
  setTreeExpanded?: (keys?: string[]) => void;
};

/** BaseTree Props
 *  T 列表项类型， U 对应params 类型, F 对应编辑表单类型
 */
export type BaseTreeProps<T = any, U = any, F = any> = {
  /** @name title 标题	React.ReactNode */
  title?: ReactNode;
  noHeader?: boolean;
  /** @name dataSource 如果手动传入DataSource 就不会出发 searvice query */
  dataSource?: T[];

  checkStrictly?: boolean; //	checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
  /**
   * TREE 的字段配置
   * @type FieldNames
   * @name key 默认为id 不可以没有
   * @name title 节点中渲染额标题
   * @name children 子节点的属性 默认为
   */
  fieldNames?: FieldNames;

  /** @name defaultExpandAll	默认展开所有树节点	boolean	false */
  defaultExpandAll?: boolean;

  /**
   * @default true 默认选中第一行
   * @name defaultCurrent 是否默认选中第一行
   * 如果传入行 则会选中该行   */
  defaultCurrent?: boolean | T;

  /**
   * @default true 默认选中返回字段中 check 为 true 的节点
   * @name defaultSelection 是否默认选中第一行
   * 如果传入行 则会选中该行   */
  defaultSelection?: boolean | T[];

  /** @name showLine 是否显示连接线 boolean true */
  showLine?: boolean;

  /** @name switcherIcon 自定义渲染 展开折叠的图标 */
  switcherIcon?: ReactNode;

  /** @name checkable 节点前添加 Checkbox 复选框	boolean	false */
  checkable?: boolean;

  /** @name titleRender 自定义渲染节点	(nodeData) => ReactNode  */
  titleRender?: (node: T) => React.ReactNode[];

  /**
   * Service TREE 关于网络请求的一些配置
   * @type TreeServiceDefine
   * @default { debounceTime: 10, manualRequest: false, revalidateOnFocus: false}
   * @name params dataSourceRequest的携带参数，修改之后会触发更新
   * @name debounceTime 防抖时间
   * @name manualRequest 是否手动触发请求
   * @name revalidateOnFocus 窗口聚焦时自动重新请求 可编辑表格不生效
   * @name dataSourceRequest 表格的原始数据加载方法 回调参数即可接收到相关参数
   */
  service?: TreeServiceDefine<T, U>;

  loadData?: (treeNode: T) => Promise<any>; //	异步加载数据

  /** onClick  事件触发 返回包含  */
  onClick?: (selectedKeys: Key[], info: TreeOnRowDefine<T>) => void;

  /** 勾选发生时触发 事件触发 返回包含  */
  onCheck?: (
    checked:
      | Key[]
      | {
          checked: Key[];
          halfChecked: Key[];
        },
    info: TreeOnCheckDefine<T>,
  ) => void;

  /** onCurrent 当前行发生改变触发
   * @name onCurrent 当前行 () => void */
  onCurrent?: (record?: T) => void;

  /** onSelections 当前勾选行发生改变触发
   * @name onCurrent 当前行 () => void */
  onSelections?: (record?: T[]) => void;

  /** actionRef */
  actionRef?: TreeActionType;

  /**
   * @name toolbarAuthority
   * @description toobar是否拥有权限 如果你想根据默认权限表生成权限配置为true 如果你想控制不配置即可
   * @default false
   */
  toolbarAuthority?: boolean;

  /** 操作区域渲染配置 同 table */
  toolbar?: false | TableToolbarDefine<F>;
  /**  在前面自定义渲染 */
  toolbarBefore?: JSX.Element;
  /**  在后面自定义渲染 */
  toolbarAfter?: ReactNode;
  /** 虚拟滚动定高 */
  height?: number;

  /** 父子节点强制关联 */
  autoExpandParent?: boolean;

  /** @name localRetrieval 本地检索 */
  localRetrieval?: boolean;

  localRetrievalPrefix?: boolean;
};
