/*
 * @Author: SHUANG
 * @Date: 2023-10-16 11:03:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 17:49:47
 * @Description: 企业定额库
 */
import { useRequest } from 'umi';
import { useEffect, useState } from 'react';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import BaseCard from 'jd-framework-web/package/components/BaseCard';

import { DbMatClassifyItem } from './DataBasePane/DbMat/DbMatClassifyTree/typings';
import DbMatClassifyTree from './DataBasePane/DbMat/DbMatClassifyTree';
import { DbChapterItem } from './DbChapterTree/typings';
import { databaseDbQueryPageInfo } from './services';

import DataBaseSearch from '../../common/DataBaseSearch';
import DbSelector from '../../common/DbSelector';
import DbChapterTree from './DbChapterTree';
import DataBasePane from './DataBasePane';

import * as TYPES from './typings';

export default (props: TYPES.PropsDbMain) => {
  /** 当前是否只读 */
  const { readonly } = props;

  /** 获取定额库数据 */
  const {
    loading,
    data: dbDataSource,
    run: reloadDbDataSource,
  } = useRequest(async () => await databaseDbQueryPageInfo({ pageSize: 1000 }));

  /** 当前定额册章节 */
  const [dbChapterCurrent, setDbChapterCurrent] = useState<DbChapterItem>();

  /** 当前定额库 */
  const [databaseCurrent, setDatabaseCurrent] = useState<TYPES.DatabaseDbItem>();

  /** 当前MAT目录章节 */
  const [dbMatClassifyCurrent, setDbMatClassifyCurrent] = useState<DbMatClassifyItem>();

  /** 当前目录类型（人材机 机械台班 混凝土配合比） */
  const [classifyRjcType, setClassifyRjcType] = useState<TYPES.ClassifyRjcType>('databaseDesc');

  /** 设置当前选中定额库 如果为ReadOnly 指定为无权限 */
  const handleSetDatabaseCurrent: any = (record?: TYPES.DatabaseDbItem) => {
    if (!!record) {
      const newRecord = { ...record, access: readonly ? undefined : record?.access };
      setDatabaseCurrent(newRecord);
      props?.setDatabaseCurrent?.(newRecord);
      return;
    }
    setDatabaseCurrent(undefined);
    props?.setDatabaseCurrent?.(undefined);
  };

  /** 获取到定额库后默认设置第一项为当前定额库 */
  useEffect(() => {
    if (!!props?.databaseCurrentDefault) handleSetDatabaseCurrent(props.databaseCurrentDefault);
    else handleSetDatabaseCurrent(dbDataSource?.[0]);
  }, [loading]);

  /** 定额库选择器 */
  const DbselectorProps = {
    setDatabaseCurrent: handleSetDatabaseCurrent,
    reloadDbDataSource,
    databaseCurrent,
    dbDataSource,
  };

  const DbSelectorRender = (
    <>
      <DbSelector {...DbselectorProps} />
      <DataBaseSearch {...DbselectorProps} />
    </>
  );

  /** 定额册 目录 */
  const DbChapterTreeRender = (
    <DbChapterTree
      reloadDbDataSource={reloadDbDataSource}
      setDbChapterCurrent={setDbChapterCurrent}
      dbChapterCurrent={dbChapterCurrent}
      databaseCurrent={databaseCurrent}
    />
  );

  /** 人材机 机械台班 混凝土配合比 目录 */
  const DbMatClassifyTreeRender = (
    <DbMatClassifyTree
      dbMatClassifyCurrent={dbMatClassifyCurrent}
      setDbMatClassifyCurrent={setDbMatClassifyCurrent}
      reloadDbDataSource={reloadDbDataSource}
      databaseCurrent={databaseCurrent}
      classifyRjcType={classifyRjcType}
    />
  );

  /** 章节对应明细面板结构 */
  const DataBasePaneRender = (
    <DataBasePane
      readonly={props?.readonly}
      classifyRjcTypePane={props.classifyRjcTypePane}
      dbNormTableToolbarSlot={props.dbNormTableToolbarSlot}
      dbMatClassifyCurrent={dbMatClassifyCurrent}
      setClassifyRjcType={setClassifyRjcType}
      dbChapterCurrent={dbChapterCurrent}
      classifyRjcType={classifyRjcType}
      {...DbselectorProps}
    />
  );

  /** 非定额章节目录  rcj[人材机]、machine[机械台班]、concrete[混凝土]  */
  const inCludesDbClassifyArr: TYPES.ClassifyRjcType[] = ['rcj', 'concrete', 'machine'];
  const isDbClassify = inCludesDbClassifyArr.includes(classifyRjcType);

  return (
    <section style={{ height: 560 }}>
      <SplitPane>
        <PaneContainer width={380}>
          <BaseCard title={DbSelectorRender}>
            {isDbClassify ? DbMatClassifyTreeRender : DbChapterTreeRender}
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>{DataBasePaneRender}</PaneContainer>
      </SplitPane>
    </section>
  );
};
