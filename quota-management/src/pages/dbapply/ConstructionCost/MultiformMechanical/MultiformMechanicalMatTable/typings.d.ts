/*
 * @Author: SHUANG
 * @Date: 2024-03-25 13:56:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-25 16:40:03
 * @Description: 工程造价-组时机械明细
 */

import { MultiformMechanicalItem } from '../MultiformMechanicalTable/typings';

/** 工程造价-组时机械定义 查询 */
export type MultiformMechanicalMatQuery = {
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  groupTimeId: string; // 业务ID
};

/** 工程造价-组时机械定义 从材料库新增 */
export type MultiformMechanicalMatInsertByBasicNormMatIds = {
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  ids: string[]; // 主键集合
  groupTimeId: string; // 组时定义ID
  dbId: string; // 材料库ID
};

/** 工程造价-组时机械定义 数据项 */
export type MultiformMechanicalMatItem = {
  id: string; //	主键
  matAmount: string; //	数量
  matCode: string; //	编码
  matLog: string; //	修改日志
  matName: string; //	名称
  matPrice: string; //	价格
  matRjcType: string; //	类型
  matTotal: string; //	合价
  matUnit: string; //	单位
};
