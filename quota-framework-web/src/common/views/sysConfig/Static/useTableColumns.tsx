/*
 * @Author: SHUANG
 * @Date: 2023-07-26 14:08:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 13:55:52
 * @Description:
 */
import { message } from 'antd';
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';

import { ENUMBILLSTATUS } from '../../../constant/valueEnum';
import StatusText from '../../../textTag/StatusText';
import { StaticResourceListItem } from './typings';

// 静态资源下载
const onClickDownloads = async (current: StaticResourceListItem) => {
  if (!current?.id) return message.warning('没有附件！');
  window.open(`${current.attachmentDesc}`);
};

const columns: TableColumnsDefine<StaticResourceListItem> = [
  { dataIndex: 'index', width: 35 },
  {
    title: '附件名称',
    dataIndex: 'attachmentName',
  },
  {
    title: '上传人',
    dataIndex: 'createMan',
    align: 'center',

    width: 80,
  },
  {
    title: '上传时间',
    dataIndex: 'createDatetime',
    valueType: 'date',
    search: false,
  },
  {
    title: '附件大小',
    dataIndex: 'attachmentSize',
    align: 'center',
    search: false,
    width: 70,
  },
  {
    title: '附件地址',
    dataIndex: 'attachmentDesc',
    valueType: 'textarea',
    copyable: true,
    search: false,
    width: 340,
  },
  {
    title: '修改人',
    dataIndex: 'updateMan',
    align: 'center',

    width: 80,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDatetime',
    align: 'center',

    search: false,
    width: 90,
  },
];

export default columns;
