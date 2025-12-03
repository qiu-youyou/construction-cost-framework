/*
 * @Author: SHUANG
 * @Date: 2022-09-01 15:44:19
 * @LastEditors: 2470381299@qq.com
 * @LastEditTime: 2023-10-30 10:02:01
 * @Description:
 */

type ButtonAuth = {
  saveBtn?: boolean; // 保存按钮
  finishBtn?: boolean; // 完成按钮-提前结束
  abandon?: boolean; // 作废按钮
  subBtn?: boolean; // 提交按钮
  forwardBtn?: boolean; // 转办按钮
  abandonBtn?: boolean; // 作废按钮
  rejectBtn?: boolean; // 退回按钮

  backBtn?: boolean; // 其他退回方式-暂时无用
  noticeBtn?: boolean; // 通知按钮 暂无

  // 只有前端存在的
  disallow?: boolean; // 驳回
  disuse?: boolean; // 废弃
  forward_admin?: boolean; // 转办-管理员
  reject_admin?: boolean; // 退回-管理员
  abandon_admin?: boolean; // 作废-管理员
  [key: string]: boolean | undefined;
};

/** 审核人查询参数 */
interface UserListQueryParams {
  workFlowKey: string; // 流程key
  processInstanceId: string; // 工作流实例ID
  processDefinitionId: string; // 工作流部署ID
  constructUnitCode: string; // 承包商编码
  generalFactoryCode: string; // 装置编码
  companyId: string; // 公司编码
  billStatus: string; // 单据状态
  fromParams?: () => Promise<any>; // 流条件参数
  params?: {}; // 其他参数
  projectCode: string; // 单据编码
  businessId: string;
  m?: 'Y';
}

interface UserListQueryParamsPate {
  workFlowKey: string;
  processInstanceId: string; // 工作流实例ID
  processDefinitionId: string; // 工作流部署ID
  constructUnitCode: string; // 承包商编码
  generalFactoryCode: string; // 装置编码
  projectCode: string; // 单据编码
  companyId: string; // 公司编码
  params?: {}; // 其他参数
  fromParams: string; // 流条件参数爽、
  billStatus: string;
}

/** 下一环节审核人 */
export type NextUserListItem = {
  dept: string;
  id: string;
  positionsName: string; // 岗位
  userName: string; // 员工代号
  userRealname: string; // 用户姓名
  userId: string;
};

/** 提交 */
interface CommitCompleteTaskParams {
  nextPersonnel: string;
  businessId: string;
  companyId: string;
  businessName: string;
  workflowKey: string;
  processInstanceId: string;
  projectId: string;
  projectCode: string;
  projectName: string;
  generalFactoryName: string;
  generalFactoryCode: string;
  branchFactoryCode: string;
  fromId: string;
  // noticePerson: [];
  fromParams: string;
  nextUserMessage: string;
  singleSelect: string;
  message: string;
  billStatus: string;
  noticePerson?: string;
  noticeContent?: string;
}

/** 退回 */
interface CommitRejectTaskParams {
  upperPersonnel: string;
  businessId: string;
  companyId: string;
  businessName: string;
  workflowKey: string;
  processInstanceId: string;
  projectId: string;
  projectCode: string;
  projectName: string;
  generalFactoryName: string;
  generalFactoryCode: string;
  branchFactoryCode: string;
  fromId: string;
  fromParams: string;
  nextUserMessage: string;
  singleSelect: string;
  message: string;
  billStatus: string;
  noticePerson?: string;
  noticeContent?: string;
}

type CommitTaskPropsParams = {
  generalFactoryName: string;
  branchFactoryCode: string;

  businessName: string;
  businessId: string;

  projectName: string;
  projectId: string;

  fromId: string;
  noticePerson: string;
  nextUserMessage: string;
  singleSelect: string;
};

type CommitTaskPropsCheckParams = {
  businessId?: string;
  workflowKey: string;
  processInstanceId: string;
  billStatus: string;
};
