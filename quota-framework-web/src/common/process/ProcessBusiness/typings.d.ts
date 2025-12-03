/*
 * @Author: SHUANG
 * @Date: 2023-08-18 13:36:52
 * @LastEditors: 2470381299@qq.com
 * @LastEditTime: 2023-10-30 09:28:12
 * @Description:
 */

import { ReactNode } from 'react';
import { ButtonAuth, CommitTaskPropsParams, UserListQueryParams } from '../typing';

/**
 * @name FieldNames
 * @description 重新指定字段 暂时有三个
 * @default businessId: id
 */
type FieldNames = { businessId?: string; projectCode?: string; businessName?: string };
type TitleRenderParams = { buttonAuth?: ButtonAuth };

/** 流程使用参数 */
export type ProcessBusinessProps = {
  /** 不同业务模块 提交 url */
  commitUrl: string;
  /** 自定义流程参数的字段 */
  fieldNames?: FieldNames;
  /** 发生操作前会 校验表单 */
  validateFieldsForms?: () => Promise<any>;
  /** 向外部设置当前表单权限 */
  setProcessAuth?: (auth: boolean) => void;
  /** 流程判断参数 如果是函数 请在返回值中返回 */
  fromParams?: () => any;
  /** 发生操作前会调用 保存方法 */
  onSave?: (params: SYS.WorkflowSaveCallbackParams) => Promise<FETCH.Row>;
  /** 单据的重置方法 */
  onReset?: () => void;
  /** 刷新主单据函数 */
  refresh?: () => void;
  /** 单据表单中使用 / 列表中使用 默认 form */
  mode?: 'form' | 'list';
  /** 当前操作 */
  current: any;

  /** 如果传入 将不在默认处理  直接使用传入的参数*/
  commmitParams?: CommitTaskPropsParams;
  queryParams?: UserListQueryParams;
  /** ProcessBusiness 特有属性 */
  formType?: SYS.FormType;
  children?: ReactNode | any;
  /** 追加在审批权限按钮后的组件 */
  appendTitleRender?: (params: TitleRenderParams) => ReactNode;
};
