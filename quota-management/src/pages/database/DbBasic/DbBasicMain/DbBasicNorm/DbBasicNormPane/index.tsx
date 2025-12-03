/*
 * @Author: SHUANG
 * @Date: 2024-03-04 15:16:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 18:58:21
 * @Description: 基础企业定额维护-定额PANE
 *
 */
import DbNormPane from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane';
import { DbNormProps } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/typings';
import { PropsDbNormInfo } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/typings';

import useServices from '../DbBasicNormTable/useServices';
import useParamsServices from './useParamsServices';
import { DbBasicNormQuery } from '../../../typings';

import useMatServices, {
  dbBasicmatMainQueryPageInfoNotExistsNormMat,
  dbBasicNormMatContentSaveSelectMatDetail,
  dbBasicNormMatContentQueryPageInfo,
  dbBasicNormMatContentUpdateRow,
} from './useMatServices';

export default (props: DbNormProps) => {
  /** 当前定额 当前数据库 */
  const { dbNormCurrent } = props;
  const { databaseCurrent } = props;

  /** 库ID 章节ID 定额明细ID */
  const dbId = dbNormCurrent?.dbId || '';
  const normId = dbNormCurrent?.id || '';
  const chapterId = dbNormCurrent?.chapterId || '';

  /** 当前业务主键 */
  const businessId = databaseCurrent?.id || '';

  /** 重写 NORM PANE */
  const DbNormPaneReWrite: PropsDbNormInfo = {
    //** 注，工作内容，适用范围 */
    dbNormDescUseServices: useServices,

    /** 定额明细 定额参数 */
    dbNormParamsTableProps: { service: { params: { dbId, normId, chapterId, businessId } } },
    /** 定额明细 定额参数 Service */
    dbNormParamsUseServices: useParamsServices,

    /** 定额明细 定额含量 */
    mixProportionServiceConfig: {
      dataSourceRequest: dbBasicNormMatContentQueryPageInfo,
      params: { businessId },
    },
    dbNormMatTableProps: { service: { params: { dbId, normId, chapterId, businessId } } },

    /** 定额明细 定额人才及含量 */
    dbNormMatUseServices: () => ({
      ...useMatServices(),
      /** 重写相关接口 携带 businessId */
      matMainQueryPageInfoNotExistsNormMat: async (p: FETCH.Req & DbBasicNormQuery) =>
        await dbBasicmatMainQueryPageInfoNotExistsNormMat({ ...p, businessId }),
      dbNormMatContentSaveSelectMatDetail: async (p: any) =>
        await dbBasicNormMatContentSaveSelectMatDetail({ ...p, businessId }),
      dbNormMatContentUpdateRow: async (p: any) => await dbBasicNormMatContentUpdateRow({ ...p, businessId }),
    }),
  };

  return <DbNormPane {...props} {...DbNormPaneReWrite} />;
};
