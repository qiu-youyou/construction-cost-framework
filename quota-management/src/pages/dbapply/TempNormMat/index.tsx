/*
 * @Author: SHUANG
 * @Date: 2024-04-17 15:03:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 10:54:01
 * @Description: 人材机临时库
 */
import { Button, CheckboxProps } from 'antd';
import { useRef, useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import { BaseTableProps, TableActionType, TableToolbarDefine } from 'jd-framework-web/package/components';
import MixProportion from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormMatContent/MixProportion';
import useTableColumns from './useTableColumns';
import { TempNormMatItem } from './typings';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';
import * as API from './services';

/** 查看配合比 */
const modalProps = { defaultFullScreen: false, style: { top: 150, left: '5vw' }, width: 1100, mask: false };

export default () => {
  const tempNormMatTableRef = useRef<TableActionType>();

  /** 材料、当前 设置当前 */
  const [tempNormMatCurrent, setTempNormMatCurrent] = useState<TempNormMatItem>();

  /** 已选数据 */
  const [tempNormMatSelection, setTempNormMatSelection] = useState<TempNormMatItem[]>();

  /** 查看配合比 */
  const MixProportionRender = <MixProportion dbNormMatContentCurrent={tempNormMatCurrent} />;

  /** 接受、拒绝 */
  const toolbarBefore = (
    <>
      <AcceptButton tempNormMatSelection={tempNormMatSelection} tempNormMatTableRef={tempNormMatTableRef} />
      <RejectButton tempNormMatSelection={tempNormMatSelection} tempNormMatTableRef={tempNormMatTableRef} />
    </>
  );

  const getCheckboxProps: (
    record: TempNormMatItem,
  ) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>> = (record) => {
    return { disabled: record?.syncDatabaseStatus == 'Y' || record?.syncDatabaseStatus == 'N' };
  };

  /** 查看配合比 */
  const MixProportionTrigger = (
    <Button className="BorderButtonPrimary">
      <EyeOutlined /> 查看配合比
    </Button>
  );

  /** TOOLBAR */
  const toolbar: TableToolbarDefine = {
    editMore: {
      render: MixProportionRender,
      trigger: MixProportionTrigger,
      buttonText: '查看配合比',
      modalProps,
    },
  };

  const generateTable: BaseTableProps<TempNormMatItem> = {
    persistenceKey: 'PAGES_DBAPPLY_TEMP_NORM_MAT_TABLE',
    service: { dataSourceRequest: API.tempNormMatQueryPageInfo },
    onActionCurrent: setTempNormMatCurrent,
    onSelections: setTempNormMatSelection,
    rowSelection: { getCheckboxProps },
    actionRef: tempNormMatTableRef,
    columns: useTableColumns,
    virtual: false,
    toolbarBefore,
    toolbar,
  };

  return (
    <ViewContainer>
      <BaseTable {...generateTable} />
    </ViewContainer>
  );
};
