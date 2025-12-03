/*
 * @Author: SHUANG
 * @Date: 2023-07-26 16:33:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 15:25:59
 * @Description: 查询与排序
 */
import { useState } from 'react';
import { ProCardTabsProps } from '@ant-design/pro-components';

import SplitPane, { PaneContainer } from '../../../../components/SplitPane';
import ViewContainer from '../../../../components/ViewContainer';
import BaseCard from '../../../../components/BaseCard';

import FieldClassTree from './components/FieldClassTree';
import FieldQueryTable from './components/FieldQueryTable';
import FieldSortTable from './components/FieldSortTable';
import { FieldClassListItem } from './typings';

export default () => {
  /** 当前选中目录 */
  const [classCurrent, setClassCurrent] = useState<FieldClassListItem>();

  /** 查询与排序 */
  const tabItems: ProCardTabsProps['items'] = [
    { key: 'query', label: '高级查询', children: <FieldQueryTable classCurrent={classCurrent} /> },
    { key: 'sort', label: '排序管理', children: <FieldSortTable classCurrent={classCurrent} /> },
  ];

  return (
    <ViewContainer>
      <SplitPane>
        <PaneContainer width={300}>
          <BaseCard title="目录">
            <FieldClassTree setClassCurrent={setClassCurrent} />
          </BaseCard>
        </PaneContainer>

        <PaneContainer flex>
          <BaseCard title="查询与排序管理" tabs={{ items: tabItems }} />
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
