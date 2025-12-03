/*
 * @Author: SHUANG
 * @Date: 2024-01-31 09:46:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-19 17:15:09
 * @Description: 工程造价产品
 */
import { useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { TableActionType } from 'jd-framework-web/package/components';

import { ProductItem } from './Product/typings';
import { ProjectItem } from './Project/typings';
import Project from './Project';
import Product from './Product';

export default () => {
  /** 工程表 REF */
  const projectTableRef = useRef<TableActionType>();

  /** 产品表 REF */
  const productTableRef = useRef<TableActionType>();

  /** 当前工程、设置当前工程 */
  const [projectCurrent, setProjectCurrent] = useState<ProjectItem>();

  /** 当前操作工程、设置当前操作工程 */
  const [projectActionCurrent, setProjectActionCurrent] = useState<ProjectItem>();

  /** 当前操作产品 设置当前操作产品 */
  const [productActionCurrent, setProductActionCurrent] = useState<ProductItem>();

  /** 当前产品、设置当前产品 */
  const [productCurrent, setProductCurrent] = useState<ProductItem>();

  /** 工程信息 */
  const ProjectTableRender = (
    <Project
      projectTableRef={projectTableRef}
      setProjectActionCurrent={setProjectActionCurrent}
      projectActionCurrent={projectActionCurrent}
      setProjectCurrent={setProjectCurrent}
      projectCurrent={projectCurrent}
    />
  );

  /** 产品信息 */
  const ProductTableRender = (
    <Product
      projectCurrent={projectCurrent}
      productTableRef={productTableRef}
      setProductActionCurrent={setProductActionCurrent}
      productActionCurrent={productActionCurrent}
      setProductCurrent={setProductCurrent}
      productCurrent={productCurrent}
    />
  );

  return (
    <ViewContainer>
      <SplitPane mode="vertical">
        <PaneContainer height="62%">
          <BaseCard title="工程列表">{ProjectTableRender}</BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <BaseCard title="产品列表">{ProductTableRender}</BaseCard>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
