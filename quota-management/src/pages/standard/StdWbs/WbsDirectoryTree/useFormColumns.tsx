/*
 * @Author: SHUANG
 * @Date: 2024-02-21 16:37:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-21 16:50:39
 * @Description: 标准库-WBS库 目录
 */
import { ProFormColumnsType } from '@ant-design/pro-form';
import VERIFICATION from '@/common/constant/verification';
import { WbsDirectoryItem } from './typings';

const columns: ProFormColumnsType<WbsDirectoryItem>[] = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '目录编码',
    dataIndex: 'wbsDirectoryCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '目录名称',
    dataIndex: 'wbsDirectoryName',
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
