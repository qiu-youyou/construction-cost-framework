/*
 * @Author: SHUANG
 * @Date: 2022-08-21 10:07:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-26 09:08:09
 * @Description: 首页待办
 */
import { Badge } from 'antd';
import { ReactNode, useEffect, useState } from 'react';

import BaseCard from '../../../../../components/BaseCard';
import { queryTaskStamp } from '../../services';
import { TotalMap } from '../../typings';

import TodoDoneTable from './TodoDoneTable';
import NoticeTable from './NoticeTable';
import TodoTable from './TodoTable';

const Task = () => {
  const [totalArr, setTotalArr] = useState<TotalMap>();

  const getTaskStamp = async () => {
    const res = await queryTaskStamp();
    setTotalArr(res?.rows);
  };

  useEffect(() => {
    getTaskStamp();
  }, []);

  /** badge */
  const GoldBadge = ({ text, count }: { text?: ReactNode; count?: number }) => (
    <Badge color="primary" size="small" count={count} offset={[12, 2]}>
      {text}
    </Badge>
  );

  const tabPaneItems = [
    {
      key: 'todo',
      label: <GoldBadge text="待办" count={totalArr?.task} />,
      children: <TodoTable getTaskStamp={getTaskStamp} />,
    },
    {
      key: 'done',
      label: <GoldBadge text="已办" count={0} />,
      children: <TodoDoneTable />,
    },
    {
      key: 'notice',
      label: <GoldBadge text="通知" count={totalArr?.notice} />,
      children: <NoticeTable getTaskStamp={getTaskStamp} />,
    },
  ];

  return <BaseCard noHeader tabs={{ animated: true, destroyInactiveTabPane: true, items: tabPaneItems }} />;
};

export default Task;
