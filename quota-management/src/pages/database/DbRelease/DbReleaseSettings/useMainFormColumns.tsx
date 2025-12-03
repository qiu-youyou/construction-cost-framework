/*
 * @Author: SHUANG
 * @Date: 2023-11-21 09:29:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 17:32:13
 * @Description: 定额标准发布 定额输出参数设置
 */

import VERIFICATION from 'jd-framework-web/package/common/constant/verification';
import { FormColumnsDefine } from 'jd-framework-web/package/components';

const columns: FormColumnsDefine<any> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '定额库信息',
    dataIndex: 'dekFlag',
    valueType: 'radio',
    colProps: { span: 24 },
    customFieldProps: {
      options: [
        { label: '显示', value: 1 },
        { label: '隐藏', value: 0 },
      ],
    },
  },

  {
    title: '定额内容行高：',
    dataIndex: 'deAutoRowHeight',
    valueType: 'radio',
    colProps: { span: '345px' },
    customFieldProps: {
      options: [
        { label: '自动行高', value: 1 },
        { label: '固定行高', value: 0 },
      ],
    },
  },

  {
    valueType: 'digit',
    dataIndex: 'deFixedRowHeight',
    dependencies: ['deAutoRowHeight'],
    colProps: { span: 'auto' },
    formItemProps: (form) => {
      if (form?.getFieldValue?.('deAutoRowHeight') == 0)
        return { rules: [{ required: true, message: '固定行高必填' }] };
      else return { hidden: true };
    },
  },

  {
    title: '人材机含量行高：',
    dataIndex: 'rcjAutoRowHeight',
    valueType: 'radio',
    colProps: { span: '345px' },
    customFieldProps: {
      options: [
        { label: '自动行高', value: 1 },
        { label: '固定行高', value: 0 },
      ],
    },
  },

  {
    valueType: 'digit',
    dataIndex: 'rcjFixedRowHeight',
    dependencies: ['rcjAutoRowHeight'],
    colProps: { span: 'auto' },
    formItemProps: (form) => {
      if (form?.getFieldValue?.('rcjAutoRowHeight') == 0)
        return { rules: [{ required: true, message: '固定行高必填' }] };
      else return { hidden: true };
    },
  },

  {
    title: '每页输出定额数：',
    dataIndex: 'deCountPage',
    valueType: 'digit',
    colProps: { span: 24 },
    customFieldProps: {
      min: 0,
      max: 5,
      style: { height: 28, width: 285 },
    },
  },

  {
    title: '列宽：',
    dataIndex: 'columnWidthStr',
    valueType: 'textarea',
    colProps: { span: 24 },
    tooltip: `设置每列的宽度: A-L列分别表示：A人材机类型、B材料编号、C材料名称、D单位、E人材机单价；FGHIJ为定额信息。`,
    customFieldProps: {
      style: { width: 285, height: 280, lineHeight: '24px' },
    },
  },
];

export default columns;
