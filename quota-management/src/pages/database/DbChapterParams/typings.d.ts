/*
 * @Author: SHUANG
 * @Date: 2023-11-02 15:39:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-03 18:36:49
 * @Description: 企业定额库 - 章节参数设置
 */

import { Dispatch } from 'react';
import { DatabaseDbItem } from '../DbMain/DatabaseMain/typings';

/** 查询章节参数 参数 */
export interface DbChapterParamsQuery {
  dbId: string; // 数据库ID
}

/** 章节参数数据项 */
export type DbChapterParamsItem = {
  id: string;
  dbId: string; // 数据库ID;
  parentId: string; // 父节点ID
  paramsNames: string; // 参数数组
  chapterCode: string; // 章节目录编码
  chapterName: string; // 章节目录全称
  chapterSimple: string; // 章节目录简称
  children?: DbChapterParamsItem[];
};

/** 章节参数保存 */
export type DbChapterParamsSave = {
  dbId: string; // 数据库ID
  chapterId: string; // 章节ID
  id: string; // 修改参数一类型 id =1 以此类推
  paramsName: string; // 修改字符串
  billSort: string; // 修改参数一类型 billSort =1 以此类推
};

/**
 * 当前定额库 章节参数模块向下传递的Props
 * @name dbDataSource 定额数据库源数据
 * @name databaseCurrent 当前选中定额库
 * @name setDatabaseCurrent 设置当前选中定额库
 */

export type DbChapterParamsProps = {
  /** 定额数据库源数据 */
  dbDataSource?: DatabaseDbItem[];
  /** 当前选中定额库 */
  databaseCurrent?: DatabaseDbItem;
  /** 设置当前选中定额库 */
  setDatabaseCurrent?: Dispatch<React.SetStateAction<DatabaseDbItem | undefined>>;
};
