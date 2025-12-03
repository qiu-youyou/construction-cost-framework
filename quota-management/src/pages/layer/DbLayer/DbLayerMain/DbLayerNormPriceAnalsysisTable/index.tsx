/*
 * @Author: SHUANG
 * @Date: 2023-11-17 18:28:33
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 15:58:39
 * @Description: 全费用定额测算-定额明细-单价分析表
 */

import { DbLayerProps } from '../typings';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import { DbLayerNormFeeQuery } from '../DbLayerNormFeeTable/typings';

/** 使用综合单价 单价分析表字段 */
import useTableColumns from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/UnitPriceAnalysisTable/useTableColumns';
import { UnitPriceAnalysisItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/UnitPriceAnalysisTable/typings';

import * as API from './services';

export default (props: DbLayerProps) => {
  /** 当前层级、当前定额明细 */
  const { dbLayerCurrent, dbLayerNormCurrent } = props;

  /** 当前层级 ID */
  const layerId = dbLayerCurrent?.id || '';
  /** 当前定额明细 数据库 ID */
  const dbId = dbLayerNormCurrent?.dbId || '';
  /** 当前定额明细 章节 ID */
  const chapterId = dbLayerNormCurrent?.chapterId || '';
  /** 当前定额明细 定额 ID */
  const normId = dbLayerNormCurrent?.id || '';

  /** 单价分析表 */
  const generateTable: BaseTableProps<UnitPriceAnalysisItem, DbLayerNormFeeQuery> = {
    persistenceKey: 'PAGESDATABASELAYERDBLAYERNORMFEEANALSYSISTABLE',
    service: {
      dataSourceRequest: API.dbLayerNormPriceAnalysisQueryPageInfo,
      params: { dbId, chapterId, layerId, normId },
      manualRequest: !normId,
    },
    columns: useTableColumns,
    rowSelection: false,
    virtual: false,
    search: false,
  };

  return <BaseTable {...generateTable} />;
};
