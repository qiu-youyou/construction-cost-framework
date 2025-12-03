/*
 * @Author: SHUANG
 * @Date: 2022-09-01 15:18:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-09 14:10:13
 * @Description:
 */
import { Image } from 'antd';
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import RadioGroupButton from '../../../../components/RadioGroupButton';

import { ENUMBILLSTATUS, ENUMUSERSEX } from '../../../constant/valueEnum';
import StatusText from '../../../textTag/StatusText';
import { UserListItem } from './typings';

const columns: TableColumnsDefine<UserListItem> = [
  {
    title: '用户名',
    dataIndex: 'userName',
    align: 'center',
    width: 100,
  },
  {
    title: '真实姓名',
    dataIndex: 'userRealname',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'userSex',
    valueType: 'radioButton',
    valueEnum: ENUMUSERSEX,
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
  },
  {
    title: '年龄',
    dataIndex: 'userAge',
    valueType: 'digit',
  },
  {
    title: '用户电话',
    dataIndex: 'userPhone',
  },
  {
    title: '办公电话',
    dataIndex: 'userOfficePhone',
  },
  {
    title: '用户邮箱',
    dataIndex: 'userEmail',
  },
  {
    title: '用户描述',
    dataIndex: 'remarks',
    search: false,
  },
  {
    title: '区域编码',
    dataIndex: 'areaCode',
    search: false,
    align: 'center',
    width: 100,
  },
  {
    title: '区域名称',
    dataIndex: 'areaName',
    search: false,
    align: 'center',
    width: 100,
  },
  {
    title: '签名图片',
    dataIndex: 'signatureImage',
    valueType: 'image',
    search: false,
    width: 90,
    customRender: (_, { signatureImage }) => {
      if (!signatureImage) return <></>;
      return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <Image height="24px" src={`data:image/png;base64,${signatureImage}`} />
        </div>
      );
      // return;
    },
  },

  {
    title: '状态',
    dataIndex: 'billStatus',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: ENUMBILLSTATUS,
    customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
    customFieldProps: { showSearch: true },
    search: false,
  },
];

export default columns;
