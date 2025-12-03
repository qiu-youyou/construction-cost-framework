/*
 * @Author: SHUANG
 * @Date: 2024-03-12 17:38:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 16:54:01
 * @Description: 工程造价-工程量清单编制-定额 - 子目取费
 */

import { Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import useDbFeeDetailTableColumns from '@/pages/database/DbFee/DbFeeDetailTable/useTableColumns';
import { UnitPriceNormItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/typings';
import { DbFeeDetailItem } from '@/pages/database/DbFee/DbFeeDetailTable/typings';
import DbFeeDetailTable from '@/pages/database/DbFee/DbFeeDetailTable';

import * as TYPES from './typings';
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

  const unitPriceId = unitPriceNormActionCurrent?.unitPriceId || ''; //	综合单价库ID
  const unitPriceNormId = unitPriceNormActionCurrent?.id || ''; //	综合单价定额ID
  const projectId = unitPriceNormActionCurrent?.projectId || ''; //	项目ID
  const stageId = unitPriceNormActionCurrent?.stageId || ''; //	阶段ID

  const serviceParams = { unitPriceId, unitPriceNormId, projectId, stageId };

  /** 取费明细 操作栏 */
  const toolbar: TableToolbarDefine<DbFeeDetailItem> = {
    plusLine: { onSubmit: API.productUnitPriceNormFeeSaveBlankRow },
    deleted: { onSubmit: API.productUnitPriceNormFeeDeleteByIds },
  };
  /** 定额信息明细 定额对应参数 重写 SERVICE */
  const dbFeeDetailTableProps: Partial<BaseTableProps<DbFeeDetailItem, TYPES.ProductNormFeeQuery>> = {
    service: {
      dataSourceRequest: API.productUnitPriceNormFeeQueryPageInfo,
      cellEditSaveRequest: API.productUnitPriceNormFeeUpdateRow,
      manualRequest: !unitPriceNormId,
      params: serviceParams,
    },
    toolbarAuthority: false,
    cellEditable: true,
    toolbar,
  };

  /** 编辑方法 */
  const cellEditSaveRequest = async (p: FETCH.CellEditReq) => {
    return await API.productUnitPriceNormFeeUpdateRow(p, serviceParams);
  };

  /** 组成新的 COLUMNS */
  const dbFeeDetailTableColumns: any = [
    ...useDbFeeDetailTableColumns({
      cellEditSaveRequest,
      readonly: true,
    })?.filter((item) => item?.dataIndex !== 'baseFeeRate' && item?.dataIndex !== 'feeRateQ'),
    {
      title: '修改记录',
      dataIndex: 'feeLog',
      valueType: 'textarea',
      ellipsis: false,
      customRender: (_: any, { feeLog }: any) => {
        return <ChangeLogText changeLog={feeLog} />;
      },
      search: false,
    },
  ];

  /** 定额明细信息 PANE */
  const DbNormPaneRender = (
    <section style={{ height: 520 }}>
      <DbFeeDetailTable
        dbFeeDetailTableColumns={dbFeeDetailTableColumns}
        tableProps={dbFeeDetailTableProps}
      />
    </section>
  );

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonCyan">
      <FileTextOutlined /> 子目取费
    </Button>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: false,
    width: 1200,
    afterClose,
  };

  return (
    <ModalButton
      modalTitle="子目取费"
      determineActionCurrent={!unitPriceNormId}
      render={DbNormPaneRender}
      modalProps={modalProps}
      trigger={triggerBtn}
    />
  );
};
