/*
 * @Author: SHUANG
 * @Date: 2024-03-26 17:03:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-27 14:43:55
 * @Description: 工程造价-工程量清单编制-分部分项清单表 批量应用历史项目清单
 */
import { Dispatch } from 'react';

import { TableActionType } from 'jd-framework-web/package/components';
import { ProjectItem } from '@/pages/dbapply/Product/Project/typings';
import { ProductItem } from '@/pages/dbapply/Product/Product/typings';
import { InventoryItem } from '../typings';

export type ProjectSearchItem = ProjectItem;

/** 向下传递 PROPS */
export type HistoryProjectInventoryProps = {
  /** 当前选择项目阶段、设置当前选择项目阶段 */
  projectSearchCurrent?: ProjectSearchItem;
  setProjectSearchCurrent?: Dispatch<React.SetStateAction<ProjectSearchItem | undefined>>;
};

/** 接受 PROPS */
export type PropsHistoryProjectInventory = {
  /** 分部分项清单明细表 REF */
  inventoryTableRef?: TableActionType;
  /** 分部分项清单明细表 当前操作 */
  inventoryActionCurrent?: InventoryItem;
  /** 当前操作产品 */
  productActionCurrent?: ProductItem;
};

/** 批量应用历史清单 保存参数 */
export type BatchInsertHistoryProjectInventoryParams = {
  currentId: string; // 当前行ID
  currentProjectId: string; // 当前行项目ID
  currentStageId: string; // 当前行阶段ID
  projectId: string; // 项目Id
  stageId: string; // 阶段ID
  ids: string[]; // ID数组
  currentParentId: string; // 无
  billSort: string; // 无
};
