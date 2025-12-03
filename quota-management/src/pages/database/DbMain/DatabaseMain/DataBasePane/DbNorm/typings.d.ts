/*
 * @Author: SHUANG
 * @Date: 2023-11-08 11:26:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 16:03:49
 * @Description: 企业定额维护-定额
 */

import { Dispatch } from 'react';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';

import { DbNormItem } from './DbNormTable/typings';
import { DatabaseDbItem } from '../../typings';
import { TabsProps } from 'antd';

/**
 * 当前定额维护模块向下传递的Props
 *
 * @name databaseCurrent 当前选中定额库
 *
 * @name dbNormCurrent 当前定额明细
 * @name setDbNormCurrent 设置当前定额明细
 *
 * @name dbNormSelection 当前勾选定额明细
 * @name setDbNormSelection 设置 当前勾选定额明细
 *
 * @name dbNormTableRef 定额明细表REF
 * @name dbNormTableToolbarSlot 定额明细表 操作栏 SLOT
 * @name dbNormMatContentTableRef 定额 人材机含量表 REF
 */
export type DbNormProps = {
  /** 当前选中定额库 */
  databaseCurrent?: DatabaseDbItem;

  /** 当前定额明细 */
  dbNormCurrent?: DbNormItem;
  /** 设置当前定额明细 */
  setDbNormCurrent?: Dispatch<React.SetStateAction<DbNormItem | undefined>>;

  /** 当前勾选定额明细 */
  dbNormSelection?: DbNormItem[];
  /** 设置 当前勾选定额明细 */
  setDbNormSelection?: Dispatch<React.SetStateAction<DbNormItem[] | undefined>>;

  /** 定额明细表 toolBar Slot */
  dbNormTableToolbarSlot?: React.ReactNode;

  /** 定额明细表REF */
  dbNormTableRef?: TableActionType;

  /** 定额 人材机含量表 REF */
  dbNormMatContentTableRef?: TableActionType;

  /** 默认选中定额行 */
  dbNormDefaultCurrent?: Partial<DbNormItem>;

  /** 是否只读 */
  normReadonly?: boolean;
};

/**
 * 定额明细表 PROPS
 */
export type PropsDbNorm = {
  /** 定额明细表 重写 Table */
  dbNormTableProps?: Partial<BaseTableProps>;
  dbNormUseServices?: () => any;
};

/**
 * 定额含量明细 PROPS
 * @name DbNormMatContentServiceConfig 人材机含量表 SERVICE
 * @name DbNormParamsServiceConfig 参数表 SERVICE
 */
export type PropsDbNormInfo = {
  /** 查看配合比 service */
  mixProportionServiceConfig?: BaseTableProps['service'];

  /** 人材机含量表 service */
  dbNormMatContentServiceConfig?: BaseTableProps['service'];

  /** 参数表 service */
  dbNormParamsServiceConfig?: BaseTableProps['service'];

  /** 对当前明细 的 TABPANE 进行扩展 */
  dbNormPaneItems?: TabsProps['items'];

  /** 定额明细扩展表使用到的接口 */
  dbNormDescUseServices?: () => any;

  /** 定额参数表 重写  */
  dbNormParamsTableProps?: Partial<BaseTableProps>;
  dbNormParamsUseServices?: () => any;

  /** 定额含量表 重写  */
  dbNormMatProps?: DbNormProps;
  dbNormMatTableProps?: Partial<BaseTableProps>;
  dbNormMatUseTableColumns?: (props: any) => any;
  dbNormMatUseServices?: () => any;
};
