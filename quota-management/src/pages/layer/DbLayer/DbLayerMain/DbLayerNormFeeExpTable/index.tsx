/*
 * @Author: SHUANG
 * @Date: 2023-11-17 18:28:33
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-20 15:00:59
 * @Description: 全费用定额测算-定额明细-取费明细 查看取费表达式
 */
import { Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

/** 引用综合单价 查看取费表达式 */
import { UnitPriceNormFeeExpItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/UnitPriceNormFeeExpTable/typings';
import useTableColumns from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/UnitPriceNormFeeExpTable/useTableColumns';

import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';
import { DbLayerProps } from '../typings';
import * as API from './services';

export default (props: DbLayerProps) => {
  /** 当前层级、当前定额明细 */
  const { dbLayerNormCurrent } = props;

  /** 当前定额明细 数据库 ID */
  const dbId = dbLayerNormCurrent?.dbId || '';
  /** 当前定额明细 定额 ID */
  const normId = dbLayerNormCurrent?.id || '';

  /** 查看取费表达式 */
  const generateTable: BaseTableProps<UnitPriceNormFeeExpItem, { dbId: string; normId: string }> = {
    persistenceKey: 'PAGESDATABASELAYERDBLAYERNORMFEEEXPTABLE',
    service: {
      dataSourceRequest: API.dbLayerNormFeeExpQueryPageInfo,
      params: { dbId, normId },
      manualRequest: !normId,
    },
    columns: useTableColumns,
    rowSelection: false,
    virtual: false,
    search: false,
  };

  /** MODAL RENDER */
  const ModalRender = (
    <section style={{ height: 480 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonCyan">
      <FileTextOutlined /> 查看取费表达式
    </Button>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: false,
    width: 600,
  };

  return (
    <ModalButton
      modalTitle="查看取费表达式"
      determineActionCurrent={!normId}
      modalProps={modalProps}
      render={ModalRender}
      trigger={triggerBtn}
    />
  );
};
