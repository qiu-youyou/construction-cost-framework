/*
 * @Author: SHUANG
 * @Date: 2023-05-11 17:37:19
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:15:35
 * @Description:
 */

import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import RichTextFormItem from '../../../../components/RichTextFormItem';
import { sysNewsQueryOne } from '../../../views/message/Bulletin/services';
import { SysAnswerListItem } from '../typing';

/** menu schema */
const columns: FormColumnsDefine<SysAnswerListItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '回复内容',
    dataIndex: 'answerContent',
    renderFormItem: (_, v, form) => (
      <RichTextFormItem richTextQuery={sysNewsQueryOne} id={form?.getFieldValue('id')} />
    ),
  },
];

export default () => {
  return columns;
};
