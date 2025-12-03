/*
 * @Author: SHUANG
 * @Date: 2022-09-29 20:49:43
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-29 15:51:35
 * @Description: 公共附件表
 */

import {
  attachmentDeleteByIds,
  attachmentQueryPageInfo,
  attachmentUpload,
} from 'jd-framework-web/package/common/annex/AnnexTable/services';
import { AttachmentListItem, AttachmentQuery } from 'jd-framework-web/package/common/annex/AnnexTable/typing';
import useTableColumns from 'jd-framework-web/package/common/annex/AnnexTable/useTableColumns';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

type Props = {
  businessId?: string; // 业务主单据 ID
  upload?: boolean; // 上传按钮
  deleted?: boolean; // 删除按钮
  disabled?: boolean; // 禁用按钮

  disabledImport?: boolean; // 禁用上传
  disabledDeleted?: boolean; // 禁用删除
  maxHeight?: number; // 最大高度

  onSuccess?: () => void; // 上传成功触发
};

export default ({
  upload = true,
  deleted = true,
  disabled = false,
  disabledImport = false,
  disabledDeleted = false,
  businessId,
  maxHeight,
  onSuccess,
}: Props) => {
  /** 上传操作 */
  const toolbar: TableToolbarDefine = {
    deleted: {
      disabled: disabled || disabledDeleted,
      auth: deleted,
      onSubmit: async (data: FETCH.UpStatus) => {
        const res = await attachmentDeleteByIds(data);
        if (res.status === 'SUCCESS') {
          onSuccess?.();
        }
        return res;
      },
    },

    import: {
      auth: upload,
      multiple: true,
      buttonText: '上传',
      disabled: disabled || disabledImport,
      uploadParams: { businessId: businessId, beanName: 'sysCommonAttachment', businessType: 'sys' },
      onSubmit: async (data: FormData) => {
        const res = await attachmentUpload(data);
        if (res.status === 'SUCCESS') {
          onSuccess?.();
        }
        return res;
      },
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
  };

  return <BaseTable {...generateAnnexTable} />;
};
