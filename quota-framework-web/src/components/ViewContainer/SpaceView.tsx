/*
 * @Author: SHUANG
 * @Date: 2022-08-16 16:24:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-12 15:04:41
 * @Description: 添加间距
 */
import { ReactNode } from 'react';
import styles from './index.less';

export default (props: {
  children: ReactNode;
  style?: React.CSSProperties;
  disable?: boolean;
  className?: string;
  height?: number;
}) => {
  const { children, style, disable, className } = props;
  const maskWrapperClassName = disable ? styles.MaskWrapper : '';

  return (
    <div
      style={{
        padding: '0px 5px 8px 5px',
        ...style,
        height: style?.height || props?.height,
      }}
      className={`${maskWrapperClassName} ${className || ''}`}
    >
      {children}
    </div>
  );
};
