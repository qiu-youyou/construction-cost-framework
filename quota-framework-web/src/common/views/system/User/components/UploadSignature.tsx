/*
 * @Author: SHUANG
 * @Date: 2023-09-14 14:55:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-14 16:35:00
 * @Description: 用户上传签名
 */
import { Button, message } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

import { attachmentUpload } from '../../../../annex/AnnexTable/services';
import EditButton from '../../../../../components/ActionButton/EditButton';

import useUploadColumns from '../useUploadColumns';
import { UserListItem } from '../typings';

type Props = {
  tableActionCurrent?: UserListItem;
  reload: () => void;
};

export default (props: Props) => {
  /** 保存签名 */
  const handleAttachmentUpload = async (params: FETCH.Req) => {
    if (!params?.file) message.warning('暂无文件可上传！');
    const formData = new FormData();
    formData.append('businessType', 'USER');
    formData.append('file', params?.file || '');
    formData.append('beanName', 'signatureServiceImpl');
    formData.append('businessId', props?.tableActionCurrent?.id || '');
    const res = await attachmentUpload(formData);
    if (res?.status === 'SUCCESS') {
      props?.reload?.();
    }
    return res;
  };

  const buttonTrigger = (
    <Button className="BorderButtonGeekBlue">
      <FileImageOutlined /> 上传签名
    </Button>
  );

  return (
    <EditButton
      trigger={buttonTrigger}
      columns={useUploadColumns}
      current={props?.tableActionCurrent}
      onSubmit={handleAttachmentUpload}
    />
  );
};
