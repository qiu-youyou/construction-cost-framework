/*
 * @Author: SHUANG
 * @Date: 2023-11-09 11:18:52
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-10 17:02:10
 * @Description: 标准库-装置性材料价格库-目录
 */

import { ReactNode } from 'react';
import BaseTree from 'jd-framework-web/package/components/BaseTree';
import { BaseTreeProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import { StdDeviceMatProps } from '../typings';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';

/** 目录类型 */
type Props = {
  toolbarSlot?: ReactNode;
  deviceMatTypeCode: TYPES.DeviceMatDirectoryQuery['deviceMatTypeCode'];
};

export default (props: StdDeviceMatProps & Props) => {
  /** 当前目录类型 */
  const { toolbarSlot } = props;
  const { deviceMatTypeCode } = props;

  /** 设置当前选中目录 */
  const { setDeviceMatDirectoryCurrent } = props;

  /** Tree 的自定义标题渲染 */
  const titleRender = ({ deviceMatDirectoryCode, deviceMatDirectoryName }: TYPES.DeviceMatDirectoryItem) => [
    <span key="id">
      {deviceMatDirectoryCode} {deviceMatDirectoryName}
    </span>,
  ];

  /** Tree 操作栏 */
  const toolbar: TableToolbarDefine<TYPES.DeviceMatDirectorySaveParams> = {
    deleted: { onSubmit: async (p) => API.deviceMatDirectoryDeleteByIds(p, { deviceMatTypeCode }) },
    plusLevel: { authKey: 'plus', columns: useFormColumns, onSubmit: API.deviceMatDirectorySave },
    edit: { columns: useFormColumns, onSubmit: API.deviceMatDirectorySave },
  };

  /** Tree 目录 */
  const generateTree: BaseTreeProps<TYPES.DeviceMatDirectoryItem> = {
    fieldNames: { key: 'id', children: 'children', title: 'deviceMatDirectoryName' },
    service: {
      dataSourceRequest: API.deviceMatDirectoryQueryTreeNodeAll,
      manualRequest: !deviceMatTypeCode,
      params: { deviceMatTypeCode },
    },
    onCurrent: setDeviceMatDirectoryCurrent,
    toolbar: !toolbarSlot && toolbar,
    toolbarAuthority: true,
    defaultExpandAll: true,
    localRetrieval: true,
    checkable: true,
    titleRender,
  };

  return <BaseTree {...generateTree} />;
};
