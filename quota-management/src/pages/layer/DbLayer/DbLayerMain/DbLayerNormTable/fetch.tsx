/*
 * @Author: SHUANG
 * @Date: 2023-11-20 10:53:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 15:16:47
 * @Description: 全费用定额测算 - 定额明细
 */
import { Modal } from 'antd';
import { DbChapterItem } from '@/pages/database/DbMain/DatabaseMain/DbChapterTree/typings';
import { DbFeeDirectoryItem } from '@/pages/database/DbFee/DbFeeDirectoryTree/typings';
import { TableActionType } from 'jd-framework-web/package/components';

import { dbLayerUpdateNormFeeType } from '../services';
import { DbLayerItem, DbLayerUpdateNormFeeType } from '../typings';
import { DbLayerNormItem } from './typings';

/**
 * @Author: SHUANG
 * @Description: 设置选中章节取费文件
 * @Date: 2023-11-20 11:15:34
 * @name dbFeeDirectoryCurrent 当前选择取费
 * @name dbChapterCurrent 当前章节
 * @name dbLayerCurrent 当前层级
 * @name dbLayerNormTableRef 定额明细表 REF
 */
export const fetchDbFeeSetByChapter = async (
  dbFeeDirectoryCurrent?: DbFeeDirectoryItem,
  dbChapterCurrent?: DbChapterItem,
  dbLayerCurrent?: DbLayerItem,
  dbLayerNormTableRef?: TableActionType,
  dbLayerNormFeeTableRef?: TableActionType,
) => {
  /** 层ID */
  const layerId = dbLayerCurrent?.id || '';
  /** 定额库ID */
  const dbId = dbLayerCurrent?.dbId || '';
  /** 取费库ID */
  const feeId = dbFeeDirectoryCurrent?.dbId || '';
  /** 取费ID */
  const normFeeTypeCode = dbFeeDirectoryCurrent?.id || '';
  /** 取费名称 */
  const normFeeTypeName = dbFeeDirectoryCurrent?.feeDirectoryName || '';
  /** 章节目录ID */
  const chapterId = dbChapterCurrent?.id || '';

  const finalParams: DbLayerUpdateNormFeeType = {
    dbId,
    feeId,
    layerId,
    normFeeTypeCode,
    normFeeTypeName,
    chapterId,
  };
  const res = await dbLayerUpdateNormFeeType(finalParams);

  if (res?.status === 'SUCCESS') {
    dbLayerNormTableRef?.current?.reload?.();
    dbLayerNormFeeTableRef?.current?.reload?.();
  }
  return res;
};

/**
 * @Author: SHUANG
 * @Description: 设置选中定额取费文件
 * @Date: 2023-11-20 11:42:08
 */
export const fetchDbFeeSetByNorm = async (
  dbFeeDirectoryCurrent?: DbFeeDirectoryItem,
  dbLayerNormCurrent?: DbLayerNormItem,
  dbLayerNormSelection?: DbLayerNormItem[],
  dbLayerCurrent?: DbLayerItem,
  dbLayerNormTableRef?: TableActionType,
  dbLayerNormFeeTableRef?: TableActionType,
) => {
  /** 层ID */
  const layerId = dbLayerCurrent?.id || '';
  /** 定额库ID */
  const dbId = dbLayerCurrent?.dbId || '';
  /** 取费库ID */
  const feeId = dbFeeDirectoryCurrent?.dbId || '';
  /** 取费ID */
  const normFeeTypeCode = dbFeeDirectoryCurrent?.id || '';
  /** 取费名称 */
  const normFeeTypeName = dbFeeDirectoryCurrent?.feeDirectoryName || '';

  /** 当前批量操作的数组 */
  const hasSelection = !!dbLayerNormSelection?.length;
  /** 如果有勾选的数据使用勾选的 无则使用 action row */
  const normArr = hasSelection ? dbLayerNormSelection : dbLayerNormCurrent ? [dbLayerNormCurrent] : [];

  const ids: any = normArr?.map((item) => item?.id);

  const finalParams: DbLayerUpdateNormFeeType = {
    dbId,
    feeId,
    layerId,
    normFeeTypeCode,
    normFeeTypeName,
    ids,
  };
  const res = await dbLayerUpdateNormFeeType(finalParams);

  if (res?.status === 'SUCCESS') {
    dbLayerNormTableRef?.current?.reload?.();
    dbLayerNormFeeTableRef?.current?.reload?.();
  }
  return res;
};

/**
 * @Author: SHUANG
 * @Description: 设置选中定额取费文件 验证
 * @Date: 2023-11-20 10:54:09
 * @name dbChapterCurrent 当前选中章节
 */
export const fetchDbFeeSetByChapterTriggerControl = async (dbChapterCurrent?: DbChapterItem) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
  if (!dbChapterCurrent) {
    Modal.warning({ title: '继续操作', content: `请选择章节！` });
    return errorReturn;
  }
  return { ...errorReturn, status: 'SUCCESS' };
};

/**
 * @Author: SHUANG
 * @Description: 设置选中定额取费文件 验证
 * @Date: 2023-11-20 11:04:02
 * @name dbLayerNormCurrent 当前定额
 * @name dbLayerNormSelection 当前勾选定额
 */
export const fetchDbFeeSetByNormTriggerControl = async (
  dbLayerNormCurrent?: DbLayerNormItem,
  dbLayerNormSelection?: DbLayerNormItem[],
) => {
  /** 当前批量操作的数组 */
  const hasSelection = !!dbLayerNormSelection?.length;
  /** 如果有勾选的数据使用勾选的 无则使用 action row */
  const normArr = hasSelection ? dbLayerNormSelection : dbLayerNormCurrent ? [dbLayerNormCurrent] : [];

  const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
  if (!normArr?.length) {
    Modal.warning({ title: '继续操作', content: `请选择要操作的定额！` });
    return errorReturn;
  }

  return { ...errorReturn, status: 'SUCCESS' };
};
