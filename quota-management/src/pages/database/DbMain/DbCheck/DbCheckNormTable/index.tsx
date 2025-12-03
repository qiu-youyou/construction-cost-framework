/*
 * @Author: SHUANG
 * @Date: 2023-11-21 17:35:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-28 09:24:09
 * @Description: 定额库-定额审查 数据校核
 */
import { Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps } from 'jd-framework-web/package/components';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import { DatabaseDbItem } from '../../DatabaseMain/typings';
import useTableColumns from './useTableColumns';
import { dbQueryCheckNorm } from '../services';
import * as TYPES from '../typings';

type Props = { databaseCurrent?: DatabaseDbItem };

export default (props: Props) => {
  /** 当前定额库 */
  const { databaseCurrent } = props;
  const dbId = databaseCurrent?.id || '';

  /** 综合单价 清单特征表 */
  const generateTable: BaseTableProps<TYPES.DbCheckNormItem, TYPES.DbCheckQuery> = {
    persistenceKey: 'PAGESDATABASEDBCHECKNORMTABLE',
    service: {
      dataSourceRequest: dbQueryCheckNorm,
      manualRequest: !dbId,
      params: { dbId },
    },
    columns: useTableColumns,
    rowSelection: false,
    search: false,
    rowKey: false,
  };

  /** 触发按钮 */
  const modalTrigger = (
    <Button className="BorderButtonBlue">
      <FileTextOutlined /> 数据校核
    </Button>
  );

  /** 数据校核 */
  const ModalRender = (
    <section style={{ height: 480 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  /** 弹窗属性 */
  const modalProps = {
    width: 1200,
  };

  return (
    <ModalButton
      modalTitle="数据校核"
      determineActionCurrent={!dbId}
      modalProps={modalProps}
      trigger={modalTrigger}
      render={ModalRender}
    />
  );
};
