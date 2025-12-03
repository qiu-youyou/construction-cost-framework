/*
 * @Author: SHUANG
 * @Date: 2023-11-09 10:58:07
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-09 11:54:52
 * @Description: 标准库-装置性材料价格库
 */

import { Dispatch } from 'react';
import { DeviceMatDirectoryItem } from './DeviceMatDirectoryTree/typings';
import { DeviceMatDetailItem } from './DeviceMatDetailTable/typings';

/**
 * 标准库-装置性材料价格库 Props
 * @name deviceMatDirectoryCurrent 装置性材料目录 当前选中
 * @name setDeviceMatDirectoryCurrent 设置装置性材料目录 当前选中
 *
 * @name deviceMatDetailCurrent 装置性材料明细 当前选中
 * @name setDeviceMatDirectoryCurrent 设置装置性材料明细 当前选中
 */
export type StdDeviceMatProps = {
  /** 装置性材料目录 当前选中 */
  deviceMatDirectoryCurrent?: DeviceMatDirectoryItem;
  /** 设置装置性材料目录 当前选中 */
  setDeviceMatDirectoryCurrent?: Dispatch<React.SetStateAction<DeviceMatDirectoryItem | undefined>>;

  /** 装置性材料明细 当前选中 */
  deviceMatDetailCurrent?: DeviceMatDetailItem;
  /** 设置装置性材料明细 当前选中 */
  setDeviceMatDetailCurrent?: Dispatch<React.SetStateAction<DeviceMatDetailItem | undefined>>;
};
