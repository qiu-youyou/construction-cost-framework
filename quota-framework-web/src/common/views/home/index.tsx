/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-25 15:06:01
 * @Description:
 */
import { Col, Row } from 'antd';
import Task from './components/TaskTable';
import Calendar from './components/Calendar';
import Bulletin from './components/Bulletin';
import Shortcut from './components/Shortcut';
import Loginfo from './components/Loginfo';
import styles from './index.less';

const Home: React.FC = () => {
  return (
    <div>
      {/* top */}
      <section className={styles.SplitSection}>
        <Row gutter={[8, 8]}>
          {/* 待办已办 */}
          <Col span={19} xs={18} sm={18} md={18} lg={18} xl={19}>
            <div className={styles.paneChildren}>
              <Task />
            </div>
          </Col>
          {/* 日历宣传 */}
          <Col span={5} xs={6} sm={6} md={6} lg={6} xl={5}>
            <div className={styles.paneChildren}>
              <Calendar />
            </div>
          </Col>
        </Row>
      </section>

      {/* bottom */}
      <section className={styles.SplitSectionBottom}>
        <Row gutter={[8, 8]}>
          <Col span={19} xs={18} sm={18} md={18} lg={18} xl={19}>
            <Row gutter={[8, 8]}>
              {/* 系统公告 */}
              <Col span={15}>
                <div className={styles.paneChildren}>
                  <Bulletin />
                </div>
              </Col>
              {/* 系统快捷方式 */}
              <Col span={9}>
                <div className={styles.paneChildren}>
                  <Shortcut />
                </div>
              </Col>
            </Row>
          </Col>

          {/* 登录状态 其他信息 */}
          <Col span={5} xs={6} sm={6} md={6} lg={6} xl={5}>
            <div className={styles.paneChildren}>
              <Loginfo />
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Home;
