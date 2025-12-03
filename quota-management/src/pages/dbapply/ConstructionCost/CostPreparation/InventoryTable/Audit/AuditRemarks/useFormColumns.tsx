/*
 * @Author: SHUANG
 * @Date: 2024-04-03 15:19:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 15:22:28
 * @Description: 工程造价-工程量清单编制-审核标注
 */

import { FormColumnsDefine } from 'jd-framework-web/package/components';

const columns: FormColumnsDefine<any> = [
  {
    title: '审核标注',
    dataIndex: 'auditRemarks',
    valueType: 'textarea',
    customFieldProps: { rows: 6, style: { height: 'auto' } },
  },
];

export default columns;
