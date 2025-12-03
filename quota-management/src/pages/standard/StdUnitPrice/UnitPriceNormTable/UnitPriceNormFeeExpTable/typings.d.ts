/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:15:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-16 18:29:29
 * @Description: 标准综合单价库 - 清单定额 - 取费表达式
 */

/** 标准综合单价库 - 清单定额 - 取费表达式  查询参数 */
export type UnitPriceNormFeeExpQuery = {
  unitPriceDbId: string; // 映射库目录ID
  unitPriceId: string; // 清单ID
  unitPriceNormId: string; // 定额库ID
};

/** 标准综合单价库 - 清单定额 - 取费表达式  数据项 */
export type UnitPriceNormFeeExpItem = {
  createDatetime: string; // 创建时间
  expFeeCode: string; // 取费表达式编码
  expFeeName: string; // 取费表达式名称
  expFeeType: string; // 取费表达式类型
  expFeeValue: string; // 取费表达式值
  id: string; // 主键
  unitPriceDbId: string; // 综合单价库ID
  unitPriceId: string; // 清单关系表ID
  unitPriceNormId: string; // 定额关系表ID
};
