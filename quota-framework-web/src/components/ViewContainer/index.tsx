/*
 * @Author: SHUANG
 * @Date: 2022-06-15 11:24:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-09 16:39:14
 * @Description: 框架视图
 */
import { ReactNode } from 'react';
/**
 * 页面级别容器 请只在根结点使用 否则无意义
 * @type ViewContainePropsType
 * @name scroll vh 页面试图 precent 百分比, maxContent 随内容，
 */

export type ViewContainePropsType = {
  scroll?: 'vh' | 'percent' | 'content';
  children?: ReactNode;
  className?: string;
};

const ViewContainerPropsDefault: ViewContainePropsType = {
  scroll: 'vh',
};

const ViewContainer = (propsDefine: ViewContainePropsType) => {
  const props = { ...ViewContainerPropsDefault, ...propsDefine };

  let className = 'viewContainerVh'; // 默认设置一个初始样式

  if (props.scroll === 'vh') {
    className = 'JDViewContainerVh';
  } else if (props.scroll === 'percent') {
    className = 'JDViewContainerPrecent';
  } else if (props.scroll === 'content') {
    className = 'JDViewContainerContent';
  }

  if (props.className) {
    className += ' ' + props.className;
  }

  return <div className={className}>{props.children}</div>;
};

export default ViewContainer;
