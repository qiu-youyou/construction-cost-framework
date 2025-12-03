/*
 * @Author: SHUANG
 * @Date: 2024-04-16 11:37:17
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-16 14:27:52
 * @Description: 工程造价-风水电
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { MatTypeKey } from '../typings';
import { FsdItem } from './typings';

const columnsTitleMap = { '1': '风', '2': '水', '3': '电' };

export type Props = { matType: MatTypeKey };

export default ({ matType }: Props) => {
  const columns: TableColumnsDefine<FsdItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 55,
    },
    {
      title: columnsTitleMap[matType] + '价名称',
      dataIndex: 'matName',
      cellEdit: true,
    },
    {
      title: columnsTitleMap[matType] + '价',
      dataIndex: 'matPrice',
      valueType: 'digit',
      cellEdit: true,
    },
    {
      title: '修改记录',
      dataIndex: 'changeLog',
      valueType: 'textarea',
      ellipsis: false,
      customRender: (_, { changeLog }) => <ChangeLogText changeLog={changeLog} />,
    },
  ];

  return columns;
};
