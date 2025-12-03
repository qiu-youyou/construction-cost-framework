/*
 * @Author: SHUANG
 * @Date: 2023-07-25 14:59:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 10:53:54
 * @Description:
 */
/** 区域列表项 */
export type RegionsListItem = {
  billDatetime: string; //	单据时间
  billSort: string; //	顺序
  billStatus: string; //	状态
  orgCode: string; //	组织机构编码
  powerCode: string; //	权限编码
  workCode: string; //	流程编码
  areaNode: string; //	区域描述
};

/** 区域保存参数 */
export type RegionsItemSave = {
  id?: string; // 主键
  orgCode: string; //	组织机构编码
  powerCode: string; //	流程编码
  workCode: string; //	权限编码
  areaNode: string; //	区域描述
};
