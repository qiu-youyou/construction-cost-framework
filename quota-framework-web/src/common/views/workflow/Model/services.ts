/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-13 16:56:45
 * @Description:
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 流程模型维护查询
 * @Date: 2023-08-02 17:16:00
 */
export async function workflowListMode(data?: FETCH.Req) {
  let fetchParams: any = { ...data };
  if (!!fetchParams?.searchParams) {
    fetchParams = { ...fetchParams, ...JSON.parse(data?.searchParams) };
    delete fetchParams.searchParams;
  }
  return request<FETCH.Res<TYPES.ModelListItem>>('/workflow/model/listModel.action', {
    method: 'POST',
    data: fetchParams,
  });
}

/**
 * @Author: SHUANG
 * @Description: 流程模型维护新增
 * @Date: 2023-08-02 17:16:08
 */
export async function workflowCreateModel(data: TYPES.ModelActionItem) {
  return request<FETCH.Res & { rows: TYPES.ModelListItem }>('/workflow/model/creatModel.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 部署模型
 * @Date: 2023-08-02 17:36:18
 */
export async function workflowDeploymentModel(data: { id: string }) {
  return request<FETCH.Res>('/workflow/model/deploymentModel.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 流程模型维护导入
 * @Date: 2023-08-02 17:33:37
 */
export async function workflowImportModel(data: FormData) {
  return request<FETCH.Res>('/workflow/gooflow/model/importModel.action', {
    requestType: 'form',
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 导出
 * @Date: 2022-10-25 20:56:27
 */
export async function workflowExportModel(data: { id: string }) {
  return request<FETCH.Res>('/workflow/model/exportModel.action', {
    method: 'POST',
    responseType: 'blob',
    getResponse: true,
    data: data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 删除模型
 * @Date: 2023-08-02 17:45:03
 */
export async function workflowDeleteModels(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/workflow/model/deleteModels.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 模型相关字典
 * @Date: 2022-08-18 11:36:39
 */
export async function queryModelSelectParams() {
  return request<FETCH.Res>('/workflow/select/queryModelSelectParams.action', {
    method: 'POST',
  });
}

/** 获取 相关字典 */
export const workflowQueryModelSelectParams = async () => {
  const { rows, status } = await queryModelSelectParams();
  const res: any = rows;
  if (status !== 'SUCCESS') return {};
  const business = res?.business;
  const businessEnum: { [index: string]: any } = {};

  res?.business.forEach((item: any) => {
    businessEnum[item.workflowKey] = { text: item.businessName };
  });

  const org = res?.org;
  const orgEnum: { [index: string]: any } = {};

  res?.org.forEach((item: any) => {
    orgEnum[item.id] = { text: item.orgName };
  });
  return { business, org, businessEnum, orgEnum };
};
