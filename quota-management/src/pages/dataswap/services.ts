/*
 * @Author: SHUANG
 * @Date: 2024-04-18 15:28:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 15:57:41
 * @Description: 同步接口数据
 */
import { request } from 'umi';

/**
 * @Author: SHUANG
 * @Description: 同步数据字典(业务类型、土壤类别、项目类型)
 * @Date: 2024-04-18 15:50:57
 */
export async function dataswapSyncSysDict() {
  return request<FETCH.Res>('/dataswap/syncSysDictItems.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 同步国家省份城市
 * @Date: 2024-04-18 15:51:24
 */
export async function dataswapSyncSysArea() {
  return request<FETCH.Res>('/dataswap/syncSysArea.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 同步用户与组织机构
 * @Date: 2024-04-18 15:51:49
 */
export async function dataswapSyncSysOrgAndUser() {
  return request<FETCH.Res>('/dataswap/syncSysOrgAndUser.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 接口功能 同步WBS
 * @Date: 2024-04-18 15:29:46
 */
export async function dataswapSyncWbs() {
  return request<FETCH.Res>('/dataswap/syncWbs.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 同步行业分类
 * @Date: 2024-04-18 15:52:14
 */
export async function dataswapSyncTradeClassify() {
  return request<FETCH.Res>('/dataswap/syncTradeClassify.action', {
    method: 'POST',
  });
}

/**
 * @Author: SHUANG
 * @Description: 同步项目特征
 * @Date: 2024-04-18 15:52:44
 */
export async function dataswapSyncProjectFeature() {
  return request<FETCH.Res>('/dataswap/syncProjectFeature.action', {
    method: 'POST',
  });
}
