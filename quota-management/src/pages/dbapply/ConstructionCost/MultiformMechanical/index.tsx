/*
 * @Author: SHUANG
 * @Date: 2024-03-25 15:16:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 13:45:59
 * @Description: 工程造价-机械台班组时费
 */
import { useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { BaseCardProps, BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { PaneContainerPropsType } from 'jd-framework-web/package/components/SplitPane';
import { MultiformMechanicalItem } from './MultiformMechanicalTable/typings';
import MultiformMechanicalMatTable from './MultiformMechanicalMatTable';
import MultiformMechanicalTable from './MultiformMechanicalTable';
import { ConstructionCostProps } from '../typings';

type Props = {
  /** BaseCard PROPS */
  cardProps?: BaseCardProps;
  paneContainerProps?: PaneContainerPropsType;
  tableProps?: Partial<BaseTableProps>;
};

export default (props: ConstructionCostProps & Props) => {
  /** 祖师机械定义 REF */
  const multiformMechanicalTableRef = useRef<TableActionType>();

  /** 组时机械定义 当前选中 */
  const [multiformMechanicalCurrent, setMultiformMechanicalCurrent] = useState<MultiformMechanicalItem>();

  return (
    <SplitPane mode="vertical">
      <PaneContainer height="55%" {...props.paneContainerProps}>
        <BaseCard title="组时机械定义" {...props?.cardProps}>
          <MultiformMechanicalTable
            multiformMechanicalTableRef={multiformMechanicalTableRef}
            setMultiformMechanicalCurrent={setMultiformMechanicalCurrent}
            multiformMechanicalCurrent={multiformMechanicalCurrent}
            {...props}
          />
        </BaseCard>
      </PaneContainer>
      <PaneContainer flex>
        <BaseCard title="组时机械明细">
          <MultiformMechanicalMatTable
            multiformMechanicalTableRef={multiformMechanicalTableRef}
            multiformMechanicalCurrent={multiformMechanicalCurrent}
            readonly={props.readonly}
          />
        </BaseCard>
      </PaneContainer>
    </SplitPane>
  );
};
