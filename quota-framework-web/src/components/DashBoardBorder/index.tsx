/*
 * @Author: SHUANG
 * @Date: 2022-12-01 10:56:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-18 15:34:14
 * @Description:
 */
import { Button } from 'antd';
import { ReactNode, useState } from 'react';
import { CompressOutlined, ExpandOutlined } from '@ant-design/icons';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { BorderBox12 } from '@jiaminghi/data-view-react';

/** from components */
import styles from './index.less';

const DashBoardBorder = (props: { children?: ReactNode; dur?: number }) => {
  /** use FullScreen */
  const fullScreenHandle = useFullScreenHandle();

  /** Loading */

  /** 面板是否全屏 */
  const [fullScreened, setFullScreened] = useState<boolean>(false);

  /** 全屏幕切换 */
  const fullScreenedToggle = () => {
    fullScreened ? fullScreenHandle.exit() : fullScreenHandle.enter();
    setFullScreened(!fullScreened);
  };

  const toggleDom = (
    <div className={styles.fullscreenButton}>
      <Button onClick={fullScreenedToggle}>{fullScreened ? <CompressOutlined /> : <ExpandOutlined />}</Button>
    </div>
  );

  return (
    <BorderBox12 className={styles.borderbox12} dur={props?.dur}>
      <FullScreen handle={fullScreenHandle}>
        {toggleDom}
        {props.children}
      </FullScreen>
    </BorderBox12>
  );
};
export default DashBoardBorder;
