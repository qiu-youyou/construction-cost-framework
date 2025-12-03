/*
 * @Author: SHUANG
 * @Date: 2023-11-08 14:25:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-28 17:02:25
 * @Description: 企业定额修编-定额造价水平对比-章节对比
 */

import { Button } from 'antd';
import { useState } from 'react';
import { AlignCenterOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import { jondaReportExcel } from '@/common/services/system';
import { determineTriggerControl } from '../ContrastPriceDifference/fetch';
import { fetchDbChapterQueryPriceDifference } from './fetch';
import { DatabaseDbItem } from '../../DatabaseMain/typings';
import useTableColumns from './useTableColumns';

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
    _u: 'file:56433789ebea473cab477aaccb5c18a7.ureport.xml',
    _n: '定额价格水平基价差异汇总表',
    beforeDbId,
    afterDbId,
  };

  /** 价格差异对比表 操作栏 */
  const toolbar: TableToolbarDefine = {
    export: { exportParams, onSubmit: jondaReportExcel, determineActionCurrent: false },
  };

  const toolbarAfter = (
    <div style={{ color: '#00489d', fontWeight: 500, transform: 'translateY(-3px)', fontSize: 13 }}>
      <span style={{ transform: 'translateY(0.4px)', display: 'inline-block' }}>
        定额价格水平基价差异汇总表：
      </span>

      {dbInfo?.current || ''}
      <span style={{ margin: '0 5px', fontSize: 15 }}>VS</span>
      {dbInfo?.source || ''}
    </div>
  );

  /** 价格差异对比表 */
  const generateTable: BaseTableProps = {
    persistenceKey: 'PAGESDATABASEDBCONTRASTPRICELEVELBYCHAPTER',
    service: {
      dataSourceRequest: async (p) => fetchDbChapterQueryPriceDifference(p, dbSelection, setDbInfo),
    },
    columns: useTableColumns,
    rowSelection: false,
    calcTotal: true,
    expandable: {},
    search: false,
    toolbarAfter,
    toolbar,
  };

  /** 弹窗属性 */
  const triggerControl = async () => {
    return await determineTriggerControl(dbSelection);
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonPrimary">
      <AlignCenterOutlined /> 定额造价水平对比-章节对比
    </Button>
  );

  /** 对比表 */
  const ModalRender = (
    <section style={{ height: 480 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: true,
    triggerControl,
    width: 1100,
  };

  return (
    <ModalButton
      modalTitle="定额造价水平对比-章节对比"
      determineActionCurrent={false}
      modalProps={modalProps}
      trigger={triggerBtn}
      render={ModalRender}
    />
  );
};
