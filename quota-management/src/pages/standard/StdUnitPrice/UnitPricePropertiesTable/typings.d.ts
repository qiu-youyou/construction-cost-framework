/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:46:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-19 15:08:14
 * @Description: 标准综合单价库 - 清单特征
 */

import { BaseTableProps } from 'jd-framework-web/package/components';

/** 标准综合单价库 - 清单特征 查询参数 */
export type UnitPricePropertiesQuery = {
  unitPriceDbId: string; // 映射库目录ID
  unitPriceId: string; // 清单ID
};

/** 标准综合单价库 - 清单特征 数据项 */
export type UnitPricePropertiesItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  createDatetime: string; // 创建时间
  unitPriceId: string; // 清单ID
  id: string; // 主键
  propertiesName: string; // 特征名称
  propertiesUnit: string; // 特征单位
  propertiesValue: string; // 特征值
  unitPriceDbId: string; // 目录ID
};

/** 标准综合单价库 - 综合单价清单特征 接收PROPS */
export type PropsUnitPriceProperties = {
  /** 重构 清单特征表 */
  tableProps?: Partial<BaseTableProps>;
};
