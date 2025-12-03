/*
 * @Author: SHUANG
 * @Date: 2023-11-14 15:54:27
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 14:11:17
 * @Description: 人材机明细重构（材料关联关系设置） - 人材机明细
 */

import { request } from 'umi';
import * as TYPES from './typings';
import { DbMatItem, DbMatQuery } from '../../DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';

/**
 * @Author: SHUANG
 * @Description: 人材机明细重构（材料关联关系设置）- 人材机明细 - 查询
 * @Date: 2023-11-14 15:58:38
 */
export async function matSubsidiaryContentQueryPageInfo(data: FETCH.Req<TYPES.MatSubsidiaryContentQuery>) {
  return request<FETCH.Res<TYPES.MatSubsidiaryContentItem>>(
    '/business/database/db/mat/classify/detail/subsidiary/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 人材机明细重构（材料关联关系设置）- 人材机明细 - 删除
 * @Date: 2023-11-14 15:58:38
 */
export async function matSubsidiaryContentDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/mat/classify/detail/subsidiary/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: MAT目录对应MATCONTENT、选择明细查询
 * @Date: 2023-11-14 16:59:34
 */
export async function matMainQueryPageInfoNotExistSubsidiary(data: FETCH.Req & DbMatQuery) {
  const finalParams: FETCH.Req & DbMatQuery = { ...data };

  if (finalParams?.searchParams && finalParams?.searchParams !== '{}') {
    const searchParams = JSON.parse(finalParams?.searchParams);
    if (searchParams?.scopeLike != '1') {
      delete finalParams?.classifyId;
    }
    delete searchParams?.scopeLike;
    finalParams.searchParams = JSON.stringify(searchParams);
  }

  return request<FETCH.Res<DbMatItem>>(
    `/business/database/db/mat/classify/detail/queryPageInfoNotExistSubsidiary.action`,
    {
      method: 'POST',
      data: { ...finalParams, IsExtStruct: 'Y' },
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 选择人材机添加
 * @Date: 2023-11-14 16:15:57
 */
export async function matSubsidiaryContentSaveByMatIds(data: TYPES.MatSubsidiaryContentSaveMat) {
  return request<FETCH.Res>('/business/database/db/mat/classify/detail/subsidiary/saveByMatIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 同步调整定额基价（根据次材ids进行更新）
 * @Date: 2023-11-14 18:26:27
 */
export async function matSubsidiaryUpdateMatPriceBySubsidiaryIds(data: { subsidiaryIds: string[] }) {
  return request<FETCH.Res>(
    '/business/database/db/mat/classify/detail/subsidiary/updateMatPriceBySubsidiaryIds.action',
    {
      method: 'POST',
      data,
    },
  );
}
