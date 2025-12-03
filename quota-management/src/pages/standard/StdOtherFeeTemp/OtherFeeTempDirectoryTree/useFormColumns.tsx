/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:16:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-22 09:32:42
 * @Description: 标准库-其他费用模板-目录
 */

import { ProFormColumnsType } from '@ant-design/pro-form';
import VERIFICATION from '@/common/constant/verification';
import { OtherFeeTempDirectoryItem } from './typings';

const columns: ProFormColumnsType<OtherFeeTempDirectoryItem>[] = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '目录编码',
    dataIndex: 'otherSumDirectoryCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '目录名称',
    dataIndex: 'otherSumDirectoryName',
    formItemProps: { rules: VERIFICATION.required },
  },
  // {
  //   title: '目录简称',
  //   dataIndex: 'otherSumDirectorySimple',
  //   formItemProps: { rules: VERIFICATION.required },
  // },
];

export default columns;
