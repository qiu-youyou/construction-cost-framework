/*
 * @Author: SHUANG
 * @Date: 2024-04-08 13:52:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 17:46:19
 * @Description: 树形字典
 */
import { useState } from 'react';
import BaseCard from '../../../../components/BaseCard';
import SplitPane, { PaneContainer } from '../../../../components/SplitPane';
import ViewContainer from '../../../../components/ViewContainer';
import DictTreeClassTable from './DictTreeClassTable';
import DictTreeItemTable from './DictTreeItemTable';
import * as TYPES from './typings';

export default () => {
  /** 当前字典、设置当前字典 */
  const [dictTreeItemCurrent, setDictTreeItemCurrent] = useState<TYPES.DictTreeItem>();

  /** 当前目录、设置当前目录 */
  const [dictTreeClassCurrent, setDictTreeClassCurrent] = useState<TYPES.DictTreeClassItem>();

  return (
    <ViewContainer>
      <SplitPane>
        <PaneContainer width="45%">
          <BaseCard title="字典目录">
            <DictTreeClassTable
              setDictTreeClassCurrent={setDictTreeClassCurrent}
              dictTreeClassCurrent={dictTreeClassCurrent}
            />
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <BaseCard title="字典项">
            <DictTreeItemTable
              setDictTreeItemCurrent={setDictTreeItemCurrent}
              dictTreeItemCurrent={dictTreeItemCurrent}
            />
          </BaseCard>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
