/*
 * @Author: SHUANG
 * @Date: 2023-10-26 16:06:09
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-01 16:27:53
 * @Description:
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';

const columns: FormColumnsDefine = [
  {
    title: '编制说明权限人员',
    dataIndex: 'dbNodeUser',
    valueType: 'textarea',
    customFieldProps: { rows: 3, style: { height: 'auto' }, placeholder: ' ' },
  },
  {
    title: '章节说明权限人员',
    dataIndex: 'dbChapterUser',
    valueType: 'textarea',
    customFieldProps: { rows: 3, style: { height: 'auto' }, placeholder: ' ' },
  },
  {
    title: '定额明细权限人员',
    dataIndex: 'dbNormUser',
    valueType: 'textarea',
    customFieldProps: { rows: 3, style: { height: 'auto' }, placeholder: ' ' },
  },
  {
    title: '人材机权限人员',
    dataIndex: 'dbRCJUser',
    valueType: 'textarea',
    customFieldProps: { rows: 3, style: { height: 'auto' }, placeholder: ' ' },
  },
];

export default columns;
