/*
 * @Author: SHUANG
 * @Date: 2024-03-14 17:25:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 17:44:44
 * @Description: 工程造价-工程量清单编制-综合单价 单价分析表
 */
import { BaseTableProps } from 'jd-framework-web/package/components';

/** 引用标准综合单价库 单价分析表 */
import UnitPriceAnalysisTable from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/UnitPriceAnalysisTable';
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';
import { UnitPriceNormItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/typings';
import * as API from './services';

type Props = {
  /** 综合单价明细表 当前选中 */
  unitPriceDetailActionCurrent?: UnitPriceDetailItem & { unitPriceId?: string };
  /** 综合单价清单定额 当前选中 */
  unitPriceNormActionCurrent?: UnitPriceNormItem;
  /** 是否是定额的单价分析表 */
  byNorm?: boolean;
};

export default (props: Props) => {
  const { byNorm } = props;
  const { unitPriceNormActionCurrent, unitPriceDetailActionCurrent } = props;

  /** 当前操作 */
  const current = byNorm ? unitPriceNormActionCurrent : unitPriceDetailActionCurrent;

  /** 工程ID 阶段ID 单价ID  */
  const unitPriceId = (byNorm ? current?.unitPriceId : current?.id) || '';
  const projectId = current?.projectId || '';
  const stageId = current?.stageId || '';

  /** SERVIECE 关联参数 */
  const serviceParams: API.ProductUnitPriceAnalysisQuery = { unitPriceId, projectId, stageId };
  if (byNorm) serviceParams['unitPriceNormId'] = current?.id;

  /** 确定接口 */
  const dataSourceRequest = byNorm
    ? API.productUnitPriceAnalysisQueryPageInfoByNorm
    : API.productUnitPriceAnalysisQueryPageInfo;

  const tableServiceConfig: BaseTableProps['service'] = {
    manualRequest: !unitPriceId,
    params: serviceParams,
    dataSourceRequest,
  };

  return (
    <UnitPriceAnalysisTable
      unitPriceDetailActionCurrent={current as any}
      tableServiceConfig={tableServiceConfig}
      triggerText="单价分析表"
    />
  );
};
