/*
 * @Author: SHUANG
 * @Date: 2022-06-16 14:51:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2022-08-18 11:06:52
 * @Description:
 */

/** 字典类别项 */
export type BusinessDictListItem = {
  businessName: string;
  description: string;
  id: string;
  defaultRule: string;
  billSort: number;
  billStatus: number;
  workflowRule: string;
  workflowFlag: number;
  workflowFormUrl: string;
  workflowKey: string;
};
