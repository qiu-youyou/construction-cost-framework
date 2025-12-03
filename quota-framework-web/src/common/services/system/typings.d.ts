/*
 * @Author: SHUANG
 * @Date: 2022-08-29 16:10:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-11 17:46:20
 * @Description:
 */

export type DictItemDefine = { label: string; value: string }[];

/** 系统表单类型 0 readonly 详情 1 添加 2 编辑  */
export type FormType = 0 | 1 | 2;

/** 系统字典 */
export type DictDefine = {
  ORG_TYPE: DictItemDefine;
  UNIT: DictItemDefine;
  PRODUCTION_BASE: DictItemDefine;
  PROFESSION_TYPE: DictItemDefine;
  PROFESSION_LEVEL: DictItemDefine;
  CONTRACT_NATURE: DictItemDefine;
  CONTRACT_STATUS: DictItemDefine;
  WORK_STATUS: DictItemDefine;
  BIZ_TYPE: DictItemDefine;
  YESANDNO: DictItemDefine;
  YES_NO: DictItemDefine;
  SJQX: any;
};

export type WorkflowSaveCallbackParams = {
  workflowKey?: string;
  actionType: 'saveBtn' | 'subBtn' | 'finishBtn' | 'forwardBtn' | 'rejectBtn';
};
