/*
 * @Author: SHUANG
 * @Date: 2023-10-26 11:09:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-07 09:20:29
 * @Description: 定额库权限
 */

import { Dispatch } from 'react';

/** 定额库权限人员数据项 */
export interface DbAccessItem {
  billStatus: string; // 定额库状态
  dbCode: string; // 定额库编码
  dbName: string; // 定额库全称
  dbPhase: string; // 定额库阶段
  dbSimple: string; // 定额库简称
  dbChapterUser: string; // 章节说明人员
  dbNodeUser: string; // 编制说明人员
  dbNormUser: string; // 定额明细人员
  dbRCJUser: string; // 人材机人员
  id: string; // 定额库ID
}

/** 定额库查询权限目录参数 */
export interface DbAccessDirectorQuery {
  dbId: string; // 定额库ID
}

/** 定额库权限目录数据项 */
export type DbAccessDirectorItem = {
  dbId: string; // 定额库ID
  editDirectoryCode: string; // 目录编码
  editDirectoryName: string; // 目录名称
  id: string; // 目录主键ID
};

/** 定额库查询权限目录人员 */
export interface DbAccessDirectorUserQuery {
  dbId: string; // 定额库ID
  editDirectoryId: string; // 目录ID
}

/** 定额库权限目录人员数据项 */
export type DbAccessDirectorUserItem = {
  dbId: string; // 定额库ID
  editDirectoryCode: string; // 权限目录编码
  editDirectoryId: string; // 权限目录ID
  id: string; // 人员ID
  userCode: string; // 人员登录名
  userFullName: string; // 人员姓名
  userId: string; // 人员登录名
};

/** 定额库权限目录人员保存参数 */
export interface DbAccessDirectorUserSaveParams {
  dbId: string; // 定额库ID
  editDirectoryId: string; // 权限目录ID
  userIds: string[]; // 人员登录名
}

/**
 * 定额库权限向下传递Props
 * @name dbAccessCurrent 定额权限表当前行
 * @name dbAccessTableRef 定额权限表 REF
 */
export type DbAccessProps = {
  /** 定额库权限表当前行 */
  dbAccessCurrent?: DbAccessItem;

  /** 当前定额库当前权限目录 */
  dbAccessDirCurrent?: DbAccessDirectorItem;

  /** 设置定额当前权限目录 */
  setDbAccessDirCurrent?: Dispatch<React.SetStateAction<DbAccessDirectorItem | undefined>>;
};
