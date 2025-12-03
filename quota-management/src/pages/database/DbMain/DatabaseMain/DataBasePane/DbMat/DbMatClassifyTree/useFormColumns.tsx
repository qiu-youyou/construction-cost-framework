/*
 * @Author: SHUANG
 * @Date: 2023-10-17 10:42:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-01 16:10:13
 * @Description: 增加Mat册章节
 */
import { ProFormColumnsType } from '@ant-design/pro-form';
import VERIFICATION from '@/common/constant/verification';
import { DbMatClassifySaveParams } from './typings';

const columns: ProFormColumnsType<DbMatClassifySaveParams>[] = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    dataIndex: 'parentId',
    hideInForm: true,
  },
  {
    title: '章节目录编码',
    dataIndex: 'classifyCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '章节目录全称',
    dataIndex: 'classifyName',
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
