/*
 * @Author: SHUANG
 * @Date: 2023-07-25 15:21:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 10:54:30
 * @Description:
 */
/** 快捷方式列表项 */
export type ShortcutListItem = {
  billSort: string; // 顺序
  billStatus: string; // 状态
  icon: string; // 图标
  id: string; // 主键
  linkType: string; // 连接类型
  menuKey: string; // 是否系统菜单
  openType: string; // 打开方式
  sysType: string; // 快捷方式类型
  title: string; // 标题
  url: string; // 地址
};

/** 快捷方式保存操作 */
export type ShortcutItemSave = {
  id?: string; // 主键
  billSort: number; // 顺序
  icon: string; // 图标
  linkType: string; // 连接类型
  openType: string; // 打开方式
  title: string; // 标题
  url: string; // 地址
  menuKey: string; // 系统菜单
  sysType: string; // 系统类型
};
