/*
 * @Author: SHUANG
 * @Date: 2023-10-20 14:14:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-05 16:35:37
 * @Description: 定额库(人材机 机械台班 混凝土配合比)
 */

import { Dispatch } from 'react';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import { DbMatContentItem } from '../DbMatContentTable/typings';
import { DataBaseProps } from '../../../typings';

/** 定额库(人材机 机械台班 混凝土配合比) 明细数据查询参数 */
export interface DbMatQuery {
  classifyId: string; // 目录id
  dbId: string; // 定额库ID
  classifyRjcType?: string;
}

/** 定额库(人材机 机械台班 混凝土配合比) 明细数据项 */
export type DbMatItem = {
  id: string; // 无
  dbId: string; // 定额库ID
  classifyId: string; // 目录id
  matCode: string; // 编号
  matName: string; // 名称
  matUnit: string; // 单位
  matPrice: string; // 单价
  matRjcType: string; // 人材机类型(1[人工]、2[材料]、3[机械]、4[机械台班]、5[混凝土])
  matLog: string; // 人材机修改记录
  sourceId: string; // 来源主键
  sourceDbId: string; // 来源定额库ID
  sourceClassifyId: string; // 来源目录id
};

/** 人材机类型(1[人工]、2[材料]、3[机械]、4[机械台班]、5[混凝土]) */
export type DbMatRjcType = '1' | '2' | '3' | '4' | '5';

/** 人材机保存参数 */
export type DbMatSaveParams = DbMatQuery & {
  matRjcType: DbMatRjcType; // 人材机类型
};

/** 人材机粘贴参数 */
export type DbMatPasteParams = FETCH.Paste &
  DbMatQuery & {
    currentClassifyId: string; // 当前（选中的目标）目录id
    currentDbId: string; // 当前（选中的目标）定额库ID
  };

/**
 * 当前Mat维护模块向下传递Props
 * @name dbMatCurrent 当前选中MAT明细
 * @name setDbMatCurrent 设置当前选中 MAT 明细
 * @name dbMatContentCurrent 当前选中MAT含量
 * @name setDbMatContentCurrent 设置当前选中MAT含量
 */
export type DbMatProps = DataBaseProps & {
  /** 当前选中MAT明细 */
  dbMatCurrent?: DbMatItem;
  /** 设置当前选中MAT明细 */
  setDbMatCurrent?: Dispatch<React.SetStateAction<DbMatItem | undefined>>;
  /** MAT明细表 */
  dbMatMainTableRef?: TableActionType;

  /** 当前选中MAT含量 */
  dbMatContentCurrent?: DbMatContentItem;
  /** 设置当前选中MAT含量 */
  setDbMatContentCurrent?: Dispatch<React.SetStateAction<DbMatContentItem | undefined>>;
  /** MAT明细对应含量表 */
  dbMatContentTableRef?: TableActionType;
};

/** 人材机表 PROPS */
export type PropsDbMat = {
  tableProps?: Partial<BaseTableProps>;

  /** 主材表 重写 Table */
  dbMatMainTableProps?: Partial<BaseTableProps>;
  /** 主材表 重写 Service */
  dbMatMainUseServices?: () => any;

  /** 主材明细表 重写 Table */
  dbMatContentTableProps?: Partial<BaseTableProps>;
  /** 主材明细表 重写 Service */
  dbMatContentUseServices?: () => any;

  dbMatQuerySelectionTableProps?: Partial<BaseTableProps>;
};
