/*
 * @Author: SHUANG
 * @Date: 2022-09-01 15:44:19
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2022-10-20 17:46:21
 * @Description:
 */

export type ButtonAuth = {
  rejectBtn?: boolean; // 退回按钮
  saveBtn?: boolean; // 保存按钮
  noticeBtn?: boolean; // 通知按钮 暂无
  finishBtn?: boolean; // 完成按钮-提前结束
  abandon?: boolean; // 作废按钮
  backBtn?: boolean; // 其他退回方式-暂时无用
  subBtn?: boolean; // 提交按钮
};

export type MentionsUsersListItem = {
  userName: string;
  userRealname: string;
};
