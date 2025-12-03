/*
 * @Author: SHUANG
 * @Date: 2024-01-10 10:27:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 09:20:02
 * @Description: 工程造价产品-工程信息
 */
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import { productProjectDeleteByIds, productProjectQueryPageInfo } from './services';
import ProjectDocButton from './ProjectDocButton';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import { ProductProps } from '../typings';
import * as TYPES from './typings';
import * as FET from './fetch';

/** 自定义表单 */
const schemaFormProps = {
  className: 'customModalForm',
  wrapperCol: { span: 'auto' },
  labelCol: { span: '115px' },
  colProps: { span: 12 },
  grid: true,
};

export default (props: ProductProps & TYPES.PropsProject) => {
  /** 当前工程 */
  const { tableProps } = props;
  const { setProjectCurrent } = props;

  const modalProps = { width: 900, style: { top: 30 } };

  /** 当前操作工程 */
  const { setProjectSelection } = props;
  const { projectActionCurrent, setProjectActionCurrent } = props;

  /** TOOLBAR */
  const toolbar: TableToolbarDefine = {
    plus: {
      columns: useFormColumns({ projectActionCurrent }),
      onSubmit: FET.fetchProductProjectSave,
      schemaFormProps,
      modalProps,
    },
    edit: {
      columns: useFormColumns({ projectActionCurrent }),
      onSubmit: FET.fetchProductProjectSave,
      schemaFormProps,
      modalProps,
    },
    deleted: { onSubmit: productProjectDeleteByIds },
  };

  /** TOOLBAR */
  const toolbarAfter = (
    <>
      {/* 项目文档库 */}
      <ProjectDocButton projectActionCurrent={projectActionCurrent} />
    </>
  );

  /** 工程列表 */
  const generateTable: BaseTableProps<TYPES.ProjectItem> = {
    persistenceKey: 'PAGES_DBAPPLY_PRODUCT_PROJECT_TABLE',
    service: { dataSourceRequest: productProjectQueryPageInfo },
    onActionCurrent: setProjectActionCurrent,
    onSelections: setProjectSelection,
    rowSelection: { columnWidth: 40 },
    onCurrent: setProjectCurrent,
    columns: useTableColumns,
    virtual: false,
    toolbarAfter,
    toolbar,
    ...tableProps,
  };

  return <BaseTable {...generateTable} />;
};
