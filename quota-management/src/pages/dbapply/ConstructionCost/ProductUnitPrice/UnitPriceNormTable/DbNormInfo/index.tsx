/*
 * @Author: SHUANG
 * @Date: 2023-11-16 15:15:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-10 09:43:50
 * @Description: 工程造价-工程量清单编制-综合单价 定额 查看定额信息
 */
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

/** 引用基础库 查看定额信息 */
import { UnitPriceNormItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/typings';
import DbNormPane from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane';

/** 引用基础库 人材机含量 */
import useMatTableColumns from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormMatContent/useTableColumns';
/** 引用基础库 参数列配置 */
import useDbNormParamsTableColumns from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormParams/useTableColumns';
import { DbNormMatContentItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormMatContent/typings';

import ApplyMultiformMechanical from '../../../MultiformMechanical/ApplyMultiformMechanical';
import MatStoreInTemporary from './MatStoreInTemporary';
import * as API from './services';

type Props = {
  /** 当前综合单价定额 */
  unitPriceNormActionCurrent?: UnitPriceNormItem;
  /** 弹窗关闭前方法 */
  afterClose?: () => void;
};

export default (props: Props) => {
  const { afterClose } = props;
  const { unitPriceNormActionCurrent } = props;

  const dbNormCurrent: any = unitPriceNormActionCurrent;

  /** 清单定额 当前项目 当前阶段 */
  const stageId = unitPriceNormActionCurrent?.stageId || '';
  const projectId = unitPriceNormActionCurrent?.projectId || '';

  /** 清单定额 当前清单明细 ID */
  const unitPriceId = unitPriceNormActionCurrent?.unitPriceId || '';
  /** 清单定额 当前定额ID */
  const unitPriceNormId = unitPriceNormActionCurrent?.id || '';

  /** 人材机表 REF */
  const dbNormMatContentTableRef = useRef<TableActionType>();

  /** 给定额 与 人材机权限 */
  const databaseCurrent: any = { id: unitPriceNormActionCurrent?.dbId };

  /** 关联参数· */
  const serviceParams = { stageId, projectId, unitPriceId, unitPriceNormId };

  /** 应用组时费 */
  const [dbNormMatContentActionCurrent, setDbNormMatContentActionCurrent] = useState<DbNormMatContentItem>();

  /** 当前人材机含量 */
  const [dbNormMatContentCurrent, setDbNormMatContentCurrent] = useState<DbNormMatContentItem>();

  /** 当前人材机选择 */
  const [dbNormMatContentSelection, setDbNormMatContentSelection] = useState<DbNormMatContentItem[]>();

  /** 人材机含量应用组时费 */
  const productUnitPriceNormMatUpdateByMultiformMechanical = async (current: any) => {
    const params = {
      id: dbNormMatContentActionCurrent?.id || '', // 综合单价定额人材机行ID
      multiformMechanicalId: current?.id || '', // 组时费ID
      ...serviceParams,
    };
    const res = await API.productUnitPriceNormMatUpdateByMultiformMechanicalId(params);
    if (res?.status === 'SUCCESS') {
      dbNormMatContentTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 应用组时费 人材机存入临时库 */
  const toolbarAfter = (
    <>
      {/* 应用组时费 */}
      <ApplyMultiformMechanical
        productActionCurrent={{ projectId, id: stageId } as any}
        primaryCurrent={{ id: dbNormMatContentActionCurrent?.id }}
        onSubmit={productUnitPriceNormMatUpdateByMultiformMechanical}
      />

      <span className="gap-wrapper">｜</span>

      {/* 人材机存入临时库 */}
      <MatStoreInTemporary
        unitPriceNormActionCurrent={unitPriceNormActionCurrent}
        dbNormMatContentSelection={dbNormMatContentSelection}
        dbNormMatContentCurrent={dbNormMatContentCurrent}
      />
    </>
  );

  /** 引用 定额信息明细 人材机含量表 重写  */
  const dbNormMatTableProps = {
    onActionCurrent: setDbNormMatContentActionCurrent,
    onSelections: setDbNormMatContentSelection,
    onCurrent: setDbNormMatContentCurrent,
    service: { params: serviceParams },
    toolbarAfter,
  };

  /** 重写人材机 service */
  const dbNormMatUseServices = () => ({
    dbNormMatContentQueryPageInfo: API.productUnitPriceNormMatQueryPageInfo,
    dbNormMatContentDeleteByIds: API.productUnitPriceNormMatDeleteByIds,
    matMainQueryPageInfoNotExistsNormMat: API.productMatMainQueryPageInfoNotExistsNormMat,

    dbNormMatContentSaveSelectMatDetail: async (p: any) => {
      delete p?.normId;
      return await API.productUnitPriceNormInsert({ ...p, ...serviceParams });
    },
    dbNormMatContentUpdateRow: async (p: FETCH.CellEditReq) => {
      const { filedName, newValue, id } = p;
      const res = await API.productUnitPriceNormMatUpdateRow({ filedName, newValue, id, ...serviceParams });
      return res;
    },
  });

  /** 定额材料含量 */
  const dbNormMatUseTableColumns = (args: any) => {
    const columns = useMatTableColumns(args);
    const editField = ['matCode', 'matName', 'matUnit', 'matMarkPrice'];

    const newColumns = columns.map((item: any) => {
      if (editField.includes(item?.dataIndex)) return { ...item, cellEdit: true };
      return item;
    });

    /** 增加市场价 */
    const markPrice = { title: '市场价(元)', dataIndex: 'matMarkPrice', valueType: 'digit', search: false };
    const findIndex = columns.findIndex((item) => item.dataIndex === 'matPrice');
    newColumns?.splice(findIndex, 0, { ...markPrice, cellEdit: true });

    return newColumns;
  };

  /** 定额信息明细 查看人材料机配合比 重写 SERVICE */
  const mixProportionServiceConfig: BaseTableProps['service'] = {
    dataSourceRequest: API.productUnitPriceNormMatQueryPageInfo,
    manualRequest: !unitPriceNormId,
    params: serviceParams,
  };

  /** 重写定额参数表 */
  const dbNormParamsTableProps: Partial<BaseTableProps> = {
    service: {
      dataSourceRequest: API.productUnitPriceNormParamsQueryPageInfo,
      manualRequest: !unitPriceNormId,
      params: serviceParams,
    },
    columns: useDbNormParamsTableColumns?.filter((item) => item.dataIndex !== 'paramsLog'),
  };

  /** 定额明细信息 PANE */
  const DbNormPaneRender = (
    <section style={{ height: 520 }}>
      <DbNormPane
        dbNormMatProps={{ databaseCurrent: { ...databaseCurrent, access: ['norm', 'rcj'] } }}
        mixProportionServiceConfig={mixProportionServiceConfig}
        dbNormMatUseTableColumns={dbNormMatUseTableColumns}
        dbNormMatContentTableRef={dbNormMatContentTableRef}
        dbNormParamsTableProps={dbNormParamsTableProps}
        dbNormMatUseServices={dbNormMatUseServices}
        dbNormMatTableProps={dbNormMatTableProps}
        databaseCurrent={databaseCurrent}
        dbNormCurrent={dbNormCurrent}
      />
    </section>
  );

  /** 弹窗属性 */
  const modalProps = {
    style: { top: 80, left: '2vw' },
    defaultFullScreen: false,
    width: 1150,
    afterClose,
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="EditButton">
      <EyeOutlined /> 查看定额信息
    </Button>
  );

  return (
    <ModalButton
      modalTitle="查看定额信息"
      determineActionCurrent={!unitPriceNormId}
      render={DbNormPaneRender}
      modalProps={modalProps}
      trigger={triggerBtn}
    />
  );
};
