/*
 * @Author: SHUANG
 * @Date: 2023-10-18 13:57:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 11:57:47
 * @Description: 定额明细表 列配置
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { valueEnumsRequest } from '../../../valueEnums';
import { DbNormItem } from './typings';

import { Typography } from 'antd';
const { Text } = Typography;

export default ({ normReadonly }: { normReadonly?: boolean }) => {
  const columns: TableColumnsDefine<DbNormItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 55,
    },
    {
      title: '定额编码',
      dataIndex: 'normCode',
      align: 'center',
      cellEdit: true,
      width: 100,
    },
    {
      title: '工序名称',
      dataIndex: 'normName',
      cellEdit: true,
      width: 140,
    },
    {
      title: '定额名称',
      dataIndex: 'completeNormName',
      ellipsis: false,
      width: 200,
      customRender: (_, { normName, completeNormName }) => {
        const finalRender = (normName || '') + ' ' + (completeNormName || '');
        return (
          <Text ellipsis={{ tooltip: { mouseEnterDelay: 0.8, title: finalRender } }}>{finalRender}</Text>
        );
      },
    },

    {
      title: '单位',
      dataIndex: 'normUnit',
      valueType: 'select',
      selectWritingIn: true,
      cellEdit: true,
      search: false,
      width: 65,
      request: async () => valueEnumsRequest('UNIT'),
      customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
    },
    {
      title: '基价(元)',
      dataIndex: 'normPrice',
      valueType: 'digit',
      search: false,
      width: 90,
    },
    {
      title: '人工费(元)',
      dataIndex: 'normManPrice',
      valueType: 'digit',
      search: false,
      width: 90,
    },
    {
      title: '材料费(元)',
      dataIndex: 'normMatPrice',
      valueType: 'digit',
      search: false,
      width: 90,
    },
    {
      title: '机械费(元)',
      dataIndex: 'normMacPrice',
      valueType: 'digit',
      search: false,
      width: 90,
    },
    {
      title: '修改记录',
      dataIndex: 'normLog',
      valueType: 'textarea',
      hideInTable: normReadonly,
      ellipsis: false,
      customRender: (_, { normLog }) => <ChangeLogText changeLog={normLog} />,
      search: false,
    },
    {
      title: '参数',
      dataIndex: 'paramsName',
      hideInTable: true,
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
