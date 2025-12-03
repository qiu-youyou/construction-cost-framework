/*
 * @Author: SHUANG
 * @Date: 2024-04-16 11:08:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 13:51:36
 * @Description: 工程造价-风水电
 */

import { MatTypeKey } from '../typings';

/** 工程造价-风水电 查询 */
export type FsdQuery = {
  projectId: string; //无
  stageId: string; //无
  matType?: MatTypeKey; //类型(1[风]、2[水]、3[电])
};

/** 工程造价-风水电 数据项 */
export type FsdItem = {
  matCode: string; // 编码
  matName: string; // 名称
  matPrice: number; // 单价
  matNote: string; // 说明
  changeLog: string; // 修改记录
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  id: string;
};
