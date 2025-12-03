/*
 * @Author: SHUANG
 * @Date: 2023-11-06 10:13:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-06 10:14:28
 * @Description: 清单关联定额映射库 目录
 */

import { ProFormColumnsType } from '@ant-design/pro-form';
import VERIFICATION from '@/common/constant/verification';
import { RelationDirectorySaveParams } from './typings';

const columns: ProFormColumnsType<RelationDirectorySaveParams>[] = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '目录名称',
    dataIndex: 'listNormRelatedName',
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
