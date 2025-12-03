/*
 * @Author: SHUANG
 * @Date: 2022-08-23 11:44:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-16 16:30:53
 * @Description: 最近登录信息
 */
import { Empty, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { UserSwitchOutlined } from '@ant-design/icons';
import { queryCurrentLoginPageInfo } from '../../services';
import { LoginsItem } from '../../typings';
import styles from './list.less';

const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export default () => {
  const [sourceList, setSourceList] = useState<LoginsItem[]>();

  useMount(async () => {
    const res = await queryCurrentLoginPageInfo();
    if (res?.status !== 'SUCCESS') return;
    const { rows: data } = res;
    setSourceList(data);
  });

  return (
    <section className={styles.listWrapper}>
      {!!sourceList?.length ? (
        sourceList?.map((item, index) => (
          <div key={index} className={styles.listItem}>
            <Typography.Text
              ellipsis={{
                tooltip: `${item.ipAddress} 于 ${item.date} 登录`,
              }}
            >
              <span className={styles.listItemSpot}>
                <UserSwitchOutlined />
              </span>

              <span className={styles.listItemText}>
                {item.ipAddress} 于 {item.date} 登录
              </span>
            </Typography.Text>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </section>
  );
};
