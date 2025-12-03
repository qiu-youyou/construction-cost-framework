/*
 * @Author: SHUANG
 * @Date: 2024-01-10 16:55:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-10 14:51:05
 * @Description: 工程造价编制与校审
 */

import { TabsProps } from 'antd';
import { useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import BaseReport from 'jd-framework-web/package/components/BaseReport';

import { ConstructionCostPaneActive, ConstructionCostProps } from './typings';

import { ProjectItem } from '../Product/Project/typings';
import ProjectDoc from '../common/ProjectDoc';

import MultiformMechanical from './MultiformMechanical';
import ProductUnitPrice from './ProductUnitPrice';
import CostPreparation from './CostPreparation';
import OtherfeeSummary from './OtherfeeSummary';
import QuantitySummary from './SubindexSummary';
import ProjectSummary from './ProjectSummary';
import SubitemSummary from './SubitemSummary';
import MatSummary from './MatSummary';
import WbsSummary from './WbsSummary';
import Transport from './Transport';
import FSD from './FSD';

import styles from './index.less';

const AUDITSTATUS = '1';

export default (props: ConstructionCostProps) => {
  /** PROPS 当前产品 */
  const { productActionCurrent } = props;

  /** 当前产品状态 */
  // const productStatus = AUDITSTATUS;
  const productStatus = productActionCurrent?.billStatus || '';
  const readonly = productStatus === AUDITSTATUS;

  /** 工程造价面板ACTIVE */
  const [constructionCostPaneActive, setConstructionCostPaneActive] =
    useState<ConstructionCostPaneActive>('preparation');

  /** 继续传递的PROPS */
  const constructionCostProps = { productActionCurrent, readonly };

  const constructionCostPaneItems = props?.constructionCostPaneItems || [
    'preparation',
    'price',
    'mechanical',
    'transport',
    'fsd',
    'matsum',
    'subitem',
    'wbs',
    'quantity',
    'otherfee',
    'project',
    'docs',
    'report',
  ];

  /** pane items */
  let constructionCostTabItems: TabsProps['items'] = [];

  const constructionCostPaneItemsMap: any = {
    preparation: {
      children: <CostPreparation {...constructionCostProps} />,
      key: 'preparation',
      label: '造价编制',
    },
    price: {
      children: <ProductUnitPrice {...constructionCostProps} />,
      label: '项目综合单价',
      key: 'price',
    },
    mechanical: {
      children: <MultiformMechanical {...constructionCostProps} />,
      label: '机械台班组时费',
      key: 'mechanical',
    },
    transport: {
      children: <Transport {...constructionCostProps} />,
      label: '运杂费',
      key: 'transport',
    },
    fsd: {
      children: <FSD {...constructionCostProps} />,
      label: '风水电',
      key: 'fsd',
    },
    matsum: {
      children: <MatSummary {...constructionCostProps} />,
      label: '人材机汇总与调价',
      key: 'matsum',
    },
    subitem: {
      children: <SubitemSummary {...constructionCostProps} />,
      label: '分部分项汇总',
      key: 'subitem',
    },
    wbs: {
      children: <WbsSummary {...constructionCostProps} />,
      label: 'WBS汇总',
      key: 'wbs',
    },
    quantity: {
      children: <QuantitySummary {...constructionCostProps} />,
      label: '工程量指标汇总',
      key: 'quantity',
    },
    otherfee: {
      children: <OtherfeeSummary {...constructionCostProps} />,
      label: '其他费汇总',
      key: 'otherfee',
    },
    project: {
      children: <ProjectSummary {...constructionCostProps} />,
      label: '项目汇总',
      key: 'project',
    },
    docs: {
      children: <ProjectDoc projectActionCurrent={{ id: productActionCurrent?.projectId } as ProjectItem} />,
      label: '项目文档库',
      key: 'docs',
    },
    report: {
      children: (
        <section style={{ height: '99%' }}>
          <BaseReport
            params={{
              projectId: productActionCurrent?.projectId,
              stageId: productActionCurrent?.id,
              _power_2_design: 51,
              _t: '4,6,9',
              _at: [4],
              ps: 1,
            }}
          />
        </section>
      ),
      label: '报表',
      key: 'report',
    },
  };

  /** 根据传入 PANE 配置 */
  constructionCostPaneItems?.forEach((item) => {
    constructionCostTabItems?.push(constructionCostPaneItemsMap[item]);
  });

  /** 设置当前 PANE */
  const constructionCostPaneOnChange = (activeKey?: string) => {
    setConstructionCostPaneActive?.(activeKey as ConstructionCostPaneActive);
  };

  return (
    <section style={{ height: 560 }}>
      <section className={styles.constructionCostPane}>
        <BaseCard
          tabs={{
            defaultActiveKey: constructionCostPaneActive,
            onChange: constructionCostPaneOnChange,
            items: constructionCostTabItems,
            destroyInactiveTabPane: true,
            type: 'card',
          }}
          noHeader
        />
      </section>
    </section>
  );
};
