/*
 * @Author: SHUANG
 * @Date: 2023-11-10 15:21:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 15:33:40
 * @Description: 项目相关设计文档目录结构
 */

import { ProFormColumnsType } from '@ant-design/pro-form';
import VERIFICATION from '@/common/constant/verification';
import { DocumentDirectoryItem } from './typings';

const columns: ProFormColumnsType<DocumentDirectoryItem>[] = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '目录编码',
    dataIndex: 'directoryCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '目录名称',
    dataIndex: 'directoryName',
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
