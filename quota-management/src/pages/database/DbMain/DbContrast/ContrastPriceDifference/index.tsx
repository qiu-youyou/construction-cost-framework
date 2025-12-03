/*
 * @Author: SHUANG
 * @Date: 2023-11-08 14:25:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-28 16:58:07
 * @Description: 企业定额修编-价格差异对比
 */
import { Button } from 'antd';
import { useState } from 'react';
import { AlignCenterOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import { jondaReportExcel } from '@/common/services/system';
import { DatabaseDbItem } from '../../DatabaseMain/typings';
import useTableColumns from './useTableColumns';
import * as TYPES from './typings';
import * as FET from './fetch';

/** 当前对比的定额库列表 */
type Props = { dbSelection?: DatabaseDbItem[] };

export default (props: Props) => {
  /** 当前选择的定额库 */
  const { dbSelection } = props;

  /** 当前定额库 和 原始定额库 */
  const [dbInfo, setDbInfo] = useState<{ current?: string; source?: string }>();

  /** 价格差异对比表 导出参数 */
  /** 携带 IDS 获取数据 */
  const beforeDbId = dbSelection?.[0]?.id;
  const afterDbId = dbSelection?.[1]?.id;
  const exportParams = {
    _u: 'file:df1436a0f65f436fab21a74fae2f4f63.ureport.xml',
    _n: '价格差异对比明细',
    beforeDbId,
    afterDbId,
  };

  /** 价格差异对比表 操作栏 */
  const toolbar: TableToolbarDefine = {
    export: { exportParams, onSubmit: jondaReportExcel, determineActionCurrent: false },
  };

  /** 价格差异对比表 */
  const generateTable: BaseTableProps<TYPES.DbNormPriceDifferenceItem> = {
    persistenceKey: 'PAGESDATABASEDBCONTRASTPRICEDIFFERENCETABLE',
    service: {
      dataSourceRequest: async (p) => FET.fetchDbNormQueryPriceDifference(p, dbSelection, setDbInfo),
    },
    columns: useTableColumns({ dbInfo }),
    columnsDynamic: true,
    rowSelection: false,
    search: false,
    toolbar,
  };

  /** 弹窗属性 */
  const triggerControl = async () => {
    return await FET.determineTriggerControl(dbSelection);
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonPrimary">
      <AlignCenterOutlined /> 价格差异对比
    </Button>
  );

  /** 对比表 */
  const ModalRender = (
    <section style={{ height: 480 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  const modalProps = {
    defaultFullScreen: true,
    triggerControl,
    width: 1100,
  };

  return (
    <ModalButton
      modalTitle="价格差异对比"
      determineActionCurrent={false}
      modalProps={modalProps}
      render={ModalRender}
      trigger={triggerBtn}
    />
  );
};
