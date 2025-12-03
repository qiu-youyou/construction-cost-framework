/*
 * @Author: SHUANG
 * @Date: 2023-11-06 10:16:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-01 11:51:26
 * @Description: 清单关联定额映射库
 */
import { Dispatch } from 'react';
import { BaseTableProps, BaseTreeProps, TableActionType } from 'jd-framework-web/package/components';

import { RelationDirectoryItem } from './RelationDirectoryTree/typings';
import { RelationDetailItem } from './RelationDetailTable/typings';
import { RelationNormItem } from './RelationNormTable/typings';

/**
 * 清单关联定额映射库 props
 * @name readonly 是否只读
 * @name setRelationDirectoryCurrent 映射库目录 设置当前选中
 */
export type PropsRelationNorm = {
  /** 是否只读 */
  readonly?: 'directory' | 'norm';
  /** 映射库目录 设置当前选中 */
  setRelationDirectoryCurrent?: Dispatch<React.SetStateAction<RelationDirectoryItem | undefined>>;

  /** 清单对应定额表 设置已勾选定额 */
  setRelationNormSelection?: Dispatch<React.SetStateAction<RelationNormItem[] | undefined>>;
};

/**
 * 清单关联定额映射库 共享 Props
 * @name relationDirectoryCurrent 当前选中 映射库目录
 * @name setRelationDirectoryCurrent 设置 当前选中 映射库目录
 *
 * @name relationDetailCurrent 目录对应清单表 当前清单
 * @name setRelationDetailCurrent 目录对应清单表 设置当前清单
 *
 * @name relationDetailTableRef 目录对应清单明细表REF
 * @name relationNormTableRef 清单表对应定额表明细表REF
 */
export type RelationNormProps = {
  /** 是否只读 */
  readonly?: 'directory' | 'norm';

  /** 当前选中 映射库目录 */
  relationDirectoryCurrent?: RelationDirectoryItem;
  /** 设置当前选中 映射库目录 */
  setRelationDirectoryCurrent?: Dispatch<React.SetStateAction<RelationDirectoryItem | undefined>>;

  /* 目录对应清单表 当前清单 */
  relationDetailCurrent?: RelationDetailItem;
  /** 目录对应清单表 设置当前清单 */
  setRelationDetailCurrent?: Dispatch<React.SetStateAction<RelationDetailItem | undefined>>;

  /** 清单对应定额表 已勾选定额 */
  relationNormSelection?: RelationNormItem[];
  /** 清单对应定额表 设置已勾选定额 */
  setRelationNormSelection?: Dispatch<React.SetStateAction<RelationNormItem[] | undefined>>;

  /** 清单对应定额表 当前定额 */
  relationNormActionCurrent?: RelationNormItem;
  /** 清单对应定额表 设置当前定额 */
  setRelationNormActionCurrent?: Dispatch<React.SetStateAction<RelationNormItem | undefined>>;

  /** 目录对应清单明细表REF */
  relationDetailTableRef?: TableActionType;

  /** 清单表对应定额表明细表REF */
  relationNormTableRef?: TableActionType;

  relationDirectoryTreeProps?: Partial<BaseTreeProps>;

  relationDetailTableProps?: Partial<BaseTableProps>;

  relationNormTableProps?: Partial<BaseTableProps>;
};
