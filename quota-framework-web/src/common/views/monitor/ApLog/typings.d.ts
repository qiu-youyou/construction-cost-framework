/*
 * @Author: SHUANG
 * @Date: 2023-07-24 17:38:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-25 10:10:11
 * @Description:
 */
/** 维护配置列表项目 */
export type SwapLogListItem = {
  address: string; //	来源地址或发送地址 3
  businessType: string; //	业务类型 2
  createDatetime: string; //	创建时间
  id: string; //	主键 1
  memo: string; //	备注 9
  msg: string; //	提示消息6
  otherInfo: string; //	其他信息 7
  repetitionNumber: string; //	重试次数 8
  sendType: string; //	发送或接收 5
  sequenceNumber: string; //	序列号
  sourceSystem: string; //	来源系统 4
};

export type SwapLogContent = {
  content?: string; //	消息内容
  otherInfo?: string; //	其他信息
  resultInfo?: string; //	返回结果
};
