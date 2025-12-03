/*
 * @Author: SHUANG
 * @Date: 2023-11-08 18:57:33
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-08 18:57:38
 * @Description: 企业定额修编-勘误记录
 */

/** 勘误记录查询参数 */
export type DbCorrigendumQuery = {
  dbId: string; // 数据库ID
};

/** 勘误记录 数据项 */
export type DbCorrigendumItem = {
  id: string; // 勘误记录ID
  dbId: string; // 库ID
  corrigendumMan: string; // 修订人
  corrigendumManId: string; // 修订人id
  corrigendumDatetime: string; // 修订时间
  corrigendumContent: string; // 修订内容
  isFile: string; // 是否有附件
};
