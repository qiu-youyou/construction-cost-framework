/*
 * @Author: SHUANG
 * @Date: 2024-03-04 14:06:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-19 14:12:51
 * @Description: 基础企业定额库 定额维护
 */
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DbNormProps, PropsDbNorm } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/typings';
import { DbNormItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';
import DbNormTable from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable';
import { basicDatabaseDbqueryPageInfoNotExistsNormMaintenance } from '../../../services';
import { basicDatabaseDbBatchInsertMaintenanceByIds } from '../../../services';
import { DataBaseProps } from '@/pages/database/DbMain/DatabaseMain/typings';
import DbNormBorrow from '@/pages/database/common/DbNormBorrow';
import { BasicDatabaseDbSyncInfoJson } from '../../../typings';
import useServices from '../DbBasicNormTable/useServices';

export default (props: DbNormProps & DataBaseProps) => {
  /** REF */
  const { dbNormTableRef } = props;

  /** 当前数据库 */
  const { databaseCurrent } = props;

  /** 当前业务主键 */
  const dbId = databaseCurrent?.dbId || '';
  const businessId = databaseCurrent?.id || '';

  /** NORMTABLE TOOLBAR - 定额查询并增加 */
  const dbNormBorrowTrigger = (
    <Button type="primary" className="PlusButton" icon={<PlusOutlined />}>
      定额查询
    </Button>
  );

  /**  NORMTABLE TOOLBAR - 定额查询并增加 */
  const fetchDbNormBorrowOnSubmit = async (selection?: DbNormItem[]) => {
    if (!selection?.length) return;
    const basicDatabaseDbSyncInfoJson: BasicDatabaseDbSyncInfoJson = {
      copyIds: selection?.map((item) => item.id),
      businessId,
      dbId,
    };
    const insertNormInformation: string = JSON.stringify(basicDatabaseDbSyncInfoJson);
    const res = await basicDatabaseDbBatchInsertMaintenanceByIds({ insertNormInformation });

    if (res?.status === 'SUCCESS') {
      dbNormTableRef?.current?.reload?.();
    }
    return res as any;
  };

  /**  NORMTABLE TOOLBAR - 定额查询并增加  兼容关联章节查询 */
  const dbNormTableProps: PropsDbNorm['dbNormTableProps'] = {
    service: {
      dataSourceRequest: async (params) => {
        const finalParams: FETCH.Req = { ...params };
        const searchParams = finalParams?.searchParams;
        if (searchParams && searchParams !== '{}') {
          const searchParamsJSON = JSON.parse(searchParams);
          if (searchParamsJSON?.scopeLike != '1') {
            delete finalParams?.chapterId;
          }
          delete searchParamsJSON?.scopeLike;
          finalParams.searchParams = JSON.stringify(searchParamsJSON);
        }
        return await basicDatabaseDbqueryPageInfoNotExistsNormMaintenance({
          ...finalParams,
          businessId,
        });
      },
    },
  };

  /** 查询定额 引用借用定额 */
  const DbNormBorrowTrigger = (
    <DbNormBorrow
      databaseCurrentDefault={{ ...databaseCurrent, id: databaseCurrent?.dbId || '' } as any}
      onSubmit={fetchDbNormBorrowOnSubmit}
      dbNormTableProps={dbNormTableProps}
      triggerButton={dbNormBorrowTrigger}
      dbSelectorDisabled
      modalTitle="定额查询"
      okText="保 存"
    />
  );

  /** 重写 NORMTABLE */
  const DbNormTableReWrite: PropsDbNorm = {
    dbNormTableProps: {
      service: { params: { businessId, dbId }, manualRequest: !businessId },
      toolbar: { plusLine: { trigger: DbNormBorrowTrigger, triggerType: 'submit' }, copy: { auth: false } },
      toolbarPrimary: <></>,
    },
    dbNormUseServices: useServices,
  };

  return <DbNormTable {...props} {...DbNormTableReWrite} />;
};
