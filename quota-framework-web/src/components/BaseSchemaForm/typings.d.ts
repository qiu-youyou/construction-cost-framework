/*
 * @Author: SHUANG
 * @Date: 2022-07-18 10:53:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 11:06:49
 * @Description:
 */
/** BaseSchemaForm props */

import { ProFormColumnsType } from '@ant-design/pro-components';
import { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';

type BaseSchemaFormPropsEx<T, U> = {
  /**
   * @name readonly-表单是否只读
   * @default false
   */
  readonly?: boolean;
};

/** 此组件可以根据 Json Schema 来生成相应的表单,大部分配置与 antd 的 table 列配置相同 */
export type BaseSchemaFormProps<T = any, U = any> = FormSchema<T, U> & BaseSchemaFormPropsEx<T, U>;

/** 扩展配置 */
type CusColumns<T, ValueType> = ProFormColumnsType<T, ValueType> & {
  /** @name selectWritingIn 选择器是否支持输入 */
  selectWritingIn?: boolean;

  /** 这里弃用了render */
  customRender?: ProFormColumnsType['render'];
  /** 这里弃用了 fieldProps */
  customFieldProps?: ProFormColumnsType['fieldProps'];
};

export type FormColumnsDefine<T = any, ValueType = 'text'> = CusColumns<T, ValueType>[];
