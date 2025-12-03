/*
 * @Author: SHUANG
 * @Date: 2023-11-08 14:25:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-24 10:21:56
 * @Description: 企业定额修编-定额造价水平对比-与来源库对比
 */
import { useState } from 'react';
import { Button, Modal, TabsProps } from 'antd';
import { AlignCenterOutlined } from '@ant-design/icons';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import { DatabaseDbItem } from '../../DatabaseMain/typings';
import useNormTableColumns from './useNormTableColumns';
import useMatTableColumns from './useMatTableColumns';
import * as TYPES from './typings';
import * as API from './services';

/** 当前对比的定额库 */
type Props = { databaseCurrent?: DatabaseDbItem };

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** 当前选择的定额库 */
  const { databaseCurrent } = props;

  /** 当前定额库ID 与 当前来源定额库ID */
  const currentDbId = databaseCurrent?.id || '';
  const sourceDbId = databaseCurrent?.sourceId || '';

  /** 全局定额对比 当前库名称 与 原始库名称 */
  const [normDbInfo, setNormDbInfo] = useState<{ source: string; current: string }>();

  /** 全局材料对比 当前库名称 与 来源库名称 */
  const [matDbInfo, setMatDbInfo] = useState<{ source: string; current: string }>();

  /** 定额对比表 */
  const generateNormTable: BaseTableProps<
    TYPES.DbPriceLevelBySourceNormItem,
    TYPES.DbPriceLevelBySourceQuery
  > = {
    persistenceKey: 'PAGESDATABASEDBCONTRASTPRICELEVELBYSOURCENORM',
    service: {
      dataSourceRequest: async (p) => {
        const res: any = await API.normQueryCurrentAndSourcePriceContrast(p);
        setNormDbInfo?.({ current: res?.rows?.current, source: res?.rows?.source });
        return { ...res, rows: res?.rows?.list };
      },
      params: { currentDbId, sourceDbId },
      manualRequest: !sourceDbId,
    },
    columns: useNormTableColumns({ normDbInfo }),
    columnsDynamic: true,
    rowSelection: false,
    search: false,
  };

  /** 材料对比表 */
  const generateMatTable: BaseTableProps<TYPES.DbPriceLevelBySourceMatItem, TYPES.DbPriceLevelBySourceQuery> =
    {
      persistenceKey: 'PAGESDATABASEDBCONTRASTPRICELEVELBYSOURCEMAT',
      service: {
        dataSourceRequest: async (p) => {
          const res: any = await API.matQueryCurrentAndSourcePriceContrast(p);
          setMatDbInfo?.({ current: res?.rows?.current, source: res?.rows?.source });
          return { ...res, rows: res?.rows?.list };
        },
        params: { currentDbId, sourceDbId },
        manualRequest: !sourceDbId,
      },
      columns: useMatTableColumns({ matDbInfo }),
      columnsDynamic: true,
      rowSelection: false,
      search: false,
    };

  /** pane items */
  const cardPaneItems: TabsProps['items'] = [
    {
      children: <BaseTable {...generateNormTable} />,
      key: 'byNormSource',
      label: '全局定额对比',
    },
    {
      children: <BaseTable {...generateMatTable} />,
      key: 'byMatSource',
      label: '全局材料对比',
    },
  ];

  /** 对比表 */
  const ModalRender = (
    <section style={{ height: 480 }}>
      <BaseCard noHeader tabs={{ items: cardPaneItems, destroyInactiveTabPane: true }} />
    </section>
  );

  /** 弹窗属性 */
  const triggerControl = async () => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
    if (!sourceDbId) {
      modal.warning({ title: '继续操作', content: `当前定额库没有来源库信息！无法进行对比！` });
      return errorReturn;
    }
    return { ...errorReturn, status: 'SUCCESS' };
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonPrimary">
      <AlignCenterOutlined /> 定额造价水平对比-与来源库对比
    </Button>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: true,
    triggerControl,
    width: 1100,
  };

  return (
    <>
      <ModalButton
        trigger={triggerBtn}
        determineActionCurrent={!currentDbId}
        modalTitle="定额造价水平对比-与来源库对比"
        modalProps={modalProps}
        render={ModalRender}
      />
      {contextHolder}
    </>
  );
};
