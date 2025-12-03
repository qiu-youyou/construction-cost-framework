/*
 * @Author: SHUANG
 * @Date: 2023-10-21 16:17:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-26 11:09:32
 * @Description: 定额库(人材机 机械台班 混凝土配合比)明细对应含量
 */

import { request } from 'umi';
import * as TYPES from './typings';
import { DbMatItem } from '../DbMatMainTable/typings';

/**
 * @Author: SHUANG
 * @Description: MAT明细对应含量查询
 * @Date: 2023-10-21 16:17:57
 */
async function dbMatContentQueryPageInfo(data: FETCH.Req<TYPES.DbMatContentQuery>) {
  return request<FETCH.Res<TYPES.DbMatContentItem>>(
    '/business/database/db/mat/classify/detail/mat/queryPageInfo.action',
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
async function dbMatContentUpdateRow(data: FETCH.CellEditReq, params?: TYPES.DbMatContentQuery) {
  return request<FETCH.Res>('/business/database/db/mat/classify/detail/mat/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT明细对应含量删除 ByIds
 * @Date: 2023-10-21 16:19:24
 */
async function dbMatContentDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/mat/classify/detail/mat/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT目录对应MATCONTENT、选择明细查询
 * @Date: 2023-10-23 11:30:10
 */
export async function matMainQueryPageInfoNotExistsMat(data: FETCH.Req & TYPES.MatMainNotExistsMatQuery) {
  const finalParams: FETCH.Req & TYPES.MatMainNotExistsMatQuery = {
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
    `/business/database/db/mat/classify/detail/queryPageInfoNotExistsMat.action`,
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
async function dbMatContentSaveSelectMatDetail(data: TYPES.DbMatContentSaveSelectMatDetailParams) {
  return request<FETCH.Res>('/business/database/db/mat/classify/detail/mat/selectRcjDetail.action', {
    method: 'POST',
    data,
  });
}

export default () => {
  return {
    dbMatContentQueryPageInfo,
    dbMatContentUpdateRow,
    dbMatContentDeleteByIds,
    matMainQueryPageInfoNotExistsMat,
    dbMatContentSaveSelectMatDetail,
  };
};
