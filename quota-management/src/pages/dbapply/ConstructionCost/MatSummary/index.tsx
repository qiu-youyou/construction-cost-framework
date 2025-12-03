/*
 * @Author: SHUANG
 * @Date: 2024-03-14 14:59:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 14:22:39
 * @Description: 工程造价-人材机汇总与调价
 */
import { useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { TableActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { MatSumDirectoryItem } from './MatDirectoryTree/services';
import { MatSummaryItem } from './MatSummaryTable/typings';
import { ConstructionCostProps } from '../typings';
import MatDirectoryTree from './MatDirectoryTree';
import MatSummaryTable from './MatSummaryTable';

export default (props: ConstructionCostProps) => {
  /** 人材机汇总表 ref */
  const matSummaryTableRef = useRef<TableActionType>();

  /** 人材机目录 当前选中、设置当前选中 */
  const [matDirectoryCurrent, setMatDirectoryCurrent] = useState<MatSumDirectoryItem>();

  /** 人材机汇总明细 当前选中、设置当前选中 */
  const [matSummaryCurrent, setMatSummaryCurrent] = useState<MatSummaryItem>();

  return (
    <SplitPane>
      <PaneContainer width={200}>
        <BaseCard title="人材机类型">
          <MatDirectoryTree setMatDirectoryCurrent={setMatDirectoryCurrent} {...props} />
        </BaseCard>
      </PaneContainer>
      <PaneContainer flex>
        <BaseCard title="人材机明细">
          <MatSummaryTable
            matSummaryTableRef={matSummaryTableRef}
            setMatSummaryCurrent={setMatSummaryCurrent}
            matDirectoryCurrent={matDirectoryCurrent}
            matSummaryCurrent={matSummaryCurrent}
            {...props}
          />
        </BaseCard>
      </PaneContainer>
    </SplitPane>
  );
};
