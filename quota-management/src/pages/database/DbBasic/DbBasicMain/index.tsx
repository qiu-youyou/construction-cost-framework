/*
 * @Author: SHUANG
 * @Date: 2024-03-01 10:10:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 13:47:51
 * @Description: 基础企业定额维护
 */

import { useRequest } from 'umi';
import { TabsProps } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { DbMatClassifyItem } from '../../DbMain/DatabaseMain/DataBasePane/DbMat/DbMatClassifyTree/typings';
import DbMatClassifyTree from '../../DbMain/DatabaseMain/DataBasePane/DbMat/DbMatClassifyTree';
import { ClassifyRjcType, DataBaseProps } from '../../DbMain/DatabaseMain/typings';
import { basicDatabaseDbQueryPageInfo } from '../services';
import DataBaseSearch from '../../common/DataBaseSearch';
import DbSelector from '../../common/DbSelector';
import useTableColumns from '../useTableColumns';
import { BasicDatabaseDbItem } from '../typings';

import DbBasicNorm from './DbBasicNorm';
import DbBasicMat from './DbBasicMat';

export default (props: DataBaseProps) => {
  /** 当前默认库 */
  const { databaseCurrent: databaseCurrentProps } = props;

  /** 获取定额库数据 */
  const { loading, data: dbDataSource } = useRequest(
    async () => await basicDatabaseDbQueryPageInfo({ pageSize: 1000 }),
  );
  /** 当前定额库 */
  const [databaseCurrent, setDatabaseCurrent] = useState<BasicDatabaseDbItem>();

  /** 当前MAT目录章节 */
  const [dbMatClassifyCurrent, setDbMatClassifyCurrent] = useState<DbMatClassifyItem>();

  /** 当前目录类型（人材机 机械台班 混凝土配合比） */
  const [classifyRjcType, setClassifyRjcType] = useState<ClassifyRjcType>('dbNorm');

  /** pane 配置 */
  const classifyRjcTypePane = props?.classifyRjcTypePane || ['dbNorm', 'machine', 'concrete', 'rcj'];

  /** 设置当前库 同步 DatabaseDbItem 属性 */
  const handleSetDatabaseCurrent = (item?: BasicDatabaseDbItem) => {
    if (!item) setDatabaseCurrent(undefined);
    else setDatabaseCurrent({ ...item, access: ['norm', 'rcj'] } as any);
  };

  /** 定额库选择器 */
  const DbSelectorProps: any = {
    databaseCurrent: { ...databaseCurrent },
    setDatabaseCurrent: handleSetDatabaseCurrent,
    dbDataSource,
  };

  /** 主材选择器 */
  const DbBasicMatProps: any = { ...DbSelectorProps, classifyRjcType, dbMatClassifyCurrent };

  /** pane items */
  let DbBasicPaneItems: TabsProps['items'] = [];

  const DbBasicPaneItemsMap: any = {
    dbNorm: { key: 'dbNorm', label: '定额', children: <DbBasicNorm {...DbSelectorProps} /> },
    machine: { key: 'machine', label: '机械台班', children: <DbBasicMat {...DbBasicMatProps} /> },
    concrete: { key: 'concrete', label: '混凝土配合比', children: <DbBasicMat {...DbBasicMatProps} /> },
    rcj: { key: 'rcj', label: '人材机', children: <DbBasicMat {...DbBasicMatProps} /> },
  };

  /** 获取到定额库后默认设置第一项为当前定额库 */
  useEffect(() => {
    if (!!databaseCurrentProps) {
      const find = dbDataSource?.find((item: { id: string }) => item.id === databaseCurrentProps?.id);
      handleSetDatabaseCurrent(find || dbDataSource?.[0]);
    } else handleSetDatabaseCurrent(dbDataSource?.[0]);
  }, [loading]);

  /* 引用定额库查询 重写 service */
  const tableProps = {
    service: { dataSourceRequest: basicDatabaseDbQueryPageInfo },
    persistenceKey: 'PAGES_DASICNORMDB_SELECTORSEARCHTABLE',
    columns: useTableColumns as any,
  };

  /** 定额库选择器 */
  const DbSelectorRender = (
    <>
      <DbSelector {...DbSelectorProps} />
      <DataBaseSearch tableProps={tableProps} {...DbSelectorProps} modalTitle="查询" />
    </>
  );

  /** 根据传入 pane 配置 */
  classifyRjcTypePane?.forEach((item) => {
    DbBasicPaneItems?.push(DbBasicPaneItemsMap[item]);
  });

  /** 设置当前类型 */
  const dbPaneOnChange = (activeKey?: string) => {
    setClassifyRjcType?.(activeKey as ClassifyRjcType);
  };

  /** 人材机 机械台班 混凝土配合比 目录 */
  const DbMatClassifyTreeRender = (
    <DbMatClassifyTree
      databaseCurrent={{ ...databaseCurrent, id: databaseCurrent?.dbId || '' } as any}
      setDbMatClassifyCurrent={setDbMatClassifyCurrent}
      dbMatClassifyCurrent={dbMatClassifyCurrent}
      classifyRjcType={classifyRjcType}
    />
  );

  /** 定额库选择器 */
  const DbSelectorStyle: CSSProperties = {
    borderBottom: '1px solid #e9e9e9',
    borderRight: '1px solid #e9e9e9',
    display: 'inline-block',
    padding: '0px 8px',
  };

  /** 选择和 TABS一起渲染 */
  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <div>
      <span style={DbSelectorStyle}>{DbSelectorRender}</span>
      <span
        style={{ display: 'inline-block', width: 'calc(100% - 362px)' }}
        className="ant-tabs ant-tabs-top"
      >
        <DefaultTabBar {...props} />
      </span>
    </div>
  );

  return (
    <section style={{ height: 560 }}>
      <SplitPane>
        {classifyRjcType !== 'dbNorm' && (
          <PaneContainer width={380}>
            <BaseCard title={DbSelectorRender}>{DbMatClassifyTreeRender}</BaseCard>
          </PaneContainer>
        )}

        <PaneContainer flex>
          <BaseCard
            noHeader
            tabs={{
              renderTabBar: classifyRjcType === 'dbNorm' ? renderTabBar : undefined,
              destroyInactiveTabPane: true,
              activeKey: classifyRjcType,
              onChange: dbPaneOnChange,
              items: DbBasicPaneItems,
            }}
          />
        </PaneContainer>
      </SplitPane>
    </section>
  );
};
