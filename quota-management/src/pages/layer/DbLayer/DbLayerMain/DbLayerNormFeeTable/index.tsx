/*
 * @Author: SHUANG
 * @Date: 2023-11-17 17:57:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 18:09:55
 * @Description: 全费用定额测算-定额明细-取费明细表
 */

import DbFeeDetailTable from '@/pages/database/DbFee/DbFeeDetailTable';
import { BaseTableProps } from 'jd-framework-web/package/components';
import { DbFeeDetailItem } from '@/pages/database/DbFee/DbFeeDetailTable/typings';

import useDbFeeDetailTableColumns from '@/pages/database/DbFee/DbFeeDetailTable/useTableColumns';
import DbLayerNormFeeExpTable from '../DbLayerNormFeeExpTable';
import { DbLayerProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

export default (props: DbLayerProps) => {
  /** 当前层级、当前定额明细 */
  const { dbLayerNormFeeTableRef } = props;
  const { dbLayerCurrent, dbLayerNormCurrent } = props;
  const dbFeeDirectoryCurrent: any = { dbId: dbLayerNormCurrent?.dbId };

  /** 当前层级 ID */
  const layerId = dbLayerCurrent?.id || '';
  /** 当前定额明细 数据库 ID */
  const dbId = dbLayerNormCurrent?.dbId || '';
  /** 当前定额明细 章节 ID */
  const chapterId = dbLayerNormCurrent?.chapterId || '';
  /** 当前定额明细 定额 ID */
  const normId = dbLayerNormCurrent?.id || '';

  /** 定额信息明细 定额对应参数 重写 SERVICE */
  const dbFeeDetailTableServiceConfig: BaseTableProps<DbFeeDetailItem, TYPES.DbLayerNormFeeQuery>['service'] =
    {
      dataSourceRequest: API.dbLayerNormFeeQueryPageInfo,
      params: { dbId, chapterId, layerId, normId },
      manualRequest: !normId,
    };

  return (
    <DbFeeDetailTable
      toolbarSlot={<DbLayerNormFeeExpTable dbLayerNormCurrent={dbLayerNormCurrent} />}
      dbFeeDetailTableServiceConfig={dbFeeDetailTableServiceConfig}
      dbFeeDetailTableColumns={useDbFeeDetailTableColumns({ readonly: true })?.filter(
        (item) => item?.dataIndex !== 'baseFeeRate' && item?.dataIndex !== 'feeRateQ',
      )}
      dbFeeDirectoryCurrent={dbFeeDirectoryCurrent}
      dbFeeDetailTableRef={dbLayerNormFeeTableRef}
      readonly={true}
    />
  );
};
