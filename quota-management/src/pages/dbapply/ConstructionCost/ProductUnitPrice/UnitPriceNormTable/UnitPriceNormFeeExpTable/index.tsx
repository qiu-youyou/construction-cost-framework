/*
 * @Author: SHUANG
 * @Date: 2024-03-12 17:04:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-12 17:09:36
 * @Description: 工程造价-工程量清单编制-定额 - 取费表达式
 */
/** 引用基础综合单价库 */
import UnitPriceNormFeeExpTable from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/UnitPriceNormFeeExpTable';
import { UnitPriceNormItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/typings';
import { BaseTableProps } from 'jd-framework-web/package/components';
import { productUnitPriceNormExpQueryPageInfo } from './services';

type Props = { unitPriceNormActionCurrent?: UnitPriceNormItem };

export default (props: Props) => {
  const { unitPriceNormActionCurrent } = props;

  const unitPriceId = unitPriceNormActionCurrent?.unitPriceId || ''; //	综合单价库ID
  const unitPriceNormId = unitPriceNormActionCurrent?.id || ''; //	综合单价定额ID
  const projectId = unitPriceNormActionCurrent?.projectId || ''; //	项目ID
  const stageId = unitPriceNormActionCurrent?.stageId || ''; //	阶段ID

  /** 重写 TABLE */
  const tableProps: Partial<BaseTableProps> = {
    service: {
      dataSourceRequest: productUnitPriceNormExpQueryPageInfo,
      params: { unitPriceId, unitPriceNormId, projectId, stageId },
      manualRequest: !unitPriceNormId,
    },
  };

  return <UnitPriceNormFeeExpTable {...props} tableProps={tableProps} />;
};
