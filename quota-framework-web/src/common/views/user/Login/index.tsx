/*
 * @Author: SHUANG
 * @Date: 2022-12-08 20:01:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-29 11:31:29
 * @Description: 用户登录模块
 */
import { Tabs } from 'antd';
import { history, useModel } from 'umi';
import { useRef, useState } from 'react';
import ReactSimpleVerify from 'react-simple-verify';
import 'react-simple-verify/dist/react-simple-verify.css';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { handleNoLocalesMenu, setToken, setUserForceChange } from '../../../../utils/auth/authorization';
import { encryption } from '../../../../utils/auth/encrayption';

import { fetchMenuData, fetchUserInfo, login } from '../../../services/user';

import { ForceChangePassMessage } from '../../../../app/request/errorConfig';
import { changeForcePath, homePath } from '@/common/constant/path';

import { useMount } from '../../../../utils/util/uses';

import BaseFooter from '../../../../components/BaseFooter';
import ScanLogin from './ScanLogin';
import styles from './index.less';

/** 是否开发环境 */
const isDev = process.env.NODE_ENV === 'development';
type LoginType = 'account' | 'scan';

const Login: React.FC = () => {
  const verifyRef = useRef<any>();
  const [verify, setVerify] = useState<boolean>(false);
  const [explain, setExplain] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<LoginType>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { settings } = initialState || {};
  const sysSettings = initialState?.settings;

  /** 获取用户信息 挂载用户信息 */
  const handleFetchUserInfo = async () => {
    const userInfo = await fetchUserInfo();
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  /** 获取用户信息 Get Userinfo */
  const handleFetchMenuData = async () => {
    const menuRes = await fetchMenuData?.();
    if (menuRes) {
      /** 菜单权限 */
      const accessMenu: { [index: string]: any } = [];
      // path 支持为一个 url，必须要以 http 开头
      const menuData: USER.MenuItem[] = menuRes?.length ? [...menuRes] : [];
      handleNoLocalesMenu(menuData, accessMenu);
      /** 挂载用户信息 */
      await setInitialState((s) => ({ ...s, menuData, accessMenu }));
    }
  };

  /** 需要用户强制修改密码 */
  const handleForceChangePassMessage = () => {
    setUserForceChange();
    history.push(changeForcePath);
  };

  /** 当用户登录成功后 */
  const whenLoginSuccess = async (res: USER.LoginResult) => {
    if (res?.status === 'SUCCESS') {
      setToken(res?.rows || '');
      await handleFetchUserInfo();
      await handleFetchMenuData();
      if (res?.code == ForceChangePassMessage) {
        handleForceChangePassMessage();
        return;
      }
      history.push(homePath);
      return;
    }
  };

  /** 登录方法 Login */
  const handleSubmit = async (values: USER.LoginParams) => {
    /** 不是开发环境的情况下 必须经过校验 */
    if (!isDev && !verify) {
      setVerify(false);
      setExplain(true);
      return;
    }
    try {
      const encrypt = await login(encryption(JSON.stringify(values), settings?.key));
      whenLoginSuccess(encrypt);
    } catch (error) {}
    setVerify(false);
    setExplain(false);
    return verifyRef?.current?.reset();
  };

  /** 滑块校验 */
  const SimpleVerifyContent = (
    <ReactSimpleVerify
      height={33}
      ref={verifyRef}
      movedColor="#eee"
      successTips="完成验证"
      tips="请按住滑块，拖动到最右边"
      success={() => {
        setVerify(true);
        setExplain(false);
      }}
    />
  );
  /** 校验失败提示 */
  const ExplainContent = (
    <span style={{ float: 'left', transform: 'translateY(-3px)' }} className="ant-form-item-explain-error">
      <span>请拖动滑块进行验证</span>
    </span>
  );

  // 非正式环境不进行滑块校验
  const LoginFormActions = loginType === 'account' && (
    <>
      {SimpleVerifyContent}
      {explain && ExplainContent}
    </>
  );

  /** 登录表单 */
  const LoginFormContent = (
    <LoginForm
      onFinish={handleSubmit}
      actions={LoginFormActions}
      initialValues={{ autoLogin: true }}
      title={settings?.loginTitle || settings?.systemName}
      className={loginType === 'scan' && styles.scanLoginForm}
      logo={sysSettings?.logoImg}
    >
      {sysSettings?.loginMode === 'accountAndScan' && (
        <Tabs
          centered
          size="large"
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'scan'} tab={'扫码登录'} />
        </Tabs>
      )}

      {loginType === 'account' && (
        <>
          <ProFormText
            name="userName"
            placeholder="用户名"
            initialValue={isDev ? 'admin' : undefined}
            fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
            rules={[{ required: true, message: '请输入用户名' }]}
          />
          <ProFormText.Password
            name="password"
            placeholder="密码"
            initialValue={isDev ? '%kbcg(d#+D@Vrt&$' : undefined}
            fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
            rules={[{ required: true, message: '请输入密码' }]}
          />
        </>
      )}

      {loginType === 'scan' && <ScanLogin />}
    </LoginForm>
  );

  /** dev环境走本地配置 否则走location */
  const loginBackgroundImgUrl = sysSettings.loginBackgroundImg;

  /** 获取路径的最后一个点之后的内容 */
  const extension = loginBackgroundImgUrl?.split('.').pop();
  var videoExtension = ['mp4', 'wmv', 'avi', 'mov'];
  const isVideo = videoExtension.includes(extension);

  useMount(() => {
    if (sysSettings?.loginMode === 'scan') setLoginType('scan');
    if (sysSettings?.loginMode === 'account') setLoginType('account');
  });

  return (
    <div className={styles.container} style={{ background: `url(${loginBackgroundImgUrl})` }}>
      {isVideo && (
        <video
          className={styles.loginGbVideo}
          src={loginBackgroundImgUrl}
          crossOrigin="anonymous"
          autoPlay
          muted
          loop
        ></video>
      )}
      <div className={styles.content}>{LoginFormContent}</div>
      <BaseFooter />
    </div>
  );
};

export default Login;
