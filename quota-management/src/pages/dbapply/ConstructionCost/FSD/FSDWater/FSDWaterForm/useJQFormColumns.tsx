import { FormColumnsDefine } from 'jd-framework-web/package/components';
import { FSDWaterItem } from '../typings';

const columns: FormColumnsDefine<FSDWaterItem> = [
  {
    title: '水价名称',
    dataIndex: 'waterName',
  },
  {
    title: '供水比例',
    dataIndex: 'waterRatio',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '供水设施维修摊销费(元/m)(C2)',
    dataIndex: 'waterAmortizationPrice',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '本价区综合水价(元/m)',
    dataIndex: 'waterPrice',
    valueType: 'digit',
    width: 100,
  },
];

export default columns;
