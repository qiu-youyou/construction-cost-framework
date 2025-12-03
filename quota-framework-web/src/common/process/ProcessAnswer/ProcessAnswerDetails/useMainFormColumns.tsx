/*
 * @Author: SHUANG
 * @Date: 2023-05-11 17:37:19
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 11:49:34
 * @Description:
 */

import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import RichTextFormItem from '../../../../components/RichTextFormItem';

import UserMentionsFormItem from '../../../formItems/UserMentionsFormItem';
import { sysNewsQueryOne } from '../../../views/message/Bulletin/services';
import { SysAnswerListItem } from '../typing';

const columns: FormColumnsDefine<SysAnswerListItem> = [
  {
    title: '通知人员',
    dataIndex: 'answerPerson',
    renderFormItem: (_, v, form) => <UserMentionsFormItem />,
  },
  {
    title: '概要内容',
    dataIndex: 'answerTitle',
    valueType: 'textarea',
    customFieldProps: { placeholder: '', rows: 1 },
  },
  {
    title: '主要内容',
    dataIndex: 'answerContent',
    renderFormItem: (_, v, form) => (
      <RichTextFormItem richTextQuery={sysNewsQueryOne} id={form?.getFieldValue('id')} />
    ),
  },
];

export default () => {
  return columns;
};
