/*
 * @Author: SHUANG
 * @Date: 2023-07-20 11:38:33
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-20 13:46:49
 * @Description: Split 面板分割
 */

import { ReactNode } from 'react';

export type SplitPaneProps = {
  /**
   * @name 类型，可选值为`horizontal`或`vertical`
   * @default horizontal
   */
  mode?: 'horizontal' | 'vertical';

  /**
   * @name 是否允许面板调整大小-boolean
   * @default true
   */
  draggable?: boolean;

  /**
   * @name 显示操作按钮
   * @type `left` | `right`  | `all` | false
   * @default all
   */
  dragButton?: 'left' | 'right' | 'all' | false;

  /**
   * @name 设置拖拽的工具条，是否可见
   * @default: true
   */
  dragVisiable?: boolean | number[];

  /** @name 包裹内容 */
  children?: ReactNode;
};
