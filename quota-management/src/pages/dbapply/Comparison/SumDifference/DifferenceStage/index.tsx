/*
 * @Author: SHUANG
 * @Date: 2024-03-21 11:32:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 18:36:44
 * @Description: 工程造价对比 - 指标汇总对比
 */

import { useState } from 'react';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { DifferenceQuery, DifferenceData } from '../typings';
import { sumStageQueryDifference } from '../services';
import useTableColumns from './useTableColumns';

type Props = { serviceParams: DifferenceQuery };

export default (props: Props) => {
  /** 服务参数 */
  const { serviceParams } = props;

  /** 对比信息 */
  const [differenceInfo, setDifferenceInfo] = useState<{ current?: string; source?: string }>();

  /** 获取数据 */
  const fetchDataSourceRequest: any = async (p: FETCH.Req<DifferenceQuery>) => {
    const res = await sumStageQueryDifference(p);
    setDifferenceInfo?.({ current: res?.rows?.current, source: res?.rows?.source });
    return { ...res, rows: res.rows?.list, total: res.rows?.total };
  };

  /** 计算方法 */
  const fetchCalc = async () => ({ status: 'SUCCESS', message: '计算成功' });

  /** 所选 工程ID */
  const generateTable: BaseTableProps<DifferenceData, DifferenceQuery> = {
    toolbar: { export: { buttonText: '导出`' }, calc: { onSubmit: fetchCalc } },
    persistenceKey: 'PAGES_DBAPPLY_COMPARISON_SUMDIFFERENCE_INDEXTABLE',
    service: { dataSourceRequest: fetchDataSourceRequest, params: serviceParams },
    columns: useTableColumns({ differenceInfo }),
    columnsDynamic: true,
    rowSelection: false,
    search: false,
    rowKey: false,
  };

  return <BaseTable {...generateTable} />;
};
