/*
 * @Author: SHUANG
 * @Date: 2023-10-24 18:06:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 15:45:01
 * @Description: 企业定额维护-定额参数
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 定额参数查询
 * @Date: 2023-10-24 18:15:41
 */
async function dbNormParamsQueryPagenfo(data: FETCH.Req<TYPES.DbNormParamsQuery>) {
  return request<FETCH.Res<TYPES.DbNormParamsItem>>(
    '/business/database/db/norm/params/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 定额参数新增空行
 * @Date: 2023-10-24 18:15:57
 */
async function dbNormParamsSaveBlankRow(data: TYPES.DbNormParamsQuery) {
  return request<FETCH.Res>('/business/database/db/norm/params/saveBlankRow.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额参数更新行
 * @Date: 2023-10-24 18:17:57
 */
async function dbNormParamsUpdateRow(data: FETCH.CellEditReq, params?: TYPES.DbNormParamsQuery) {
  return request<FETCH.Res>('/business/database/db/norm/params/updateRow.action', {
    method: 'POST',
    data: { ...data, ...params },
  });
}

/**
 * @Author: SHUANG
 * @Description: 定额参数删除
 * @Date: 2023-10-24 18:18:53
 */
async function dbNormParamsDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/db/norm/params/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

export default () => ({
  dbNormParamsQueryPagenfo,
  dbNormParamsSaveBlankRow,
  dbNormParamsUpdateRow,
  dbNormParamsDeleteByIds,
});
