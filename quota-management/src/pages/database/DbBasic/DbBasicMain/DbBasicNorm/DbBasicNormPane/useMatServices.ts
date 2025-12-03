/*
 * @Author: SHUANG
 * @Date: 2024-03-04 16:39:47
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 17:22:55
 * @Description:
 */
import { request } from 'umi';
import * as DBNORMMATTYPES from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormMatContent/typings';
import { DbBasicNormQuery } from '../../../typings';
import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';

/**
 * @Author: SHUANG
 * @Description: 定额 人材机含量查询
 * @Date: 2023-10-25 10:55:36
 */
export async function dbBasicNormMatContentQueryPageInfo(
  data: FETCH.Req<DbBasicNormQuery & DBNORMMATTYPES.DbNormMatContentQuery>,
) {
  return request<FETCH.Res<DBNORMMATTYPES.DbNormMatContentItem>>(
    '/database/maintenance/db/mat/queryPageInfo.action',
    {
      method: 'POST',
      data: { ...data, parentId: data?.parentId || 0 },
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 定额 人材机含量更新行
 * @Date: 2023-10-25 10:57:55
 */
export async function dbBasicNormMatContentUpdateRow(
  data: FETCH.CellEditReq & DbBasicNormQuery & DBNORMMATTYPES.DbNormMatUpdateRowParams,
) {
  return request<FETCH.Res>('/database/maintenance/db/mat/updateRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description 定额 人材机含量删除 ByIds
 * @Date: 2023-10-25 10:59:56
 */
async function dbBasicNormMatContentDeleteByIds(data: FETCH.UpStatus & DbBasicNormQuery) {
  return request<FETCH.Res<DBNORMMATTYPES.DbNormMatContentItem>>(
    '/database/maintenance/db/mat/deleteByIds.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: MAT目录对应MATCONTENT、选择明细查询
 * @Date: 2023-10-23 11:30:10
 */
export async function dbBasicmatMainQueryPageInfoNotExistsNormMat(
  data: FETCH.Req & DbBasicNormQuery & DBNORMMATTYPES.MatMainNotExistsNormMatQuery,
) {
  const finalParams: FETCH.Req & DBNORMMATTYPES.MatMainNotExistsNormMatQuery = {
    ...data,
  };

  if (finalParams?.searchParams && finalParams?.searchParams !== '{}') {
    const searchParams = JSON.parse(finalParams?.searchParams);
    if (searchParams?.scopeLike != '1') {
      delete finalParams?.classifyId;
    }
    delete searchParams?.scopeLike;
    finalParams.searchParams = JSON.stringify(searchParams);
  }

  return request<FETCH.Res<DbMatItem>>(
    `/database/maintenance/db/mat/classify/detail/queryPageInfoNotExistsNormMat.action`,
    {
      method: 'POST',
      data: finalParams,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 定额 选择人材机明细添加到含量
 * @Date: 2023-10-25 11:01:29
 */
export async function dbBasicNormMatContentSaveSelectMatDetail(
  data: DbBasicNormQuery & DBNORMMATTYPES.DbNormMatContentSaveSelectMatDetailsParams,
) {
  return request<FETCH.Res>('/database/maintenance/db/mat/saveByRcjDetailIds.action', {
    method: 'POST',
    data,
  });
}

export default () => ({
  dbNormMatContentQueryPageInfo: dbBasicNormMatContentQueryPageInfo,
  dbNormMatContentUpdateRow: dbBasicNormMatContentUpdateRow,
  dbNormMatContentDeleteByIds: dbBasicNormMatContentDeleteByIds,
  matMainQueryPageInfoNotExistsNormMat: dbBasicmatMainQueryPageInfoNotExistsNormMat,
  dbNormMatContentSaveSelectMatDetail: dbBasicNormMatContentSaveSelectMatDetail,
});
