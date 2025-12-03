/*
 * @Author: SHUANG
 * @Date: 2024-03-05 11:05:17
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 14:58:46
 * @Description: 基础企业定额维护 - 人材机、混凝土、机械台班 主表
 */
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import DbMatMainTable from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable';
import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import { DbMatProps } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import { PropsDbMat } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';

import DbMatQuerySelection from '@/pages/database/DbMain/DatabaseMain/DataBasePane/common/DbMatQuerySelection';
import { ClassifyRjcType } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/common/DbMatQuerySelection';
import { DbMatClassifyItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatClassifyTree/typings';

import { BasicDatabaseDbSyncInfoJson } from '../../../typings';
import {
  basicDatabaseDbqueryPageInfoNotExistsMaintenance,
  basicDatabaseDbBatchInsertMaintenanceByIds,
} from '../../../services';
import useServices, {
  dbBasicQueryNormByMatClassifyDetailIds,
  dbBasicMatUpdateDetailMatByDbId,
} from './useServices';

export default (props: DbMatProps) => {
  /** 当前数据库 */
  const classifyRjcType = props?.classifyRjcType || 'rcj';
  const { databaseCurrent, dbMatClassifyCurrent: dbMatClassifyCurrentProps } = props;
  const { dbMatMainTableRef, dbMatContentTableRef } = props;

  /** 当前MAT目录章节 */
  const [dbMatClassifyCurrent, setDbMatClassifyCurrent] = useState<DbMatClassifyItem>();

  /** 当前业务主键 */
  const dbId = dbMatClassifyCurrent?.dbId || '';
  const classifyId = dbMatClassifyCurrent?.id || '';
  const businessId = databaseCurrent?.id || '';

  /** 人材机、混凝土、机械台班 查询 */
  const primaryCurrent = {
    ...dbMatClassifyCurrent,
    id: !dbMatClassifyCurrent?.children?.length ? dbMatClassifyCurrent?.id : '',
  } as any;

  const classifyRjcTypeMap: any = {
    rcj: {
      trigger: (
        <Button disabled={!primaryCurrent?.id} type="primary" className="PlusButton">
          <PlusOutlined /> 查询人材机
        </Button>
      ),
      saveKey: 'insertRcjInformation',
      modalTitle: '查询人材机',
    },
    machine: {
      trigger: (
        <Button disabled={!primaryCurrent?.id} type="primary" className="PlusButton">
          <PlusOutlined /> 查询机械台班
        </Button>
      ),
      saveKey: 'insertMachineInformation',
      modalTitle: '查询机械台班',
    },
    concrete: {
      trigger: (
        <Button disabled={!primaryCurrent?.id} type="primary" className="PlusButton">
          <PlusOutlined /> 查询混凝土配合比
        </Button>
      ),
      saveKey: 'insertConcreteInformation',
      modalTitle: '查询混凝土配合比',
    },
  };

  /**  NORMTABLE TOOLBAR - 定额查询并增加  兼容关联章节查询 */
  const matMainDataSourceRequest = async (params: any) => {
    const finalParams: FETCH.Req = { ...params };
    const searchParams = finalParams?.searchParams;
    if (searchParams && searchParams !== '{}') {
      const searchParamsJSON = JSON.parse(searchParams);
      if (searchParamsJSON?.scopeLike != '1') {
        delete finalParams?.classifyId;
      }
      delete searchParamsJSON?.scopeLike;
      finalParams.searchParams = JSON.stringify(searchParamsJSON);
    }
    return await basicDatabaseDbqueryPageInfoNotExistsMaintenance({
      ...finalParams,
      businessId,
    });
  };

  /** 保存查询的人材机 */
  const dbMatQuerySelectionOnSubmit = async (selection: DbMatItem[]) => {
    const basicDatabaseDbSyncInfoJson: BasicDatabaseDbSyncInfoJson = {
      copyIds: selection?.map((item) => item.id),
      businessId,
      dbId,
    };
    const insertNormInformation: string = JSON.stringify(basicDatabaseDbSyncInfoJson);
    const params: any = {};
    params[`${classifyRjcTypeMap[classifyRjcType]?.saveKey}`] = insertNormInformation;
    const res = await basicDatabaseDbBatchInsertMaintenanceByIds(params);

    /** 刷新MAT明细表 以及 MAT含量表 */
    if (res?.status === 'SUCCESS') {
      dbMatMainTableRef?.current?.reload?.();
      dbMatContentTableRef?.current?.reload?.();
    }
    return res;
  };

  const toolbarPlusTrigger = (
    <DbMatQuerySelection
      modalStyle={{ top: 115, left: '6vw' }}
      databaseCurrent={{ ...databaseCurrent, id: dbId } as any}
      classifyRjcTypePane={[classifyRjcType as ClassifyRjcType]}
      modalTitle={classifyRjcTypeMap[classifyRjcType]?.modalTitle}
      trigger={classifyRjcTypeMap[classifyRjcType]?.trigger}
      matMainDataSourceRequest={matMainDataSourceRequest}
      onSubmit={dbMatQuerySelectionOnSubmit}
      primaryCurrent={primaryCurrent}
      okText="确 定"
      queryByDb
    />
  );

  /** 重写 DBMAT */
  const DbMatMainTableReWrite: PropsDbMat = {
    dbMatMainTableProps: {
      service: { params: { businessId, classifyId, dbId }, manualRequest: !classifyId },
      toolbar: { plusLine: { trigger: toolbarPlusTrigger, triggerType: 'submit' }, copy: { auth: false } },
    },
    dbMatMainUseServices: () => ({
      ...useServices(),
      queryNormByMatClassifyDetailIds: async (p: any) =>
        await dbBasicQueryNormByMatClassifyDetailIds({ ...p, businessId }),
      dbMatUpdateDetailMatByDbId: async (p: any) =>
        await dbBasicMatUpdateDetailMatByDbId({ ...p, businessId }),
    }),
  };

  useEffect(() => {
    if (dbMatClassifyCurrentProps?.id != dbMatClassifyCurrent?.id) {
      setDbMatClassifyCurrent(dbMatClassifyCurrentProps);
    }
  }, [dbMatClassifyCurrentProps]);

  return <DbMatMainTable {...props} {...DbMatMainTableReWrite} />;
};
