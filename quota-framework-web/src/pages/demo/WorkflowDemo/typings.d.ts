/*
 * @Author: SHUANG
 * @Date: 2023-05-17 11:27:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-05-19 11:45:25
 * @Description: 反馈及投诉
 */

/** 反馈及投诉列表项 */
export type IssueListItem = {
  companyCode: string; //	所在单位编码
  companyName: string; //	所在单位名称
  costTypeCode: string; //	专业编码
  costTypeName: string; //	专业名称
  generalFactoryCode: string; //	装置代码
  generalFactoryName: string; //	装置名称
  id: string; //	主键
  issueNode: string; //	问题描述
  personName: string; //	涉及甲方人员
  phone: string; //	联系电话
  problemTypeCode: string; //	问题分类编码
  problemTypeName: string; //	问题分类名称
  processCode: string; //	进程编码
  processName: string; //	进程名称
  reconciliationCode: string; //	协调环节编码
  reconciliationName: string; //	协调环节名称
  solveCode: string; //	是否解决编码
  solveName: string; //	是否解决名称
  startDateTime: string; //	发起时间
  startPerson: string; //	发起人
  processInstanceId: string; //	工作流实例ID
  processDefinitionId: string; //	工作流部署ID
  billStatus: string; //	数据状态
  workflowLockStatus: string; // 工作流任务锁
  productionDeptCode: string; // 申请部门代码
  productionDeptName: string; // 申请部门名称
  productionBaseCode: string; // 公司编码
  productionBaseName: string; // 公司名称
  workFlowKey: string;
  returnStatus: string;
};

/** 反馈及投诉争议 表单项 */
export type IssueSaveAction = {
  startPerson: string; //	发起人
  startDateTime: string; //	发起时间
  companyName: string; //	所在单位编码
  companyCode: string; //	所在单位名称
  phone: string; //	联系电话
  problemTypeCode: string; //	问题分类编码
  problemTypeName: string; //	问题分类名称
  costTypeCode: string; //	专业编码
  costTypeName: string; //	专业名称
  generalFactoryCode: string; //	装置代码
  generalFactoryName: string; //	装置名称
  personName: string; //	涉及甲方人员
  reconciliationCode: string; //	协调环节编码
  reconciliationName: string; //	协调环节名称
  solveCode: string; //	是否解决编码
  solveName: string; //	是否解决名称
  processCode: string; //	进程编码
  processName: string; //	进程名称
  issueNode: string; //	问题描述
};
