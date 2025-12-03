/*
 * @Author: SHUANG
 * @Date: 2023-07-26 15:08:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 17:12:16
 * @Description:
 */

import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../constant/verification';
import { ENUMOPENTYPE } from '../../../constant/valueEnum';
import { ShipLinkItemSave } from './typings';

const columns: FormColumnsDefine<ShipLinkItemSave> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '打开方式',
    dataIndex: 'openType',
    valueType: 'radio',
    valueEnum: ENUMOPENTYPE,
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '标题',
    dataIndex: 'title',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '地址',
    dataIndex: 'url',
    valueType: 'textarea',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '顺序',
    dataIndex: 'billSort',
    valueType: 'digit',
  },
];

export default columns;
