/*
 * @Author: SHUANG
 * @Date: 2024-01-10 17:02:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 12:00:16
 * @Description: 工程造价-工程量清单编制-分部分项目录
 */

import BaseTree from 'jd-framework-web/package/components/BaseTree';
import { BaseTreeProps } from 'jd-framework-web/package/components';

import { CostPreparationProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

export default (props: CostPreparationProps) => {
  /** PROPS 当前工程产品 */
  const { productActionCurrent } = props;

  /** PROPS TREEREF */
  const { inventoryDirectoryTreeRef } = props;

  /** PROPS 设置当前目录 */
  const { setInventoryDirectoryCurrent } = props;

  /** 工程ID 阶段ID */
  const projectId = productActionCurrent?.projectId || '';
  const stageId = productActionCurrent?.id || '';

  /** Tree 的自定义标题渲染 */
  const titleRender = ({ showNumber, inventoryCode, inventoryName }: TYPES.InventoryDirectoryItem) => [
    <span key="id">
      {!!showNumber && `(${showNumber})`} {inventoryCode} {inventoryName}
    </span>,
  ];

  /** Tree 目录 */
  const generateTree: BaseTreeProps<TYPES.InventoryDirectoryItem, TYPES.InventoryDirectoryQuery> = {
    fieldNames: { key: 'id', children: 'children', title: 'inventoryName' },
    service: {
      dataSourceRequest: async (p) => {
        const res = await API.inventoryQueryTreeDirectory(p);
        return { ...res, rows: [res?.rows] };
      },
      params: { projectId, stageId },
    },
    onCurrent: setInventoryDirectoryCurrent,
    actionRef: inventoryDirectoryTreeRef,
    toolbarAuthority: true,
    defaultExpandAll: true,
    localRetrieval: true,
    checkable: false,
    titleRender,
  };

  return <BaseTree {...generateTree} />;
};
