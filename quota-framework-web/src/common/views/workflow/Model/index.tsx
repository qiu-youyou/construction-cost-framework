/*
 * @Author: SHUANG
 * @Date: 2022-08-18 11:28:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 17:39:31
 * @Description: 模型管理
 */
import { Button } from 'antd';
import { useRef, useState } from 'react';
import useRequest from '@ahooksjs/use-request';
import { CloudUploadOutlined } from '@ant-design/icons';
import {
  BaseTableProps,
  TableToolbarDefine,
  TableActionType,
} from '../../../../components/BaseTable/typings';
import { ModalActionType } from '../../../../components/BaseModal/typings';
import ViewContainer from '../../../../components/ViewContainer';
import BaseTable from '../../../../components/BaseTable';

import useAuthButton from '../../../../utils/auth/useAuthButton';
import { getToken } from '../../../../utils/auth/authorization';

import { workflowEditorPath } from '@/common/constant/path';
import ProcessChart from '../../../process/ProcessChart';
import { LAYOUTCOL } from '../../../constant/layoutCol';

import DeployModelButton from './components/DeployModelButton';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';

import * as TYPES from './typings';
import * as API from './services';

export default () => {
  const { auth } = useAuthButton();
  /** 获取字典数据 */
  const { data: optionsData } = useRequest(API.workflowQueryModelSelectParams);

  /** 弹窗 Ref */
  const actionRef = useRef<ModalActionType>();

  const tableActionRef = useRef<TableActionType>();

  const [newCurrent, setNewCurrent] = useState<TYPES.ModelListItem>();

  const [tableActionCurrent, setTableActionCurrent] = useState<TYPES.ModelListItem>();

  /** 处理 iframe 参数 */
  const handleIframeSrc = () => {
    const { id, key, name } = newCurrent || tableActionCurrent || {};
    const iframeParams = `id=${id}&key=${key}&name=${encodeURIComponent(name || '')}&Token=${getToken()}`;
    const iframeSrc = `${workflowEditorPath}?${iframeParams}`;
    return iframeSrc;
  };

  /** 新建模型 */
  const createModelSave = async (params: TYPES.ModelActionItem) => {
    const res = await API.workflowCreateModel(params);
    if (res?.status !== 'SUCCESS') return res;

    /** 添加成功后需要进入模型编辑 */
    setNewCurrent(res?.rows);
    if (actionRef?.current?.open) actionRef?.current?.open();
    return res;
  };

  /** 导入模型 */
  const handleWorkflowImportModel = async (params: FETCH.Req) => {
    if (!params?.file) message.warning('暂无文件可上传！');
    const formData = new FormData();
    for (const key in params) {
      formData.append(key, params[key]);
    }
    return await API.workflowImportModel(formData);
  };

  /** 表单布局 */
  const { createModelColumns, importModelColumns } = useFormColumns(optionsData);
  const schemaFormProps = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
  const toolbar: TableToolbarDefine<TYPES.ModelActionItem> = {
    plus: {
      columns: createModelColumns,
      onSubmit: createModelSave,
      buttonText: '新增模型',
      schemaFormProps,
    },
    edit: {
      modalProps: {
        noFooter: true,
        title: '编辑模型',
        defaultFullScreen: true,
        afterClose: () => setNewCurrent(undefined),
        width: 660,
      },
      render: <iframe className="workflowIframe" src={handleIframeSrc()} />,
      actionRef,
    },

    editMore: {
      authKey: 'import',
      trigger: (
        <Button className="ImportButton">
          <CloudUploadOutlined /> 导入模型
        </Button>
      ),
      buttonText: '导入模型',
      columns: importModelColumns,
      onSubmit: handleWorkflowImportModel,
      schemaFormProps,
    },

    export: {
      buttonText: '导出模型',
      exportType: 'default',
      onSubmit: API.workflowExportModel,
      exportParams: { id: tableActionCurrent?.id },
    },

    deleted: {
      actionControl: { key: 'deploymentId', message: '禁止删除已部署的模型!', value: undefined },
      onSubmit: API.workflowDeleteModels,
    },
  };

  /** 模型表 */
  const toolbarAfter = (
    <>
      {auth('arrange') && (
        <DeployModelButton currentRow={tableActionCurrent} reload={tableActionRef.current?.reload} />
      )}
      {auth('details') && (
        <ProcessChart
          button="button"
          current={tableActionCurrent}
          processInstanceId={tableActionCurrent?.processInstanceId || ''}
          processDefinitionId={tableActionCurrent?.processDefinitionId || ''}
        />
      )}
    </>
  );

  const generateTable: BaseTableProps<TYPES.ModelListItem> = {
    columns: [],
    persistenceKey: 'COMMONVIEWSWORKFLOWMODELTABLE',
    service: { dataSourceRequest: API.workflowListMode },
    search: { labelWidth: 62, span: LAYOUTCOL.colPropsMin },
    onActionCurrent: (record) => setTableActionCurrent(record),
    rowSelection: { columnWidth: 20 },
    actionRef: tableActionRef,
    toolbarAuthority: true,
    virtual: false,
    toolbarAfter,
    toolbar,
  };

  return (
    <ViewContainer>
      {!!optionsData && <BaseTable {...generateTable} columns={useTableColumns(optionsData)} />}
    </ViewContainer>
  );
};
