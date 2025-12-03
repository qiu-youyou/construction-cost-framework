/*
 * @Author: SHUANG
 * @Date: 2023-10-24 09:45:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-02 11:30:52
 * @Description:
 */
import { DefaultOptionType } from 'antd/lib/select';
import { BaseSchemaFormProps, FormColumnsDefine } from './typings';

const useColumns = (props: BaseSchemaFormProps) => {
  const cascaderFilter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some((option) => (option?.label as string).toLowerCase()?.indexOf?.(inputValue.toLowerCase()) > -1);

  const handleFormColumns = (columnsArr: FormColumnsDefine | any, childrenIs?: boolean) => {
    if (!columnsArr?.length) return columnsArr;
    const newColumnsArr: FormColumnsDefine = [...columnsArr];
    return newColumnsArr.map((item: any, index) => {
      if (item?.length) {
        const columns: any[] = handleFormColumns(item);
        return columns;
      }

      item = {
        ...item,
        fieldProps: (form: { setFieldsValue: (arg0: any) => void }, config: any) => {
          const { customFieldProps } = item;
          const fieldProps =
            typeof customFieldProps === 'function' ? customFieldProps(form, config) : customFieldProps;

          /** 返回 fiedlProps 用户传入权重更大 */
          const newFieldProps: { [index: string]: any } = {};

          // 下拉可以输入
          if (item?.valueType === 'select') {
            newFieldProps['showSearch'] = true;

            // 选择器支持写入
            if (!!item?.selectWritingIn) {
              if (!fieldProps?.onSearch) {
                newFieldProps['onSearch'] = (value: string) => {
                  if (value !== '') {
                    const values: any = {};
                    const dataIndex: any = item?.dataIndex;
                    values[dataIndex] = value;
                    form?.setFieldsValue?.({ ...values });
                  }
                };
              }
              if (!fieldProps?.onChange) {
                newFieldProps['onChange'] = (value: string) => {
                  const values: any = {};
                  const dataIndex: any = item?.dataIndex;
                  values[dataIndex] = value;
                  form?.setFieldsValue?.({ ...values });
                };
              }
            }
          }

          // 级联选择 可搜索
          if (item?.valueType === 'cascader') {
            newFieldProps['showSearch'] = cascaderFilter;
            newFieldProps['changeOnSelect'] = true;
          }

          if (item?.valueType === 'digit') {
            // 数字可以穿负值
            newFieldProps['min'] = Number.MIN_SAFE_INTEGER;
            // 去掉数字格式旁边的箭头
            // newFieldProps['controls'] = false;
          }

          return {
            ...newFieldProps,
            ...fieldProps,
          };
        },
      };

      /** 如果有自定义render */
      if (typeof item?.customRender === 'function') {
        item['render'] = (...args: any) => item?.customRender?.(...args);
      }

      return item;
    });
  };

  const columns: any[] = handleFormColumns(props.columns);
  return { columns };
};

export default useColumns;
