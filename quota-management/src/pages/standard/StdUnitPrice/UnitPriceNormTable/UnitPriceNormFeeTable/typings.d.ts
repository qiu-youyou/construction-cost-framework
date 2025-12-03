/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:15:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-16 18:17:34
 * @Description: 标准综合单价库 - 清单定额 - 子目取费
 */

/** 标准综合单价库 - 清单定额 - 子目取费  查询参数 */
export type UnitPriceNormFeeQuery = {
  unitPriceDbId: string; // 映射库目录ID
  unitPriceId: string; // 清单ID
  unitPriceNormId: string; // 定额库ID
};
