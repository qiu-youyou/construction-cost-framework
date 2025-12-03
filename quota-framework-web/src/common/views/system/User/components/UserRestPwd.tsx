/*
 * @Author: SHUANG
 * @Date: 2023-10-13 09:43:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-31 11:09:07
 * @Description: 用户重置随机密码
 */
import { LockOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';
import { UserListItem } from '../typings';
import { sysUserResetPwd, sysUserResetPwdByInit } from '../services';
const { Paragraph } = Typography;

type Props = { type: 'random' | 'default'; tableActionCurrent?: UserListItem };

export default (props: Props) => {
  const { type } = props;
  const [modal, contextHolder] = Modal.useModal();

  /** 提醒记下 */
  const handleCopyPass = (newPass: String) => {
    modal.info({
      okText: '确定',
      title: '重置成功！请保管好密码！',
      icon: <CheckOutlined style={{ color: '#00489d' }} />,
      content: (
        <div>
          <div>密码：</div>
          <div style={{ fontSize: 15, marginTop: 5 }}>
            <Paragraph underline copyable={{ tooltips: '复制' }}>
              {newPass}
            </Paragraph>
          </div>
        </div>
      ),
    });
  };

  /** 重置密码 */
  const handleOnClick = () => {
    if (!props?.tableActionCurrent?.id) return;
    const { id } = props.tableActionCurrent;
    modal.confirm({
      okType: 'danger',
      title: '重置密码',
      okText: '确认',
      icon: <LockOutlined style={{ color: '#cf1322' }} />,
      content: `该用户密码将被重置为${type === 'default' ? '默认' : '随机'}, 是否继续?`,
      async onOk() {
        let res;
        if (type === 'default') {
          res = await sysUserResetPwdByInit(id);
        } else {
          res = await sysUserResetPwd(id);
        }

        if (res?.status === 'SUCCESS') {
          handleCopyPass(res?.rows);
        }
        return res;
      },
    });
  };

  return (
    <>
      <Button className="BorderButtonRed" onClick={handleOnClick}>
        <LockOutlined /> 重置密码({type === 'default' ? '默认' : '随机'})
      </Button>
      {contextHolder}
    </>
  );
};
