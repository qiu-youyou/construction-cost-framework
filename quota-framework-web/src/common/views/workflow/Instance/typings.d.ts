/*
 * @Author: SHUANG
 * @Date: 2022-08-02 09:47:47
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2022-09-11 18:39:05
 * @Description:
 */
export type InstanceListItem = {
  id: string;
  name: string;
  category: string;
  deploymentId: string;
  isActive: boolean;
  suspensionState?: 1 | 2 | 3;
  endTime: string;
  processInstanceId: string;
};
