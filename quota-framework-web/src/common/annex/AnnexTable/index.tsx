/*
 * @Author: SHUANG
 * @Date: 2022-09-29 20:49:43
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-21 14:04:04
 * @Description: 公共附件表
 */
import BaseTable from '../../../components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from '../../../components/BaseTable/typings';
import { attachmentDeleteByIds, attachmentQueryPageInfo, attachmentUpload } from './services';
import { AttachmentListItem, AttachmentQuery } from './typing';
import useTableColumns from './useTableColumns';

type Props = {
  businessId?: string; // 业务主单据 ID
  upload?: boolean; // 上传按钮
  deleted?: boolean; // 删除按钮
  disabled?: boolean; // 禁用按钮

  disabledImport?: boolean; // 禁用上传
  disabledDeleted?: boolean; // 禁用删除
  maxHeight?: number | string; // 最大高度
  uploadParams?: any;
  annexTableProps?: Partial<BaseTableProps>;
};

export default ({
  upload = true,
  deleted = true,
  disabled = false,
  disabledImport = false,
  disabledDeleted = false,
  businessId,
  maxHeight,
  uploadParams,
  annexTableProps,
}: Props) => {
  /** 上传操作 */
  const toolbar: TableToolbarDefine = {
    deleted: { disabled: disabled || disabledDeleted, auth: deleted, onSubmit: attachmentDeleteByIds },

    import: {
      auth: upload,
      multiple: true,
      buttonText: '上传',
      disabled: disabled || disabledImport,
      uploadParams: {
        businessId: businessId,
        beanName: 'sysCommonAttachment',
        businessType: 'sys',
        ...uploadParams,
      },
      onSubmit: attachmentUpload,
    },
  };

  /** 生成附件 */
  const generateAnnexTable: BaseTableProps<AttachmentListItem, AttachmentQuery> = {
    persistenceKey: 'COMMONVIEWSSYSTEMANNEXTABLE',
    service: {
      params: { businessId },
      manualRequest: !businessId,
      dataSourceRequest: attachmentQueryPageInfo,
    },
    rowSelection: { columnWidth: 30 },
    maxHeight: maxHeight || 320,
    columns: useTableColumns(),
    virtual: false,
    search: false,
    toolbar,
    ...annexTableProps,
  };

  return <BaseTable {...generateAnnexTable} />;
};
