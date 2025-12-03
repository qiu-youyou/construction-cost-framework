/*
 * @Author: SHUANG
 * @Date: 2023-10-16 11:19:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-24 10:37:51
 * @Description: 企业定额库
 */

import { Dispatch } from 'react';
import { DbMatClassifyItem } from './DataBasePane/DbMat/DbMatClassifyTree/typings';
import { DbChapterItem } from './DbChapterTree/typings';

/**
 * 当前目录类型（人材机 机械台班 混凝土配合比）
 * rcj[人材机]、machine[机械台班]、concrete[混凝土] & databaseDesc[册编制说明]、 dbChapterDesc[章节说明]、dbNorm[定额]、fee[取费]
 */
export type ClassifyRjcType = 'rcj' | 'machine' | 'concrete' | 'databaseDesc' | 'dbChapterDesc' | 'dbNorm';

/**
 * 当前定额库维护模块向下传递的Props
 * @name dbDataSource 数据库数据源
 * @name reloadDbDataSource 数据库数据源 加载数据源
 *
 * @name databaseCurrent 数据库 当前选中
 * @name setDatabaseCurrent 数据库 设置当前选中
 *
 * @name dbChapterCurrent 定额册章节 当前选中
 * @name setDbChapterCurrent 定额册章节 设置当前选中
 *
 * @name dbMatClassifyCurrent MAT章节 当前选中
 * @name setDbMatClassifyCurrent MAT章节 设置当前选中
 *
 * @name dbMatClassifyCurrent 取费目录 当前选中
 * @name setDbFeeDirectoryCurrent 取费目录 设置当前选中
 *
 * @name classifyRjcType 目录类型 当前
 * @name setClassifyRjcType 目录类型 设置当前
 */
export type DataBaseProps = {
  /** 数据库数据源 */
  dbDataSource?: DatabaseDbItem[];
  /** 数据库数据源 加载数据源 */
  reloadDbDataSource?: (data?: any) => Promise<DatabaseDbItem[]> | void;

  /** 数据库 当前选中 */
  databaseCurrent?: DatabaseDbItem;
  /** 数据库 设置当前选中 */
  setDatabaseCurrent?: Dispatch<React.SetStateAction<DatabaseDbItem | undefined>>;

  /** 定额册章节 当前选中 */
  dbChapterCurrent?: DbChapterItem;
  /** 定额册章节 设置当前选中 */
  setDbChapterCurrent?: Dispatch<React.SetStateAction<DbChapterItem | undefined>>;

  /** MAT章节 当前选中 */
  dbMatClassifyCurrent?: DbMatClassifyItem;
  /** MAT章节 设置当前选中 */
  setDbMatClassifyCurrent?: Dispatch<React.SetStateAction<DbMatClassifyItem | undefined>>;

  /**
   *  目录类型 当前
   * rcj[人材机]、machine[机械台班]、concrete[混凝土]
   * & databaseDesc[册编制说明]、 dbChapterDesc[章节说明]、dbNorm[定额]
   */
  classifyRjcType?: ClassifyRjcType;
  /** 目录类型 设置当前 */
  setClassifyRjcType?: Dispatch<React.SetStateAction<ClassifyRjcType>>;

  /** 章节对应面板显示配置 */
  classifyRjcTypePane?: ClassifyRjcType[];

  /** 定额明细表 ToolBarSlot */
  dbNormTableToolbarSlot?: React.ReactNode;

  /** 当前模块是否只读 */
  readonly?: boolean;

  /**树结构默认选中数据 */
  dbChapterDefaultCurrent?: { id: string };
};

/**
 * DbMain Props
 * @name classifyRjcTypePane 章节对应面板显示配置
 * @name databaseCurrentDefault 数据库 当前模块默认选中
 *
 * @name setDatabaseCurrent 数据库 设置当前数据库
 * @name ToolBarSlot 定额明细表 toolBar
 * @name readonly 当前模块是否只读
 */
export type PropsDbMain = {
  /** 章节对应面板显示配置 */
  classifyRjcTypePane?: ClassifyRjcType[];

  /** 设置当前选中定额库 */
  setDatabaseCurrent?: Dispatch<React.SetStateAction<DatabaseDbItem | undefined>>;

  /** 数据库 当前模块默认选中 */
  databaseCurrentDefault?: DatabaseDbItem;

  /** 定额明细表 ToolBarSlot */
  dbNormTableToolbarSlot?: React.ReactNode;

  /** 当前模块是否只读 */
  readonly?: boolean;
};

/** 定额库数据项 */
export type DatabaseDbItem = {
  dbCode: string; //	库编码
  dbName: string; //	库全称
  dbSimple: string; //	库简称
  dbPhase: string; //	阶段
  dbNote: string; //	备注
  dbLog: string; //	定额库修改记录
  dbCodeOld: string; //	库编码（老的）
  dbNameOld: string; //	库全称(老的)
  dbSimpleOld: string; //	库简称(老的)
  dbPhaseOld: string; //	阶段(老的)
  dbNoteOld: string; //	备注(老的)
  sourceDb: string; //	来源库
  sourceId: string; //	来源ID
  dbIndustryCode: string; //	行业代码
  dbIndustryName: string; //	行业名称
  dbIndustryCodeOld: string; //	行业代码(老的)
  dbIndustryNameOld: string; //	行业名称(老的)
  createDatetime: string; // 编制时间
  billStatus: string; // 数据状态
  access?: ('rcj' | 'chapter' | 'dbnote' | 'norm')[];
  id: string;
  dbId?: string;
};

/** 定额库复制参数 */
export interface DatabaseDbCopy {
  sourceDbId: string; // 源定额库id
  targetName: string; // 目标名称
  billSort: string; // 复制行的BillSort
}

/** 定额库说明查询参数 */
export interface DatabaseDbExtQuery {
  id: string; // 定额库ID
}

/** 定额库说明查询结果 */
export type DatabaseDbExtItem = {
  dbChapterExt: string; // 定额库说明
  dbChapterExtOld: string; // 定额库说明（老的）
};

/** 定额库说明/册说明查询参数 */
export type DatabaseDbExtSave = {
  beanName: 'reportWordServiceImpl'; // 后台调用的bean，固定值
  type: '1' | '2'; // 1-册说明(只需传dbId)，2-章节说明（dbId与cpId均需传）
  dbId: string; // 定额库ID
  cpId: string; // 章节ID
};
