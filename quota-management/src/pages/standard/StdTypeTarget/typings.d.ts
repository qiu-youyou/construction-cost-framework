/*
 * @Author: SHUANG
 * @Date: 2023-11-10 09:12:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 15:58:07
 * @Description: 标准库-工程量分类库
 */

import { Dispatch, ReactNode } from 'react';

/** 标准库-工程量分类库 数据项 */
export type OtherTypeApiItem = {
  id: string; // 工程量分类库ID
  kpiIndex: string; // 材料编号(预留字段)
  kpiCode: string; // 指标分类代码(预留字段)
  kpiName: string; // 指标分类名称
  kpiUnit: string; // 指标分类单位
};

/**
 * 标准库-工程量分类库 PROPS
 * @name readonly 是否只读
 */
export type PropsStdTypeTarget = {
  /** 是否只读 */
  readonly?: boolean;
  /** 操作栏 插槽 */
  toolbarSlot?: ReactNode;

  /** 指标类型 当前选中 */
  otherTypeApiCurrent?: OtherTypeApiItem;
  /** 指标类型 设置当前选中 */
  setOtherTypeApiCurrent?: Dispatch<React.SetStateAction<OtherTypeApiItem | undefined>>;
  /** 指标类型 双击行事件 */
  onDoubleClick?: () => void;
};
