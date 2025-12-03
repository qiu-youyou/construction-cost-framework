/*
 * @Author: SHUANG
 * @Date: 2024-03-14 15:27:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 11:55:32
 * @Description: 工程造价-人材机汇总与调价 表
 */
import { Button } from 'antd';
import { DiffOutlined, EyeOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import MixProportion from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormMatContent/MixProportion';
import ApplyMultiformMechanical from '../../MultiformMechanical/ApplyMultiformMechanical';

import ApplyTransport from '../../Transport/ApplyTransport';
import MatSubsidiarySetting from '../MatSubsidiarySetting';
import MatSumRelatedNorm from '../MatSumRelatedNorm';
import useTableColumns from './useTableColumns';
import MatTypeSummary from '../MatTypeSummary';
import MatTypeSetting from '../MatTypeSetting';
import { MatSummaryProps } from '../typings';

import * as TYPES from './typings';
import * as API from './services';
import ApplyFSD from '../../FSD/ApplyFSD';

export default (props: MatSummaryProps) => {
  const { readonly } = props;
  const { matSummaryTableRef } = props;

  /** 当前材料汇总、设置当前 */
  const { matSummaryCurrent, setMatSummaryCurrent } = props;

  /** 当前产品、当前目录 */
  const { productActionCurrent, matDirectoryCurrent } = props;

  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';
  /** 当前目录 */
  const matRcjType = matDirectoryCurrent?.matRcjType || '';
  const matIsMain = matDirectoryCurrent?.matIsMain || undefined;
  const parentId = matDirectoryCurrent?.parentId || '0';
  const hasChildren = matDirectoryCurrent?.hasChildren || '';

  /** SERVICE 关联参数 工程ID、产品ID、目录类型 */
  const serviceParams = { projectId, stageId, matRcjType, matIsMain, parentId, hasChildren };

  /** 处理行编辑修改市场价 */
  const fetchCellEditSaveRequest = async (
    data: FETCH.CellEditReq,
    params?: TYPES.MatSummaryQuery,
    _?: any,
    current?: TYPES.MatSummaryItem,
    source?: TYPES.MatSummaryItem,
    otherParams?: any,
  ) => {
    if (readonly) return;
    if (!current) return;
    if (!source) return;
    /** 产品参数 */
    const proParams = { projectId, stageId };
    /** 材料参数 */
    const { matCode, matName, matUnit, matPrice } = current;
    const matParams = { matCode, matName, matUnit, matPrice };

    /** 修改前材料分类名称\修改前市场价\修改前主材标识 */
    const {
      matMarkPrice: currentMatMarkPrice,
      matTypeName: currentMatTypeName,
      matIsMain: currentMatIsMain,
    } = source;
    const curParams = { currentMatMarkPrice, currentMatTypeName, currentMatIsMain };
    const finalParams: any = { ...proParams, ...matParams, ...curParams };

    if (data.filedName === 'matMarkPrice') {
      finalParams.matMarkPrice = data.newValue;
    } else if (data.filedName === 'matIsMain') {
      finalParams.matIsMain = data.newValue;
    } else {
      finalParams[data.filedName] = data.newValue;
    }
    const res = await API.matSummaryUpdateByMatCode({ ...finalParams, ...otherParams });
    return res;
  };

  /** 应用组时费用 */
  const matSummaryUpdateByMultiformMechanical = async (current: { id: string }) => {
    if (!matSummaryCurrent) return;
    const { matCode, matName, matUnit, matIsMain, matPrice } = matSummaryCurrent;
    const { matTypeName, matTypeCode, matTypeUnit, matTypeId, matMarkPrice } = matSummaryCurrent;
    const curParams = { matCode, matName, matUnit, matIsMain, matPrice };
    const typeParams = { matTypeName, matTypeCode, matTypeUnit, matTypeId, matMarkPrice };
    const multiformMechanicalId = current?.id || '';

    const params: TYPES.MatSummaryUpdateByMultiformMechanical = {
      projectId,
      stageId,
      ...curParams,
      ...typeParams,
      multiformMechanicalId,
    };
    const res = await API.matSummaryUpdateByMultiformMechanicalId(params);
    if (res?.status === 'SUCCESS') {
      matSummaryTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 保存运杂费 风水电 替换市场价 */
  const fetchSaveMultiformTransportation = async (record: any) => {
    const multiformTransportationId = record?.id || '';
    const newValue = record?.traPriceTax || '';
    const id = matSummaryCurrent?.id || '';
    const filedName = 'matMarkPrice';

    const res = await fetchCellEditSaveRequest(
      { id, newValue, filedName },
      undefined,
      undefined,
      matSummaryCurrent,
      matSummaryCurrent,
      { multiformTransportationId },
    );
    if (res?.status === 'SUCCESS') {
      matSummaryTableRef?.current?.reload?.();
    }
    return res;
  };

  const fetchSaveMultiformFSD = async (record: any) => {
    const newValue = record?.matPrice || '';
    const id = matSummaryCurrent?.id || '';
    const filedName = 'matMarkPrice';

    const idMap: any = {
      '1': 'multiformWindId', //	风ID
      '2': 'multiformWaterId', //	水ID
      '3': 'multiformElectricId', //	电ID
    };

    const idParams: any = {};
    idParams[idMap[record?.matType]] = record?.id;

    const res = await fetchCellEditSaveRequest(
      { id, newValue, filedName },
      undefined,
      undefined,
      matSummaryCurrent,
      matSummaryCurrent,
      idParams,
    );
    if (res?.status === 'SUCCESS') {
      matSummaryTableRef?.current?.reload?.();
    }
    return res;
  };

  const toolbarAfter = (
    <>
      {/* 查看相关定额 */}
      <MatSumRelatedNorm matSummaryCurrent={matSummaryCurrent} />

      {/* 次材库查询 */}
      <MatSubsidiarySetting matSummaryTableRef={matSummaryTableRef} matSummaryCurrent={matSummaryCurrent} />

      <span className="gap-wrapper">｜</span>

      {/* 材料分类设置 */}
      <MatTypeSetting matSummaryTableRef={matSummaryTableRef} matSummaryCurrent={matSummaryCurrent} />

      {/* 材料分类汇总 */}
      <MatTypeSummary productActionCurrent={productActionCurrent} />

      <span className="gap-wrapper">｜</span>

      {/* 应用机械台班组时费 */}
      <ApplyMultiformMechanical
        productActionCurrent={productActionCurrent}
        primaryCurrent={{ id: matSummaryCurrent?.id }}
        onSubmit={matSummaryUpdateByMultiformMechanical}
      />

      {/* 运杂费 */}
      <ApplyTransport
        productActionCurrent={productActionCurrent}
        primaryCurrent={{ id: matSummaryCurrent?.id }}
        onSubmit={fetchSaveMultiformTransportation}
      />

      {/* 风水电 */}
      <ApplyFSD
        productActionCurrent={productActionCurrent}
        primaryCurrent={{ id: matSummaryCurrent?.id }}
        onSubmit={fetchSaveMultiformFSD}
      />
    </>
  );

  /** 查看配合比 */
  const matParentId = matSummaryCurrent?.id || '';
  const modalProps = { defaultFullScreen: false, style: { top: 150, left: '5vw' }, width: 1100, mask: false };
  const MixProportionRender = (
    <MixProportion
      dbNormMatContentCurrent={{ ...matSummaryCurrent, normId: '1' } as any}
      mixProportionServiceReWrite={{
        dataSourceRequest: API.matSummaryQueryPageInfoByParentId,
        params: { projectId, stageId, parentId: matParentId },
        manualRequest: !matParentId,
      }}
    />
  );

  /** 查看配合比 */
  const MixProportionTrigger = (
    <Button type="primary">
      <EyeOutlined /> 查看配合比
    </Button>
  );

  const toolbar = {
    editMore: {
      render: MixProportionRender,
      trigger: MixProportionTrigger,
      buttonText: '查看配合比',
      modalProps,
    },
  };

  const generateTable: BaseTableProps<TYPES.MatSummaryItem, TYPES.MatSummaryQuery> = {
    persistenceKey: 'PAGES_CONSTRUCTION_COST_MAT_SUMMARY',
    columns: useTableColumns({ fetchCellEditSaveRequest, matSummaryTableRef, readonly }),
    service: {
      dataSourceRequest: API.matSummaryQueryPageInfo,
      cellEditSaveRequest: fetchCellEditSaveRequest,
      manualRequest: !parentId,
      params: serviceParams,
    },
    onDoubleClick: () => ({ trigger: 'editMore' }),
    toolbarAfter: !readonly && toolbarAfter,
    onCurrent: setMatSummaryCurrent,
    actionRef: matSummaryTableRef,
    toolbarAuthority: readonly,
    cellEditable: !readonly,
    requestSummary: true,
    rowSelection: false,
    search: false,
    rowKey: false,
    toolbar,
  };

  return <BaseTable {...generateTable} />;
};
