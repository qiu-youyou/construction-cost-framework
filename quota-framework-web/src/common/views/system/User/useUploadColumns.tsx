/*
 * @Author: SHUANG
 * @Date: 2023-08-01 17:03:58
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 17:58:44
 * @Description:
 */

import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import UploadImage from '../../../../components/UploadImage';
import VERIFICATION from '../../../constant/verification';

const columns: FormColumnsDefine<FormData> = [
  {
    title: '签名图片',
    dataIndex: 'file',
    renderFormItem: () => <UploadImage />,
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
