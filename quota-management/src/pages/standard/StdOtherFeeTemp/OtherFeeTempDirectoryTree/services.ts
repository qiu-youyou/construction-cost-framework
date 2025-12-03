/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:16:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 11:22:27
 * @Description: 标准库-其他费用模板-目录
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准库-其他费用模板-目录 查询
 * @Date: 2023-11-10 11:20:33
 */
export async function otherFeeTempDirectoryQueryTreeNodeAll(data: TYPES.OtherFeeTempDirectoryQuery) {
  return request<FETCH.Res<TYPES.OtherFeeTempDirectoryItem>>(
    '/business/database/other/sum/directory/queryTreeNodeAll.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准库-其他费用模板-目录 保存
 * @Date: 2023-11-10 11:21:27
 */
export async function otherFeeTempDirectorySave(data: TYPES.OtherFeeTempDirectorySaveParams) {
  return request<FETCH.Res<TYPES.OtherFeeTempDirectoryItem>>(
    '/business/database/other/sum/directory/save.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准库-其他费用模板-目录 删除 ByIds
 * @Date: 2023-11-10 11:21:59
 */
export async function otherFeeTempDirectoryDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res<TYPES.OtherFeeTempDirectoryItem>>(
    '/business/database/other/sum/directory/deleteByIds.action',
    {
      method: 'POST',
      data,
    },
  );
}
