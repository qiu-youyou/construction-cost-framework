/*
 * @Author: SHUANG
 * @Date: 2022-06-17 13:56:52
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-12 15:34:44
 * @Description:
 */

import { TabsProps } from 'antd';
import { ReactNode } from 'react';

/**
 * @type BaseCardPorpsDefine
 * @name type H1 为一级标题效果 H2 为二级标题效果 默认 H1
 * @name title 标题	React.ReactNode
 * @name subTitle	副标题	React.ReactNode
 * @name headerBordered	页头是否有分割线	boolean	true
 * @name children 内容区域元素
 * @name extra 额外的渲染区域 自定义
 * @name extraCollapsed 额外的展开功能 boolean false H2 时 为 true
 * @name extraFullScreen 额外的 全屏功能 boolean true
 * @name noHeader 不渲染顶部标题区域
 */
export type BaseCardProps = {
  type?: 'H1' | 'H2';
  children?: ReactNode;
  title?: ReactNode;
  subTitle?: ReactNode;
  extra?: ReactNode;
  headerBordered?: boolean;
  extraCollapsed?: boolean;
  extraFullScreen?: boolean;
  /** @name bordered 卡片是否有边框  */
  bordered?: boolean;

  noHeader?: boolean;
  /** 标签页功 标签页配置
   * @name activeKey	当前选中项	string	-
   * @name type	页签的基本样式，可选 line、card、editable-card 类型	string	inline
   * @name onChange	回调	(activeKey: string) => void; -
   * 更多属性见 antd Tab API 描述
   */
  tabs?: TabsProps;
};
