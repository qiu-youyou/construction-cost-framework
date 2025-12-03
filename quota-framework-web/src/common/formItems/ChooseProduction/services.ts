/*
 * @Author: SHUANG
 * @Date: 2023-05-29 10:39:01
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-05-29 11:49:55
 * @Description:
 */
import { request } from 'umi';

export type UserBaseCodeListItem = {
  id?: string;
  productionBaseCode: string; // 公司编码
  productionBaseName: string; // 公司名称
  billStatus: string; // 状态
};

export type UserBaseCodeUpStatus = {
  id: string; // 用户ID
  productionBaseCodeList: string; // 公司编码
  billStatus?: string | 4 | 3; // 状态
};

/**
 * @Author: SHUANG
 * @Description: 查询人员所属公司
 * @Date: 2023-05-29 10:39:19
 */
export async function userBaseCodeQueryPageInfo(data?: FETCH.Req<{ id: string }>) {
  return request<FETCH.Res<UserBaseCodeListItem>>('/sys/business/userbasecode/queryPageInfo.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 增加人员所属公司
 * @Date: 2023-05-29 10:43:07
 */
export async function userBaseCodeSave(data: UserBaseCodeListItem) {
  return request<FETCH.Res>('/sys/business/userbasecode/save.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 所属公司删除
 * @Date: 2023-05-29 10:45:26
 */
export async function userBaseCodeDeleteByIds(data: UserBaseCodeUpStatus) {
  return request<FETCH.Res>('/sys/business/userbasecode/deleteByIds.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 所属公司修改状态
 * @Date: 2023-05-29 10:48:39
 */
export async function userBaseCodeUpdateStatusByIds(data: UserBaseCodeUpStatus) {
  return request<FETCH.Res>('/sys/business/userbasecode/updateStatusByIds.action', {
    method: 'POST',
    data,
  });
}
