/*
 * @Author: SHUANG
 * @Date: 2023-10-17 10:42:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-30 11:54:10
 * @Description: 增加Mat册章节
 */
import { ProFormColumnsType } from '@ant-design/pro-form';
import VERIFICATION from '@/common/constant/verification';
import { DbFeeDirectoryItem } from './typings';

const columns: ProFormColumnsType<DbFeeDirectoryItem>[] = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '目录名称',
    dataIndex: 'feeDirectoryName',
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
