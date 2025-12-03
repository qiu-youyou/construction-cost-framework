/*
 * @Author: SHUANG
 * @Date: 2023-04-28 16:27:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-20 17:09:41
 * @Description: 通知公告
 */

// 通知公告列表项
export type BulletinListItem = {
  billStatus: string; //	状态
  id: string; //	主键
  lastUpdateTime: string; //	最后修改时间
  lastUpdateUserName: string; //	最后修改人
  newsType: string; //	公告类型
  title: string; //	公告标题
  contentString?: string;
  createMan?: string;
  createDatetime?: string;
  updateMan?: string;
  updateDatetime?: string;
};

// 新增 保存 公告
export type BulletinSaveParams = {
  title: string; //	公告标题
  content: string; //	公告内容
  newsType: string; //	公告类型-PUBLIC:公共、PRIVATE:私有
  selectOrgNames?: string; // 组织机构名称集合,逗号分隔,公告类型私有时填写
  selectOrgIds?: string; // 组织机构ID集合,逗号分隔,公告类型私有时填写
};
