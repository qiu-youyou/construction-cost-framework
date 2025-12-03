/*
 * @Author: SHUANG
 * @Date: 2023-08-18 13:52:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 18:25:15
 * @Description:
 */
import { CommitTaskPropsParams, UserListQueryParams } from '../typing';
import { FieldNames, ProcessBusinessProps } from './typings';

export const processDefaultQueryParams: UserListQueryParams = {
  workFlowKey: '',
  processInstanceId: '',
  processDefinitionId: '',

  generalFactoryCode: '',
  constructUnitCode: '',
  companyId: '',

  projectCode: '',

  billStatus: '',
  businessId: '',
};

export const processDefaultCommitParmas: CommitTaskPropsParams = {
  branchFactoryCode: '',
  generalFactoryName: '',

  nextUserMessage: '',
  singleSelect: '',
  noticePerson: '',
  fromId: '',

  businessName: '',
  businessId: '',
  projectName: '',
  projectId: '',
};

const fieldNamesDefault: FieldNames = { businessId: 'id' };

/** 根据 Current 处理 queryParams */
export const handleProcessQueryParams = (
  current?: any,
  fieldNamesProp?: FieldNames,
  fromParams?: ProcessBusinessProps['fromParams'],
) => {
  const fieldNames: Record<string, string> = { ...fieldNamesDefault, ...fieldNamesProp };
  let params: UserListQueryParams & { [index: string]: any } = {
    ...processDefaultQueryParams,
    fromParams,
  };
  if (!current) return params;
  for (const key in params) {
    /** 如果该字段在 fieldName 中重新定义 那么就通过 fieldName 取值 */
    const newFieldName = fieldNames?.[key];
    if (!!newFieldName) {
      params[key] = current?.[newFieldName] || '';
    } else {
      params[key] = current?.[key] || params[key];
    }
  }
  return params;
};

/** 根据 Current 处理 commit */
export const handleProcessCommitParams = (current?: any, fieldNamesProp?: FieldNames) => {
  const fieldNames: Record<string, string> = { ...fieldNamesDefault, ...fieldNamesProp };
  let params: CommitTaskPropsParams & { [index: string]: any } = { ...processDefaultCommitParmas };
  if (!current) return params;
  for (const key in params) {
    /** 如果该字段在 fieldName 中重新定义 那么就通过 fieldName 取值 */
    const newFieldName = fieldNames?.[key];
    if (!!newFieldName) {
      params[key] = current?.[newFieldName] || '';
    } else {
      params[key] = current?.[key] || params[key];
    }
  }
  return params;
};
