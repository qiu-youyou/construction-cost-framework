/*
 * @Author: SHUANG
 * @Date: 2023-08-15 14:09:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 15:27:03
 * @Description:
 */

import { ColProps } from 'antd';
import { ReactNode } from 'react';
import { ProFormColumnsType } from '@ant-design/pro-form';

/** from components */
import { BaseSchemaFormProps } from '../BaseSchemaForm/typings';
import type { ModalActionType } from '../BaseModal//typings';
import { BaseModalProps } from '../BaseModal/typings';

export type ActionButtonProps<T = any, U = any, ValueType = any> = {
  /**
   * @name buttonText 修改按钮文字
   * @description 默认渲染为一个按钮 如果你想渲染其他Dom
   * @type string
   */
  buttonText?: string;

  /**
   * @name trigger
   * @description 触发的Dom
   * @type ReactNode
   */
  trigger?: ReactNode;

  /**
   * @name disabled
   * @description 按钮是否禁用
   * @type boolean
   */
  disabled?: boolean;

  /**
   * @name triggerType
   * @description modal 触发效果默认  submit直接触发提交方法
   * @type modal | submit
   * @default modal
   */
  triggerType?: 'modal' | 'submit';

  /**
   * @name render
   * @description 自定义内容渲染 弹窗模式下生效
   * @type ReactNode
   */
  render?: ReactNode;

  /**
   * @name modalTitle
   * @description 弹窗的标题 当为 弹窗模式下生效
   * @default buttonText
   * @type string
   */
  modalTitle?: string;

  /**
   * @name idsKey
   * @description 默认为 ID
   */
  idsKey?: string;

  /**
   * @name current
   * @description 操作按钮操作的当前行
   * @default table.actionCurrent
   */
  current?: any;

  /**
   * @name selections
   * @description 批量操作时的勾选行
   * @default table.selections
   */
  selections?: any[];

  /**
   * @name auth
   * @description 该按钮是否有权限 是否有权限
   * @default true
   * @type boolean
   */
  auth?: boolean;

  /**
   * @name authKey
   * @description 除默认权限外 你还可以指定 authKey
   *              开启了 toolbarAuthority toolbar中 你就不需要再调用 useAuth相关
   * @type string
   * @default
   */
  authKey?: string;

  /**
   * @params
   * @description 触发提交方法携带的 参数
   * @default table service.params
   */
  params?: U;

  /**
   * @name pageParams
   * @description 当前页面参数 如果传入会在 submit params中返回
   * @default table pageSize pageNumber
   */
  pageParams?: { pageSize: number; pageNumber: number };

  /**
   * @name onSubmit
   * @description 提交方法 (params: { ids: string[]; billStatus: 3 | 4 }) => Promise
   */
  onSubmit?: (
    params: T, // 参数
    actionCurrent?: T, // 当前操作行
    actionSelections?: T[], // 被操作行 复制粘贴用
    other?: any, // 其他参数
  ) => Promise<FETCH.Res> | any;

  /**
   * @name onRefresh 内部组件方法
   * @description table和 tree的内部方法 如果你不想覆盖掉请使用 onSubmitFinish
   */
  onRefresh?: () => void;

  /**
   * @name onSubmitFinish
   * @description onSubmitFinish onSubmit返回后触发，刷新就是这个时候做的
   */
  onSubmitFinish?: (refresh?: () => void) => void;

  /**
   * @name columns
   * @description 弹窗传入 columns会自动生成表单
   */
  columns?: ProFormColumnsType<T, ValueType>[] | ProFormColumnsType<T, ValueType>[][];

  /**
   * @name grid
   * @description 表单开启 grid 模式
   */
  grid?: boolean;

  /**
   * @name ColProps
   * @description 在开启 grid 模式时传递给 Col
   */
  colProps?: ColProps;

  /**
   * @name modalPros
   * @description 弹窗配置项
   * @type BaseModalProps
   */
  modalProps?: BaseModalProps;

  /**
   * @name schemaFormProps
   * @description 表单配置项
   * @type BaseSchemaFormProps
   */
  schemaFormProps?: BaseSchemaFormProps | any;

  /**
   * @name confirmMessage
   * @description 提示消息
   * @type string
   */
  confirmMessage?: string;

  /**
   * 对外提供方法
   * @name open 打开弹窗
   * @name close 关闭弹窗
   */
  actionRef?: ModalActionType;

  /**
   * @name importType
   * @description 默认导入 选项导入
   * @type default | option
   * @default option
   */
  importType?: 'default' | 'option';

  /**
   * @name multiple
   * @description 导入功能是否支持批量导入
   * @default false
   * @type boolean
   */
  multiple?: boolean;

  /**
   * @name uploadParams
   * @description 导入功能携带的其他参数
   */
  uploadParams?: any;

  /**
   * @name exportType
   * @description 默认导入 选项导入
   * @type default | option
   * @default option
   */
  exportType?: 'default' | 'option';

  /**
   * @name exportParams
   * @description 导出功能携带的其他参数
   */
  exportParams?: any;

  /**
   * @name customkey
   * @description 高级查询使用的key
   */
  customKey?: string;

  /**
   * @name moveType
   * @description 上移下移移动按钮操作
   */
  moveType?: 'top' | 'bottom';

  /**
   * @name dataSource
   * @description 数据源 顺序交换内部使用
   */
  dataSource?: any;

  /**
   * @name actionContro
   * @description 当前操作的条件限制 目前只有删除有相关代码控制
   * @name equal 是否做相等判断 默认不等判断
   */
  actionControl?: { key: string; value?: string; message: string; equal?: boolean };

  /**
   * @name determineActionCurrent
   * @description 点击按钮触发事件 决定当前操作行 如果你不想触发该判断 指定为false
   *              当前只有 ModalButton 支持,这也强制了除操作外的自定义必须使用ModalButton
   */
  determineActionCurrent?: (() => void) | boolean;

  /**
   * @name tableSearchParams
   * @description 导出携带表格搜索以及高级查询参数
   */
  tableSearchParams?: {
    searchParams?: string;
    customKey?: string;
    customSearch?: string;
    pageSize?: number;
    pageNumber?: number;
  };

  accept?: string;
};
