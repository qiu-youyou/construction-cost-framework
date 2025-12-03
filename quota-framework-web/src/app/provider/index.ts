import { ConfigProvider, Modal, message, notification } from 'antd';

export function configProvider() {
  message.config({
    getContainer: () => document.querySelector('.fullscreen-enabled') || document.body,
  });

  notification.config({
    getContainer: () => document.querySelector('.fullscreen-enabled') || document.body,
  });
}
