/*
 * @Author: SHUANG
 * @Date: 2024-01-31 11:34:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 10:25:17
 * @Description: 工程造价产品
 */

import { Dispatch, SetStateAction } from 'react';
import { TableActionType } from 'jd-framework-web/package/components';
import { ProjectItem } from './Project/typings';
import { ProductItem } from './Product/typings';

/**
 * 工程造价产品 传递 PROPS
 * @name projectCurrent 当前工程
 * @name setProjectCurrent 设置当前工程
 *
 * @name projectActionCurrent 当前操作工程
 * @name setProjectActionCurrent 设置当前操作工程
 *
 * @name productCurrent 当前产品
 * @name setProductCurrent 设置当前产品
 */
export type ProductProps = {
  /** 工程表 REF */
  projectTableRef?: TableActionType;
  /** 产品表 REF */
  productTableRef?: TableActionType;

  /** 当前工程、设置当前工程 */
  projectCurrent?: ProjectItem;
  setProjectCurrent?: Dispatch<SetStateAction<ProjectItem | undefined>>;

  /** 当前操作工程、设置当前操作工程 */
  projectActionCurrent?: ProjectItem;
  setProjectActionCurrent?: Dispatch<SetStateAction<ProjectItem | undefined>>;

  /** 当前勾选工程、设置当前勾选工程 */
  projectSelection?: ProjectItem[];
  setProjectSelection?: Dispatch<SetStateAction<ProjectItem[] | undefined>>;

  /** 当前产品、设置当前产品 */
  productCurrent?: ProductItem;
  setProductCurrent?: Dispatch<SetStateAction<ProductItem | undefined>>;

  /** 当前操作产品、设置当前操作产品 */
  productActionCurrent?: ProductItem;
  setProductActionCurrent?: Dispatch<SetStateAction<ProductItem | undefined>>;
};
