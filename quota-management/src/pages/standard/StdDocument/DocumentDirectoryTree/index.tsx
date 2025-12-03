/*
 * @Author: SHUANG
 * @Date: 2023-11-10 15:06:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 15:38:59
 * @Description: 项目相关设计文档目录结构
 */
import BaseTree from 'jd-framework-web/package/components/BaseTree';
import { TableToolbarDefine } from 'jd-framework-web/package/components';
import StatusText from 'jd-framework-web/package/common/textTag/StatusText';
import { BaseTreeProps } from 'jd-framework-web/package/components/BaseTree/typings';

import { StdDocumentProps } from '../typings';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';

export default (props: StdDocumentProps) => {
  /** 接收数据 */
  const { setDocumentDirectoryCurrent } = props;

  /** Tree 的自定义标题渲染 */
  const titleRender = ({ directoryCode, directoryName, billStatus }: TYPES.DocumentDirectoryItem) => [
    <span key="id">
      {directoryCode} {directoryName}
    </span>,
    <StatusText key="status" type="text" status={billStatus} />,
  ];

  /** Tree 的操作按钮 */
  const toolbar: TableToolbarDefine<TYPES.DocumentDirectoryItem> = {
    plusLevel: { authKey: 'plus', columns: useFormColumns, onSubmit: API.otherDocumentSave },
    edit: { columns: useFormColumns, onSubmit: API.otherDocumentSave },
    disable: { onSubmit: API.otherDocumentUpdateStatusByIds },
    enable: { onSubmit: API.otherDocumentUpdateStatusByIds },
    deleted: { onSubmit: API.otherDocumentDeleteByIds },
    sort: { onSubmit: API.otherDocumentSortSwap },
  };

  /** Tree 目录 */
  const generateTree: BaseTreeProps<TYPES.DocumentDirectoryItem> = {
    fieldNames: { key: 'id', children: 'children', title: 'listNormRelatedName' },
    service: { dataSourceRequest: API.otherDocumentQueryTreeNodeAll },
    onCurrent: (record) => setDocumentDirectoryCurrent?.(record),
    toolbarAuthority: true,
    defaultExpandAll: true,
    localRetrieval: true,
    checkable: true,
    titleRender,
    toolbar,
  };

  return <BaseTree {...generateTree} />;
};
