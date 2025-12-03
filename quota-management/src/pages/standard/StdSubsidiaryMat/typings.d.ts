/*
 * @Author: SHUANG
 * @Date: 2023-11-09 14:21:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-15 10:12:12
 * @Description: 标准库-次材市场价格库
 */

import { Dispatch } from 'react';
import { DeviceMatDirectoryItem } from '../StdDeviceMat/DeviceMatDirectoryTree/typings';
import { SubsidiaryMatDetailItem } from './SubsidiaryMatDetailTable/typings';
import { TableActionType } from 'jd-framework-web/package/components';

/**
 * 标准库-次材价格库 Props
 * @name subsidiaryMatDirectoryCurrent 次材目录 当前选中
 * @name setSubsidiaryMatDirectoryCurrent 设置 次材目录 当前选中
 *
 * @name subsidiaryMatDetailCurrent 次材库明细 当前选中
 * @name setSubsidiaryMatDetailCurrent 设置次材库明细 当前选中
 *
 * @name subsidiaryMatDetailSelection 次材明细 当前勾选
 * @name setSubsidiaryMatDetailSelection 设置次材库明细 当前勾选
 *
 * @name subsidiaryMatDetailTableRef 次材明细表REF
 */
export type StdSubsidiaryMatProps = {
  /** 次材目录 当前选中 */
  subsidiaryMatDirectoryCurrent?: DeviceMatDirectoryItem;
  /** 设置次材目录 当前选中 */
  setSubsidiaryMatDirectoryCurrent?: Dispatch<React.SetStateAction<DeviceMatDirectoryItem | undefined>>;

  /** 次材库明细 当前选中 */
  subsidiaryMatDetailCurrent?: SubsidiaryMatDetailItem;
  /** 设置次材库明细 当前选中 */
  setSubsidiaryMatDetailCurrent?: Dispatch<React.SetStateAction<SubsidiaryMatDetailItem | undefined>>;

  /** 次材明细 当前勾选 */
  subsidiaryMatDetailSelection?: SubsidiaryMatDetailItem[];
  /** 设置次材库明细 当前勾选 */
  setSubsidiaryMatDetailSelection?: Dispatch<React.SetStateAction<SubsidiaryMatDetailItem[] | undefined>>;

  /** 次材明细 当前操作 */
  subsidiaryMatDetailAction?: SubsidiaryMatDetailItem;
  /** 设置次材库明细 当前操作 */
  setSubsidiaryMatDetailAction?: Dispatch<React.SetStateAction<SubsidiaryMatDetailItem | undefined>>;

  /** 次材明细表REF */
  subsidiaryMatDetailTableRef?: TableActionType;
};
