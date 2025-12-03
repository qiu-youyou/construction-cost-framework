/*
 * @Author: SHUANG
 * @Date: 2023-11-06 15:05:06
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 10:30:32
 * @Description: 借用定额
 */

import { Dispatch, ReactNode } from 'react';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import { DbNormItem } from '../../DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';
import { DbChapterItem } from '../../DbMain/DatabaseMain/DbChapterTree/typings';
import { DatabaseDbItem } from '../../DbMain/DatabaseMain/typings';

/** 借用定额 PROPS */
export type DbNromBorrowProps = {
  /** 定额数据库源数据 */
  dbDataSource?: DatabaseDbItem[];

  /** 设置当前选中定额库 */
  setDatabaseCurrent?: Dispatch<React.SetStateAction<DatabaseDbItem | undefined>>;

  /** 定额册章节 设置当前选中 */
  setDbChapterCurrent?: Dispatch<React.SetStateAction<DbChapterItem | undefined>>;

  /** 默认的当前数据库 */
  databaseCurrentDefault?: DatabaseDbItem;

  /** 默认的当前定额行 */
  normCurrentDefault?: Partial<DbNormItem>;

  /** 是否自动请求接口数据库 */
  dbDataSourceRequestManual?: boolean;

  /** 定额明细表 REF */
  dbNormTableRef?: React.MutableRefObject<TableActionType | undefined>;

  /** 点击添加按钮的提交方法 */
  onSubmit?: (dbNormSelection: DbNormItem[]) => Promise<FETCH.Res>;

  /** 点击保存按钮 比 onSubmit 早 */
  onSave?: () => Promise<FETCH.Res>;

  /** 是否为综合单价引用 当前综合单价 */
  isUnitPriceDetailCurrent?: boolean;
  unitPriceDetailCurrent?: UnitPriceDetailItem;

  /** 自定义触发按钮 */
  triggerButton?: ReactNode;
  /** 按钮的触发控制 */
  triggerControl?: () => void;

  /** 不显示 按钮 */
  noFoolter?: boolean;
  /** 弹窗标题 */
  modalTitle?: string;
  /** 确定按钮显示文字 */
  okText?: ReactNode;
  /** 按钮是否禁用 */
  disabled?: boolean;
  dbSelectorDisabled?: boolean;
  dbSelectorHidden?: boolean;

  dbNormTableProps?: Partial<BaseTableProps>;
};
