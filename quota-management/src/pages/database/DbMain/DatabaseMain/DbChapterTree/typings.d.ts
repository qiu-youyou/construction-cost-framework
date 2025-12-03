/*
 * @Author: SHUANG
 * @Date: 2023-10-16 11:24:15
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-24 17:58:37
 * @Description: 定额库定额册
 */

import { Dispatch } from 'react';

/** 定额册查询参数 */
export interface DbChapterQuery {
  dbId: string; // 定额库ID
}

/** 定额册数据项 */
export type DbChapterItem = {
  dbCode: string; // 库编码(冗余字段)
  dbSimple: string; // 库简称(冗余字段)
  dbPhase: string; // 阶段(冗余字段)
  chapterCode: string; // 章节目录编码
  chapterName: string; // 章节目录全称
  normFeeTypeName: string; // 取费名称
  chapterSimple: string; // 章节目录简称
  normFeeTypeId: string; // 取费ID
  chapterLog: string; // 章节修改记录
  chapterCodeOld: string; // 章节目录编码(老的)
  chapterNameOld: string; // 章节目录全称(老的)
  chapterSimpleOld: string; // 章节目录简称(老的)
  normFeeTypeNameOld: string; // 取费名称(老的)
  normFeeTypeIdOld: string; // 取费ID(老的)
  sourceDbId: string; // 来源ID
  children?: DbChapterItem[];
  id: string;
  dbId: string; // 定额库ID
};

/** 定额册保存数据 */
export type DbChapterSaveParams = Partial<DbChapterItem> & {
  dbId: string; // 定额库ID
  parentId: string; // 父id
  dbCode: string; // 库编码(冗余字段)
  dbSimple: string; // 库简称(冗余字段)
  dbPhase: string; // 阶段(冗余字段)
  currentChapterCode: string;
  leve?: string;
};

/** 章节说明查询参数 */
export interface DbChapterExtQuery {
  dbId: string; // 库ID
  id: string; // 章节ID
}

/** 章节说明查询结果 */
export type DbChapterExtItem = {
  chapterNode: string; // 章节说明
  chapterNodeOld: string; // 章节说明（老的）
};

export type PropsDbChapterTree = {
  /** 是否只读 */
  readonly?: boolean;
  /** 是否允许勾选 */
  checkable?: boolean;
  /** 父子节点选中状态关联 */
  checkStrictly?: boolean;
  /** 当前章节 已勾选 KEYS */
  dbChapterCheckedKeys?: string[];
  /** 当前章节 设置已勾选 KEYS */
  setDbChapterCheckedKeys?: Dispatch<React.SetStateAction<string[] | undefined>>;
  /** 当前章节 已勾选 KEYS */
  dbChapterHalfCheckedKeys?: string[];
  /** 当前章节 设置已勾选 KEYS */
  setDbChapterHalfCheckedKeys?: Dispatch<React.SetStateAction<string[] | undefined>>;

  /** 章节数据源 */
  dbChapterDataSource?: DbChapterItem[];
  /** 章节数据源 */
  setDbChapterDataSource?: Dispatch<React.SetStateAction<DbChapterItem[] | undefined>>;

  /** 当前章节默认选中 */
  dbChapterDefaultCurrent?: Partial<DbChapterItem>;
};
