/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:50:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-16 19:01:13
 * @Description: 标准综合单价库 - 清单特征
 */

import { request } from 'umi';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单特征 查询
 * @Date: 2023-11-16 18:50:07
 */
export async function unitPricePropertiesQueryPageInfo(data: FETCH.Req<TYPES.UnitPricePropertiesQuery>) {
  return request<FETCH.Res<TYPES.UnitPricePropertiesItem>>(
    '/business/database/standard/comprehensive/unit/price/properties/queryPageInfo.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单特征 新增
 * @Date: 2023-11-16 18:50:07
 */
export async function unitPricePropertiesSaveBlankRow(data: TYPES.UnitPricePropertiesQuery) {
  return request<FETCH.Res>(
    '/business/database/standard/comprehensive/unit/price/properties/saveBlankRow.action',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单特征 行编辑
 * @Date: 2023-11-16 18:50:07
 */
export async function unitPricePropertiesUpdateRow(
  data: FETCH.CellEditReq,
  params?: unknown,
  cellParams?: unknown,
  unitPricePropertiesCurrent?: TYPES.UnitPricePropertiesItem,
) {
  const unitPriceId = unitPricePropertiesCurrent?.unitPriceId || '';
  const unitPriceDbId = unitPricePropertiesCurrent?.unitPriceDbId || '';
  const currentParams = { unitPriceDbId, unitPriceId };
  return request<FETCH.Res>(
    '/business/database/standard/comprehensive/unit/price/properties/updateRow.action',
    {
      method: 'POST',
      data: { ...data, ...currentParams },
    },
  );
}

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单特征 删除
 * @Date: 2023-11-16 18:50:07
 */
export async function unitPricePropertiesDeleteByIds(data: FETCH.UpStatus) {
  return request<FETCH.Res>(
    '/business/database/standard/comprehensive/unit/price/properties/deleteByIds.action',
    {
      method: 'POST',
      data,
    },
  );
}
