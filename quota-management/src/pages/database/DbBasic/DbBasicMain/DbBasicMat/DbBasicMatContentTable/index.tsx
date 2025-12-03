/*
 * @Author: SHUANG
 * @Date: 2024-03-05 16:28:06
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-06 11:32:17
 * @Description: 基础企业定额维护 - 人材机、混凝土、机械台班明细表
 */
import { DbMatProps } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import { PropsDbMat } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import DbMatContentTable from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatContentTable';
import { dbBasicMatContentSaveSelectMatDetail, dbBasicMatMainQueryPageInfoNotExistsMat } from './useServices';
import { dbBasicMatDeleteByIds, dbBasicMatUpdateRow } from '../DbBasicMatMainTable/useServices';

import { dbBasicQueryNormByMatClassifyDetailIds } from '../DbBasicMatMainTable/useServices';
import { dbBasicMatUpdateDetailMatByDbId } from '../DbBasicMatMainTable/useServices';
import { dbBasicMatSaveBlankRow } from '../DbBasicMatMainTable/useServices';

import useServices from './useServices';

export default (props: DbMatProps) => {
  const { dbMatCurrent } = props;

  const { databaseCurrent } = props;

  /** 数据库ID MAT目录ID MAT明细ID */
  const dbId = dbMatCurrent?.dbId || '';
  const classifyId = dbMatCurrent?.classifyId || '';
  const matId = dbMatCurrent?.id || '';

  const businessId = databaseCurrent?.id || '';

  /** 重写 DBMAT */
  const DbMatContentTableReWrite: PropsDbMat = {
    dbMatMainUseServices: () => ({
      dbMatSaveBlankRow: async (p: any) => await dbBasicMatSaveBlankRow({ ...p, businessId }),

      dbMatUpdateRow: async (...args: any) => await dbBasicMatUpdateRow(...args, businessId),

      dbMatDeleteByIds: async (p: any) => await dbBasicMatDeleteByIds({ ...p, businessId }),

      queryNormByMatClassifyDetailIds: async (p: any) =>
        await dbBasicQueryNormByMatClassifyDetailIds({ ...p, businessId }),

      dbMatUpdateDetailMatByDbId: async (p: any) =>
        await dbBasicMatUpdateDetailMatByDbId({ ...p, businessId }),
    }),
    dbMatMainTableProps: { toolbar: { copy: { auth: false } } },

    dbMatContentTableProps: { service: { params: { businessId, classifyId, dbId, matId } } },
    dbMatContentUseServices: () => ({
      ...useServices(),
      matMainQueryPageInfoNotExistsMat: async (p: any) =>
        await dbBasicMatMainQueryPageInfoNotExistsMat({ ...p, businessId }),
      dbMatContentSaveSelectMatDetail: async (p: any) =>
        await dbBasicMatContentSaveSelectMatDetail({ ...p, businessId }),
    }),
    dbMatQuerySelectionTableProps: {
      service: { cellEditSaveRequest: dbBasicMatUpdateRow },
    },
  };

  return <DbMatContentTable {...props} {...DbMatContentTableReWrite} />;
};
