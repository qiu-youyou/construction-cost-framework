/*
 * @Author: SHUANG
 * @Date: 2023-11-03 17:59:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-12 17:53:34
 * @Description:
 */
import { Dispatch, ReactNode } from 'react';
import { DbFeeDirectoryItem } from './DbFeeDirectoryTree/typings';
import { DatabaseDbItem } from '../DbMain/DatabaseMain/typings';
import { DbFeeDetailItem } from './DbFeeDetailTable/typings';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';

/**
 * 当前定额库 取费模块向下传递的Props
 * @name dbDataSource 定额数据库源数据
 * @name databaseCurrent 当前选中定额库
 * @name setDatabaseCurrent 设置当前选中定额库
 *
 * @name dbFeeDirectoryCurrent 当前选中取费目录
 * @name setDbFeeDirectoryCurrent 设置当前选中取费目录
 *
 * @name dbFeeDetailCurrent 当前选中取费明细
 * @name setDbFeeDetailCurrent 设置当前选中取费明细
 */

export type DbFeeProps = {
  /** 是否只读 */
  readonly?: boolean;
  /** 定额数据库源数据 */
  dbDataSource?: DatabaseDbItem[];
  /** 当前选中定额库 */
  databaseCurrent?: DatabaseDbItem;
  /** 设置当前选中定额库 */
  setDatabaseCurrent?: Dispatch<React.SetStateAction<DatabaseDbItem | undefined>>;

  /** 当前选中取费目录 */
  dbFeeDirectoryCurrent?: DbFeeDirectoryItem;
  /** 设置当前选中取费目录 */
  setDbFeeDirectoryCurrent?: Dispatch<React.SetStateAction<DbFeeDirectoryItem | undefined>>;

  /** 当前选中取费明细 */
  dbFeeDetailCurrent?: DbFeeDetailItem;
  /** 设置当前选中取费明细 */
  setDbFeeDetailCurrent?: Dispatch<React.SetStateAction<DbFeeDetailItem | undefined>>;

  /** 当前勾选取费明明细 */
  dbFeeDetailSelection?: DbFeeDetailItem[];
  /** 设置当前勾选取费明明细 */
  setDbFeeDetailSelection?: Dispatch<React.SetStateAction<DbFeeDetailItem[] | undefined>>;

  /** 取费明细 TABLE REF */
  dbFeeDetailTableRef?: TableActionType;

  /** 取费详情 service */
  dbFeeDetailTableServiceConfig?: BaseTableProps['service'];
  dbFeeDetailTableColumns?: BaseTableProps<DbFeeDetailItem>['columns'];

  /** 取费详情 toolbar */
  toolbarSlot?: ReactNode;
  tableProps?: Partial<BaseTableProps>;
};

/**
 * 取费
 * @name setDbFeeDirectoryCurrent 取费目录 设置当前选中
 * @name readonly 是否只读
 */
export type PropsDbFee = {
  /** 默认当前数据库 */
  databaseCurrentDefault?: DatabaseDbItem;
  /** 取费目录 设置当前选中 */
  setDbFeeDirectoryCurrent?: Dispatch<React.SetStateAction<DbFeeDirectoryItem | undefined>>;
  /** 取费详情 service */
  dbFeeDetailTableServiceConfig?: BaseTableProps['service'];

  dbFeeDetailTableColumns?: BaseTableProps['columns'];

  /** 是否只读 */
  readonly?: boolean;
  /** 数据库选择器是否禁用 */
  dbSelectorDisabled?: boolean;
  /** 取费明细表 TOOLBAR */
  toolbarSlot?: ReactNode;
};
