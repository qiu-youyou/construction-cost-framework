/*
 * @Author: SHUANG
 * @Date: 2023-11-15 13:56:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 14:16:44
 * @Description: 标准综合单价库 - 清单明细
 */

import { BaseTableProps } from 'jd-framework-web/package/components';

/** 标准综合单价库 - 清单明细 查询参数 */
export type UnitPriceDetailQuery = {
  unitPriceDbId: string; //	综合单价目录ID
  listNormDirectoryId?: string; //	清单定额目录ID
};

/** 标准综合单价库 - 清单明细 数据项 */
export type UnitPriceDetailItem = {
  id: string; // 主键
  parentId: string; // 父节点ID
  unitPriceCode: string; // 单价编号
  unitPriceDbId: string; // 综合单价库ID
  unitPriceDbName: string; // 综合单价库名称
  unitPriceDetailCode: string; // 清单类型编码
  unitPriceDetailName: string; // 清单类型名称
  unitPriceName: string; // 单价名称
  unitPricePrice: string; // 单位
  unitPriceProperty: string; // 清单项目特征描述
  unitPriceTypeCode: string; // 单价类型编码
  unitPriceTypeName: string; // 单价类型名称
  unitPriceUnit: string; // 单位
  unitPriceWork: string; // 工作内容
  updateDatetime: string; // 最后修改时间
  unitPriceCalcRule: string; // 清单计算规则
  children?: UnitPriceDetailItem[];
  projectId?: string; //	项目ID
  stageId?: string; //	阶段ID
};

/** 综合单价库 - 清单明细 新增参数 */
export type UnitPriceDetailSave = {
  unitPriceDbId: string; // 综合单价库目录ID
  currentId: string; // 当前行id
  billSort: string; // 排序号
  parentId: string; // 父节点ID
};

/** 标准综合单价库 - 清单明细  同步映射库清单数据 参数 */
export type UnitPriceDetailSyncListNorm = {
  listNormDirectoryId: string; // 清单关联映射库目录ID
  unitPriceDbId: string; // 综合单价库目录ID
};

/** 标准综合单价库 - 综合单价明细 接收PROPS */
export type PropsUnitPriceDetail = {
  /** 重构 综合单价明细表 */
  tableProps?: Partial<BaseTableProps>;
};
