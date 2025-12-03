/*
 * @Author: SHUANG
 * @Date: 2023-10-26 11:52:16
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-26 14:06:02
 * @Description: 定额库权限 目录
 */
import { FileTextOutlined } from '@ant-design/icons';
import BaseTree from 'jd-framework-web/package/components/BaseTree';
import { BaseTreeProps } from 'jd-framework-web/package/components';

import { DbAccessDirectorItem, DbAccessDirectorQuery, DbAccessProps } from '../typings';
import { dbAccessDirectorQueryPageInfo } from '../services';

export default (props: DbAccessProps) => {
  /** 接收数据 */
  const { dbAccessCurrent, setDbAccessDirCurrent } = props;

  /** Tree 的自定义标题渲染 */
  const TreeTitleRender = ({ editDirectoryName }: DbAccessDirectorItem) => [
    <span key="id">
      <FileTextOutlined /> {editDirectoryName}
    </span>,
  ];

  /** 权限目录 TREE */
  const generateTree: BaseTreeProps<DbAccessDirectorItem, DbAccessDirectorQuery> = {
    titleRender: TreeTitleRender,
    fieldNames: { key: 'id', children: 'children', title: 'editDirectoryName' },
    onCurrent: (record) => setDbAccessDirCurrent?.(record),
    service: {
      dataSourceRequest: dbAccessDirectorQueryPageInfo,
      params: { dbId: dbAccessCurrent?.id || '' },
      manualRequest: !dbAccessCurrent?.id,
    },
    toolbar: { expand: { auth: true } },
    toolbarBefore: <>权限目录</>,
    defaultExpandAll: true,
  };

  return <BaseTree {...generateTree} />;
};
