/*
 * @Author: SHUANG
 * @Date: 2023-11-17 15:34:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 17:50:31
 * @Description: 全费用定额测算
 */
import { TabsProps } from 'antd';
import { useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { TableActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

/** 引用定额模块 */
import DbNormPane from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane';
import { DbChapterItem } from '@/pages/database/DbMain/DatabaseMain/DbChapterTree/typings';
import DbChapterTree from '@/pages/database/DbMain/DatabaseMain/DbChapterTree';

import DbLayerNormPriceAnalsysisTable from './DbLayerNormPriceAnalsysisTable';
import { DbLayerNormItem } from './DbLayerNormTable/typings';
import DbLayerNormFeeTable from './DbLayerNormFeeTable';
import DbLayerNormTable from './DbLayerNormTable';
import { DbLayerItem } from './typings';

/** @name dbLayerCurrent 当前层级设置 */
type Props = { dbLayerCurrent?: DbLayerItem };

export default (props: Props) => {
  const { dbLayerCurrent } = props;

  /** 定额明细表 */
  const dbLayerNormTableRef = useRef<TableActionType>();

  /** 定额明细 取费明细表 */
  const dbLayerNormFeeTableRef = useRef<TableActionType>();

  const databaseCurrent: any = { id: dbLayerCurrent?.dbId || '' };

  /** 当前定额册章节 */
  const [dbChapterCurrent, setDbChapterCurrent] = useState<DbChapterItem>();

  /** 当前定额明细 */
  const [dbLayerNormCurrent, setDbLayerNormCurrent] = useState<DbLayerNormItem>();
  /** 勾选定额明细 */
  const [dbLayerNormSelection, setDbLayerNormSelection] = useState<DbLayerNormItem[]>();
  const dbNormCurrent: any = dbLayerNormCurrent;

  /** 定额册 目录 */
  const DbChapterTreeRender = (
    <DbChapterTree
      databaseCurrent={databaseCurrent}
      setDbChapterCurrent={setDbChapterCurrent}
      dbChapterCurrent={dbChapterCurrent}
    />
  );

  /** 定额明细 取费明细表 */
  const DbLayerNormFeeTableRender = (
    <DbLayerNormFeeTable
      dbLayerNormFeeTableRef={dbLayerNormFeeTableRef}
      dbLayerNormCurrent={dbLayerNormCurrent}
      dbLayerCurrent={dbLayerCurrent}
    />
  );

  /** 定额明细 单价分析表 */
  const DbLayerNormPriceAnalsysisTableRender = (
    <DbLayerNormPriceAnalsysisTable dbLayerCurrent={dbLayerCurrent} dbLayerNormCurrent={dbLayerNormCurrent} />
  );

  /** 定额明细信息 PANE */
  const dbNormPaneItems: TabsProps['items'] = [
    { key: 'layerNormFee', label: '费用明细', children: DbLayerNormFeeTableRender },
    { key: 'layerNormPrice', label: '单价分析', children: DbLayerNormPriceAnalsysisTableRender },
  ];

  /** 定额明细表 */
  const DbLayerNormTableRender = (
    <DbLayerNormTable
      dbLayerNormTableRef={dbLayerNormTableRef}
      dbLayerNormFeeTableRef={dbLayerNormFeeTableRef}
      setDbLayerNormSelection={setDbLayerNormSelection}
      setDbLayerNormCurrent={setDbLayerNormCurrent}
      dbLayerNormSelection={dbLayerNormSelection}
      dbLayerNormCurrent={dbLayerNormCurrent}
      dbChapterCurrent={dbChapterCurrent}
      dbLayerCurrent={dbLayerCurrent}
    />
  );

  /**  定额明细信息 PANE */
  const DbNormPaneRender = (
    <DbNormPane
      databaseCurrent={databaseCurrent}
      dbNormPaneItems={dbNormPaneItems}
      dbNormCurrent={dbNormCurrent}
    />
  );

  return (
    <section style={{ height: 640 }}>
      <SplitPane>
        <PaneContainer width={380}>
          <BaseCard title="章节目录">{DbChapterTreeRender}</BaseCard>
        </PaneContainer>

        <PaneContainer flex>
          <SplitPane mode="vertical">
            <PaneContainer height="58%">{DbLayerNormTableRender}</PaneContainer>

            <PaneContainer flex>{DbNormPaneRender}</PaneContainer>
          </SplitPane>
        </PaneContainer>
      </SplitPane>
    </section>
  );
};
