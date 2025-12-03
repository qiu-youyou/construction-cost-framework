/*
 * @Author: SHUANG
 * @Date: 2023-10-17 10:42:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 17:47:28
 * @Description: 增加册章节表单配置
 */
import { ProFormColumnsType } from '@ant-design/pro-form';
import VERIFICATION from '@/common/constant/verification';
import { DbChapterSaveParams } from './typings';

const columns: ProFormColumnsType<DbChapterSaveParams>[] = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '章节目录编码',
    dataIndex: 'chapterCode',
  },
  {
    title: '章节目录全称',
    dataIndex: 'chapterName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '定额编号设置',
    dataIndex: 'chapterSimple',
    formItemProps: { rules: VERIFICATION.required },
  },
];

export default columns;
