/*
 * @Author: SHUANG
 * @Date: 2023-04-23 09:07:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 17:57:20
 * @Description:
 */
import { history } from 'umi';
import { Avatar, Empty, Space } from 'antd';
import { useEffect, useState } from 'react';

import BaseCard from '../../../../../components/BaseCard';
import { shortcutQueryPageInfo } from '../../services';
import { ShortcutItem } from '../../typings';
import styles from './index.less';

import short1 from '/public/images/home/short-1.png';
import short2 from '/public/images/home/short-2.png';
import short3 from '/public/images/home/short-3.png';

const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

const Shortcut = () => {
  const [shortcuts, setShortCuts] = useState<ShortcutItem[]>();
  const [sysShortcuts, setSysShortCuts] = useState<ShortcutItem[]>();

  useMount(async () => {
    const res = await shortcutQueryPageInfo();
    if (res?.status !== 'SUCCESS') return;
    const { rows: data } = res;
    const shortcuts = data.filter((item) => item.sysType !== '1');
    const sysShortcuts = data.filter((item) => item.sysType === '1');
    setShortCuts(shortcuts);
    setSysShortCuts(sysShortcuts);
  });

  const onClick = (item: ShortcutItem) => {
    // 调入系统的某个链接
    if (item?.sysType === 'Y') {
      history.push(item.url);
      return;
    }
    if (item?.openType === 'self') {
      history.push('/out/window', item.url);
      return;
    }
    window.open(`${item.url}`);
  };

  // 快捷方式列表
  const ShortcutList = (
    <>
      {/*系统快捷方式 */}
      <section className={styles.listWrap}>
        <Space size={[1, 0]} wrap>
          {sysShortcuts?.map((item) => (
            <div key={item.id} className={styles.listItem} onClick={() => onClick(item)}>
              <div className={styles.listItemWrapper}>
                <Avatar shape="square" src={item.icon === '1' ? short1 : short2} />
                <div className={styles.listItemTitle}>{item.title}</div>
              </div>
            </div>
          ))}
        </Space>
      </section>

      {/* 用户配置快捷方式 */}
      <section className={styles.listWrap}>
        <Space size={[1, 0]} wrap>
          {shortcuts?.map((item) => (
            <div key={item.id} className={styles.listItem} onClick={() => onClick(item)}>
              <div className={styles.listItemWrapper}>
                <Avatar shape="square" src={short3} />
                <div className={styles.listItemTitle}>{item.title}</div>
              </div>
            </div>
          ))}
        </Space>
      </section>
    </>
  );

  // 空状态
  const EmptyList = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <BaseCard noHeader>
      <div className={styles.title}>
        <h3>
          <div className={styles.titleQuta} /> 快捷方式
        </h3>
      </div>
      {shortcuts?.length || sysShortcuts?.length ? ShortcutList : EmptyList}
    </BaseCard>
  );
};

export default Shortcut;
