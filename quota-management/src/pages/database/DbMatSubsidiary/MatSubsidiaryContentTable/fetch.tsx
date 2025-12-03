/*
 * @Author: SHUANG
 * @Date: 2023-11-14 17:11:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-14 17:37:51
 * @Description: 人材机明细重构（材料关联关系设置） - 人材机明细
 */
import { TableActionType } from 'jd-framework-web/package/components';
import { DbMatItem } from '../../DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import { SubsidiaryMatDetailItem } from '@/pages/standard/StdSubsidiaryMat/SubsidiaryMatDetailTable/typings';
import { MatSubsidiaryContentItem, MatSubsidiaryContentSaveMat } from './typings';
import { matSubsidiaryContentSaveByMatIds } from './services';

/**
 * @Author: SHUANG
 * @Description: 勾选人材机同步数据
 * @Date: 2023-11-09 18:04:29
 * @name matDataSelection 当前勾选MAT明细
 * @name matSubsidirayDetailCurrent 次材明细 当前选中
 * @name matSubsidiaryContentCurrent 人材机明细 当前选中
 * @name matSubsidirayDetailTableRef 次材明细表
 * @name matSubsidirayContentTableRef 人材机明细表
 */

export const fetchDbMatContentSaveSelectMatDetail = async (
  matDataSelection: DbMatItem[],
  matSubsidirayDetailCurrent?: SubsidiaryMatDetailItem,
  matSubsidiaryContentCurrent?: MatSubsidiaryContentItem,
  matSubsidirayDetailTableRef?: TableActionType,
  matSubsidirayContentTableRef?: TableActionType,
) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] };
  if (!matSubsidirayDetailCurrent) return errorReturn;

  /** 选择的数据 库ID 和 目录ID */
  const { dbId, classifyId } = matDataSelection?.[0];

  /** 当前人材机 */
  const currentId = matSubsidiaryContentCurrent?.id || ''; // 要放在什么含量后面的id
  const billSort = matSubsidiaryContentCurrent?.billSort || '';

  /** 次材目录ID */
  const subsidiaryId = matSubsidirayDetailCurrent?.id || '';
  const deviceMatDirectoryId = matSubsidirayDetailCurrent?.deviceMatDirectoryId || '';

  const ids = matDataSelection.map((item) => item.id);

  const finalParams: MatSubsidiaryContentSaveMat = {
    dbId, // 选择的人材机库id
    classifyId, // 选择的人材机目录id
    deviceMatDirectoryId, // 次材目录id
    subsidiaryId, // 次材id
    currentId, // 当前行id
    billSort, //		排序
    ids, // 选择的人材机ids
  };

  const res = await matSubsidiaryContentSaveByMatIds(finalParams);
  if (res?.status === 'SUCCESS') {
    matSubsidirayDetailTableRef?.current?.reload();
    matSubsidirayContentTableRef?.current?.reload();
  }
  return res;
};
