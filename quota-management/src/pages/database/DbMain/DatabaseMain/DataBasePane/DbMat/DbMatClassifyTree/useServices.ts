/*
 * @Author: SHUANG
 * @Date: 2023-10-20 10:00:09
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 18:48:14
 * @Description: 定额库(人材机 机械台班 混凝土配合比)  目录
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: Mat目录查询
 * @Date: 2023-10-20 10:27:27
 */
async function dbMatClassifyQueryTreeNodeAll(data: FETCH.Req<TYPES.DbMatClassifyQuery>) {
  return request<FETCH.Res<TYPES.DbMatClassifyItem>>(
    '/business/database/db/mat/classify/queryTreeNodeAll.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: Mat目录新增
 * @Date: 2023-10-20 10:29:02
 */
async function dbMatClassifySave(data: TYPES.DbMatClassifySaveParams) {
  return request<FETCH.Res>('/business/database/db/mat/classify/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: Mat目录删除
 * @Date: 2023-10-20 10:29:54
 */
async function dbMatClassifyDeleteByIds(data: FETCH.UpStatus, databaseCurrent?: { id?: string }) {
  return request<FETCH.Res>('/business/database/db/mat/classify/deleteByIds.action', {
    method: 'POST',
    data: { ...data, dbId: databaseCurrent?.id || '' },
  });
}

export default () => {
  return { dbMatClassifyQueryTreeNodeAll, dbMatClassifyDeleteByIds, dbMatClassifySave };
};
