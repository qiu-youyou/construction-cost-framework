/*
 * @Author: SHUANG
 * @Date: 2023-10-18 13:57:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-14 10:11:56
 * @Description: 定额明细表 列配置
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { DbNormParamsItem } from './typings';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';

const columns: TableColumnsDefine<DbNormParamsItem> = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 40,
  },
  {
    title: '参数名',
    dataIndex: 'paramsName',
    cellEdit: true,
  },
  {
    title: '参数值',
    dataIndex: 'paramsValue',
    cellEdit: true,
  },
  {
    title: '修改记录',
    dataIndex: 'paramsLog',
    valueType: 'textarea',
    ellipsis: false,
    customRender: (_, { paramsLog }) => <ChangeLogText changeLog={paramsLog} />,
    search: false,
  },
];

export default columns;
