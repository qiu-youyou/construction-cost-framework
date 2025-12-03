/*
 * @Author: SHUANG
 * @Date: 2023-10-25 10:27:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 09:32:58
 * @Description: 定额库 定额明细人材机含量表
 */

/** 定额库定额明细人材机含量表查询参数 */
export type DbNormMatContentQuery = {
  dbId: string; // 定额库ID
  chapterId: string; // 章节ID
  normId: string; // 定额明细ID
  parentId?: string;
};

/** 定额库定额明细人材机含量数据项 */
export type DbNormMatContentItem = {
  id: string; //	无
  chapterId: string; //	章节ID
  dbId: string; //	定额库ID
  normId: string; //	定额ID
  parentId: string; //	父节点ID
  normCode: string; //	定额编号
  matCode: string; //	材料编码
  matName: string; //	材料名称
  matUnit: string; //	材料单位
  matPrice: string; //	材料单价
  matAmount: string; //	单位用量
  matAmountSrc: string; //	原含量
  matTotPrice: string; //	材料合价
  /** 材料人材机分类(1[人工]、2[材料]、3[机械]、4[机械台班]、5[混凝土]) */
  matRcjType: '1' | '2' | '3' | '4' | '5';
  matLog: string; //	材料修改记录
  matCodeOld: string; //	材料编码(老的)
  matNameOld: string; //	材料名称(老的)
  matUnitOld: string; //	材料单位(老的)
  matPriceOld: string; //	材料单价(老的)
  matAmountOld: string; //	单位用量(老的)
  matAmountSrcOld: string; //	原含量(老的)
  matTotPriceOld: string; //	材料合价(老的)
  /** 材料人材机分类(1[人工]、2[材料]、3[机械]、4[机械台班]、5[混凝土])(老的) */
  matRcjTypeOld: '1' | '2' | '3' | '4' | '5';
  matOneTypeId: string; //	材料一级分类ID
  matOneTypeName: string; //	材料一级分类名称
  matTwoTypeId: string; //	材料二级分类ID
  matTwoTypeName: string; //	材料二级分类名称
  sourceId: string; //	来源人材机ID
  sourceChapterId: string; //	章节ID
  sourceDbId: string; //	定额库ID
  sourceNormId: string; //	定额ID
  sourceMatClassifyId: string; //	人材机目录ID
  sourceMatId: string; //	人材机数据来源
  matIsMain: 'Y' | 'N'; // 是否是主材
  children?: DbNormMatContentItem[];
  hasChildren: boolean,
  billSort: string;
};

/** 定额库定额明细人材机含量更新行参数 */
export interface DbNormMatUpdateRowParams {
  /** 材料人材机分类(1[人工]、2[材料]、3[机械]、4[机械台班]、5[混凝土]) */
  matRcjType: DbNormMatContentItem['matRcjType'] | '';
}

/** 人材机选择明细表 查询参数 */
export type MatMainNotExistsNormMatQuery = {
  classifyId: string; // 人材机的目录id
  dbId: string; // 人材机的库id
  normId: string; // 定额ID
  chapterId: string; // 章节ID
};

/** 选择的Mat添加到人材机 参数 */
export type DbNormMatContentSaveSelectMatDetailsParams = DbNormMatContentQuery & {
  ids: string[]; // 主键ids（已勾选MAT明细）
  normCode: string; // 定额编号
  currentId?: string; // 当前行id
  billSort?: string;
};
