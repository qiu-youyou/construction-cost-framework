/*
 * @Author: SHUANG
 * @Date: 2023-07-25 15:40:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 15:53:26
 * @Description: 静态资源管理
 */
import { message } from 'antd';
import { BaseTableProps, TableToolbarDefine } from '../../../../components/BaseTable/typings';
import ViewContainer from '../../../../components/ViewContainer';
import BaseTable from '../../../../components/BaseTable';

import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';

export default () => {
  const handleStaticAttachmentSave = async (params: FETCH.Req) => {
    if (!params?.file) message.warning('暂无文件可上传！');
    const formData = new FormData();
    formData.append('file', params?.file || '');
    if (params?.id) {
      formData.append('id', params?.id);
    }
    return await API.staticAttachmentSave(formData);
  };

  const toolbar: TableToolbarDefine<FormData> = {
    plus: { columns: useFormColumns, onSubmit: handleStaticAttachmentSave },
    edit: { columns: useFormColumns, onSubmit: handleStaticAttachmentSave },
    deleted: { onSubmit: API.staticAttachmentDeleteByIds },
  };

  const generateTable: BaseTableProps<TYPES.StaticResourceListItem> = {
    persistenceKey: 'COMMONVIEWSCONFIGSTATICSOURCETABLE',
    service: { dataSourceRequest: API.staticAttachmentQueryPageInfo },
    rowSelection: { columnWidth: 32 },
    columns: useTableColumns,
    toolbarAuthority: true,
    virtual: false,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
