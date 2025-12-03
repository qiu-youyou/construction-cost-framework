/*
 * @Author: SHUANG
 * @Date: 2024-04-08 15:24:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 17:05:30
 * @Description: 树形字典维护
 */

import { Dispatch, SetStateAction } from 'react';

/** 树形字典目录维护 目录 数据项 */
export type DictTreeClassItem = {
  billSort: string; //	顺序
  billStatus: string; //	状态
  classEn: string; //	字典目录编码
  className: string; //	字典目录名称
  classRemarks: string; //	字典目录描述
  id: string; // 主键
};

/** 树形字典目录维护 字典 数据项 */
export type DictTreeItem = {
  businessId: string; // 字典目录ID
  classEn: string; // 字典目录编码
  id: string; // 主键
  itemCode: string; // 字典编码
  itemName: string; // 字典名称
  itemRemarks: string; // 字典描述
  billStatus: string;
};

export type DictTreeProps = {
  /** 当前目录、设置当前目录 */
  dictTreeClassCurrent?: DictTreeClassItem;
  setDictTreeClassCurrent?: Dispatch<SetStateAction<DictTreeClassItem | undefined>>;

  /** 当前字典、设置当前字典 */
  dictTreeItemCurrent?: DictTreeItem;
  setDictTreeItemCurrent?: Dispatch<SetStateAction<DictTreeItem | undefined>>;
};
