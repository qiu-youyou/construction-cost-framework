/*
 * @Author: SHUANG
 * @Date: 2024-04-16 16:53:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 10:02:00
 * @Description: 工程造价-风水电 供电点信息 电网电价资料
 */

import { FormColumnsDefine } from 'jd-framework-web/package/components';
import { FSDElectricityItem } from '../typings';

const columns: FormColumnsDefine<FSDElectricityItem> = [
  {
    title: '电网供电基本电价(元/kw)',
    dataIndex: 'eleWorkPrice',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '高压输电线路损耗率(4~6%)',
    dataIndex: 'eleHighVoltageScrapRate',
    valueType: 'digit',
    width: 100,
  },

  {
    title: '变配电设备及配电线路损耗率(6~10%)',
    dataIndex: 'eleLineScrapRate',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '供电设施维修摊销费(0.02~0.035元/kW)',
    dataIndex: 'elePeoAmortizationPrice',
    valueType: 'digit',
    width: 100,
  },
];

export default columns;
