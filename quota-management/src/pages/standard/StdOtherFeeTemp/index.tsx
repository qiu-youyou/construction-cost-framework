/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:12:44
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-28 14:18:55
 * @Description: 标准库-其他费模板库
 */
import { useEffect, useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { TableActionType } from 'jd-framework-web/package/components';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { OtherFeeTempDirectoryItem } from './OtherFeeTempDirectoryTree/typings';
import { OtherFeeTempDetailItem } from './OtherFeeTempDetailTable/typings';
import OtherFeeTempDirectoryTree from './OtherFeeTempDirectoryTree';
import OtherFeeTempDetailTable from './OtherFeeTempDetailTable';
import { PropsStdOhterOtherTemp } from './typings';

export default (props: PropsStdOhterOtherTemp) => {
  const { splitScroll, splitLWidth, readonly } = props;

  /** 其他费用明细表 REF */
  const otherFeeTempDetailTableRef = useRef<TableActionType>();

  /** 其他费用 当前目录 */
  const [otherFeeTempDirectoryCurrent, setOtherFeeTempDirectoryCurrent] =
    useState<OtherFeeTempDirectoryItem>();

  /** 其他费用 当前明细 */
  const [otherFeeTempDetailCurrent, setOtherFeeTempDetailCurrent] = useState<OtherFeeTempDetailItem>();

  /** 同步设置传入 当前章节目录 */
  useEffect(() => {
    props?.setOtherFeeTempDirectoryCurrent?.(otherFeeTempDirectoryCurrent);
  }, [otherFeeTempDirectoryCurrent]);

  return (
    <ViewContainer scroll={splitScroll || 'vh'}>
      <SplitPane>
        <PaneContainer width={splitLWidth || 380}>
          <BaseCard title="其他费模板库分类">
            <OtherFeeTempDirectoryTree
              setOtherFeeTempDirectoryCurrent={setOtherFeeTempDirectoryCurrent}
              otherSumTypeCode="QT"
              readonly={readonly}
            />
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <BaseCard title="其他费用明细">
            <OtherFeeTempDetailTable
              otherFeeTempDirectoryCurrent={otherFeeTempDirectoryCurrent}
              setOtherFeeTempDetailCurrent={setOtherFeeTempDetailCurrent}
              otherFeeTempDetailTableRef={otherFeeTempDetailTableRef}
              otherFeeTempDetailCurrent={otherFeeTempDetailCurrent}
              {...props}
            />
          </BaseCard>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
