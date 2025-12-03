/*
 * @Author: SHUANG
 * @Date: 2023-05-10 17:49:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-05-16 16:19:57
 * @Description:
 */
export interface SysAnswerQuery {
  businessId: string; // 业务单据ID
  businessType: string; // 业务单据流程Key
}

export type SysAnswerListItem = {
  answerContent: string; //	主要内容
  answerId: string; //	回复ID
  answerPerson: string; //	通知人员
  answerTitle: string; //	概要内容
  answerType: string; //	回复类型
  businessCode: string; //	主单据编码
  businessId: string; //	主单据ID
  businessName: string; //	主单据名称
  businessType: string; //	业务KEY
  showTitleName: string; //	显示标题
  createMan: string;
  createDatetime: string;
  id: string;
  billStatus: string;
};

export type SysAnswerParams = {
  businessId: string; // 业务单据ID
  businessType: string; // 业务单据流程Key
  answerContent: string; // 问答内容
  answerPerson: string; // 问答人员
  answerType: string; // 回复类型:create(新建)、answer(回复)
  moduleName: string; // 路由菜单名称
  businessCode: string; // 业务单据编号
  businessName: string; // 业务单据名称
  answerTitle: string; // 概要内容
};
