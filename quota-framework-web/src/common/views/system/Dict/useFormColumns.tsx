/*
 * @Author: SHUANG
 * @Date: 2023-08-15 14:09:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 11:57:58
 * @Description:
 */
import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../constant/verification';
import { DictClassAction, DictItemAction } from './typings';

/** dictClass schema */
const dictClassFormColums: FormColumnsDefine<DictClassAction> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '类别名称',
    dataIndex: 'className',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '英文简称',
    dataIndex: 'classEn',
  },
  {
    title: '类别描述',
    dataIndex: 'classRemarks',
    valueType: 'textarea',
  },
];

/** dictItem schema */
const dictItemFormColums: FormColumnsDefine<DictItemAction> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    dataIndex: 'businessId',
    hideInForm: true,
  },
  {
    title: '字典名称',
    dataIndex: 'itemName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '字典编码',
    dataIndex: 'itemCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '类别描述',
    dataIndex: 'itemRemarks',
    valueType: 'textarea',
  },
];

export default () => {
  return {
    dictClassFormColums,
    dictItemFormColums,
  };
};
