/*
 * @Author: SHUANG
 * @Date: 2023-11-09 18:03:01
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 14:04:48
 * @Description: 标准库-次材市场价格库-明细
 */
import { TableActionType } from 'jd-framework-web/package/components';

import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import { SubMatBatchInsertByRcj, SubsidiaryMatDetailItem, SubsidiaryMatDetailQuery } from './typings';
import { subsidiaryMatDetailBatchInserByRcj, subsidiaryMatDetailQueryPageInfo } from './services';
import { DeviceMatDirectoryItem } from '../../StdDeviceMat/DeviceMatDirectoryTree/typings';

/**
 * @Author: SHUANG
 * @Description: 查询方法 确定查询范围
 * @Date: 2023-11-24 15:36:38
 */
export const fetchSubsidiaryMatDetailQueryPageInfo = async (p: FETCH.Req<SubsidiaryMatDetailQuery>) => {
  const finalParams: FETCH.Req & Partial<SubsidiaryMatDetailItem> = {
    ...p,
  };
  if (finalParams?.searchParams && finalParams?.searchParams !== '{}') {
    const searchParams = JSON.parse(finalParams?.searchParams);
    if (searchParams?.scopeLike != '1') {
      delete finalParams?.deviceMatDirectoryId;
    }
    delete searchParams?.scopeLike;
    finalParams.searchParams = JSON.stringify(searchParams);
  }
  const res = await subsidiaryMatDetailQueryPageInfo(finalParams);
  return res;
};

/**
 * @Author: SHUANG
 * @Description: 勾选人材机同步数据
 * @Date: 2023-11-09 18:04:29
 * @name dbMatCurrent 当前勾选MAT明细
 * @name subsidiaryMatDirectoryCurrent 次材目录 当前选中
 * @name subsidiaryMatDetailCurrent 次材库明细 当前选中
 */

export const fetchSubsidiaryMatDetailBatchInserByRcj = async (
  matDataSelection: DbMatItem[],
  subsidiaryMatDirectoryCurrent?: DeviceMatDirectoryItem,
  subsidiaryMatDetailCurrent?: SubsidiaryMatDetailItem,
  subsidiaryMatDetailTableRef?: TableActionType,
) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] };
  if (!subsidiaryMatDirectoryCurrent) return errorReturn;

  const currentId = subsidiaryMatDetailCurrent?.id || ''; // 要放在什么含量后面的id
  const billSort = subsidiaryMatDetailCurrent?.billSort || '';

  const { dbId: deviceMatDbId, classifyId } = matDataSelection?.[0];

  /** 优先使用本身 */
  const deviceMatDirectoryId =
    subsidiaryMatDetailCurrent?.deviceMatDirectoryId || subsidiaryMatDirectoryCurrent?.id;

  const ids = matDataSelection.map((item) => item.id);

  const finalParams: SubMatBatchInsertByRcj = {
    deviceMatDbId, // 人材机库ID
    classifyId, // 人材机目录ID
    deviceMatDirectoryId, // 目标目录ID
    currentId, // 选中行CurrentId 没有就不传
    billSort, // 选中行BillSort 没有就不传
    ids, // 勾选的rcjID
  };

  const res = await subsidiaryMatDetailBatchInserByRcj(finalParams);
  if (res?.status === 'SUCCESS') {
    subsidiaryMatDetailTableRef?.current?.reload();
  }
  return res;
};
