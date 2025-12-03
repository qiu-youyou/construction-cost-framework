/** 审核标注 参数 */
export type AuitRemarksParams = {
  projectId: string; // 工程id
  stageId: string; // 阶段id
  ids?: string[]; // id集合
  auditRemarks?: string; // 审核标注
  isAuditClose?: 'Y' | 'N'; // 校审记录是否关闭
};
