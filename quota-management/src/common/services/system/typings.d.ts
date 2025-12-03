/*
 * @Author: SHUANG
 * @Date: 2022-08-29 16:10:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-31 15:47:01
 * @Description:
 */

import { JDCMDSystemTypings } from 'jd-framework-web/package/common';

type DictItemDefine = JDCMDSystemTypings['DictItemDefine'];

declare namespace SYS {
  /** 系统表单类型 0 readonly 详情 1 添加 2 编辑  */
  type FormType = JDCMDSystemTypings['FormType'];

  /** 系统字典 */
  type DictDefine = JDCMDSystemTypings['DictDefine'] & {
    SJQX: DictItemDefine;
    PHASE: DictItemDefine;
    PROFESSION: DictItemDefine;
    busi_type: DictItemDefine;
    project_type: DictItemDefine;
    soil_type: DictItemDefine;
    AREA_TYPE: DictItemDefine;
    SPE_AREA_TYPE: DictItemDefine;
    dbapply_phase: DictItemDefine;
    dbapply_type: DictItemDefine;
  };

  type WorkflowSaveCallbackParams = JDCMDSystemTypings['WorkflowSaveCallbackParams'] & {};
}
export = SYS;
export as namespace SYS;
