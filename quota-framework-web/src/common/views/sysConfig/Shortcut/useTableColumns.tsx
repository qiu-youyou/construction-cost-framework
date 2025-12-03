/*
 * @Author: SHUANG
 * @Date: 2023-07-26 13:51:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 17:57:31
 * @Description:
 */
import { message } from 'antd';
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import RadioGroupButton from '../../../../components/RadioGroupButton';

import { ENUMBILLSTATUS, ENUMOPENTYPE } from '../../../constant/valueEnum';
import StatusText from '../../../textTag/StatusText';
import { ShortcutListItem } from './typings';
import { history } from 'umi';

const handleOnClick = async (current: ShortcutListItem) => {
  if (!current?.id) return message.warning('找不到资源！');
  // 调入系统的某个链接
  if (current?.sysType === 'Y') {
    history.push(current?.url);
    return;
  }
  if (current?.openType === 'self') {
    history.push('/out/window', current?.url);
    return;
  }
  window.open(`${current?.url}`);
};

const columns: TableColumnsDefine<ShortcutListItem> = [
  { dataIndex: 'index' },
  {
    title: '图标',
    dataIndex: 'icon',
    align: 'center',
    search: false,
    width: 60,
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '类型',
    dataIndex: 'sysType',
    valueType: 'radioButton',
    search: false,
    valueEnum: {
      Y: { text: '系统' },
      N: { text: '其他' },
    },
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
  },
  {
    title: '打开方式',
    dataIndex: 'openType',
    valueType: 'radioButton',
    valueEnum: ENUMOPENTYPE,
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
  },
  {
    title: '地址',
    dataIndex: 'url',
    valueType: 'textarea',
    customRender: (text, record, _, action) => [
      <a key="editable" onClick={() => handleOnClick(record)}>
        {record?.url}
      </a>,
    ],
  },
  {
    title: '创建人',
    dataIndex: 'createMan',
    align: 'center',

    search: false,
    width: 70,
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
    align: 'center',

    search: false,
    width: 80,
  },
  {
    title: '修改人',
    dataIndex: 'updateMan',

    search: false,
    width: 70,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDatetime',
    align: 'center',

    search: false,
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
    valueType: 'select',
    valueEnum: ENUMBILLSTATUS,
    customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
    customFieldProps: { showSearch: true },
    search: false,
    width: 40,
  },
];

export default columns;
