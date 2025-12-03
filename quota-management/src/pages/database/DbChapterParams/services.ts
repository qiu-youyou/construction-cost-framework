/*
 * @Author: SHUANG
 * @Date: 2023-11-02 15:43:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-02 18:30:10
 * @Description: 企业定额库 - 章节参数
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 章节参数设置 查询
 * @Date: 2023-11-02 15:45:12
 */
export async function dbChapterParamsQueryPageInfo(data: FETCH.Req<TYPES.DbChapterParamsQuery>) {
  return request<FETCH.Res<TYPES.DbChapterParamsItem>>(
    '/business/database/db/chapter/params/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 章节参数设置 保存
 * @Date: 2023-11-02 15:46:48
 */
export async function dbChapterParamsSave(data: TYPES.DbChapterParamsSave) {
  return request<FETCH.Res>('/business/database/db/chapter/params/save.action', {
    method: 'POST',
    data,
  });
}
