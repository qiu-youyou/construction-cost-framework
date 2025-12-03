/*
 * @Author: SHUANG
 * @Date: 2023-11-16 18:15:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 18:14:27
 * @Description: 标准综合单价库 - 清单定额 - 子目取费
 */
import { Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import useDbFeeDetailTableColumns from '@/pages/database/DbFee/DbFeeDetailTable/useTableColumns';
import { DbFeeDetailItem } from '@/pages/database/DbFee/DbFeeDetailTable/typings';
import DbFeeDetailTable from '@/pages/database/DbFee/DbFeeDetailTable';

import { UnitPriceNormItem } from '../typings';
import * as TYPES from './typings';
import * as API from './services';

type Props = { unitPriceNormActionCurrent?: UnitPriceNormItem };

export default (props: Props) => {
  const { unitPriceNormActionCurrent } = props;
  const dbFeeDirectoryCurrent: any = { dbId: unitPriceNormActionCurrent?.dbId };

  /** 清单定额 当前定额ID */
  const unitPriceNormId = unitPriceNormActionCurrent?.id || '';
  /** 清单定额 当前清单明细 ID */
  const unitPriceId = unitPriceNormActionCurrent?.unitPriceId || '';
  /** 清单定额 当前综合单价目录 ID */
  const unitPriceDbId = unitPriceNormActionCurrent?.unitPriceDbId || '';

  /** 定额信息明细 定额对应参数 重写 SERVICE */
  const dbFeeDetailTableServiceConfig: BaseTableProps<
    DbFeeDetailItem,
    TYPES.UnitPriceNormFeeQuery
  >['service'] = {
    dataSourceRequest: API.unitPriceFeeQueryPageInfo,
    params: { unitPriceId, unitPriceDbId, unitPriceNormId },
    manualRequest: !unitPriceNormId,
  };

  /** 定额明细信息 PANE */
  const DbNormPaneRender = (
    <section style={{ height: 520 }}>
      <DbFeeDetailTable
        dbFeeDetailTableColumns={useDbFeeDetailTableColumns({ readonly: true })?.filter(
          (item) => item?.dataIndex !== 'baseFeeRate' && item?.dataIndex !== 'feeRateQ',
        )}
        dbFeeDetailTableServiceConfig={dbFeeDetailTableServiceConfig}
        dbFeeDirectoryCurrent={dbFeeDirectoryCurrent}
        readonly={true}
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
    width: 1150,
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
