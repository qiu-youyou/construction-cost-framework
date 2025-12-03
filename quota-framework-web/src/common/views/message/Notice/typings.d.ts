/*
 * @Author: SHUANG
 * @Date: 2023-01-03 10:49:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 10:52:45
 * @Description:
 */

export type NoticeListItem = {
  accessAddress: string; //	业务菜单路由
  billDatetime: string; //	通知时间
  billName: string; //	业务单据名称
  billStatus: string; //	单据状态，0未查阅，1已查阅
  businessId: string; //	业务单据ID
  businessName: string; //	模块名称
  content: string; //	提醒内容
  id: string; //	通知单主单据ID
  noticeId: string; //	通知单-人员ID，一般使用这个
  noticeLookDate: string; //	查阅时间
  projectCode: string; //	业务单据编码
  sid: string; //	任务SID
  taskId: string; //	任务ID
  taskName: string; //	任务名称
  userId: string; //	被通知人ID
  userName: string; //	被通知人姓名
};
