/*
 * @Author: SHUANG
 * @Date: 2024-04-08 15:43:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 17:13:44
 * @Description: 树形字典目录
 */
import { FormColumnsDefine } from '../../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../../../common/constant/verification';
import { DictTreeClassItem } from '../typings';

const columns: FormColumnsDefine<DictTreeClassItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    dataIndex: 'parentId',
    hideInForm: true,
  },
  {
    dataIndex: 'businessId',
    hideInForm: true,
  },
  {
    title: '字典编码',
    dataIndex: 'itemCode',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '字典名称',
    dataIndex: 'itemName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '功能标记',
    dataIndex: 'itemType',
  },
  {
    title: '顺序',
    dataIndex: 'billSort',
    valueType: 'digit',
  },
  {
    title: '备注',
    dataIndex: 'itemRemarks',
    valueType: 'textarea',
  },
];

export default columns;
