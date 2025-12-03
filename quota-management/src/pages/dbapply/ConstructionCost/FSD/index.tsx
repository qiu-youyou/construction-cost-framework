/*
 * @Author: SHUANG
 * @Date: 2024-04-15 18:05:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 11:24:09
 * @Description: 工程造价-风水电
 */
import { TabsProps } from 'antd';
import { useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { PaneContainerPropsType } from 'jd-framework-web/package/components/SplitPane';

import FSDElectricityTable from './FSDElectricity/FSDElectricityTable';
import FSDElectricityForm from './FSDElectricity/FSDElectricityForm';
import { FSDElectricityItem } from './FSDElectricity/typings';
import FSDWaterTable from './FSDWater/FSDWaterTable';
import FSDWindTable from './FSDWind/FSDWindTable';
import FSDWaterForm from './FSDWater/FSDWaterForm';
import FSDWindForm from './FSDWind/FSDWindForm';

import { FSDWindItem } from './FSDWind/typings';
import { FSDWaterItem } from './FSDWater/typings';
import { ConstructionCostProps } from '../typings';
import { FsdItem } from './FSDMain/typings';
import { MatTypeKey } from './typings';
import FSDMain from './FSDMain';

export type Props = {
  title?: React.ReactNode;
  paneContainerProps?: PaneContainerPropsType;
  paneContainerProps2?: PaneContainerPropsType;
  FSDMainTableProps?: Partial<BaseTableProps>;
};

export default (props: ConstructionCostProps & Props) => {
  /** 1[风]、2[水]、3[电] */
  const [matType, setMatType] = useState<MatTypeKey>('3');

  const FSDMainTableRef = useRef<TableActionType>();
  const FSDWindTableRef = useRef<TableActionType>();
  const FSDWaterTableRef = useRef<TableActionType>();
  const FSDElectricityTableRef = useRef<TableActionType>();

  /** 风水电 当前、设置当前 */
  const [fsdCurrent, setFsdCurrent] = useState<FsdItem>();

  /** 施工用风 当前、设置当前 */
  const [fsdWindCurrent, setFsdWindCurrent] = useState<FSDWindItem>();

  /** 施工用水 当前、设置当前 */
  const [fsdWaterCurrent, setFsdWaterCurrent] = useState<FSDWaterItem>();

  /** 施工用电 当前、设置当前 */
  const [fsdElectricityCurrent, setFsdElectricityCurrent] = useState<FSDElectricityItem>();

  const paneTitleMap = { '1': '风', '2': '水', '3': '电' };

  const paneTableMap = {
    '1': (
      <FSDWindTable
        setFsdWindCurrent={setFsdWindCurrent}
        FSDWindTableRef={FSDWindTableRef}
        FSDMainTableRef={FSDMainTableRef}
        fsdCurrent={fsdCurrent}
      />
    ),
    '2': (
      <FSDWaterTable
        setFsdWaterCurrent={setFsdWaterCurrent}
        FSDWaterTableRef={FSDWaterTableRef}
        FSDMainTableRef={FSDMainTableRef}
        fsdCurrent={fsdCurrent}
      />
    ),
    '3': (
      <FSDElectricityTable
        setFsdElectricityCurrent={setFsdElectricityCurrent}
        FSDElectricityTableRef={FSDElectricityTableRef}
        FSDMainTableRef={FSDMainTableRef}
        fsdCurrent={fsdCurrent}
      />
    ),
  };

  const paneFormMap = {
    '1': (
      <FSDWindForm
        FSDWindTableRef={FSDWindTableRef}
        FSDMainTableRef={FSDMainTableRef}
        fsdWindCurrent={fsdWindCurrent}
      />
    ),
    '2': (
      <FSDWaterForm
        FSDWaterTableRef={FSDWaterTableRef}
        FSDMainTableRef={FSDMainTableRef}
        fsdWaterCurrent={fsdWaterCurrent}
      />
    ),
    '3': (
      <FSDElectricityForm
        FSDMainTableRef={FSDMainTableRef}
        FSDElectricityTableRef={FSDElectricityTableRef}
        fsdElectricityCurrent={fsdElectricityCurrent}
      />
    ),
  };

  const fsdPaneRender = (
    <SplitPane mode="vertical">
      <PaneContainer height={matType == '3' ? '40%' : '50%'} {...props.paneContainerProps}>
        <SplitPane>
          <PaneContainer width="40%" {...props.paneContainerProps2}>
            <BaseCard title={props?.title || `用${paneTitleMap[matType]}材料表`}>
              <FSDMain
                FSDMainTableRef={FSDMainTableRef}
                setFsdCurrent={setFsdCurrent}
                matType={matType}
                {...props}
              />
            </BaseCard>
          </PaneContainer>
          <PaneContainer flex>
            <BaseCard title={matType == '2' ? '价区及供水点' : `供${paneTitleMap[matType]}点信息`}>
              {paneTableMap[matType]}
            </BaseCard>
          </PaneContainer>
        </SplitPane>
      </PaneContainer>
      <PaneContainer flex>{paneFormMap[matType]}</PaneContainer>
    </SplitPane>
  );

  /** pane items */
  let tabItems: TabsProps['items'] = [
    { children: fsdPaneRender, label: '施工用电价格', key: '3' },
    { children: fsdPaneRender, label: '施工用风价格', key: '1' },
    { children: fsdPaneRender, label: '施工用水价格', key: '2' },
  ];

  const handlePaneOnChange = (activeKey: string) => {
    setMatType?.(activeKey as MatTypeKey);
  };

  return (
    <BaseCard
      tabs={{
        onChange: handlePaneOnChange,
        destroyInactiveTabPane: true,
        defaultActiveKey: matType,
        items: tabItems,
      }}
      noHeader
    />
  );
};
