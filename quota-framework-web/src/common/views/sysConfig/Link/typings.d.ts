/*
 * @Author: SHUANG
 * @Date: 2023-07-25 15:32:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 10:53:15
 * @Description:
 */
/** 系统连接列表项 */
export type ShipLinkListItem = {
  billSort: string; //	顺序
  billStatus: string; //	状态
  icon: string; //	图标
  id: string; //	主键
  linkType: string; //	连接类型
  menuKey: string; //	是否系统菜单
  openType: string; //	打开方式
  sysType: string; //	快捷方式类型
  title: string; //	标题
  url: string; //	地址
};

/** 系统连接保存 */
export type ShipLinkItemSave = {
  id?: string; // 主键
  billSort: string; // 顺序
  icon: string; // 图标
  linkType: string; // 类型
  openType: string; // 打开方式
  title: string; // 标题
  url: string; // 地址
};
