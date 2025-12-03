/*
 * @Author: SHUANG
 * @Date: 2023-10-26 15:52:03
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-01 16:27:58
 * @Description: 查看 当前权限
 */

import BaseSchemaForm from 'jd-framework-web/package/components/BaseSchemaForm';
import { BaseSchemaFormProps } from 'jd-framework-web/package/components';

import { DbAccessProps } from '../DbAccessMain/typings';
import useFormColumns from './useFormColumns';

export default (props: DbAccessProps) => {
  /** 数据接收 */
  const { dbAccessCurrent } = props;

  const generatemainForm: BaseSchemaFormProps = {
    initialValues: dbAccessCurrent,
    columns: useFormColumns,
    submitter: false,
    disabled: true,
  };

  return <BaseSchemaForm {...generatemainForm} />;
};
