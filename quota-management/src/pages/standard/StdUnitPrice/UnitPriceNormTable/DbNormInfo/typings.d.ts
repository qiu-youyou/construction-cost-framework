/*
 * @Author: SHUANG
 * @Date: 2023-11-16 15:47:46
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 17:14:13
 * @Description: 标准综合单价库 - 清单定额 - 清单定额人材机
 */

/**  标准综合单价库 - 清单定额 - 清单定额人材机 查询参数 */
export type UnitPriceNormMatQuery = {
  unitPriceDbId: string; // 映射库目录ID
  unitPriceId: string; // 清单ID
  unitPriceNormId: string; // 定额库ID
  parentId?: string; // 父级ID
};

/**  标准综合单价库 - 清单定额 - 清单定额人材机 数据项  */
export type UnitPriceNormMatItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  createDatetime: string; // 创建时间
  dbId: string; // 定额库ID
  id: string; // 主键
  matAmount: string; // 单位用量
  matAmountOld: string; // 单位用量(老的)
  matAmountSrc: string; // 原含量
  matAmountSrcOld: string; // 原含量(老的)
  matCode: string; // 材料编号
  matId: string; // 材料ID
  matName: string; // 材料名称
  matOneTypeId: string; // 材料一级分类ID
  matOneTypeName: string; // 材料一级分类名称
  matPrice: string; // 材料单价
  matRcjType: string; // 材料人材机分类
  matTotPrice: string; // 材料合价
  matTwoTypeId: string; // 材料二级分类ID
  matTwoTypeName: string; // 材料二级分类名称
  matUnit: string; // 材料单位
  normCode: string; // 定额编号
  matLog: string; // 修改记录
  normId: string; // 定额ID
  parentId: string; // 父节点ID
  unitPriceDbId: string; // 综合单价库ID
  unitPriceId: string; // 清单关系表ID
  unitPriceNormId: string; // 定额关系表ID
  children?: UnitPriceNormMatItem[]; // 子节点
};

export type UnitPriceNormParamsItem = {
  id: string; // 主键
  paramsName: string; // 参数名
  paramsValue: string; // 参数值
  unitPriceDbId: string; // 综合单价库ID
  unitPriceId: string; // 综合单价清单ID
  unitPriceNormId: string; // 综合单价定额ID
};
