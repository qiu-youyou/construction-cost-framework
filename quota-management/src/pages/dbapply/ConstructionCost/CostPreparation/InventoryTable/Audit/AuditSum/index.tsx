/*
 * @Author: SHUANG
 * @Date: 2024-04-03 16:30:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 17:21:19
 * @Description: 工程造价-工程量清单编制 审核汇总
 */
import { Button } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { ProductItem } from '@/pages/dbapply/Product/Product/typings';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps } from 'jd-framework-web/package/components';
import RadioGroupButton from 'jd-framework-web/package/components/RadioGroupButton';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import { inventoryQueryAuditRemarksPageInfo } from '../services';
import useInventoryTableColumns from '../../useTableColumns';
import { InventoryItem } from '../../typings';

type Props = {
  /** 当前产品 */
  productActionCurrent?: ProductItem;
};

export default (props: Props) => {
  /**  PROPS 当前产品 */
  const { productActionCurrent } = props;

  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';

  const columns: any = useInventoryTableColumns({ auditStatus: true })?.map((item) => {
    if (item.dataIndex === 'showNumber') {
      return { title: '序号', dataIndex: 'index', align: 'center', width: 50 };
    }
    return { ...item, search: false };
  });

  const columnsItem: any = {
    renderFormItem: ({ valueEnum }: any) => <RadioGroupButton valueEnum={valueEnum} />,
    valueEnum: { Y: { text: '否' }, N: { text: '是' } },
    dataIndex: 'auditFlag',
    valueType: 'radioButton',
    title: '审核闭合状态',
    hideInTable: true,
  };

  /** 审核汇总表 */
  const generateTable: BaseTableProps<InventoryItem, { projectId: string; stageId: string }> = {
    persistenceKey: 'PAGES_CONSTRUCTIONCOST_COSTPREPARATION_INVENTORYLIST_AUDITSUMTABLE',
    service: {
      dataSourceRequest: inventoryQueryAuditRemarksPageInfo,
      params: { projectId, stageId },
      manualRequest: !stageId,
    },
    columns: [...columns, columnsItem],
    rowSelection: false,
    rowKey: false,
  };

  /** 审核汇总表 */
  const ModalRender = (
    <section style={{ height: 420 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: false,
    style: { top: 150, left: '5vw' },
    width: 1200,
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonCyan">
      <ProfileOutlined /> 汇总校审记录
    </Button>
  );

  return (
    <ModalButton
      trigger={triggerBtn}
      modalTitle="汇总校审记录"
      determineActionCurrent={false}
      modalProps={modalProps}
      render={ModalRender}
    />
  );
};
