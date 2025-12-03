/*
 * @Author: SHUANG
 * @Date: 2023-10-30 10:12:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 13:46:38
 * @Description: 取费修编
 */

import { useRequest } from 'umi';
import { useEffect, useRef, useState } from 'react';
import { TableActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import BaseCard from 'jd-framework-web/package/components/BaseCard';

import { fetchDatabaseDbFeeQueryPageInfo } from '../DbFeeDatabase/services';
import useDbFeeDatabaseTableColumns from '../DbFeeDatabase/useTableColumns';

import { DbFeeDirectoryItem } from './DbFeeDirectoryTree/typings';
import { DatabaseDbItem } from '../DbMain/DatabaseMain/typings';
import { DbFeeDetailItem } from './DbFeeDetailTable/typings';
import DbFeeDirectoryTree from './DbFeeDirectoryTree';
import DataBaseSearch from '../common/DataBaseSearch';
import DbFeeDetailTable from './DbFeeDetailTable';
import DbSelector from '../common/DbSelector';
import { PropsDbFee } from './typings';

export default (props: PropsDbFee) => {
  const { readonly } = props;
  const { dbSelectorDisabled } = props;

  /** 获取定额库数据 */
  const { loading, data: dbDataSource } = useRequest(
    async () => await fetchDatabaseDbFeeQueryPageInfo({ pageSize: 1000 }),
  );

  /** 当前定额库 */
  const [databaseCurrent, setDatabaseCurrent] = useState<DatabaseDbItem>();

  /** 当前取费明细 */
  const [dbFeeDetailCurrent, setDbFeeDetailCurrent] = useState<DbFeeDetailItem>();

  /** 当前取费明细 */
  const [dbFeeDetailSelection, setDbFeeDetailSelection] = useState<DbFeeDetailItem[]>();

  /** 当前取费章节目录 */
  const [dbFeeDirectoryCurrent, setDbFeeDirectoryCurrent] = useState<DbFeeDirectoryItem>();

  /** 定额库选择器 */
  const DbselectorProps = { setDatabaseCurrent, databaseCurrent, dbDataSource };

  /** TABLE REF */
  const dbFeeDetailTableRef = useRef<TableActionType>();

  /** 获取到定额库后默认设置第一项为当前定额库 */
  useEffect(() => {
    if (!!props?.databaseCurrentDefault) {
      const find = dbDataSource?.find((item) => item.id === props.databaseCurrentDefault?.id);
      setDatabaseCurrent(find || dbDataSource?.[0]);
    } else setDatabaseCurrent(dbDataSource?.[0]);
  }, [loading]);

  /** 同步设置传入 当前取费章节目录 */
  useEffect(() => {
    props?.setDbFeeDirectoryCurrent?.(dbFeeDirectoryCurrent);
  }, [dbFeeDirectoryCurrent]);

  /** 定额库选择器  */
  const DbSelectorRender = (
    <>
      <DbSelector width={readonly ? 200 : 300} dbSelectorDisabled={dbSelectorDisabled} {...DbselectorProps} />

      {/* 查询数据库改变数据源 */}
      {!dbSelectorDisabled && (
        <DataBaseSearch
          {...DbselectorProps}
          tableProps={{
            service: { dataSourceRequest: fetchDatabaseDbFeeQueryPageInfo },
            persistenceKey: 'PAGES_DBFEEDATABASE_SELECTORSEARCHTABLE',
            columns: useDbFeeDatabaseTableColumns as any,
          }}
        />
      )}
    </>
  );

  return (
    <section style={{ height: 500 }}>
      <SplitPane>
        <PaneContainer width={readonly ? 280 : 430}>
          <BaseCard title={DbSelectorRender}>
            <DbFeeDirectoryTree
              setDbFeeDirectoryCurrent={setDbFeeDirectoryCurrent}
              dbFeeDirectoryCurrent={dbFeeDirectoryCurrent}
              databaseCurrent={databaseCurrent}
              readonly={readonly}
            />
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <DbFeeDetailTable
            toolbarSlot={props?.toolbarSlot}
            dbFeeDetailTableServiceConfig={props?.dbFeeDetailTableServiceConfig}
            setDbFeeDetailSelection={setDbFeeDetailSelection}
            dbFeeDirectoryCurrent={dbFeeDirectoryCurrent}
            setDbFeeDetailCurrent={setDbFeeDetailCurrent}
            dbFeeDetailTableRef={dbFeeDetailTableRef}
            dbFeeDetailSelection={dbFeeDetailSelection}
            dbFeeDetailCurrent={dbFeeDetailCurrent}
            databaseCurrent={databaseCurrent}
            readonly={readonly}
          />
        </PaneContainer>
      </SplitPane>
    </section>
  );
};
