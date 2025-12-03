/*
 * @Author: SHUANG
 * @Date: 2023-11-02 14:31:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-29 10:10:31
 * @Description: 定额库维护 - 章节参数设置
 */
import { useRequest } from 'umi';
import { useEffect, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import { attachmentUpload } from 'jd-framework-web/package/common/annex/AnnexTable/services';
import { jondaReportExcel } from '@/common/services/system';

import { fetchDbChapterParamsQueryPageInfo, fetchDbChapterParamsSave } from './fetch';
import { databaseDbQueryPageInfo } from '../DbMain/DatabaseMain/services';
import { DatabaseDbItem } from '../DbMain/DatabaseMain/typings';
import DataBaseSearch from '../common/DataBaseSearch';
import useTableColumns from './useTableColumns';
import DbSelector from '../common/DbSelector';
import * as TYPES from './typings';

export default () => {
  const { auth } = useAuthButton();
  /** 当前定额库 */
  const [databaseCurrent, setDatabaseCurrent] = useState<DatabaseDbItem>();

  /** 获取定额库数据 */
  const { loading, data: dbDataSource } = useRequest(
    async () => await databaseDbQueryPageInfo({ pageSize: 1000 }),
  );

  /** 定额库参数 当前行 */
  const [chapterParamsCurrent, setChapterParamsCurrent] = useState<TYPES.DbChapterParamsItem>();

  /** 定额库选择器 */
  const DbselectorProps = { setDatabaseCurrent, databaseCurrent, dbDataSource };

  const dbId = databaseCurrent?.id || '';
  const dbName = databaseCurrent?.dbName || '';

  /** 操作栏 导入导出参数 */
  const uploadParams = { dbId, bizType: 3, beanName: 'reportFileUploadServiceImpl' };
  const exportParams = {
    _u: 'file:ec96f229d21247ed80891ecbde1aa860.ureport.xml',
    _n: '章节参数明细',
    dbName,
    dbId,
  };

  /** 章节参数 操作栏 */
  const toolbar: TableToolbarDefine = {
    export: {
      determineActionCurrent: false,
      onSubmit: jondaReportExcel,
      exportType: 'default',
      exportParams,
    },
    import: { uploadParams, onSubmit: attachmentUpload },
    expand: { buttonText: '全部' },
  };

  /** 列表 */
  const generateTable: BaseTableProps<TYPES.DbChapterParamsItem, TYPES.DbChapterParamsQuery> = {
    persistenceKey: 'PAGESDATABASEDBCHAPTERPARAMSTABLE',
    service: {
      dataSourceRequest: fetchDbChapterParamsQueryPageInfo,
      cellEditSaveRequest: async (...args) => fetchDbChapterParamsSave(...args),
      manualRequest: !dbId,
      params: { dbId },
    },
    onCurrent: setChapterParamsCurrent,
    cellEditable: auth('edit'),
    columns: useTableColumns,
    toolbarAuthority: true,
    pagination: false,
    calcTotal: true,
    expandable: {},
    search: false,
    toolbar,
  };

  /** 定额库选择器 */
  const DbSelectorRender = (
    <>
      <DbSelector {...DbselectorProps} />
      <DataBaseSearch {...DbselectorProps} />
    </>
  );

  /** 获取到定额库后默认设置第一项为当前定额库 */
  useEffect(() => {
    setDatabaseCurrent(dbDataSource?.[0]);
  }, [loading]);

  return (
    <ViewContainer>
      <BaseCard title={DbSelectorRender}>
        <BaseTable {...generateTable} />
      </BaseCard>
    </ViewContainer>
  );
};
