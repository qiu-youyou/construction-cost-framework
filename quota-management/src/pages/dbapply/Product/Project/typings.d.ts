/*
 * @Author: SHUANG
 * @Date: 2024-01-10 10:27:29
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-25 14:00:39
 * @Description: 工程造价产品-工程信息
 */

import { BaseTableProps } from 'jd-framework-web/package/components';

/** 工程造价产品-工程信息 数据项 */
export type ProjectItem = {
  projectCode: string; // 项目编号
  projectName: string; // 项目名称
  projectLeaderPerson: string; // 项目负责人
  projectCheckPerson: string; // 审查人
  industry: string; // 所属行业
  projectBusinessType: string; // 业务类型名称
  projectIndustry: string; // 所属行业名称
  projectRegion: string; // 参数-地区分类
  projectSpecialRegion: string; // 参数-特殊地区地区分类
  projectCounty: string; // 国别
  projectProvince: string; // 省份
  secret: string; // 是否涉密 不确定
  feature: string; // 项目特征
  note: string; // 备注
  userInformationFz: string; // 用户负责人信息
  userInformationSc: string; // 用户审查人信息
  featureInformation: string; // 项目特征信息
  id: string;
  billStatus: string;
  workflowLockStatus: string;
  returnStatus: string;
  children: any[];
};

/** 工程造价产品-工程信息 保存项 */
export type ProjectSaveParams = Partial<ProjectItem>;

/** 工程造价产品-工程信息 Props */
export type PropsProject = {
  /** 工程信息表 重写 */
  tableProps?: Partial<BaseTableProps>;
};
