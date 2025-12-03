/*
 * @Author: SHUANG
 * @Date: 2024-03-08 13:51:33
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-29 10:33:23
 * @Description: 工程造价-工程量清单编制-综合单价 定额 查看定额信息
 */

import { UnitPriceNormMatItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/DbNormInfo/typings';

/** 工程造价-工程量清单编制-综合单价 定额 查看定额信息 查询参数 */
export type ProductUnitPriceNormMatQuery = {
  unitPriceId: string; //	综合单价库ID
  projectId: string; //	项目ID
  stageId: string; //	阶段ID
  unitPriceNormId: string; //	综合单价定额ID
  parentId?: string; // 查看配合比用
};

/** 工程造价-工程量清单编制-综合单价 定额 查看定额信息 数据项 */
export type ProductUnitPriceNormMatItem = UnitPriceNormMatItem;

/** 工程造价-工程量清单编制-综合单价 定额 查看定额信息 插入  */
export type ProductUnitPriceNormInsert = {
  ids: string; // 综合单价定额人材机行ID
  unitPriceId: string; // 综合单价库ID
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  unitPriceNormId: string; // 综合单价定额ID
  dbId: string; // 定额库ID
};

/** 工程造价-工程量清单编制-综合单价 定额 查看定额信息 人材机应用组时费 */
export type ProductUnitPriceNormMatApplyMechanical = {
  id: string; // 综合单价定额人材机行ID
  unitPriceId: string; // 综合单价库ID
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
  unitPriceNormId: string; // 综合单价定额ID
  multiformMechanicalId: string; // 组时费ID
};
