/*
 * @Author: SHUANG
 * @Date: 2024-03-19 16:48:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 11:11:45
 * @Description: 工程造价对比
 */
import { Modal, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import useProjectTableColumns from '../Product/Project/useTableColumns';
import useProductTableColumns from '../Product/Product/useTableColumns';
import { ProjectItem } from '../Product/Project/typings';
import { ProductItem } from '../Product/Product/typings';
import SumDifference from './SumDifference';
import Project from '../Product/Project';
import Product from '../Product/Product';

export default () => {
  /** useModal */
  const [modal, contextHolder] = Modal.useModal();

  /** 产品表 REF */
  const productTableAfterRef = useRef<TableActionType>();
  const productTableBeforeRef = useRef<TableActionType>();

  /** 当前产品、设置当前产品 */
  const [projectSelection, setProjectSelection] = useState<ProjectItem[]>([]);

  /** 第一个项目选择的阶段 */
  const [beforeStageSelection, setBeforeStageSelection] = useState<ProductItem[]>();

  /** 第二个项目选择的阶段 */
  const [afterStageSelection, setAfterStageSelection] = useState<ProductItem[]>();

  /** 当前所选阶段 */
  const [stageSelection, setStageSelection] = useState<ProductItem[]>();

  /** 控制阶段选择 */
  const beforeStageSelectIds = beforeStageSelection?.map((item) => item?.id);
  const beforeStageGetCheckboxProps: any = (record: ProductItem) => {
    return { disabled: !beforeStageSelectIds?.includes(record?.id) && stageSelection?.length == 2 };
  };

  /** 控制阶段选择 */
  const afterStageSelectIds = afterStageSelection?.map((item) => item?.id);
  const afterStageGetCheckboxProps: any = (record: ProductItem) => {
    return { disabled: !afterStageSelectIds?.includes(record?.id) && stageSelection?.length == 2 };
  };

  useEffect(() => {
    setStageSelection([...(beforeStageSelection || []), ...(afterStageSelection || [])]);
  }, [beforeStageSelection, afterStageSelection]);

  useEffect(() => {
    if (!projectSelection?.[0]) {
      productTableBeforeRef?.current?.setTableSelection?.([]);
    }
    if (!projectSelection?.[1]) {
      productTableAfterRef?.current?.setTableSelection?.([]);
    }
  }, [projectSelection]);

  /** 阶段选择 */
  const SumDifferenceTrigger = <SumDifference stageSelection={stageSelection} />;

  /** 阶段选择 */
  const columns = useProductTableColumns.filter(
    (item) => !['billStatus', 'editPerson', 'proofreadPerson', 'checkPerson'].includes(item.dataIndex),
  );

  /** 产品表 */
  const productTableProps: Partial<BaseTableProps> = {
    rowClassName: (_: any, index?: number) => (index && index % 2 === 1 ? 'ant-table-row--striped' : ''),
    toolbarAuthority: true,
    columns,
  };

  /** 最多选择两个工程 */
  const selectIds = projectSelection?.map((item) => item?.id);
  const getCheckboxProps: any = (record: ProjectItem) => {
    return { disabled: !selectIds?.includes(record?.id) && projectSelection?.length == 2 };
  };

  const projectTableProps: Partial<BaseTableProps> = {
    rowClassName: (_: any, index?: number) => (index && index % 2 === 1 ? 'ant-table-row--striped' : ''),
    columns: useProjectTableColumns.filter(
      (item) => !['projectLeaderPerson', 'projectCheckPerson'].includes(item.dataIndex),
    ),
    toolbarBefore: <Tag color="blue">勾选项目并勾选阶段后开始对比</Tag>,
    rowSelection: { getCheckboxProps, columnTitle: ' ' },
    toolbarAuthority: true,
    toolbarAfter: false,
  };

  return (
    <>
      <ViewContainer>
        <SplitPane mode="vertical">
          <PaneContainer height="61%">
            <BaseCard title="工程列表">
              <Project
                setProjectSelection={setProjectSelection as any}
                projectSelection={projectSelection}
                tableProps={projectTableProps}
              />
            </BaseCard>
          </PaneContainer>
          <PaneContainer flex>
            <BaseCard title={SumDifferenceTrigger} extraFullScreen={false}>
              <SplitPane mode="horizontal">
                <PaneContainer width={projectSelection?.length > 1 ? '50%' : '100%'}>
                  <Product
                    tableProps={{
                      toolbarBefore: projectSelection?.[0] && (
                        <Tag color="blue">项目名称：{projectSelection?.[0]?.projectName}</Tag>
                      ),
                      rowSelection: { getCheckboxProps: beforeStageGetCheckboxProps, columnTitle: ' ' },
                      onSelections: setBeforeStageSelection,
                      actionRef: productTableBeforeRef,
                      ...productTableProps,
                    }}
                    projectCurrent={projectSelection?.[0]}
                  />
                </PaneContainer>
                {projectSelection?.length > 1 && (
                  <PaneContainer flex>
                    <Product
                      tableProps={{
                        toolbarBefore: projectSelection?.[1] && (
                          <Tag color="blue">项目名称：{projectSelection?.[1]?.projectName || ''}</Tag>
                        ),
                        rowSelection: { getCheckboxProps: afterStageGetCheckboxProps, columnTitle: ' ' },
                        onSelections: setAfterStageSelection,
                        actionRef: productTableAfterRef,
                        ...productTableProps,
                      }}
                      projectCurrent={projectSelection?.[1]}
                    />
                  </PaneContainer>
                )}
              </SplitPane>
            </BaseCard>
          </PaneContainer>
        </SplitPane>
      </ViewContainer>
      {contextHolder}
    </>
  );
};
