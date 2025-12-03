/*
 * @Author: SHUANG
 * @Date: 2023-11-08 14:55:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-24 10:20:31
 * @Description: 企业定额修编-造价水平对比-按章节对比
 */

import { DatabaseDbItem } from '../../DatabaseMain/typings';
import { dbChapterQueryPriceDifference } from './services';

/**
 * @Author: SHUANG
 * @Description: 获取按章节对比数据
 * @Date: 2023-11-13 10:14:55
 * @name params 默认查询参数
 * @name dbSelection 已经勾选的 数据库
 * @name setDbInfo 保存查询到的信息
 */
export const fetchDbChapterQueryPriceDifference = async (
  params: FETCH.Req,
  dbSelection?: DatabaseDbItem[],
  setDbInfo?: React.Dispatch<React.SetStateAction<{ current?: string; source?: string } | undefined>>,
) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
  if (!dbSelection?.length) return errorReturn;

  /** 携带 IDS 获取数据 */
  const beforeDbId = dbSelection?.[0]?.id;
  const afterDbId = dbSelection?.[1]?.id;

  const res: any = await dbChapterQueryPriceDifference({ ...params, beforeDbId, afterDbId });
  if (res.status !== 'SUCCESS') return errorReturn;

  setDbInfo?.({ current: res?.rows?.current, source: res?.rows?.source });
  return { ...res, rows: res?.rows?.list };
};
