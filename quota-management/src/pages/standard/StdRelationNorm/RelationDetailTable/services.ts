/*
 * @Author: SHUANG
 * @Date: 2023-11-06 10:36:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-07 14:22:22
 * @Description: 清单关联定额映射库 - 清单
 */
import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 清单关联定额映射库 清单查询
 * @Date: 2023-10-30 10:23:55
 */
export async function relationDetailQueryTreeAll(data: FETCH.Req<TYPES.RelationDetailQuery>) {
  return request<FETCH.Res<TYPES.RelationDetailItem>>(
    '/business/database/standard/detail/relation/detail/queryTreeAll.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 清单关联定额映射库 查询成本信息系统分部分项目录
 * @Date: 2023-11-06 10:37:48
 */
export async function relationDetailQueryPageListByBranchDirectory(data: FETCH.Req) {
  return request<FETCH.Res<TYPES.RelationSubItemByCostSystemItem>>(
    '/business/database/standard/detail/relation/detail/queryPageListByBranchDirectory.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 清单关联定额映射库 导入清单
 * @Date: 2023-11-06 10:40:32
 */
export async function relationDetailSyncListNormDetail(data: TYPES.RelationDetailImportParams) {
  return request<FETCH.Res>('/business/database/standard/detail/relation/detail/syncListNormDetail.action', {
    method: 'POST',
    data,
  });
}

/**
 * @Author: SHUANG
 * @Description: 清单关联定额映射库 清空处理
 * @Date: 2023-11-06 10:41:53
 */
export async function relationDetailDeleteByBusinessId(data: TYPES.RelationDetailQuery) {
  return request<FETCH.Res<TYPES.RelationSubItemByCostSystemItem>>(
    '/business/database/standard/detail/relation/detail/deleteByBusinessId.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 清单关联定额映射库 查询项目特征
 * @Date: 2023-11-07 14:17:37
 */
export async function relationDetailPropertiesQueryPageInfo(data: TYPES.RelationDetailPropertiesQueryParams) {
  return request<FETCH.Res<TYPES.RelationDetailPropertiesItem>>(
    '/business/database/standard/detail/relation/properties/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}
