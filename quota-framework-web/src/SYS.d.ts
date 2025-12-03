/*
 * @Author: SHUANG
 * @Date: 2022-08-29 16:10:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-11 17:55:40
 * @Description:
 */

import { JDCMDSystemTypings } from './common';

type DictItemDefine = JDCMDSystemTypings['DictItemDefine'];

declare namespace SYS {
  /** 系统表单类型 0 readonly 详情 1 添加 2 编辑  */
  type FormType = JDCMDSystemTypings['FormType'];

  /** 系统字典 */
  type DictDefine = JDCMDSystemTypings['DictDefine'] & {
    SJQX: DictItemDefine;
  };

  type WorkflowSaveCallbackParams = JDCMDSystemTypings['WorkflowSaveCallbackParams'] & {};
}
export = SYS;
export as namespace SYS;
