/*
 * @Author: SHUANG
 * @Date: 2024-02-21 16:37:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 16:35:18
 * @Description: 标准库-WBS库-目录
 */
import { BaseTreeProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import BaseTree from 'jd-framework-web/package/components/BaseTree';

import { StdWbsProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

export default (props: StdWbsProps) => {
  /** PROPS 设置当前选中目录 */
  const { wbsDirectoryTreeRef } = props;
  const { setWbsDirectoryCurrent } = props;

  /** Tree 的自定义标题渲染 */
  const titleRender = ({ wbsDirectoryCode, wbsDirectoryName }: TYPES.WbsDirectoryItem) => [
    <span key="id">
      {wbsDirectoryCode} {wbsDirectoryName}
    </span>,
  ];

  /** Tree 操作栏 */
  const toolbar: TableToolbarDefine<TYPES.WbsDirectoryItem> = { expand: { auth: true } };

  /** Tree 目录 */
  const generateTree: BaseTreeProps<TYPES.WbsDirectoryItem> = {
    fieldNames: { key: 'id', children: 'children', title: 'wbsDirectoryName' },
    service: { dataSourceRequest: API.wbsDirectoryQueryTreeNodeAll },
    onCurrent: setWbsDirectoryCurrent,
    actionRef: wbsDirectoryTreeRef,
    toolbarAuthority: true,
    defaultExpandAll: true,
    localRetrieval: true,
    titleRender,
    toolbar,
  };

  return <BaseTree {...generateTree} />;
};
