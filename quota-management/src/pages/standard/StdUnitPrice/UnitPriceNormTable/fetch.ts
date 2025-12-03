/*
 * @Author: SHUANG
 * @Date: 2023-11-16 14:40:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-23 13:51:49
 * @Description: 标准综合单价库 - 清单定额
 */
import { Modal } from 'antd';
import { TableActionType } from 'jd-framework-web/package/components';

import { DbNormItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';
import { DbFeeDirectoryItem } from '@/pages/database/DbFee/DbFeeDirectoryTree/typings';

import { UnitPriceNormItem, UnitPriceNormSave, UpdateBatchSetFeeParams } from './typings';
import { UnitPriceDetailItem } from '../UnitPriceDetailTable/typings';
import * as API from './services';

/**
 * @Author: SHUANG
 * @Description: 定额 查询 增加
 * @Date: 2023-11-16 14:41:20
 * @name normSelection 已经选择的定额
 * @name unitPriceDetailCurrent 清单明细 当前选择
 * @name unitPriceNormTableRef 当前清单定额 表 REF
 */
export const fetchUnitPriceNormSyncInserNorm = async (
  normSelection?: DbNormItem[],
  unitPriceDetailCurrent?: UnitPriceDetailItem,
  unitPriceNormTableRef?: TableActionType,
) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] };
  if (!normSelection) return errorReturn;

  /** 综合单价 当前清单明细 ID */
  const unitPriceId = unitPriceDetailCurrent?.id || '';
  /** 综合单价 当前综合单价目录 ID */
  const unitPriceDbId = unitPriceDetailCurrent?.unitPriceDbId || '';

  // 将 normSelection 中每项的dbId提取出来 不提取重复的
  const normDbIdsSele = normSelection?.map((item) => item.dbId) || [];
  const normDbIds = new Set(normDbIdsSele);

  /** 跟酒不同DBID 发送队列 */
  const promiseQueue = [];

  for (const dbId of normDbIds) {
    const normSelectionFilter = normSelection.filter((item) => item.dbId === dbId);
    const normIds = normSelectionFilter?.map((item: any) => item?.normId || item.id) || [];

    const finalParams: UnitPriceNormSave = {
      dbId, // 定额库ID
      unitPriceDbId, // 映射库目录ID
      unitPriceId, // 清单ID
      normIds,
    };
    promiseQueue.push(API.unitPriceNormSyncInserNorm(finalParams));
  }
  const res = await Promise.all(promiseQueue);

  if (res?.[0]?.status === 'SUCCESS') {
    unitPriceNormTableRef?.current?.reload?.();
  }
  return res?.[0];
};

/**
 * @Author: SHUANG
 * @Description: 批量设置子目取费验证
 * @Date: 2023-11-20 10:05:25
 * @name unitPriceNormSelection 当前勾选的定额
 * @name unitPriceNormActionCurrent 当前操作的定额
 */
export const UpdateSetFeeTriggerControl = async (
  unitPriceNormSelection?: UnitPriceNormItem[],
  unitPriceNormActionCurrent?: UnitPriceNormItem,
) => {
  /** 当前批量操作的数组 */
  const hasSelection = !!unitPriceNormSelection?.length;
  /** 如果有勾选的数据使用勾选的 无则使用 action row */
  const unitPriceNormArr = hasSelection
    ? unitPriceNormSelection
    : unitPriceNormActionCurrent
    ? [unitPriceNormActionCurrent]
    : [];

  const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
  if (!unitPriceNormArr?.length) {
    Modal.warning({ title: '继续操作', content: `请选择要操作的定额！` });
    return errorReturn;
  }

  // 判断 unitPriceNormArr中每一项的 dbId 是否全部一致
  const unitPriceNormArrDBId = unitPriceNormArr.map((item) => item?.dbId);
  const unitPriceNormArrDBIdIsSame = unitPriceNormArrDBId?.every((item) => item === unitPriceNormArrDBId[0]);

  if (!unitPriceNormArrDBIdIsSame) {
    Modal.warning({ title: '继续操作', content: `请选择相同数据库的定额进行批量操作！` });
    return errorReturn;
  }

  return { ...errorReturn, status: 'SUCCESS' };
};

/**
 * @Author: SHUANG
 * @Description: 保存当前设置的取费
 * @Date: 2023-11-20 10:12:00
 * @name DbFeeDirectoryItem 当前取费目录
 * @name unitPriceNormSelection 当前勾选的 清单定额明细
 * @name unitPriceNormActionCurrent 当操作的 清单定额明细、
 * @name unitPriceNormTableRef 当前定额表REF
 * @name unitPriceDetailTableRef 当前清单表REF
 */

export const fetchUnitPriceNormUpdateBatchSetFee = async (
  dbFeeDirectoryCurrent?: DbFeeDirectoryItem,
  unitPriceNormSelection?: UnitPriceNormItem[],
  unitPriceNormActionCurrent?: UnitPriceNormItem,
  unitPriceNormTableRef?: TableActionType,
  unitPriceDetailTableRef?: TableActionType,
) => {
  /** 当前操作的的定额明细 */
  const hasSelection = !!unitPriceNormSelection?.length;
  const unitPriceNormArr = hasSelection
    ? unitPriceNormSelection
    : unitPriceNormActionCurrent
    ? [unitPriceNormActionCurrent]
    : [];

  const dbId = dbFeeDirectoryCurrent?.dbId || '';
  const feeDirectoryId = dbFeeDirectoryCurrent?.id || '';
  const normIds: any = unitPriceNormArr?.map((item) => item?.id);

  const finalParams: UpdateBatchSetFeeParams = {
    unitPriceDbId: unitPriceNormArr?.[0]?.unitPriceDbId || '', // 映射库目录ID
    unitPriceId: unitPriceNormArr?.[0]?.unitPriceId || '', // 清单ID
    feeDirectoryId, // 定额取费目录ID
    normIds, // 定额ID
    dbId, // 定额库
  };

  const res = await API.unitPriceNormUpdateBatchSetFee(finalParams);
  if (res?.status === 'SUCCESS') {
    unitPriceNormTableRef?.current?.reload?.();
    unitPriceDetailTableRef?.current?.reload?.();
  }
  return res;
};

/**
 * @Author: SHUANG
 * @Description: 删除定额明细方法
 * @Date: 2023-11-23 13:49:36
 * @name args 默认参数
 * @name unitPriceDetailTableRef 当前清单表REF
 */
export const fetchUnitPriceNormDeleteByIds = async (
  args: FETCH.UpStatus,
  unitPriceDetailTableRef?: TableActionType,
) => {
  const res = await API.unitPriceNormDeleteByIds(args);
  if (res?.status === 'SUCCESS') unitPriceDetailTableRef?.current?.reload?.();
  return res;
};
