/*
 * @Author: SHUANG
 * @Date: 2023-08-01 09:50:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 15:56:58
 * @Description:
 */
import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../constant/verification';
import { RegionsItemSave } from './typings';

const columns: FormColumnsDefine<RegionsItemSave> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '组织机构编码',
    dataIndex: 'orgCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '流程编码',
    dataIndex: 'powerCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '权限编码',
    dataIndex: 'workCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '区域描述',
    dataIndex: 'areaNode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '顺序',
    dataIndex: 'billSort',
    valueType: 'digit',
  },
];

export default columns;
