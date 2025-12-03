/*
 * @Author: SHUANG
 * @Date: 2023-07-13 16:16:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-25 18:39:36
 * @Description:
 */
import moment from 'moment';
import { useState } from 'react';
import type { Moment } from 'moment';
import { Button, Calendar } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

import BaseCard from '../../../../../components/BaseCard';

import styles from './index.less';
import { useModel } from 'umi';

const bannerStyle = { marginTop: 4, width: '100%', minHeight: 140 };

const CalendarView: React.FC = () => {
  /** states */
  const { initialState } = useModel('@@initialState');
  const sysSettings = initialState?.settings;

  const calendarBanner = sysSettings.homeImg;

  const [currentYearMonth, setCurrentYearMonth] = useState(moment().endOf('day'));

  const onSelectChange = (value: Moment) => {
    setCurrentYearMonth(value);
  };

  return (
    <BaseCard noHeader>
      <section style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
        <div className={styles.title}>
          <h3>
            <div className={styles.titleQuta} /> 日历
          </h3>
        </div>
        <Calendar
          headerRender={({ value, onChange }) => {
            const prevClick = (type: any) => {
              const prevMonth = moment(currentYearMonth).subtract(1, type);
              setCurrentYearMonth(prevMonth);
              onChange(prevMonth);
            };

            const nextClick = (type: any) => {
              const nextMonth = moment(currentYearMonth).add(1, type);
              setCurrentYearMonth(nextMonth);
              onChange(nextMonth);
            };
            return (
              <div>
                <img style={bannerStyle} src={calendarBanner} alt="img" />
                <div className={styles.headCalender}>
                  <Button
                    type="text"
                    className={styles.prevBtn}
                    size="small"
                    icon={<DoubleLeftOutlined className={styles.iconBtn} />}
                    onClick={() => {
                      prevClick('year');
                    }}
                  />
                  <Button
                    type="text"
                    className={styles.prevBtn}
                    size="small"
                    icon={<LeftOutlined className={styles.iconBtn} />}
                    onClick={() => {
                      prevClick('month');
                    }}
                  />
                  <span className={styles.centerBtn}>{moment(currentYearMonth).format('YYYY-MM-DD')}</span>
                  <Button
                    type="text"
                    className={styles.nextBtn}
                    size="small"
                    icon={<DoubleRightOutlined className={styles.iconBtn} />}
                    onClick={() => {
                      nextClick('year');
                    }}
                  />
                  <Button
                    type="text"
                    className={styles.nextBtn}
                    size="small"
                    icon={<RightOutlined className={styles.iconBtn} />}
                    onClick={() => {
                      nextClick('month');
                    }}
                  />
                </div>
              </div>
            );
          }}
          onSelect={onSelectChange}
          style={{ margin: '0 10px' }}
          fullscreen={false}
        />
      </section>
    </BaseCard>
  );
};

export default CalendarView;
