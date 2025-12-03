/*
 * @Author: SHUANG
 * @Date: 2024-04-10 14:43:44
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 10:56:03
 * @Description: 工程造价-运保杂费计算
 */
import { useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { BaseTableProps, ModalActionType, TableActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { PaneContainerPropsType } from 'jd-framework-web/package/components/SplitPane';
import { TransportOriginMethodItem } from './TransportOriginMethod/typings';
import { TransportOriginItem } from './TransportOrigin/typings';
import TransportOriginMethod from './TransportOriginMethod';
import { TransportItem } from './TransportMain/typings';
import { ConstructionCostProps } from '../typings';
import TransportOrigin from './TransportOrigin';
import TransportMain from './TransportMain';

export type Props = {
  title?: React.ReactNode;
  paneContainerProps?: PaneContainerPropsType;
  paneContainerProps2?: PaneContainerPropsType;
  transportMainTableProps?: Partial<BaseTableProps>;
};

export default (props: ConstructionCostProps & Props) => {
  /** 运杂费表 */
  const transportMainTableRef = useRef<TableActionType>();
  /** 来源地表 */
  const transportOriginTableRef = useRef<TableActionType>();
  /** 运输方式 */
  const transportOriginMethodTableRef = useRef<TableActionType>();

  /** 铁路综合运费 计算 */
  const transportOriginTrainRef = useRef<ModalActionType>();
  /** 水路，公路，其他运输方式 分段计算 */
  const transportOriginFreightRef = useRef<ModalActionType>();
  /** 铁路、水路、公路、其他 杂费计算 */
  const transportOriginOtherRef = useRef<ModalActionType>();

  /** 当前 运杂费 */
  const [transportMainCurrent, setTransportMainCurrent] = useState<TransportItem>();

  /** 当前 运杂费来源地 */
  const [transportOriginCurrent, setTransportOriginCurrent] = useState<TransportOriginItem>();

  /** 当前 运杂费来源地运输方式 */
  const [transportOriginMethodCurrent, setTransportOriginMethodCurrent] =
    useState<TransportOriginMethodItem>();

  return (
    <SplitPane>
      <PaneContainer width={470} {...props.paneContainerProps}>
        <BaseCard title={props?.title || '运杂费'}>
          <TransportMain
            transportMainTableRef={transportMainTableRef}
            setTransportMainCurrent={setTransportMainCurrent}
            transportMainCurrent={transportMainCurrent}
            {...props}
          />
        </BaseCard>
      </PaneContainer>
      <PaneContainer flex>
        <SplitPane mode="vertical">
          <PaneContainer height="60%" {...props.paneContainerProps2}>
            <BaseCard title="来源地">
              <TransportOrigin
                transportOriginTableRef={transportOriginTableRef}
                setTransportOriginCurrent={setTransportOriginCurrent}
                transportOriginCurrent={transportOriginCurrent}
                transportMainCurrent={transportMainCurrent}
              />
            </BaseCard>
          </PaneContainer>
          <PaneContainer flex>
            <BaseCard title="运输方式">
              <TransportOriginMethod
                transportMainTableRef={transportMainTableRef}
                transportOriginTableRef={transportOriginTableRef}
                transportOriginMethodTableRef={transportOriginMethodTableRef}
                setTransportOriginMethodCurrent={setTransportOriginMethodCurrent}
                transportOriginMethodCurrent={transportOriginMethodCurrent}
                transportOriginFreightRef={transportOriginFreightRef}
                transportOriginTrainRef={transportOriginTrainRef}
                transportOriginOtherRef={transportOriginOtherRef}
                transportOriginCurrent={transportOriginCurrent}
              />
            </BaseCard>
          </PaneContainer>
        </SplitPane>
      </PaneContainer>
    </SplitPane>
  );
};
