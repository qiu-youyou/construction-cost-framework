/*
 * @Author: SHUANG
 * @Date: 2023-11-02 10:16:58
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 11:50:03
 * @Description: Mat Main 人材机类型 - 查看配合比
 */

import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import { DbNormMatContentItem, DbNormMatContentQuery } from '../typings';
import { dbNormMatContentQueryPageInfo } from '../useServices';
import useTableColumns from './useTableColumns';

/** 已经勾选的MAT明细 */
type Props = {
  dbNormMatContentCurrent?: DbNormMatContentItem;
  /** 查看配合比 service */
  mixProportionServiceConfig?: BaseTableProps['service'];
  /** 查看配合比 重写 service */
  mixProportionServiceReWrite?: BaseTableProps['service'];
};

export default (props: Props) => {
  const { dbNormMatContentCurrent } = props;

  const { mixProportionServiceConfig } = props;

  /** 库ID 章节ID 定额明细ID */
  const dbId = dbNormMatContentCurrent?.dbId || '';
  const parentId = dbNormMatContentCurrent?.id || '';
  const normId = dbNormMatContentCurrent?.normId || '';
  const chapterId = dbNormMatContentCurrent?.chapterId || '';

  const generateTable: BaseTableProps<DbNormMatContentItem, DbNormMatContentQuery> = {
    persistenceKey: 'PAGESDATABASEDBNORMMATCONTENTTABLE',
    service: {
      dataSourceRequest: mixProportionServiceConfig?.dataSourceRequest
        ? async (p) => await mixProportionServiceConfig?.dataSourceRequest?.({ ...p, parentId })
        : (dbNormMatContentQueryPageInfo as any),
      params: mixProportionServiceConfig?.params
        ? { ...mixProportionServiceConfig.params, dbId, chapterId, normId, parentId }
        : { dbId, chapterId, normId, parentId },
      manualRequest: mixProportionServiceConfig?.manualRequest || !normId,
      ...props.mixProportionServiceReWrite,
    },
    columns: useTableColumns,
    rowSelection: false,
    virtual: false,
    search: false,
  };

  return (
    <section style={{ height: 420 }}>
      <BaseTable {...generateTable} />
    </section>
  );
};
