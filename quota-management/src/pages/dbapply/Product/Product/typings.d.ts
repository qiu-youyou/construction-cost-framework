/*
 * @Author: SHUANG
 * @Date: 2024-01-31 10:38:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 16:51:15
 * @Description: 工程造价产品-产品信息
 */

import { BaseTableProps } from 'jd-framework-web/package/components';

/** 工程造价产品-产品信息 数据项 */
export type ProductQueryParams = {
  projectId: string; // 项目ID
};

/** 工程造价产品-产品信息 数据项 */
export type ProductItem = {
  projectId: string; // 项目ID
  stageName: string; // 阶段名称
  productPhase: string; // 阶段名称
  productType: string; // 阶段名称
  productName: string; // 产品名称
  editPerson: string; // 编制人
  proofreadPerson: string; // 校核人
  checkPerson: string; // 审查人
  versionCode: string; // 版本号
  note: string; // 备注
  currentId: string; // 当前行Id
  billSort: string; // 勾选排序号
  billStatus: string; // 状态
  id: string;
};

/** 工程造价产品-产品信息 保存项 */
export type ProductSaveParams = Partial<ProductItem>;

/** 工程造价产品-产品信息 复制产品 */
export type ProductCopyParams = {
  projectId: string; // 项目Id
  sourceProductId: string; // 当前Id
  stageName: string; // 阶段名称
  productName: string; // 产品名称
};

/** 工程造价产品-产品信息 Props */
export type PropsProduct = {
  /** 工程信息表 重写 */
  tableProps?: Partial<BaseTableProps>;
};
