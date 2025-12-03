/*
 * @Author: SHUANG
 * @Date: 2023-08-14 16:32:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 18:02:08
 * @Description:
 */

import { request } from 'umi';
import * as TYPES from './typings';
import { queryDictItemByClassCode } from '../../../services/system';

/** 当前模块字典 */
let valueEnums: Partial<SYS.DictDefine>;
export async function valueEnumsRequest(key: keyof SYS.DictDefine) {
  if (!valueEnums) {
    valueEnums = {};
    const queryKeys: (keyof SYS.DictDefine)[] = ['WORK_STATUS', 'BIZ_TYPE'];
    const res = await queryDictItemByClassCode(queryKeys);
    valueEnums = res.rows;
  }
  return valueEnums?.[key];
}

/**
 * @Author: SHUANG
 * @Description: 查询反馈工单列表
 * @Date: 2023-08-14 16:35:35
 */
export async function sysWorkQueryPageInfo(data?: FETCH.Req) {
  return request<FETCH.Res<TYPES.WorkListItem>>('/sys/work/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 反馈工单新增/编辑
 * @Date: 2023-08-14 16:35:59
 */
export async function sysWorkSave(data: TYPES.WorkListItem) {
  return request<FETCH.Res>('/sys/work/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 反馈工单删除
 * @Date: 2023-08-14 16:37:14
 */
export async function sysWorkDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Row>('/sys/work/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 查询某一项工单
 * @Date: 2023-08-14 16:38:12
 */
export async function sysWorkQueryOne(data: { id: string }) {
  return request<FETCH.Row>('/sys/work/queryOne.action', {
    method: 'POST',
    data,
  });
}
