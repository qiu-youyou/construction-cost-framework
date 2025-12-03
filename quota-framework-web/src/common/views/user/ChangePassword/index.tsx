/*
 * @Author: SHUANG
 * @Date: 2023-08-22 14:58:01
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 17:39:12
 * @Description: 用户修改密码
 */
import { history, useModel } from 'umi';
import { CSSProperties, useRef, useState } from 'react';
import { Card, Alert, Result, Button, Modal } from 'antd';
import { ProFormInstance } from '@ant-design/pro-components';

import { systemUserloginOut } from '../../../../app/render/HeaderRightRender/AvatarDropdown';

import { BaseSchemaFormProps, FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import BaseSchemaForm from '../../../../components/BaseSchemaForm';

import { clearUserForceChange } from '../../../../utils/auth/authorization';
import { encryption } from '../../../../utils/auth/encrayption';
import { LAYOUTCOL } from '../../../constant/layoutCol';
import { updatePwd } from '../../../services/user';
import { homePath } from '@/common/constant/path';

const SectionStyle: CSSProperties = {
  margin: '0 auto',
  paddingTop: '10%',
  width: 666,
};

const CardStyle: CSSProperties = {
  padding: '30px 15px 10px 15px',
  marginTop: 40,
};

const ALertStyle: CSSProperties = {
  padding: '8px 12px',
  fontSize: 14,
  color: '#FAAD14',
};

const passwordRules = [
  { required: true },
  { max: 18, message: '不能超过18位，请正确输入' },
  { min: 8, message: '长度至少8位，请正确输入' },
  {
    pattern: /^(?![^a-zA-Z]+$)(?!\D+$).{8,18}/,
    message: '请输入至少8位拥有字母和数字的密码',
  },
];

/** 是否开发环境 */
const isDev = process.env.NODE_ENV === 'development';

export default () => {
  const [modal, contextHolder] = Modal.useModal();

  const [isSuccess, setIsSuccess] = useState(false);

  const { initialState } = useModel('@@initialState');
  const { settings } = initialState || {};

  /** 去往首页 */
  const handleGoHome = () => {
    clearUserForceChange();
    history.push(homePath);
  };

  /** 表单提交 */
  const onFormFinish = async (values: USER.PassParams & { newPasswordEnter: string }) => {
    const { oldPassword, newPassword, newPasswordEnter } = values;
    if (oldPassword === newPassword) {
      modal.warning({ title: '提示', content: '原密码与新密码不能一致！' });
      return;
    }

    if (newPassword !== newPasswordEnter) {
      modal.warning({ title: '提示', content: '两次输入的密码不一致！' });
      return;
    }
    const params = { oldPassword, newPassword };
    const res = await updatePwd(encryption(JSON.stringify(params), settings?.key));
    if (res?.status === 'SUCCESS') {
      clearUserForceChange();
      setIsSuccess(true);
    }
  };

  const formColumns: FormColumnsDefine = [
    {
      title: '原密码',
      dataIndex: 'oldPassword',
      valueType: 'password',
      formItemProps: { rules: [{ required: true }] },
    },
    {
      title: '新密码',
      dataIndex: 'newPassword',
      valueType: 'password',
      formItemProps: { rules: [{ required: true }] },
      // formItemProps: { rules: passwordRules },
    },
    {
      title: '确认密码',
      dataIndex: 'newPasswordEnter',
      valueType: 'password',
      formItemProps: { rules: [{ required: true }] },
      // formItemProps: { rules: passwordRules },
    },
  ];

  const mainFormRef = useRef<ProFormInstance>();
  const generateSchemaForm: BaseSchemaFormProps = {
    columns: formColumns,
    ...LAYOUTCOL.maxLayout,
    wrapperCol: { span: 21 },
    onFinish: onFormFinish,
    formRef: mainFormRef,
    size: 'large',
  };

  const alertMessage = (
    <>
      为保证账户安全，请修改你的密码!!！你也可以
      <Button type="link" style={{ fontSize: 14 }} onClick={systemUserloginOut}>
        返回登录
      </Button>
      {isDev && (
        <Button type="link" onClick={handleGoHome}>
          进入系统(开发环境)
        </Button>
      )}
    </>
  );

  /** 修改密码 */
  const changePasswordDom = (
    <>
      <Alert type="warning" style={ALertStyle} message={alertMessage} />
      <Card style={CardStyle}>
        <BaseSchemaForm {...generateSchemaForm} />
      </Card>
    </>
  );

  /** 结果页 */
  const resultDom = (
    <>
      <Result
        status="success"
        title="修改密码成功!"
        subTitle="你可以直接进入系统，下次登录请使用你的新密码进行登录"
        extra={[
          <Button key="buy" size="large" onClick={() => setIsSuccess(false)}>
            <span style={{ padding: '0 10px' }}>再次修改</span>
          </Button>,
          <Button type="primary" key="console" size="large" onClick={handleGoHome}>
            <span style={{ padding: '0 10px' }}>进入系统</span>
          </Button>,
        ]}
      />
    </>
  );

  return (
    <>
      <section style={SectionStyle}>{isSuccess ? resultDom : changePasswordDom}</section>
      {contextHolder}
    </>
  );
};
