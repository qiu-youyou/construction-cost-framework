/*
 * @Author: SHUANG
 * @Date: 2023-08-15 14:09:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-18 15:34:37
 * @Description:
 */
import { Dropdown } from 'antd';
import classNames from 'classnames';
import { DropDownProps } from 'antd/es/dropdown';

/** from components */
import styles from './index.less';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  overlay: React.ReactNode | (() => React.ReactNode) | any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />
);

export default HeaderDropdown;
