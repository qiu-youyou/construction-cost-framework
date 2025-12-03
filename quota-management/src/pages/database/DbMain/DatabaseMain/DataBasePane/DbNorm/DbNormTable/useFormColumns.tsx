/*
 * @Author: SHUANG
 * @Date: 2023-11-07 18:09:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-01 17:31:09
 * @Description: 定额 调整系数表单
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';
import { DbNormItem } from './typings';

const columns: FormColumnsDefine<DbNormItem> = [
  {
    title: '人工系数',
    dataIndex: 'normManQ',
    valueType: 'digit',
  },
  {
    title: '材料系数',
    dataIndex: 'normMatQ',
    valueType: 'digit',
  },
  {
    title: '机械系数',
    dataIndex: 'normMacQ',
    valueType: 'digit',
  },
  {
    title: '作用范围',
    dataIndex: 'coefficientType',
    valueType: 'radio',
    initialValue: 2,
    customFieldProps: {
      options: [
        { label: '按章节调整', value: 1 },
        { label: '选中行调整', value: 2 },
      ],
    },
    formItemProps: { rules: [{ required: true, message: '必填' }] },
  },
];

export default columns;
