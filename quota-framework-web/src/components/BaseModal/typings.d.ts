/*
 * @Author: SHUANG
 * @Date: 2022-06-23 09:18:52
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-18 11:08:16
 * @Description: 该组件是基于 ant 基础二次封装的，详细的基础文档请查阅 ant
 */

import { CSSProperties, ReactNode } from 'react';

/** 对外报漏 Action 方法 */
export type ModalActionType = {
  current: any;
  open?: () => void;
  close?: () => void;
};

/** 弹窗组件的 API
 * @type BaseModalProps */
export type BaseModalProps<> = {
  /**
   * @name title
   * @description 弹窗的标题
   * @type string
   */
  title?: string;

  /**
   * @name width
   * @description 弹窗的宽度
   * @type number | string
   * @default 458px
   */
  width?: number;

  /**
   * @name style
   * @description 可用于设置浮层的样式，调整浮层位置等
   * @type CSSProperties
   */
  style?: CSSProperties & { top?: number };

  /**
   * @name trigger
   * @description 触发的弹窗显示的DOM节点 当然你也可以通过Ref 来触发
   * @type ReactNode
   */
  trigger?: ReactNode;

  /**
   * @name defaultFullScreen
   * @description 是否默认全屏幕
   * @type boolean
   * @default false
   */
  defaultFullScreen?: boolean;

  /**
   * @name mask
   * @description 是否显示遮罩层 如果你关闭了遮罩层，那么弹窗后面的元素就可以被操作
   * @type boolean
   * @default true
   */
  mask?: boolean;

  /**
   * @name maskClosable
   * @description 点击蒙层是否允许关闭
   * @type boolean
   * @default false
   */
  maskClosable?: boolean;

  /**
   * @name destroyOnClose	关
   * @description 闭时销毁 Modal 里的子元素
   * @type boolean
   * @default true
   */
  destroyOnClose?: boolean;

  /**
   * @name children
   * @description 包裹渲染的DOM
   * @type ReactNode
   */
  children?: ReactNode;

  /**
   * @name footer
   * @description 底部内容，当不需要默认底部按钮时 footer={null}, 也可以自定义
   * @type null | ReactNode
   * @default (取消确认按钮)
   */
  footer?: null | ReactNode;

  /**
   * @name noFooter
   * @description 当你不需要弹窗页脚时
   * @type boolean
   * @default false
   */
  noFooter?: boolean;

  /**
   * @name submiterAsHeader
   * @description submiter相关的按钮是否显示在顶部
   * @type boolean
   * @default false
   */
  submiterAsHeader?: boolean;

  /**
   * @name showText
   * @description 不触发只显示的Dom节点
   * @type ReactNode
   */
  showText?: ReactNode;

  /**
   * @name cancelText
   * @description 取消按钮文字
   * @type ReactNode
   * @default 取消
   */
  cancelText?: ReactNode;

  /**
   * @name okText
   * @description 确认按钮文字
   * @type ReactNode
   * @default 确定
   */
  okText?: ReactNode;

  /**
   * @name keyboardESC
   * @description 是否支持键盘 ESC 按键关闭
   * @type boolean
   * @default true
   */
  keyboardESC?: boolean;

  /**
   * @name visible
   * @description 对话框默认是否可见; 当你不想通过trigger来触发
   * @type boolean
   * @default false
   */
  visible?: boolean;

  /**
   * @name actionRef
   * @description Modal的引用 便于自定义触发
   * @type ModalActionType
   */
  actionRef?: ModalActionType;

  /**
   * @name triggerControl
   * @description 触发弹窗时的 返回 FETCH.ERROR 会阻止弹窗的打开
   * @type () => Promise<FETCH.Row>
   */
  triggerControl?: () => Promise<FETCH.Row> | any;

  /**
   * @name onCancel
   * @description 点击遮罩层或右上角叉或取消按钮的回调
   * @type function(e)
   */
  onCancel?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;

  /**
   * @name onEnter
   * @description 点击确定回调
   * @type function(e)
   */
  onEnter?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;

  /**
   * @name onSubmit
   * @description 提交时触发 将会有loading状态，等待一个FETCHRE 成功自动关闭。失败提示msg
   * @type () => Promise<FETCH.Row>
   */
  onSubmit?: () => Promise<{}> | any;

  /**
   * @name afterClose
   * @description 弹窗完全关闭后的回调
   * @type () => void
   */
  afterClose?: () => void;

  /**
   * @name beforeOpen
   * @description 弹窗还未打开前的回调
   * @type () => void
   */
  beforeOpen?: () => void;

  /**
   * @name wrapClassName
   * @description 对话框外层容器的类名
   * @type string
   */
  wrapClassName?: string;
};
