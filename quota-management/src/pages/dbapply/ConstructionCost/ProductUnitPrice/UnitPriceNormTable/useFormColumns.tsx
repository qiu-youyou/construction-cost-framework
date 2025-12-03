/*
 * @Author: SHUANG
 * @Date: 2024-03-14 14:39:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 14:44:09
 * @Description: 调整系数表单
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';
import VERIFICATION from 'jd-framework-web/package/common/constant/verification';
import { DbNormItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';

const columns: FormColumnsDefine<DbNormItem> = [
  {
    title: '单价系数',
    dataIndex: 'normPriceRate',
    valueType: 'digit',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '人工系数',
    dataIndex: 'normManPriceRate',
    valueType: 'digit',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '材料系数',
    dataIndex: 'normMatPriceRate',
    valueType: 'digit',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '机械系数',
    dataIndex: 'normMacPriceRate',
    valueType: 'digit',
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
