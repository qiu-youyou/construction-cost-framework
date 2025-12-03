/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:16:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-17 14:11:37
 * @Description: 标准库-其他费用模板-目录
 */
import BaseTree from 'jd-framework-web/package/components/BaseTree';
import { BaseTreeProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import { StdOtherFeeTempProps } from '../typings';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';

/** 目录类型 */
type Props = { otherSumTypeCode: TYPES.OtherFeeTempDirectoryQuery['otherSumTypeCode'] };

export default (props: StdOtherFeeTempProps & Props) => {
  /** 当前目录类型 */
  const { readonly, otherSumTypeCode } = props;

  /** 设置当前选中目录 */
  const { setOtherFeeTempDirectoryCurrent } = props;

  /** Tree 的自定义标题渲染 */
  const titleRender = ({ otherSumDirectoryCode, otherSumDirectoryName }: TYPES.OtherFeeTempDirectoryItem) => [
    <span key="id">
      {otherSumDirectoryCode} {otherSumDirectoryName}
    </span>,
  ];

  /** Tree 操作栏 */
  const toolbar: TableToolbarDefine<TYPES.OtherFeeTempDirectorySaveParams> = {
    plusLevel: { authKey: 'plus', columns: useFormColumns, onSubmit: API.otherFeeTempDirectorySave },
    edit: { columns: useFormColumns, onSubmit: API.otherFeeTempDirectorySave },
    deleted: { onSubmit: API.otherFeeTempDirectoryDeleteByIds },
  };

  /** Tree 目录 */
  const generateTree: BaseTreeProps<TYPES.OtherFeeTempDirectoryItem> = {
    fieldNames: { key: 'id', children: 'children', title: 'otherSumDirectoryName' },
    service: {
      dataSourceRequest: API.otherFeeTempDirectoryQueryTreeNodeAll,
      manualRequest: !otherSumTypeCode,
      params: { otherSumTypeCode },
    },
    onCurrent: setOtherFeeTempDirectoryCurrent,
    defaultExpandAll: true,
    toolbarAuthority: true,
    localRetrieval: true,
    checkable: !readonly,
    titleRender,
    toolbar,
  };

  return <BaseTree {...generateTree} />;
};
