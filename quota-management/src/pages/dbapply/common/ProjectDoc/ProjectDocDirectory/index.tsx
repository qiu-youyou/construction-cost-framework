/*
 * @Author: SHUANG
 * @Date: 2024-02-04 16:51:02
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 16:32:15
 * @Description: 项目文档库-目录
 */
import { FileTextOutlined, FolderOpenFilled } from '@ant-design/icons';
import { BaseTreeProps, TableToolbarDefine, TreeActionType } from 'jd-framework-web/package/components';
import BaseTree from 'jd-framework-web/package/components/BaseTree';

import ProjectDocSnyc from './ProjectDocSnyc';

import useFormColumns from './useFormColumns';
import { ProjectDocProps } from '../typings';
import * as TYPES from './typings';
import * as API from './services';
import { useRef } from 'react';

export default (props: ProjectDocProps) => {
  /** 当前工程 */
  const { projectActionCurrent } = props;
  const projectId = projectActionCurrent?.id;

  /** 当前目录 */
  const { setProDocDirectoryCurrent } = props;

  const projectDocDirectoryRef = useRef<TreeActionType>();

  /** Tree 的自定义标题渲染 */
  const titleRender = ({ directoryName, children }: TYPES.ProjectDocDirectoryItem) => [
    <span key="id">
      {children?.length === 0 ? <FileTextOutlined /> : <FolderOpenFilled />} {directoryName}
    </span>,
  ];

  const toolbarAfter = (
    <ProjectDocSnyc
      projectDocDirectoryRef={projectDocDirectoryRef}
      projectActionCurrent={projectActionCurrent}
    />
  );

  /** Tree 的操作按钮 */
  const toolbar: TableToolbarDefine<TYPES.ProjectDocDirectoryItem> = {
    plusLevel: { authKey: 'plus', columns: useFormColumns, onSubmit: API.projectDocDirectorySave },
    edit: { columns: useFormColumns, onSubmit: API.projectDocDirectorySave },
    deleted: { onSubmit: async (v) => await API.projectDocDirectoryDeleteByIds({ ...v, projectId }) },
  };

  /** Tree 目录 */
  const generateTree: BaseTreeProps<TYPES.ProjectDocDirectoryItem> = {
    fieldNames: { key: 'id', children: 'children', title: 'directoryName' },
    service: {
      dataSourceRequest: API.projectDocDirectoryQueryTreeNodeAll,
      manualRequest: !projectId,
      params: { projectId },
    },
    onCurrent: (record) => setProDocDirectoryCurrent?.(record),
    actionRef: projectDocDirectoryRef,
    defaultExpandAll: true,
    localRetrieval: true,
    checkable: true,
    toolbarAfter,
    titleRender,
    toolbar,
  };

  return <BaseTree {...generateTree} />;
};
