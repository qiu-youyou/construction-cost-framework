/*
 * @Author: SHUANG
 * @Date: 2024-03-19 15:56:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-19 15:59:54
 * @Description: 工程造价-工程量清单编制-综合单价 清单特征
 */

import { UnitPricePropertiesItem } from '@/pages/standard/StdUnitPrice/UnitPricePropertiesTable/typings';

/** 工程造价-工程量清单编制-综合单价 清单特征 查询参数 */
export type ProductUnitPricePropertiesQuery = {
  unitPriceId: string; // 综合单价库ID
  projectId: string; // 项目ID
  stageId: string; // 阶段ID
};

export type ProductUnitPricePropertiesItem = UnitPricePropertiesItem;
