/*
 * @Author: SHUANG
 * @Date: 2024-02-05 09:00:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 11:26:42
 * @Description: 项目文档库-目录
 */
import VERIFICATION from 'jd-framework-web/package/common/constant/verification';
import { FormColumnsDefine } from 'jd-framework-web/package/components';

const columns: FormColumnsDefine = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '目录名称',
    dataIndex: 'directoryName',
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
