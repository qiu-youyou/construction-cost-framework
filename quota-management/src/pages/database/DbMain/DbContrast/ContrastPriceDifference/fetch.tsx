/*
 * @Author: SHUANG
 * @Date: 2023-11-08 14:55:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 10:55:36
 * @Description: 企业定额修编-价格差异对比
 */

import { Modal } from 'antd';
import { dbNormQueryPriceDifference } from './services';
import { DatabaseDbItem } from '../../DatabaseMain/typings';

/**
 * @Author: SHUANG
 * @Description: 对比前 只能勾选两条数据
 * @Date: 2023-11-08 14:56:04
 */
export const determineTriggerControl: (dbSelection?: DatabaseDbItem[]) => Promise<FETCH.Res> = async (
  dbSelection,
) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
  if (dbSelection?.length !== 2) {
    {
      Modal.warning({ title: '继续操作', content: `请勾选两项数据进行对比！` });
      return errorReturn;
    }
  }
  return { ...errorReturn, status: 'SUCCESS', rows: [] };
};

/**
 * @Author: SHUANG
 * @Description: 获取价差对比数据
 * @Date: 2023-11-10 15:54:43
 * @name params 默认查询参数
 * @name dbSelection 已经勾选的 数据库
 */
export const fetchDbNormQueryPriceDifference = async (
  params: FETCH.Req,
  dbSelection?: DatabaseDbItem[],
  setDbInfo?: React.Dispatch<React.SetStateAction<{ current?: string; source?: string } | undefined>>,
) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
  if (!dbSelection?.length) return errorReturn;

  /** 携带 IDS 获取数据 */
  const beforeDbId = dbSelection?.[0]?.id;
  const afterDbId = dbSelection?.[1]?.id;
  const res: any = await dbNormQueryPriceDifference({ ...params, beforeDbId, afterDbId });
  if (res.status !== 'SUCCESS') return errorReturn;

  setDbInfo?.({ current: res?.rows?.current, source: res?.rows?.source });

  return { ...res, rows: res.rows?.list };
};
