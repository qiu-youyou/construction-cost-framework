/*
 * @Author: SHUANG
 * @Date: 2024-04-15 16:10:39
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 10:56:18
 * @Description: 工程造价-运保杂费计算
 */

import { Dispatch, SetStateAction } from 'react';
import { TransportItem } from './TransportMain/typings';
import { TransportOriginItem } from './TransportOrigin/typings';
import { TransportOriginMethodItem } from './TransportOriginMethod/typings';
import { BaseTableProps, ModalActionType, TableActionType } from 'jd-framework-web/package/components';

/** 工程造价-运保杂费计算 向下PROPS */
export type TransportProps = {
  /** 运杂费用 当前、设置当前 */
  transportMainCurrent?: TransportItem;
  setTransportMainCurrent?: Dispatch<SetStateAction<TransportItem | undefined>>;
  transportMainTableProps?: Partial<BaseTableProps>;


  /** 运杂费来源地 当前、设置当前 */
  transportOriginCurrent?: TransportOriginItem;
  setTransportOriginCurrent?: Dispatch<SetStateAction<TransportOriginItem | undefined>>;
  /** 运杂费来源地运输方式 当前、设置当前 */
  transportOriginMethodCurrent?: TransportOriginMethodItem;
  setTransportOriginMethodCurrent?: Dispatch<SetStateAction<TransportOriginMethodItem | undefined>>;

  /** 运杂费表 */
  transportMainTableRef?: TableActionType;
  /** 来源地表 */
  transportOriginTableRef?: TableActionType;
  /** 运输方式 */
  transportOriginMethodTableRef?: TableActionType;

  /** 铁路综合运费 计算 */
  transportOriginTrainRef?: ModalActionType;
  /** 水路，公路，其他运输方式 分段计算 */
  transportOriginFreightRef?: ModalActionType;
  /** 铁路、水路、公路、其他 杂费计算 */
  transportOriginOtherRef?: ModalActionType;
};
