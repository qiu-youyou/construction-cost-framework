/*
 * @Author: SHUANG
 * @Date: 2023-11-09 11:23:17
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-09 13:49:18
 * @Description: 标准库-装置性材料价格库-目录
 */
import { ProFormColumnsType } from '@ant-design/pro-form';
import VERIFICATION from '@/common/constant/verification';
import { DeviceMatDirectoryItem } from './typings';

const columns: ProFormColumnsType<DeviceMatDirectoryItem>[] = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '目录编码',
    dataIndex: 'deviceMatDirectoryCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '目录名称',
    dataIndex: 'deviceMatDirectoryName',
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
