/*
 * @Author: SHUANG
 * @Date: 2024-03-14 09:18:39
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-19 16:15:37
 * @Description: 工程造价-工程量清单编制-综合单价 清单特征
 */
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import UnitPricePropertiesTable from '@/pages/standard/StdUnitPrice/UnitPricePropertiesTable';
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';

import * as API from './services';
import { ProductUnitPricePropertiesQuery } from './typings';

export type Props = {
  unitPriceDetailTableRef?: TableActionType;
  unitPriceDetailCurrent?: UnitPriceDetailItem;
  readonly?: boolean;
};

export default (props: Props) => {
  const { readonly } = props;
  /** 综合单价明细表 当前选中 */
  const { unitPriceDetailCurrent } = props;

  const { unitPriceDetailTableRef } = props;

  /** 工程ID 阶段ID 单价ID  */
  const unitPriceId = unitPriceDetailCurrent?.id || '';
  const projectId = unitPriceDetailCurrent?.projectId || '';
  const stageId = unitPriceDetailCurrent?.stageId || '';

  const serviceParams = { unitPriceId, projectId, stageId };

  /** 行编辑方法 */
  const fetchProductUnitPricePropertiesSaveBlankRow = async (
    data?: FETCH.Req,
    params?: ProductUnitPricePropertiesQuery,
  ) => {
    const res = await API.productUnitPricePropertiesSaveBlankRow({ ...data, ...params });
    if (res?.status === 'SUCCESS') unitPriceDetailTableRef?.current?.reload?.();
    return res;
  };

  /** 清单特征表 重写 */
  const UnitPricePropertiesTableProps: Partial<BaseTableProps> = {
    toolbarAuthority: readonly,
    service: {
      cellEditSaveRequest: fetchProductUnitPricePropertiesSaveBlankRow,
      dataSourceRequest: API.productUnitPricePropertiesQueryPageInfo,
      manualRequest: !unitPriceId,
      params: serviceParams,
    },
    toolbar: {
      plusLine: { onSubmit: API.productUnitPricePropertiesSaveBlankRow },
      deleted: { onSubmit: API.productUnitPricePropertiesDeleteByIds },
    },
    cellEditable: !readonly,
    rowSelection: {},
  };

  return <UnitPricePropertiesTable tableProps={UnitPricePropertiesTableProps} {...props} />;
};
