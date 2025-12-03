/*
 * @Author: SHUANG
 * @Date: 2022-09-29 20:50:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 10:51:55
 * @Description:
 */

export type AttachmentListItem = {
  id: string; //	ID
  businessType: string; //	业务类型
  businessId: string; //	业务主键
  attachmentDesc: string; //	附件描述
  attachmentName: string; //	附件名称
};

export interface AttachmentQuery {
  businessId?: string;
}
