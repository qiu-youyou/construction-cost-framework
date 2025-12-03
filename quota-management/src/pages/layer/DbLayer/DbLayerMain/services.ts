/*
 * @Author: SHUANG
 * @Date: 2023-11-17 14:37:45
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 16:30:34
 * @Description: 全费用定额测算
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 全费用定额测算 查询
 * @Date: 2023-11-17 15:03:14
 */
export async function dbLayerQueryPageInfo(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.DbLayerItem>>('/business/database/layer/db/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 全费用定额测算 保存
 * @Date: 2023-11-17 15:05:44
 */
export async function dbLayerSave(data: TYPES.DbLayerSave) {
  return request<FETCH.Res>('/business/database/layer/db/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 全费用定额测算 删除 ByIds
 * @Date: 2023-11-17 15:07:15
 */
export async function dbLayerDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>('/business/database/layer/db/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 全费用定额测算 批量修改定额取费类型 (按章节 ｜按定额)
 * @Date: 2023-11-17 16:01:04
 */
export async function dbLayerUpdateNormFeeType(data: FETCH.Req<TYPES.DbLayerUpdateNormFeeType>) {
  return request<FETCH.Res>('/business/database/layer/norm/updateNormFeeType.action', {
    method: 'POST',
    data,
  });
}
