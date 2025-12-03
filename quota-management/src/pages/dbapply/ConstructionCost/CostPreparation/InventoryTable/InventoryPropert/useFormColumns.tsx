import VERIFICATION from 'jd-framework-web/package/common/constant/verification';
import { FormColumnsDefine } from 'jd-framework-web/package/components';

const columns: FormColumnsDefine = [
  {
    dataIndex: 'txt',
    valueType: 'textarea',
    formItemProps: { rules: VERIFICATION.required },
    customFieldProps: { rows: 8, style: { height: 'auto', marginLeft: 10 } },
    colProps: { span: 23 },
  },
];

export default columns;
