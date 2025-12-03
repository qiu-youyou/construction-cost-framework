/*
 * @Author: SHUANG
 * @Date: 2023-11-02 10:16:58
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 15:13:02
 * @Description: Mat Main 人材机类型 - 查看相关定额
 */

import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import { MatSubsidiaryContentItem } from '@/pages/database/DbMatSubsidiary/MatSubsidiaryContentTable/typings';
import { queryNormByMatClassifyDetailIds } from '../../DbMatMainTable/useServices';
import { DbNormItem } from '../../../DbNorm/DbNormTable/typings';
import { DbMatItem } from '../../DbMatMainTable/typings';
import useTableColumns from './useTableColumns';

/** 已经勾选的MAT明细 */
type Props = {
  dbMatCurrent?: DbMatItem | MatSubsidiaryContentItem;
  tableProps?: Partial<BaseTableProps>;
};

export default (props: Props) => {
  const { dbMatCurrent } = props;
  /** 数据库ID */
  const dbId = dbMatCurrent?.dbId || '';
  /** MAT明细Code */
  const matCode = dbMatCurrent?.matCode || '';

  /** 查看相关定额表 */
  const { tableProps } = props;
  const generateTable: BaseTableProps<DbNormItem, { dbId?: string; matCode: string }> = {
    persistenceKey: 'PAGESDATABASEDBMATRELATEDNORMTABLE',
    service: {
      dataSourceRequest: queryNormByMatClassifyDetailIds,
      params: !!dbId ? { dbId, matCode } : { matCode },
      manualRequest: !matCode?.length,
      ...tableProps?.service,
    },
    columns: useTableColumns,
    rowSelection: false,
    search: false,
    rowKey: false,
  };

  /** 人材机选择 */
  const ModalRender = (
    <section style={{ height: 420 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: false,
    style: { top: 150, left: '5vw' },
    width: 1100,
    mask: false,
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonPrimary">
      <EyeOutlined /> 查看相关定额
    </Button>
  );

  return (
    <ModalButton
      trigger={triggerBtn}
      modalTitle="相关定额查看"
      determineActionCurrent={!matCode}
      modalProps={modalProps}
      render={ModalRender}
    />
  );
};
