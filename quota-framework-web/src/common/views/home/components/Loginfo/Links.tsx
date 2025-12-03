/*
 * @Author: SHUANG
 * @Date: 2022-07-18 10:53:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 18:01:00
 * @Description: 系统连接
 */
import { history } from 'umi';
import { Empty, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { LinkOutlined, RightOutlined } from '@ant-design/icons';
import { linkQueryPageInfo } from '../../services';
import { LinksItem } from '../../typings';
import styles from './list.less';

const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export default () => {
  const [sourceList, setSourceList] = useState<LinksItem[]>();

  useMount(async () => {
    const res = await linkQueryPageInfo();
    if (res?.status !== 'SUCCESS') return;
    const { rows: data } = res;
    setSourceList(data);
  });

  const onClick = (item: LinksItem) => {
    if (item?.openType === 'self') {
      history.push('/out/window', item?.url);
      return;
    }
    window.open(`${item?.url}`);
  };

  return (
    <section className={styles.listWrapper}>
      {!!sourceList?.length ? (
        sourceList?.map((item) => (
          <div key={item.id} className={styles.listItem} onClick={() => onClick(item)}>
            <Typography.Text ellipsis={{ tooltip: `${item.title}` }}>
              <span className={styles.listItemSpot}>
                <LinkOutlined />
              </span>
              <span className={styles.listItemText}>{item.title}</span>
            </Typography.Text>

            <span className={styles.listItemRight}>
              <RightOutlined />
            </span>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </section>
  );
};
