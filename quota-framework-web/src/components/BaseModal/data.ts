/*
 * @Author: SHUANG
 * @Date: 2022-07-12 10:15:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-18 15:24:00
 * @Description:
 */
/** from components */
import { BaseModalProps } from './typings';

export const defaultProps: BaseModalProps = {
  title: '标题',
  width: 458,
  visible: false,
  defaultFullScreen: false,
  destroyOnClose: true,
  maskClosable: false,
  okText: '确定',
  cancelText: '取消',
  noFooter: false,
  keyboardESC: true,
  submiterAsHeader: false,
  mask: true,
};
