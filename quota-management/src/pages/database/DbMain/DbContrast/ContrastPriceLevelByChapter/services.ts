/*
 * @Author: SHUANG
 * @Date: 2023-11-08 15:00:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-13 10:17:01
 * @Description: 企业定额修编-造价水平对比-章节对比
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 造价水平对比-章节对比 查询
 * @Date: 2023-11-08 15:19:37
 */
export async function dbChapterQueryPriceDifference(data?: TYPES.DbPriceLevelByChapterQuery) {
  return request<FETCH.Res<TYPES.DbPriceLevelByChapterItem>>(
    '/business/database/db/chapter/queryPriceDifference.action',
    {
      method: 'POST',
      data,
    },
  );
}
