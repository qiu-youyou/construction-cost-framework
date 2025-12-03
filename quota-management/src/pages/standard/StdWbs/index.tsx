/*
 * @Author: SHUANG
 * @Date: 2024-02-21 16:28:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-27 10:28:48
 * @Description: 标准库-WBS库
 */
import { useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import { TableActionType, TreeActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { WbsDirectoryItem } from './WbsDirectoryTree/typings';
import WbsDirectoryTree from './WbsDirectoryTree';
import WbsDetailTable from './WbsDetailTable';
import { StdWbsProps } from './typings';

export default (props: StdWbsProps) => {
  /** PROPS 分割面板宽度 */
  const { splitWidth, viewContainerScroll } = props;

  /** WBS 明细表 REF */
  const wbsDetailTableRef = useRef<TableActionType>();

  /** WBS 目录 REF */
  const wbsDirectoryTreeRef = useRef<TreeActionType>();

  /** WBS 目录当前选中 */
  const [wbsDirectoryCurrent, setWbsDirectoryCurrent] = useState<WbsDirectoryItem>();

  return (
    <ViewContainer scroll={viewContainerScroll || 'vh'}>
      <SplitPane>
        <PaneContainer width={splitWidth || 340}>
          <BaseCard title="WBS目录">
            <WbsDirectoryTree
              setWbsDirectoryCurrent={setWbsDirectoryCurrent}
              wbsDirectoryTreeRef={wbsDirectoryTreeRef}
            />
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <BaseCard title="WBS明细">
            <WbsDetailTable
              wbsDirectoryCurrent={wbsDirectoryCurrent}
              wbsDirectoryTreeRef={wbsDirectoryTreeRef}
              wbsDetailTableRef={wbsDetailTableRef}
              {...props}
            />
          </BaseCard>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
