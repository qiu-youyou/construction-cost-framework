/*
 * @Author: SHUANG
 * @Date: 2023-07-24 09:44:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 10:53:24
 * @Description:
 */
/** 维护配置列表项目 */
export type SysConfigListItem = {
  billSort: string; //	顺序
  billStatus: string; //	状态
  configKey: string; //	配置key
  configTitle: string; //	配置名
  configValue: string; //	配置值
  createDatetime: string; //	创建时间
  createMan: string; //	创建人
  createManId: string; //	创建人ID
  id: string; //	主键
  updateDatetime: string; //	最后修改时间
  updateMan: string; //	最后修改人
  updateManId: string; //	最后修改人ID
};
