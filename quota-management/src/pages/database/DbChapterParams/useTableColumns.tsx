/*
 * @Author: SHUANG
 * @Date: 2023-11-03 17:56:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-27 11:55:55
 * @Description:
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbChapterParamsItem } from './typings';

const columns: TableColumnsDefine<DbChapterParamsItem> = [
  {
    title: '序号',
    dataIndex: 'showNumber',
    align: 'left',
    width: 130,
  },

  {
    title: '目录',
    dataIndex: 'chapterName',
    valueType: 'textarea',
    width: 320,
    customRender: (_, { chapterCode, chapterName }) => {
      return (
        <span>
          {chapterCode} {chapterName}
        </span>
      );
    },
  },

  {
    title: '参数一类型',
    dataIndex: '1',
    width: 100,
    cellEdit: (item) => !item?.children?.length,
  },
  {
    title: '参二类型',
    dataIndex: '2',
    width: 100,
    cellEdit: (item) => !item?.children?.length,
  },
  {
    title: '参数三类型',
    dataIndex: '3',
    width: 100,
    cellEdit: (item) => !item?.children?.length,
  },
  {
    title: '参数四类型',
    dataIndex: '4',
    width: 100,
    cellEdit: (item) => !item?.children?.length,
  },
  {
    title: '参数五类型',
    dataIndex: '5',
    width: 100,
    cellEdit: (item) => !item?.children?.length,
  },

  {
    title: '备注',
    dataIndex: 'chapterNote',
    valueType: 'textarea',
    width: 150,
    cellEdit: (item) => !item?.children?.length,
  },
];

export default columns;
