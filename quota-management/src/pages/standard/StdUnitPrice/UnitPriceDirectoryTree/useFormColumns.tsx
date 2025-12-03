/*
 * @Author: SHUANG
 * @Date: 2023-11-06 10:13:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-20 09:27:05
 * @Description: 清单关联定额映射库 目录
 */

import { ProFormColumnsType } from '@ant-design/pro-form';
import VERIFICATION from '@/common/constant/verification';
import { UnitPriceDirectorySave } from './typings';

const columns: ProFormColumnsType<UnitPriceDirectorySave>[] = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '目录编码',
    dataIndex: 'unitPriceDbCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '目录名称',
    dataIndex: 'unitPriceDbName',
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
