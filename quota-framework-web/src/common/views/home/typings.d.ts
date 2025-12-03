/*
 * @Author: SHUANG
 * @Date: 2022-07-05 10:55:04
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-12 17:41:48
 * @Description:
 */

/** 代办项 */
export type ToDoListItem = {
  applyUserName: string;
  assignee: string;
  businessId: string;
  businessKey: string;
  businessName: string;
  businessTypeName: string;
  createTime: string;
  currentDate: string;
  generalFactoryCode: string;
  generalFactoryName: string;
  priority: number;
  processDefinitionId: string;
  processInstanceId: string;
  projectId: string;
  refuseFlag: boolean;
  revision: number;
  revisionNext: number;
  taskId: string;
  taskName: string;
  variables: {};
  workflowFormUrl: string;
  workflowIsEnd: boolean;
  timeLimit: string;
  ywmc: string;
  djmc: string;
  rwmc: string;
  tjsj: string;
  spzt: string;
  cq: boolean;
};

/** 已办项 */
export type ToDoDoneListItem = {
  assignee: string; //	审批人ID
  businessId: string; //	业务表单ID
  businessKey: string; //	工作流业务Key
  businessName: string; //	工作流业务名称
  businessTypeName: string; //	工作流业务类型名称
  deleteReason: string; //	完成状态标识
  endTime: string; //	结束时间
  fromId: string; //	表单ID
  processDefinitionId: string; //	工作流部署ID
  processInstanceId: string; //	工作流实例ID
  projectId: string; //	业务表单编码
  projectName: string; //	业务表达名称
  refuseFlag: string; //	是否拒绝
  revision: number; //	版本
  revisionNext: number; //	下一个版本
  taskName: string; //	任务名称
  variables: object; //	任务参数
  workflowFormUrl: string; //	打开界面地址
  workflowIsEnd: boolean; // 是否提前结束
  applyUserName: string;
  createTime: string;
  startTime: string;
};

export type BusinessItem = {
  businessKey: string;
  businessId: string;
  businessTypeName: string;
};

/** 通知项 */
export type NoticeListItem = {
  id: string; //	通知ID
  noticeId: string; //	通知ID
  businessId: string; //	表单业务ID
  billName: string; //	业务表单主名称
  projectCode: string; //	业务表单编码
  projectName: string; //	业务表单名称
  sendPerson: string; //	发送人
  accessAddress: string; //	发送地址
  noticePerson: string; //	通知人
  billStatus: string;
  content: string; //消息内容
  taskName: string; // 任务名称
  businessName: string; //业务单据
  createMan: string; //通知创建人
  createDatetime: string; //通知时间
};

/** 公告项项 */
export type NewsListItem = {
  id: string; //	公告ID
  billStatus: string; //	公告状态
  title: string; //	公告标题
  newsType: string; //	公告类型
  selectOrgNames: string; //	通知组织机构
  createMan: string; //通知创建人
  createDatetime: string; //通知时间
  lastUpdateUserName: string; //通知创建人
  lastUpdateTime: string; //通知时间
};

/** 快捷方式项 */
export type ShortcutItem = {
  id: string; //	ID
  icon: string; //	图标
  title: string; //	名称
  url: string; //	地址
  linkType: string; //	外联或者弹窗
  openType: string; //	A标签中target
  sysType: string; //	是否系统
};

/** 登录记录项 */
export type LoginsItem = {
  logOperation: string; // 操作提示
  logInfo: string; // 其他信息
  ipAddress: string; // 登录ID
  date: string; // 创建时间-时分秒
};

/** 连接项 */
export type LinksItem = {
  id: string; // ID
  title: string; // 标题
  url: string; // 连接
  linkType: string; // 外联或者弹窗
  openType: string; // A标签中target
};

export type TotalMap = {
  task: number;
  done?: number;
  notice: number;
  news?: number;
  answer: number;
};
