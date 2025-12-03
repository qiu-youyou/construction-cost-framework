/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:15:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-12 17:16:58
 * @Description: 标准综合单价库 - 清单定额 - 取费表达式
 */
import { Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import useTableColumns from './useTableColumns';
import { UnitPriceNormItem } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

type Props = {
  unitPriceNormActionCurrent?: UnitPriceNormItem;
  /** 重写 Table */
  tableProps?: Partial<BaseTableProps>;
};

export default (props: Props) => {
  const { tableProps } = props;
  const { unitPriceNormActionCurrent } = props;

  /** 清单定额 当前定额ID */
  const unitPriceNormId = unitPriceNormActionCurrent?.id || '';
  /** 清单定额 当前清单明细 ID */
  const unitPriceId = unitPriceNormActionCurrent?.unitPriceId || '';
  /** 清单定额 当前综合单价目录 ID */
  const unitPriceDbId = unitPriceNormActionCurrent?.unitPriceDbId || '';

  /** 查看取费表达式表 */
  const generateTable: BaseTableProps<TYPES.UnitPriceNormFeeExpItem, TYPES.UnitPriceNormFeeExpQuery> = {
    persistenceKey: 'PAGESTANDARDCOMPREHENSIVEUNITPRICENORMFEEEXPTABLE',
    service: {
      dataSourceRequest: API.unitPriceExpFeeQueryPageInfo,
      params: { unitPriceId, unitPriceDbId, unitPriceNormId },
      manualRequest: !unitPriceNormId,
    },
    columns: useTableColumns,
    rowSelection: false,
    virtual: false,
    search: false,
    ...tableProps,
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
      <FileTextOutlined /> 取费表达式
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
      determineActionCurrent={!unitPriceNormId}
      modalProps={modalProps}
      render={ModalRender}
      trigger={triggerBtn}
    />
  );
};
