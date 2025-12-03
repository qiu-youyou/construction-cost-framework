/*
 * @Author: SHUANG
 * @Date: 2023-07-26 15:08:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 17:54:13
 * @Description:
 */

import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../constant/verification';
import { ENUMOPENTYPE } from '../../../constant/valueEnum';

import { ShortcutItemSave } from './typings';
const columns: FormColumnsDefine<ShortcutItemSave> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '图标',
    dataIndex: 'icon',
  },
  {
    title: '标题',
    dataIndex: 'title',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '类型',
    dataIndex: 'sysType',
    valueType: 'radio',
    valueEnum: {
      Y: { text: '系统' },
      N: { text: '其他' },
    },
    formItemProps: { rules: VERIFICATION.required },
    tooltip: '系统: 系统会链接到内部模块，进行跳转',
  },
  {
    title: '打开方式',
    dataIndex: 'openType',
    valueType: 'radio',
    valueEnum: ENUMOPENTYPE,
    formItemProps: (form) => {
      if (form.getFieldValue('sysType') !== 'Y') return { rules: VERIFICATION.required };
      else {
        form?.setFieldsValue?.({ openType: '' });
        return { hidden: true };
      }
    },
    tooltip: '非系统快捷方式，需要选择是否外链打开',
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
