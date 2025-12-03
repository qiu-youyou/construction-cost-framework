/*
 * @Author: SHUANG
 * @Date: 2023-11-14 15:13:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-15 09:02:23
 * @Description: 人材机明细重构（材料关联关系设置）
 */
import { Dispatch } from 'react';
import { DeviceMatDirectoryItem } from '@/pages/standard/StdDeviceMat/DeviceMatDirectoryTree/typings';
import { SubsidiaryMatDetailItem } from '@/pages/standard/StdSubsidiaryMat/SubsidiaryMatDetailTable/typings';
import { TableActionType } from 'jd-framework-web/package/components';

import { MatSubsidiaryContentItem } from './MatSubsidiaryContentTable/typings';

/**
 * 基础库-人材机明细重构 Props
 * @name matSubsidirayDirectory 次材目录 当前选中
 * @name matSubsidirayDetailCurrent 次材明细 当前选中
 *
 * @name matSubsidirayContentCurrent 人材机明细 当前选中
 * @name setMatSubsidirayContentCurrent 人材机明细 设置当前选中
 *
 * @name matSubsidirayDetailSelection 次材明细 当前勾选
 * @name setMatSubsidirayDetailSelection 次材明细 设置当前勾选
 *
 * @name matSubsidirayDetailTableRef 次材明细 Table Ref
 * @name matSubsidirayContentTableRef 人材机明细 Table Ref
 */
export type DbMatSubsidiaryProps = {
  /** 次材目录 当前选中 */
  matSubsidirayDirectory?: DeviceMatDirectoryItem;

  /** 次材明细 当前选中 */
  matSubsidirayDetailCurrent?: SubsidiaryMatDetailItem;

  /** 人材机明细 当前选中 */
  matSubsidirayContentCurrent?: MatSubsidiaryContentItem;

  /** 人材机明细 设置当前选中 */
  setMatSubsidirayContentCurrent?: Dispatch<React.SetStateAction<MatSubsidiaryContentItem | undefined>>;

  /** 次材明细 当前勾选 */
  matSubsidirayDetailSelection?: SubsidiaryMatDetailItem[];
  /** 次材明细 设置当前勾选 */
  setMatSubsidirayDetailSelection?: Dispatch<React.SetStateAction<SubsidiaryMatDetailItem[] | undefined>>;

  /** 次材明细 Table Ref */
  matSubsidirayDetailTableRef?: TableActionType;

  /** 人材机明细 Table Ref */
  matSubsidirayContentTableRef?: TableActionType;
};
