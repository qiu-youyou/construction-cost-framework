import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';

/** from components */
import styles from './index.less';

export type BaseDropDownProps = {
  overlayClassName?: string;
  menu?: DropDownProps['menu'];
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const BaseDropDown: React.FC<BaseDropDownProps> = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />
);

export default BaseDropDown;
