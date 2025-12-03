/*
 * @Author: SHUANG
 * @Date: 2022-08-02 09:47:47
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2022-09-11 18:35:04
 * @Description:
 */
export type ModelListItem = {
  id: string;
  key: string;
  name: string;
  category: string;
  deploymentId?: string;
  processInstanceId: string;
  processDefinitionId: string;
};

export type ModelActionItem = {
  file: File;
  name: string;
  category: string;
  companyId: string;
  companyFactoryId: string;
  description: string;
};
