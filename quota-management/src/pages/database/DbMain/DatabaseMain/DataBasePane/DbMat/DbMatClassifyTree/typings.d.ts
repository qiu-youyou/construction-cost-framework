/*
 * @Author: SHUANG
 * @Date: 2023-10-20 10:00:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 11:40:09
 * @Description: 定额库(人材机 机械台班 混凝土配合比)  目录
 */

import { ClassifyRjcType } from '../../../typings';

/** Mat目录 查询参数 */
export interface DbMatClassifyQuery {
  /** 目录类型(rcj[人材机]、machine[机械台班]、concrete[混凝土]) */
  classifyRjcType: ClassifyRjcType;
  dbId: string; // 定额库ID
}

/**
 * Mat 目录 人材机编码类型类型
 * 人工：man 材料：mat 机械：mac
 */
export type dbMatClassifyCodeType = 'man' | 'mat' | 'mac';

/** Mat目录（人材机 机械台班 混凝土配合比） 对应数据项 */
export type DbMatClassifyItem = {
  id: dbMatClassifyCodeType; //	无
  dbId: string; //	定额库ID
  parentId: string; //	父节点ID
  /**  人工：man 材料：mat 机械：mac */
  classifyCode: dbMatClassifyCodeType; //	目录编码
  classifyName: string; //	目录名称
  classifyLevel: string; //	目录等级
  /** 目录类型(rcj[人材机]、machine[机械台班]、concrete[混凝土]) */
  classifyRjcType: ClassifyRjcType; //	目录类型(rcj[人材机]、machine[机械台班]、concrete[混凝土])
  classifyLog: string; //	目录修改记录
  sourceId: string; //	来源ID
  sourceDbId: string; //	来源定额库ID
  sourceParentId: string; //	来源父节点ID
  classifyCodeParent: dbMatClassifyCodeType; // 父节点目录类型
  children: DbMatClassifyItem[];
};

/** Mat目录保存数据 */
export type DbMatClassifySaveParams = {
  dbId: string; // 库id
  parentId: string; // 父id
  /**  人工：man 材料：mat 机械：mac */
  classifyCode: dbMatClassifyCodeType; // 编码
  classifyName: string; // 名称
  classifyRjcType: ClassifyRjcType; // 目录类型(rcj[人材机]、machine[机械台班]、concrete[混凝土])
};
