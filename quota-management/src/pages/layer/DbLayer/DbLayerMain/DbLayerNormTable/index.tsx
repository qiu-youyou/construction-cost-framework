/*
 * @Author: SHUANG
 * @Date: 2023-11-17 16:47:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 14:22:55
 * @Description: 全费用定额测算 - 定额明细
 */
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';

import { DbFeeDirectoryItem } from '@/pages/database/DbFee/DbFeeDirectoryTree/typings';
import DbFeeSet from '@/pages/database/common/DbFeeSet';

import useTableColumns from './useTableColumns';
import { DbLayerProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';
import * as FET from './fetch';

export default (props: DbLayerProps) => {
  const { auth } = useAuthButton();
  /** 当前层级、当前章节 */
  const { dbLayerCurrent, dbChapterCurrent } = props;
  /** TABLE REF */
  const { dbLayerNormTableRef, dbLayerNormFeeTableRef } = props;

  /** 定额明细、设置当前定额明细 */
  const { dbLayerNormCurrent, setDbLayerNormCurrent } = props;
  const { dbLayerNormSelection, setDbLayerNormSelection } = props;

  /** 当前层级 ID */
  const layerId = dbLayerCurrent?.id || '';
  /** 当前章节 数据库 ID */
  const dbId = dbChapterCurrent?.dbId || '';
  /** 当前章节 章节 ID */
  const chapterId = dbChapterCurrent?.id || '';

  /** 全费用定额测算表 设置当前章节取费文件 */
  const DbFeeSetByChapterTrigger = (
    <Button className="ButtonPrimary">
      <MenuOutlined /> 设置当前章节取费文件
    </Button>
  );
  /** 全费用定额测算表 设置当前章节取费文件 触发方法 */
  const dbFeeSetByChapterTriggerControl = async () =>
    FET.fetchDbFeeSetByChapterTriggerControl(dbChapterCurrent);

  /** 全费用定额测算表 设置当前章节取费文件 保存方法 */
  const dbFeeSetByChapterOnSubmit = async (p?: DbFeeDirectoryItem) =>
    FET.fetchDbFeeSetByChapter(
      p,
      dbChapterCurrent,
      dbLayerCurrent,
      dbLayerNormTableRef,
      dbLayerNormFeeTableRef,
    );

  /** 全费用定额测算表 设置当前章节取费文件 */
  const DbFeeSetByNormTrigger = (
    <Button className="EditButton">
      <MenuOutlined /> 设置选中定额取费文件
    </Button>
  );
  /** 全费用定额测算表 设置当前章节取费文件 触发方法 */
  const dbFeeSetByNormTriggerControl = async () =>
    FET.fetchDbFeeSetByNormTriggerControl(dbLayerNormCurrent, dbLayerNormSelection);

  /** 全费用定额测算表 设置当前章节取费文件 保存方法 */
  const dbFeeSetByNormOnSubmit = async (p?: DbFeeDirectoryItem) =>
    FET.fetchDbFeeSetByNorm(
      p,
      dbLayerNormCurrent,
      dbLayerNormSelection,
      dbLayerCurrent,
      dbLayerNormTableRef,
      dbLayerNormFeeTableRef,
    );

  const databaseCurrentDefault: any = { id: dbId };

  const toolbarPrimary = (
    <>
      {/* 按册修改定额取费类型 */}
      {auth('set-fee') && (
        <DbFeeSet
          triggerControl={dbFeeSetByChapterTriggerControl}
          databaseCurrentDefault={databaseCurrentDefault}
          onSubmit={dbFeeSetByChapterOnSubmit}
          trigger={DbFeeSetByChapterTrigger}
        />
      )}
      {/* 批量修改定额取费类型 */}
      {auth('set-fee') && (
        <DbFeeSet
          triggerControl={dbFeeSetByNormTriggerControl}
          databaseCurrentDefault={databaseCurrentDefault}
          onSubmit={dbFeeSetByNormOnSubmit}
          trigger={DbFeeSetByNormTrigger}
        />
      )}
    </>
  );

  /** 全费用定额测算表 */
  const generateTable: BaseTableProps<TYPES.DbLayerNormItem, TYPES.DbLayerNormQuery> = {
    persistenceKey: 'PAGESDATABASELAYERDBLAYERNORMTABLE',
    service: {
      dataSourceRequest: API.dbLayerNormQueryPageInfo,
      params: { dbId, chapterId, layerId },
      manualRequest: !chapterId,
    },
    onSelections: setDbLayerNormSelection,
    onCurrent: setDbLayerNormCurrent,
    actionRef: dbLayerNormTableRef,
    columns: useTableColumns,
    toolbarPrimary,
    search: false,
  };

  return <BaseTable {...generateTable} />;
};
