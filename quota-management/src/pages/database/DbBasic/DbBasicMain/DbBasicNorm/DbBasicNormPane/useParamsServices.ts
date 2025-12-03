/*
 * @Author: SHUANG
 * @Date: 2024-03-04 15:55:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 16:01:19
 * @Description: 基础企业定额维护-定额参数
 */

import { request } from 'umi';
import * as DBNORMPARAMTYPES from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormParams/typings';
import { DbBasicNormQuery } from '../../../typings';

/**
 * @Author: SHUANG
 * @Description: 定额参数查询
 * @Date: 2024-03-04 15:58:36
 */
async function dbBasicNormParamsQueryPagenfo(
  data: FETCH.Req<DbBasicNormQuery & DBNORMPARAMTYPES.DbNormParamsQuery>,
) {
  return request<FETCH.Res<DBNORMPARAMTYPES.DbNormParamsItem>>(
    '/database/maintenance/db/norm/params/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 定额参数新增空行
 * @Date: 2024-03-04 15:58:43
 */
async function dbBasicNormParamsSaveBlankRow(data: DbBasicNormQuery & DBNORMPARAMTYPES.DbNormParamsQuery) {
  return request<FETCH.Res>('/database/maintenance/db/norm/params/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额参数更新行
 * @Date: 2024-03-04 15:58:50
 */
async function dbBasicNormParamsUpdateRow(
  data: FETCH.CellEditReq,
  params?: DbBasicNormQuery & DBNORMPARAMTYPES.DbNormParamsQuery,
) {
  return request<FETCH.Res>('/database/maintenance/db/norm/params/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额参数删除
 * @Date: 2024-03-04 15:58:57
 */
async function dbBasicNormParamsDeleteByIds(data: FETCH.UpStatus & DbBasicNormQuery) {
  return request<FETCH.Res>('/database/maintenance/db/norm/params/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

export default () => ({
  dbNormParamsQueryPagenfo: dbBasicNormParamsQueryPagenfo,
  dbNormParamsSaveBlankRow: dbBasicNormParamsSaveBlankRow,
  dbNormParamsUpdateRow: dbBasicNormParamsUpdateRow,
  dbNormParamsDeleteByIds: dbBasicNormParamsDeleteByIds,
});
