/*
 * @Author: SHUANG
 * @Date: 2024-03-18 11:45:44
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-18 14:39:31
 * @Description: 工程造价-人材机汇总与调价 查看相关定额
 */

import { TableColumnsDefine } from 'jd-framework-web/package/components';
/** 引用 综合单加 定额含量表 */
import useTableColumns from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/useTableColumns';

const columns: TableColumnsDefine<any> = useTableColumns?.filter((item) => item.dataIndex !== 'normLog');

export default columns;
