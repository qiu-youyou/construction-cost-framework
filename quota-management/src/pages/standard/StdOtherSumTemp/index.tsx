/*
 * @Author: SHUANG
 * @Date: 2023-11-10 14:07:27
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-28 16:08:43
 * @Description: 标准库-项目汇总表费用模板库
 */

import { useEffect, useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { TableActionType } from 'jd-framework-web/package/components';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { OtherFeeTempDirectoryItem } from '../StdOtherFeeTemp/OtherFeeTempDirectoryTree/typings';
import { OtherFeeTempDetailItem } from '../StdOtherFeeTemp/OtherFeeTempDetailTable/typings';
import OtherFeeTempDirectoryTree from '../StdOtherFeeTemp/OtherFeeTempDirectoryTree';
import OtherSumTempDetailTable from './OtherSumTempDetailTable';
import { PropsStdOhterSumTemp } from './typings';

export default (props: PropsStdOhterSumTemp) => {
  const { splitScroll, splitLWidth, readonly } = props;

  /** 项目汇总表费用明细表 REF */
  const otherSumTempDetailTableRef = useRef<TableActionType>();

  /** 项目汇总表费用 当前目录 */
  const [otherSumTempDirectoryCurrent, setOtherSumTempDirectoryCurrent] =
    useState<OtherFeeTempDirectoryItem>();

  /** 项目汇总表费用 当前明细 */
  const [otherSumTempDetailCurrent, SetOtherSumTempDetailCurrent] = useState<OtherFeeTempDetailItem>();

  /** 同步设置传入 当前章节目录 */
  useEffect(() => {
    props?.setOtherSumTempDirectoryCurrent?.(otherSumTempDirectoryCurrent);
  }, [otherSumTempDirectoryCurrent]);

  return (
    <ViewContainer scroll={splitScroll || 'vh'}>
      <SplitPane>
        <PaneContainer width={splitLWidth || 380}>
          <BaseCard title="项目汇总表模板库分类">
            <OtherFeeTempDirectoryTree
              setOtherFeeTempDirectoryCurrent={setOtherSumTempDirectoryCurrent}
              otherSumTypeCode="XMHZB"
              readonly={readonly}
            />
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <BaseCard title="项目汇总表明细">
            <OtherSumTempDetailTable
              otherSumTempDirectoryCurrent={otherSumTempDirectoryCurrent}
              setOtherSumTempDetailCurrent={SetOtherSumTempDetailCurrent}
              otherSumTempDetailTableRef={otherSumTempDetailTableRef}
              otherSumTempDetailCurrent={otherSumTempDetailCurrent}
              {...props}
            />
          </BaseCard>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
