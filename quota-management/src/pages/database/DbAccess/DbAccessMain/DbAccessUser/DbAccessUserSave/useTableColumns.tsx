/*
 * @Author: SHUANG
 * @Date: 2023-10-26 14:56:09
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-24 11:55:49
 * @Description: 用户表列配置
 */
import { Image } from 'antd'
import { ENUMUSERSEX } from 'jd-framework-web/package/common/constant/valueEnum'
import { UserListItem } from 'jd-framework-web/package/common/views/system/User/typings'
import RadioGroupButton from 'jd-framework-web/package/components/RadioGroupButton'
import { TableColumnsDefine } from 'jd-framework-web/package/components'

const columns: TableColumnsDefine<UserListItem> = [
  {
    title: '用户名',
    dataIndex: 'userName',
    align: 'center',
    width: 120,
  },
  {
    title: '真实姓名',
    dataIndex: 'userRealname',
    width: 140,
  },
  {
    title: '性别',
    dataIndex: 'userSex',
    valueType: 'radioButton',
    valueEnum: ENUMUSERSEX,
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
    search: false,
  },
  {
    title: '用户描述',
    dataIndex: 'remarks',
    search: false,
  },
  {
    title: '签名图片',
    dataIndex: 'signatureImage',
    valueType: 'image',
    search: false,
    width: 90,
    customRender: (_, { signatureImage }) => {
      if (!signatureImage) return <></>
      return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <Image height='24px' src={`data:image/png;base64,${signatureImage}`} />
        </div>
      )
    },
  },
  // {
  //   title: '状态',
  //   dataIndex: 'billStatus',
  //   valueType: 'select',
  //   valueEnum: ENUMBILLSTATUS,
  //   customRender: (_, { billStatus }) => <StatusText status={billStatus} />,
  //   customFieldProps: { showSearch: true },
  //   search: false,
  //   width: 55,
  // },
]

export default columns
