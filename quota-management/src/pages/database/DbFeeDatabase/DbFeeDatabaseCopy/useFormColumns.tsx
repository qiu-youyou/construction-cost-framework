/*
 * @Author: SHUANG
 * @Date: 2024-02-22 10:04:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 10:19:06
 * @Description: 取费模板库复制
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';
import VERIFICATION from '@/common/constant/verification';
import { DatabaseDbCopy } from '../../DbMain/DatabaseMain/typings';
import Input from 'antd/lib/input/Input';

export default ({ feeNameSource }: { feeNameSource: string }) => {
  const columns: FormColumnsDefine<DatabaseDbCopy> = [
    {
      dataIndex: 'billSort',
      hideInForm: true,
    },
    {
      title: '源取费名称',
      customFieldProps: { disabled: true },
      renderFormItem: (_) => <Input value={feeNameSource} />,
    },
    {
      title: '复制后取费名称',
      dataIndex: 'targetName',
      formItemProps: { rules: VERIFICATION.required },
    },
  ];

  return columns;
};
