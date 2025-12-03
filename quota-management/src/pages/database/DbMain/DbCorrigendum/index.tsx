/*
 * @Author: SHUANG
 * @Date: 2023-11-08 14:25:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-19 15:28:34
 * @Description: 企业定额修编-勘误记录
 */
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { BarsOutlined } from '@ant-design/icons';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import { DatabaseDbItem } from '../DatabaseMain/typings';
import useTableColumns from './useTableColumns';
import AnnexTable from './AnnexTable';
import * as TYPES from './typings';
import * as API from './services';

/** 当前对比的定额库列表 */
type Props = { databaseCurrent?: DatabaseDbItem };

export default (props: Props) => {
  /** 当前选择的定额库 */
  const { databaseCurrent } = props;
  /** 当前数据库ID */
  const dbId = databaseCurrent?.id || '';

  /** 当前勘误记录 */
  const [corrigendumCurrent, setCorrigendumCurrent] = useState<TYPES.DbCorrigendumItem>();

  /** 勘误记录表 */
  const dbCorrigendumTableRef = useRef<TableActionType>();

  const dbCorrigendumTableRealod = () => {
    dbCorrigendumTableRef?.current?.reload?.();
  };

  const generateTable: BaseTableProps<TYPES.DbCorrigendumItem, TYPES.DbCorrigendumQuery> = {
    persistenceKey: 'PAGESDATABASEDBCORRIGENDUMTABLE',
    toolbar: {
      plusLine: { onSubmit: API.dbCorrigendumSaveBlankRow },
      deleted: { onSubmit: API.dbCorrigendumDeleteByIds },
    },
    service: {
      dataSourceRequest: API.dbCorrigendumQueryPageInfo,
      cellEditSaveRequest: API.dbCorrigendumUpdateRow,
      manualRequest: !dbId,
      params: { dbId },
    },
    actionRef: dbCorrigendumTableRef,
    rowSelection: { columnWidth: 40 },
    onCurrent: setCorrigendumCurrent,
    columns: useTableColumns,
    cellEditable: true,
    search: false,
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonGold">
      <BarsOutlined /> 勘误记录
    </Button>
  );

  const modalProps = {
    defaultFullScreen: false,
    width: 1100,
  };

  /** 对比表 */
  const ModalRender = (
    <section style={{ height: 560 }}>
      <SplitPane mode="vertical">
        <PaneContainer height="47%">
          <BaseTable {...generateTable} />
        </PaneContainer>

        <PaneContainer flex>
          <BaseCard noHeader tabs={{ type: 'card' }}>
            <BaseCard.TabPane tab="附件" key="1">
              <AnnexTable
                disabled={!corrigendumCurrent?.id}
                businessId={corrigendumCurrent?.id}
                onSuccess={dbCorrigendumTableRealod}
                maxHeight={260}
              />
            </BaseCard.TabPane>
          </BaseCard>
        </PaneContainer>
      </SplitPane>
    </section>
  );

  return (
    <ModalButton
      modalTitle="勘误记录"
      determineActionCurrent={!dbId}
      modalProps={modalProps}
      trigger={triggerBtn}
      render={ModalRender}
    />
  );
};
