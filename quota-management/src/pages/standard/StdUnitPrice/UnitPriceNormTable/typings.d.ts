/*
 * @Author: SHUANG
 * @Date: 2023-11-15 19:13:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-07 17:22:24
 * @Description: 标准综合单价库 - 清单定额
 */

import { BaseTableProps } from 'jd-framework-web/package/components';
import { DbNromBorrowProps } from '@/pages/database/common/DbNormBorrow/typings';
import { QueryMappingRelationNormProps } from './QueryMappingRelationNorm';
import { DbFeeSetProps } from '@/pages/database/common/DbFeeSet';

/** 标准综合单价库 - 清单定额 查询参数 */
export type UnitPriceNormQuery = {
  unitPriceDbId: string; // 映射库目录ID
  unitPriceId: string; // 清单ID
  dbId?: string; // 定额库ID
  id?: string; // 定额ID
};

/** 标准综合单价库 - 清单定额 数据项 */
export type UnitPriceNormItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  chapterId: string; // 定额章节ID
  createDatetime: string; // 创建时间
  dbId: string; // 定额库ID
  dbSimple: string; // 定额库简称
  id: string; // 主键
  normAmount: string; // 定额工程量
  normBasisDiff: string; // 基价价差
  normCode: string; // 定额编号
  normComprehensivePrice: string; // 综合单价
  normComprehensivePriceTotal: string; // 综合合价
  normDirectFee: string; // 直接费
  normFeeTypeCode: string; // 取费类型ID
  normFeeTypeName: string; // 取费类型
  normId: string; // 定额ID
  normIndirectFee: string; // 间接费
  normLog: string; // 修改记录
  normMacPrice: string; // 定额机械单价
  normManPrice: string; // 定额人工单价
  normManageFee: string; // 定额管理费
  normMatPrice: string; // 定额材料单价
  normName: string; // 定额名称
  normPrice: string; // 定额基础单价
  normProfitFee: string; // 利润
  normTaxationFee: string; // 税金
  normUnit: string; // 定额单位
  unitPriceDbId: string; // 综合单价库ID
  unitPriceId: string; // 单价库清单ID
  completeNormName: string;
  // 阶段中
  projectId?: string;
  stageId?: string;
};

/** 标准综合单价库 - 清单定额  保存参数 */
export type UnitPriceNormSave = {
  unitPriceDbId: string; // 映射库目录ID
  unitPriceId: string; // 清单ID
  dbId: string; // 定额库ID
  normIds: string[]; // 定额ID集合
};

/** 标准综合单价库 - 清单定额 行编辑 保存 */
export type UnitPriceNormCellSave = {
  unitPriceDbId: string; // 映射库目录ID
  unitPriceId: string; // 清单ID
  dbId: string; // 定额库ID
  id: string; // 定额ID
};

/** 标准综合单价库 - 清单定额 批量设置取费类型 */
export type UpdateBatchSetFeeParams = {
  unitPriceDbId: string; // 映射库目录ID
  unitPriceId: string; // 清单ID
  normIds: string[]; // 定额ID
  feeDirectoryId: string; // 定额取费目录ID
  dbId: string; // 定额库
};

/** 标准综合单价库 - 综合单价定额 接收PROPS */
export type PropsUnitPriceNorm = {
  /** 重构 综合单价明细表 */
  tableProps?: Partial<BaseTableProps>;
  /** 重构 定额查询 */
  dbNormBorrowProps?: DbNromBorrowProps;
  /** 重构 关联定额库查询 */
  queryMappingRelationNormProps?: QueryMappingRelationNormProps;
  /** 重构 关联取费查询 */
  dbFeeSetProps?: DbFeeSetProps;

  toolbarAfterProps?: {
    // 设置取费类型
    normFeeSetAuth?: boolean;
    // 查看子目取费
    normFeeItemAuth?: boolean;
    // 查看取费表达式
    normFeeExpAuth?: boolean;
  };
};
