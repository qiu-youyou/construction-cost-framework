/*
 * @Author: SHUANG
 * @Date: 2023-10-23 10:36:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 12:00:24
 * @Description: 查询人材机明细
 */
import { Dispatch } from 'react';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';

import { MatMainNotExistsNormMatQuery } from '../../DbNorm/DbNormPane/DbNormMatContent/typings';
import { MatMainNotExistsMatQuery } from '../../DbMat/DbMatContentTable/typings';
import { DbMatItem, DbMatQuery } from '../../DbMat/DbMatMainTable/typings';

import { DbMatClassifyItem } from '../../DbMat/DbMatClassifyTree/typings';
import { DbNormItem } from '../../DbNorm/DbNormTable/typings';
import { ClassifyRjcType } from '../DbMatQuerySelection';
import { DatabaseDbItem } from '../../../typings';

/** 查询MAT目录对应明细列表参数 */
export type DbMatContentQueryParams =
  // （dbMatCurrent 机械台班 ｜ 混凝土配合比）查询
  | MatMainNotExistsMatQuery
  // (dbNormCurrent 定额) 查询
  | MatMainNotExistsNormMatQuery
  | DbMatQuery;

/** 选择明细 Props */
export type DbMatContentByClassifyProps = {
  isNorm?: boolean;

  /** 是否通过数据库 */
  queryByDb?: boolean;

  /** 当前 类型 */
  classifyRjcType?: ClassifyRjcType;

  /** 数据库 当前选中 */
  databaseCurrent?: DatabaseDbItem;

  /** 当前主表数据（Norm定额 ｜ MAT材料） */
  primaryCurrent?: DbNormItem & DbMatItem;

  /** 当前MAT目录 */
  matCatalogCurrent?: DbMatClassifyItem;

  /** 当前选中MAT明细 */
  dbMatCurrent?: DbMatItem;

  /** 设置当前选中MAT明细 */
  setDbMatCurrent?: Dispatch<React.SetStateAction<DbMatItem | undefined>>;

  /** @name setSelection 向外传递当前勾选MAT行 */
  setSelection?: Dispatch<React.SetStateAction<DbMatItem[] | undefined>>;

  /** 当前已勾选的 MAT行 */
  selection?: DbMatItem[];

  /** 明细查询方法 */
  matMainDataSourceRequest: (params: DbMatContentQueryParams) => Promise<FETCH.Res<DbMatItem>>;

  dbMatMainUseServices?: () => any;

  dbMatMainTableProps?: Partial<BaseTableProps>;
  dbMatContentTableProps?: Partial<BaseTableProps>;

  /** MAT明细表 */
  dbMatMainTableRef?: TableActionType;
};
