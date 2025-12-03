/*
 * @Author: SHUANG
 * @Date: 2023-09-22 15:20:07
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 11:57:20
 * @Description:
 */
import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import UploadInput from '../../../../components/UploadInput';
import VERIFICATION from '../../../constant/verification';

const columns: FormColumnsDefine<FormData> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '附件',
    dataIndex: 'file',
    renderFormItem: () => <UploadInput />,
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
