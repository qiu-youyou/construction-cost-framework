/*
 * @Author: SHUANG
 * @Date: 2022-08-16 17:03:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-21 14:00:34
 * @Description: 附件表描述
 */
import { message } from 'antd';
import { encode as base64_encode } from 'base-64';
import { TableColumnsDefine } from '../../../components/BaseTable/typings';
import { attachmentDownloadPath } from './services';
import { AttachmentListItem } from './typing';

const onClickDownloads = async (current: AttachmentListItem) => {
  if (!current?.id) return message.warning('没有选中要导出的附件！');
  window.open(`${attachmentDownloadPath}?businessId=${current.businessId}&id=${current.id}`);
  // attachmentDownloadById({
  //   businessId: current?.businessId || '',
  //   id: current?.id || '',
  // }).then((res: any) => {
  //   const filename = res?.response?.headers?.get('content-disposition')?.split('=')?.[1];

  //   if (res?.data) {
  //     const blob = new Blob([res.data]);
  //     const url = window.URL.createObjectURL(blob);
  //     const aLink = document.createElement('a');
  //     aLink.style.display = 'none';
  //     aLink.href = url;
  //     aLink.download = decodeURI(filename);
  //     document.body.appendChild(aLink);
  //     aLink.click();
  //     document.body.removeChild(aLink); //下载完成移除元素
  //     window.URL.revokeObjectURL(url); //释放掉blob对象
  //   }
  // });
};
const onClickView = async (current: AttachmentListItem) => {
  if (!current?.id) return message.warning('没有选中要导出的附件！');
  const id = encodeURIComponent(base64_encode(current?.id));
  window.open('/file-view/onlinePreview?id=' + id);
};
// const onClickDelete = (current: AttachmentListItem) => {};

export const columns: TableColumnsDefine<any> = [
  { dataIndex: 'index', width: 35 },
  {
    title: '附件名称',
    dataIndex: 'attachmentName',
  },

  {
    title: '附件大小',
    dataIndex: 'attachmentSize',
    align: 'center',
    width: 60,
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
    align: 'center',
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 95,
    customRender: (text, record, _, action) => [
      <a key="editable" onClick={() => onClickDownloads(record)}>
        下载附件
      </a>,
      <a style={{ paddingLeft: '10px' }} key="editable" onClick={() => onClickView(record)}>
        浏览
      </a>,
    ],
  },
];
export default () => columns;
