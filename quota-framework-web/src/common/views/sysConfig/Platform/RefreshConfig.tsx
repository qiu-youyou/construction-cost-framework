/*
 * @Author: SHUANG
 * @Date: 2023-08-22 17:12:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:33:32
 * @Description:
 */
import { Button, Modal } from 'antd';
import { sysConfigRefreshSystemConfig } from './services';
import { RedoOutlined } from '@ant-design/icons';

export default () => {
  const [modal, contextHolder] = Modal.useModal();

  /** 是否立即刷新 */
  const handleRefreshNow = () => {
    modal.confirm({
      title: '是否刷新',
      content: `载入后刷新该系统生效, 是否立即刷新?`,
      cancelText: '暂不刷新',
      okText: '立即刷新',
      async onOk() {
        window.location.reload();
      },
    });
  };

  /** 重新载入系统配置后 刷新系统 */
  const handleRefreshConfig = async () => {
    modal.confirm({
      title: '继续操作',
      content: `重新载入系统配置，载入后刷新该系统生效，是否继续？`,
      async onOk() {
        const res = await sysConfigRefreshSystemConfig();
        if (res?.status !== 'SUCCESS') return;
        handleRefreshNow();
      },
    });
  };

  const refreshConfigButton = (
    <>
      <Button className="BorderButtonBlue" onClick={handleRefreshConfig}>
        <RedoOutlined /> 重新载入系统配置
      </Button>
      {contextHolder}
    </>
  );

  return refreshConfigButton;
};
