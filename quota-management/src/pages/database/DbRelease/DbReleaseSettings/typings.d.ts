/*
 * @Author: SHUANG
 * @Date: 2023-11-21 11:46:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-21 11:46:30
 * @Description:
 */
export type DbReleaseSettingsItem = {
  id: string; // id(有为更新，无为新增)
  deAutoRowHeight: string; // 定额内容行高，自动行高，0-否，1-是
  deFixedRowHeight: string; // 定额内容固定行高
  rcjAutoRowHeight: string; // 人材机含量行高，自动行高，0-否，1-是
  rcjFixedRowHeight: string; // 人材机含量行高，固定行高
  deCountPage: string; // 每页输出定额行数
  columnWidthStr: string; // 列宽
  dekFlag: string; // 是否显示定额库信息，0-显示，1-不显示
};
