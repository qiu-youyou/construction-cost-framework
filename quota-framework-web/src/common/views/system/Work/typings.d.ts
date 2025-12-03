/** 工单列表 */
export type WorkListItem = {
  id: string; // 无
  createManId: string; // 无
  createMan: string; // 无
  createDatetime: string; // 无
  billStatus: string; // 工单状态编码
  billNo: string; // 工单编号
  billName: string; // 工单名称
  submitter: string; // 提报人
  submitterId: string; // 提报人id
  createDeptName: string; // 提报人部门
  createDeptId: string; // 提报人部门ID
  email: string; // 邮箱
  phone: string; // 联系电话
  workStatus: string; // 工单状态
  bizType: string; // 业务类型
  bizTypeCode: string; // 业务类型编码
  systemModule: string; // 系统模块
  assignPersonnel: string; // assignPersonnel
  assignPersonnelCode: string; // 指派人员ID
  problemDesc: string; // 问题描述
};
