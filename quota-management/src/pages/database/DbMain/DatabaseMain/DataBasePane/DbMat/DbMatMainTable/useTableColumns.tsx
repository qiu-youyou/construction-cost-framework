/*
 * @Author: SHUANG
 * @Date: 2023-10-21 11:58:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-19 17:12:20
 * @Description: 定额库(人材机 机械台班 混凝土配合比)明细表列配置
 */
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { valueEnumsRequest } from '../../../valueEnums';
import { ClassifyRjcType } from '../../../typings';
import { DbMatItem } from './typings';

/** rcj[人材机]、machine[机械台班]、concrete[混凝土]  */
const renderColumnsTitle = (key?: string) => {
  const columnsTitleMap: { [key: string]: string } = {
    rcj: '人材机',
    machine: '机械',
    concrete: '混凝土',
  };
  if (!key) return '';
  return columnsTitleMap[key];
};

export default ({ classifyRjcType }: { classifyRjcType?: ClassifyRjcType }) => {
  const columns: TableColumnsDefine<DbMatItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 55,
    },
    {
      title: '编码',
      dataIndex: 'matCode',
      align: 'center',
      cellEdit: true,
      width: 110,
    },
    {
      title: renderColumnsTitle(classifyRjcType) + '名称',
      dataIndex: 'matName',
      valueType: 'textarea',
      cellEdit: true,
    },
    {
      title: '单位',
      dataIndex: 'matUnit',
      valueType: 'select',
      selectWritingIn: true,
      cellEdit: true,
      search: false,
      request: async () => valueEnumsRequest('UNIT'),
      customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
    },
    {
      title: '单价(元)',
      dataIndex: 'matPrice',
      valueType: 'digit',
      cellEdit: () => classifyRjcType === 'rcj',
      search: false,
    },
    {
      title: '修改记录',
      dataIndex: 'matLog',
      valueType: 'textarea',
      ellipsis: false,
      customRender: (_, { matLog }) => <ChangeLogText changeLog={matLog} />,
      search: false,
    },
    {
      title: '是否关联章节',
      dataIndex: 'scope',
      hideInTable: true,
      valueType: 'checkbox',
      initialValue: '1',
      valueEnum: { 1: { text: ' ' } },
    },
  ];

  return columns;
};
