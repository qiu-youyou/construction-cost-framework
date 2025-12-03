/*
 * @Author: SHUANG
 * @Date: 2023-11-21 17:35:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-20 11:39:01
 * @Description: 定额库-定额审查 数据校核
 */
import { Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps } from 'jd-framework-web/package/components';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import { DatabaseDbItem } from '../../DatabaseMain/typings';
import { dbQueryNormMatByLogIsNotNull } from '../services';
import useTableColumns from './useTableColumns';
import { useCellRowSpan } from '@/utils/use';
import * as TYPES from '../typings';

type Props = { databaseCurrent?: DatabaseDbItem };

export default (props: Props) => {
  /** 当前定额库 */
  const { databaseCurrent } = props;
  const dbId = databaseCurrent?.id || '';

  /** 获取数据 */
  const fetchdbQueryNormMatByLogIsNotNull = async (params: FETCH.Req<TYPES.DbCheckQuery>) => {
    const finalParams: any = { ...params };
    if (params.searchParams) {
      const searchParams = JSON.parse(params?.searchParams);
      if (searchParams?.normDateTimeStart_) {
        finalParams.normStartDateTime = searchParams.normDateTimeStart_;
        finalParams.normEndDateTime = searchParams.normDateTimeEnd_;
      }
      if (searchParams?.rcjDateTimeStart_) {
        finalParams.rcjStartDateTime = searchParams.rcjDateTimeStart_;
        finalParams.rcjEndDateTime = searchParams.rcjDateTimeEnd_;
      }
      delete searchParams?.normDateTimeStart_;
      delete searchParams?.normDateTimeEnd_;
      delete searchParams?.rcjDateTimeStart_;
      delete searchParams?.rcjDateTimeEnd_;
      finalParams.searchParams = JSON.stringify(searchParams);
    }

    const res = await dbQueryNormMatByLogIsNotNull(finalParams);
    const newRows = useCellRowSpan(res?.rows, 'id'); //处理数据
    return { ...res, rows: newRows };
  };
  /** 数据审查 修改记录汇总 */
  const generateTable: BaseTableProps<TYPES.DbCheckNormMatByLogItem, TYPES.DbCheckQuery> = {
    persistenceKey: 'PAGESDATABASEDBCHECKNORMMATLOGTABLE',
    search: { labelWidth: 130, span: { xs: 12, sm: 12, md: 12, lg: 12, xl: 8, xxl: 8 } },
    service: {
      dataSourceRequest: fetchdbQueryNormMatByLogIsNotNull,
      manualRequest: !dbId,
      params: { dbId },
    },
    columns: useTableColumns,
    rowSelection: false,
    cellEditable: true,
    rowKey: false,
  };

  /** 触发按钮 */
  const modalTrigger = (
    <Button className="BorderButtonBlue">
      <FileTextOutlined /> 汇总修改记录
    </Button>
  );

  /** 汇总修改记录 */
  const ModalRender = (
    <section style={{ height: 480 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: true,
    width: 1200,
  };

  return (
    <ModalButton
      modalTitle="汇总修改记录"
      determineActionCurrent={!dbId}
      modalProps={modalProps}
      trigger={modalTrigger}
      render={ModalRender}
    />
  );
};
