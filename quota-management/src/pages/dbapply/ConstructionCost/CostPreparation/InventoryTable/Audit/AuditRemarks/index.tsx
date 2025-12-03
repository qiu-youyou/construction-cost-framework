/*
 * @Author: SHUANG
 * @Date: 2024-04-03 14:27:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 15:33:39
 * @Description: 工程造价-工程量清单编制-审核标注
 */
import { Button } from 'antd';
import { AuditOutlined } from '@ant-design/icons';
import { BaseModalProps, TableActionType } from 'jd-framework-web/package/components';
import EditButton from 'jd-framework-web/package/components/ActionButton/EditButton';
import { ProductItem } from '@/pages/dbapply/Product/Product/typings';
import useFormColumns from './useFormColumns';
import { InventoryItem } from '../../typings';
import { inventoryUpdateAuditRemarksByIds } from '../services';

type Props = {
  /** 当前产品 */
  productActionCurrent?: ProductItem;
  /** 分部分项清单REF */
  inventoryTableRef?: TableActionType;
  /** 当前操作清单 */
  inventoryActionCurrent?: InventoryItem;
  /** 批量操作清单 */
  inventorySelection?: InventoryItem[];
};

export default (props: Props) => {
  /**  PROPS 当前产品 */
  const { inventoryTableRef } = props;
  const { productActionCurrent } = props;

  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';

  const { inventorySelection, inventoryActionCurrent } = props;

  const current = inventoryActionCurrent || inventorySelection?.[0];

  const handleOnSubmit = async (params: { auditRemarks: string }) => {
    const ids = inventoryActionCurrent
      ? [inventoryActionCurrent?.id]
      : inventorySelection?.map((item) => item.id) || [];
    const res = await inventoryUpdateAuditRemarksByIds({ projectId, stageId, ids, ...params });
    if (res?.status === 'SUCCESS') {
      inventoryTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 弹窗属性 */
  const modalProps: BaseModalProps = { defaultFullScreen: false, width: 500 };

  /** 表单属性 */
  const schemaFormProps = { wrapperCol: { span: 15 }, labelCol: { span: 7 } };

  /** 触发按钮 */
  const triggerButton = (
    <Button className="BorderButtonGold" icon={<AuditOutlined />}>
      审核标注
    </Button>
  );

  const splitAuditRemarks = (str?: string) => {
    if (!str) return '';
    const arr = str?.split('审核标注：');
    if (arr?.length > 1) {
      return arr?.[1];
    }
    return '';
  };

  return (
    <EditButton
      current={{ ...current, auditRemarks: splitAuditRemarks(current?.auditRemarks) }}
      schemaFormProps={schemaFormProps}
      onSubmit={handleOnSubmit}
      columns={useFormColumns}
      modalProps={modalProps}
      trigger={triggerButton}
      modalTitle="审核标注"
    />
  );
};
