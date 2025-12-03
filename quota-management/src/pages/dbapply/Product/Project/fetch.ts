/*
 * @Author: SHUANG
 * @Date: 2024-02-04 09:36:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 11:44:40
 * @Description: 工程造价产品-工程信息
 */

import { productProjectSave } from './services';
import { ProjectItem } from './typings';

/**
 * @Author: SHUANG
 * @Description: 新建工程 保存方法
 * @Date: 2024-02-04 09:39:16
 */
export const fetchProductProjectSave = async (params: Partial<ProjectItem>) => {
  const copyParams: any = { ...params };
  const finalParams: any = { ...params };
  const { projectIndustry, projectCounty } = copyParams;

  finalParams['projectIndustry'] =
    typeof projectIndustry === 'string' ? projectIndustry : projectIndustry?.join('/');
  finalParams['projectCounty'] = typeof projectCounty === 'string' ? projectCounty : projectCounty?.join('/');

  /** 处理 所属行业 industry */
  /**
   * before
   * finalParams['industry'] = industry.slice(0, 2).join('/') + (industry.length > 2 ? '-' + industry[2] : '');

    finalParams['projectCounty'] =
    projectCounty.slice(0, 2).join('/') + (projectCounty.length > 2 ? '-' + projectCounty[2] : '');
   */

  return await productProjectSave(finalParams);
};
