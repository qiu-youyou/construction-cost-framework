/*
 * @Author: SHUANG
 * @Date: 2023-10-30 10:50:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 09:17:00
 * @Description: 取费修编 - 目录
 */
import { Button } from 'antd';
import { useRef, useState } from 'react';
import BaseTree from 'jd-framework-web/package/components/BaseTree';
import { BaseTreeProps, TableToolbarDefine, TreeActionType } from 'jd-framework-web/package/components';
import { attachmentUpload } from 'jd-framework-web/package/common/annex/AnnexTable/services';

import { jondaReportExcel } from '@/common/services/system';
import useFormColumns from './useFormColumns';
import { DbFeeProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';
import * as FET from './fetch';

export default (props: DbFeeProps) => {
  const { readonly } = props;
  /** tree REF */
  const dbFeeDirectoryTreeRef = useRef<TreeActionType>();

  /** 当前数据库， 设置当前取费目录 */
  const { databaseCurrent } = props;

  /** 当前数据库 ID */
  const dbId = databaseCurrent?.id || '';
  const dbName = databaseCurrent?.dbName || '';

  const { dbFeeDirectoryCurrent, setDbFeeDirectoryCurrent } = props;

  /** 当前勾选取费章节目录 */
  const [dbFeeDirectorySelection, setDbFeeDirectorySelection] = useState<TYPES.DbFeeDirectoryItem[]>();

  /** Tree 的操作按钮 */
  const copyProps: TableToolbarDefine['copy'] = {
    fieldProps: {
      clickTrigger: async (...args) => FET.handleDbFeeDirectoryPasteTrigger(...args, dbFeeDirectoryTreeRef),
    },
  };

  /** 取费目录 操作栏 导入导出参数 */
  const uploadParams = { dbId, bizType: 1, beanName: 'reportFileUploadServiceImpl' };

  /** 导出模板目录 */
  const directoryTempExport = async () => {
    const exportParams = {
      _u: 'file:c3131f771da743fea44435a133304cd2.ureport.xml',
      _n: '取费模板目录',
      dbName,
      dbId,
    };
    jondaReportExcel(exportParams);
  };

  /** 导出模板明细 */
  const directoryTailsExport = async () => {
    const isDev = process.env.NODE_ENV === 'development';
    const baseUrl = isDev ? '/api' : '/web/server';
    const url = baseUrl + '/business/database/ext/report/exportExcelFeeModel.action';
    const exportParams = {
      feeDirIds: dbFeeDirectorySelection?.map((item) => item.id).join(',') || dbFeeDirectoryCurrent?.id,
      fileName: '取费模板明细',
      dbName,
      dbId,
    };
    jondaReportExcel(exportParams, url);
  };

  /** 取费目录 操作栏 */
  const toolbar: TableToolbarDefine<TYPES.DbFeeDirectoryItem> = {
    plusLevel: {
      onSubmit: async (p) => FET.fetchDbFeeDirectorySave(p, databaseCurrent),
      columns: useFormColumns,
      authKey: 'plus-fee',
    },
    edit: {
      onSubmit: async (p) => FET.fetchDbFeeDirectorySave(p, databaseCurrent),
      columns: useFormColumns,
      authKey: 'edit-fee',
    },
    copy: {
      onSubmit: async (...args) => FET.handleDbFeeDirectoryPaste(...args, databaseCurrent),
      authKey: 'copy-fee',
      ...copyProps,
    },
    deleted: {
      onSubmit: async (p) => API.dbFeeDirectoryDeleteByIds(p, databaseCurrent),
      authKey: 'deleted-fee',
    },

    import: { uploadParams, onSubmit: attachmentUpload, authKey: 'import-fee' },

    export: {
      options: {
        items: [
          { key: '1', label: <Button type="link">导出全部模板目录</Button>, onSubmit: directoryTempExport },
          { key: '2', label: <Button type="link">导出已选模板明细</Button>, onSubmit: directoryTailsExport },
        ],
      },
      authKey: 'export-fee',
    },
  };

  /** Tree Mat目录 */
  const generateTree: BaseTreeProps<TYPES.DbFeeDirectoryItem, TYPES.DbFeeDirectoryQuery> = {
    fieldNames: { key: 'id', children: 'children', title: 'feeDirectoryName' },
    service: {
      dataSourceRequest: API.dbFeeDirectoryQueryTreeNodeAll,
      params: { dbId: databaseCurrent?.id || '' },
      manualRequest: !databaseCurrent?.id,
    },
    onSelections: setDbFeeDirectorySelection,
    onCurrent: setDbFeeDirectoryCurrent,
    actionRef: dbFeeDirectoryTreeRef,
    toolbar: !readonly && toolbar,
    toolbarAuthority: true,
    defaultExpandAll: true,
    checkStrictly: false,
    localRetrieval: true,
    checkable: !readonly,
  };

  return <BaseTree {...generateTree} />;
};
