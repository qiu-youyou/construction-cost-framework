/*
 * @Author: SHUANG
 * @Date: 2023-10-17 10:42:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-25 18:27:11
 * @Description: 定额册复制
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';
import VERIFICATION from '@/common/constant/verification';
import { DatabaseDbCopy } from '../../DbMain/DatabaseMain/typings';
import Input from 'antd/lib/input/Input';

export default ({ dbNameSource }: { dbNameSource: string }) => {
  const columns: FormColumnsDefine<DatabaseDbCopy> = [
    {
      dataIndex: 'billSort',
      hideInForm: true,
    },
    {
      title: '源定额册名称',
      customFieldProps: { disabled: true },
      renderFormItem: (_) => <Input value={dbNameSource} />,
    },
    {
      title: '复制后定额册名称',
      dataIndex: 'targetName',
      formItemProps: { rules: VERIFICATION.required },
    },
  ];

  return columns;
};
