/*
 * @Author: SHUANG
 * @Date: 2022-06-16 14:51:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 15:58:04
 * @Description:
 */

/** 用户列表项 */
export type UserListItem = {
  areaCode: string; // 区域编码
  areaName: string; // 区域名称
  billSort: string; // 顺序
  billStatus: string; // 状态
  id: string; // 主键
  signatureImage: string; // 签名图片(base64编码)
  updateDatetime: string; // 最后修改时间
  updateMan: string; // 最后修改人
  updateManId: string; // 最后修改人ID
  userAge: string; // 用户年龄
  userHeadImage: string; // 头像
  userName: string; // 用户登录名
  userRealname: string; // 用户真实姓名
  userType: string; // 用户类型
};

/** 新增修改用户项 */
export type UserActionItem = {
  userName: string; // 登录名
  userRealname: string; //真实姓名
  userSex: string; //性别
  userAge: string; //年龄
  autographEnbale: string; //是否启用签命
  areaCode: string; //区域编码
  areaName: string; //区域名称
  userCertificateType: string; //证件类型
  userCertificateNumber: string; //证件号码
  userPhone: string; //用户电话
  userOfficePhone: string; //办公电话
  userEmail: string; //用户邮箱
  userMinDate: string; //用户开始使用时间
  userMaxDate: string; //用户最大有效期
};
