/*
 * @Author: SHUANG
 * @Date: 2023-11-20 16:25:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 17:49:52
 * @Description: 定额标准发布
 */
import { useRequest } from 'umi';
import { useEffect, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { DbChapterItem } from '../DbMain/DatabaseMain/DbChapterTree/typings';
import { databaseDbQueryPageInfo } from '../DbMain/DatabaseMain/services';
import DbChapterTree from '../DbMain/DatabaseMain/DbChapterTree';
import { DatabaseDbItem } from '../DbMain/DatabaseMain/typings';
import DataBaseSearch from '../common/DataBaseSearch';
import DbReleaseSettings from './DbReleaseSettings';
import DbSelector from '../common/DbSelector';

export default () => {
  /** 当前定额库 */
  const [databaseCurrent, setDatabaseCurrent] = useState<DatabaseDbItem>();

  /** 当前定额册章节 */
  const [dbChapterCurrent, setDbChapterCurrent] = useState<DbChapterItem>();

  /** 当前章节数据源 */
  const [dbChapterDataSource, setDbChapterDataSource] = useState<DbChapterItem[]>();
  /** 当前半选 */
  const [dbChapterHalfCheckedKeys, setDbChapterHalfCheckedKeys] = useState<string[]>();
  /** 当前勾选 */
  const [dbChapterCheckedKeys, setDbChapterCheckedKeys] = useState<string[]>();

  /** 获取定额库数据 */
  const {
    loading,
    data: dbDataSource,
    run: reloadDbDataSource,
  } = useRequest(async () => await databaseDbQueryPageInfo({ pageSize: 1000 }));

  /** 获取到定额库后默认设置第一项为当前定额库 */
  useEffect(() => {
    setDatabaseCurrent(dbDataSource?.[0]);
  }, [loading]);

  /** 定额库选择器 */
  const DbselectorProps = { reloadDbDataSource, setDatabaseCurrent, databaseCurrent, dbDataSource };

  const DbSelectorRender = (
    <>
      <DbSelector width={330} {...DbselectorProps} />
      <DataBaseSearch {...DbselectorProps} />
    </>
  );

  /** 定额册 目录 */
  const DbChapterTreeRender = (
    <DbChapterTree
      databaseCurrent={{ ...databaseCurrent, access: undefined } as DatabaseDbItem}
      setDbChapterHalfCheckedKeys={setDbChapterHalfCheckedKeys}
      setDbChapterCheckedKeys={setDbChapterCheckedKeys}
      setDbChapterDataSource={setDbChapterDataSource}
      dbChapterDataSource={dbChapterDataSource}
      setDbChapterCurrent={setDbChapterCurrent}
      reloadDbDataSource={reloadDbDataSource}
      dbChapterCurrent={dbChapterCurrent}
      checkStrictly={true}
      checkable
      readonly
    />
  );

  return (
    <ViewContainer>
      <SplitPane>
        <PaneContainer width={380}>
          <BaseCard title={DbSelectorRender}>{DbChapterTreeRender}</BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <BaseCard title="定额输出参数">
            <DbReleaseSettings
              dbChapterHalfCheckedKeys={dbChapterHalfCheckedKeys}
              dbChapterCheckedKeys={dbChapterCheckedKeys}
              dbChapterDataSource={dbChapterDataSource}
            />
          </BaseCard>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
