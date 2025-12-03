/*
 * @Author: SHUANG
 * @Date: 2023-10-25 10:27:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 16:41:13
 * @Description: 定额库 定额明细人材机含量表
 */
import { request } from 'umi';
import * as TYPES from './typings';
import { DbMatItem } from '../../../DbMat/DbMatMainTable/typings';

/**
 * @Author: SHUANG
 * @Description: 定额 人材机含量查询
 * @Date: 2023-10-25 10:55:36
 */
export async function dbNormMatContentQueryPageInfo(data: FETCH.Req<TYPES.DbNormMatContentQuery>) {
  return request<FETCH.Res<TYPES.DbNormMatContentItem>>(
    '/business/database/db/norm/mat/queryPageInfo.action',
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
async function dbNormMatContentUpdateRow(data: FETCH.CellEditReq & TYPES.DbNormMatUpdateRowParams) {
  return request<FETCH.Res>('/business/database/db/norm/mat/updateRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description 定额 人材机含量删除 ByIds
 * @Date: 2023-10-25 10:59:56
 */
async function dbNormMatContentDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res<TYPES.DbNormMatContentItem>>('/business/database/db/norm/mat/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT目录对应MATCONTENT、选择明细查询
 * @Date: 2023-10-23 11:30:10
 */
export async function matMainQueryPageInfoNotExistsNormMat(
  data: FETCH.Req & TYPES.MatMainNotExistsNormMatQuery,
) {
  const finalParams: FETCH.Req & TYPES.MatMainNotExistsNormMatQuery = {
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
    `/business/database/db/mat/classify/detail/queryPageInfoNotExistsNormMat.action`,
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
async function dbNormMatContentSaveSelectMatDetail(data: TYPES.DbNormMatContentSaveSelectMatDetailsParams) {
  return request<FETCH.Res>('/business/database/db/norm/mat/saveByRcjDetailIds.action', {
    method: 'POST',
    data,
  });
}

export default () => ({
  dbNormMatContentQueryPageInfo,
  dbNormMatContentUpdateRow,
  dbNormMatContentDeleteByIds,
  matMainQueryPageInfoNotExistsNormMat,
  dbNormMatContentSaveSelectMatDetail,
});
