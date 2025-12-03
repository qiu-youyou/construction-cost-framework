/*
 * @Author: SHUANG
 * @Date: 2024-03-05 17:07:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-06 09:51:00
 * @Description: 基础企业定额维护 - 人材机、混凝土、机械台班 明细表
 */

import { request } from 'umi';
import * as DBMATTYPES from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatContentTable/typings';
import { DbBasicNormQuery } from '../../../typings';
import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';

/**
 * @Author: SHUANG
 * @Description: MAT明细对应含量查询
 * @Date: 2023-10-21 16:17:57
 */
async function dbBasicMatContentQueryPageInfo(
  data: FETCH.Req<DbBasicNormQuery & DBMATTYPES.DbMatContentQuery>,
) {
  return request<FETCH.Res<DBMATTYPES.DbMatContentItem>>(
    '/database/maintenance/db/classify/detail/mat/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: MAT明细对应含量更新行
 * @Date: 2023-10-21 16:18:47
 */
async function dbBasicMatContentUpdateRow(data: FETCH.CellEditReq, params?: DBMATTYPES.DbMatContentQuery) {
  return request<FETCH.Res>('/database/maintenance/db/classify/detail/mat/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT明细对应含量删除 ByIds
 * @Date: 2023-10-21 16:19:24
 */
async function dbBasicMatContentDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/database/maintenance/db/classify/detail/mat/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT目录对应MATCONTENT、选择明细查询
 * @Date: 2023-10-23 11:30:10
 */
export async function dbBasicMatMainQueryPageInfoNotExistsMat(
  data: FETCH.Req & DBMATTYPES.MatMainNotExistsMatQuery,
) {
  const finalParams: FETCH.Req & DBMATTYPES.MatMainNotExistsMatQuery = {
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
    `/database/maintenance/db/mat/classify/detail/queryPageInfoNotExistsMat.action`,
    {
      method: 'POST',
      data: finalParams,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 人材机选择添加到含量
 * @Date: 2023-10-23 10:22:01
 */
export async function dbBasicMatContentSaveSelectMatDetail(data: DBMATTYPES.DbMatContentSaveSelectMatDetailParams) {
  return request<FETCH.Res>('/database/maintenance/db/classify/detail/mat/selectRcjDetail.action', {
    method: 'POST',
    data,
  });
}

export default () => {
  return {
    dbMatContentQueryPageInfo: dbBasicMatContentQueryPageInfo,
    dbMatContentUpdateRow: dbBasicMatContentUpdateRow,
    dbMatContentDeleteByIds: dbBasicMatContentDeleteByIds,
    matMainQueryPageInfoNotExistsMat: dbBasicMatMainQueryPageInfoNotExistsMat,
    dbMatContentSaveSelectMatDetail: dbBasicMatContentSaveSelectMatDetail,
  };
};
