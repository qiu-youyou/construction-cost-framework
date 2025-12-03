/*
 * @Author: SHUANG
 * @Date: 2023-07-26 13:51:11
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 18:04:27
 * @Description:
 */
import { history } from 'umi';
import { message } from 'antd';
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import RadioGroupButton from '../../../../components/RadioGroupButton';

import { ENUMOPENTYPE, ENUMBILLSTATUS } from '../../../constant/valueEnum';
import StatusText from '../../../textTag/StatusText';

import { ShipLinkListItem } from './typings';

const handleOnClick = async (current: ShipLinkListItem) => {
  if (!current?.id) return message.warning('找不到资源！');
  if (current?.openType === 'self') {
    history.push('/out/window', current?.url);
    return;
  }
  window.open(`${current?.url}`);
};

const columns: TableColumnsDefine<ShipLinkListItem> = [
  { dataIndex: 'index', width: 30 },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '打开方式',
    dataIndex: 'openType',
    valueType: 'radioButton',
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
    valueEnum: ENUMOPENTYPE,
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
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
    align: 'center',

    search: false,
    width: 90,
  },
  {
    title: '修改人',
    dataIndex: 'updateMan',
    align: 'center',

    search: false,
    width: 80,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDatetime',
    align: 'center',

    search: false,
    width: 90,
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
