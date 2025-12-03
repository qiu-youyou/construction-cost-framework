/*
 * @Author: SHUANG
 * @Date: 2023-05-17 17:21:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-20 10:08:34
 * @Description: 系统公告
 */

import BaseCard from '../../../../../components/BaseCard';
import BulletinList from './BulletinList';
import styles from './index.less';

export default () => {
  return (
    <BaseCard noHeader>
      <div className={styles.title}>
        <h3>
          <div className={styles.titleQuta} /> 公告
        </h3>
      </div>

      <div className={styles.listWrap}>
        <BulletinList />
      </div>
    </BaseCard>
  );
};
