/*
 * @Author: SHUANG
 * @Date: 2023-10-17 11:50:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-20 18:00:17
 * @Description: 定额库定额册
 */
import { dbChapterDeleteByIds, dbChapterSave } from './services';
import { DbChapterItem, DbChapterSaveParams } from './typings';
import { DatabaseDbItem } from '../typings';

/**
 * @Author: SHUANG
 * @Description: 定额册新增操作方法
 * @Date: 2023-10-17 11:53:47
 * @name params 关联查询方法
 * @name databaseCurrent 当前数据库
 */
export const handleDbChapterPlusLevel = async (
  params: DbChapterSaveParams,
  databaseCurrent?: DatabaseDbItem,
  dbChapterCurrent?: DbChapterItem,
  level?: string,
) => {
  if (!databaseCurrent) return { status: 'ERROR' };
  const { id: dbId, dbCode, dbSimple, dbPhase } = databaseCurrent || {};
  const dbParams = { dbId, dbCode, dbSimple, dbPhase };
  const currentChapterCode = dbChapterCurrent?.chapterCode || '';

  const res = await dbChapterSave({ ...params, ...dbParams, currentChapterCode, level });
  return res;
};

/**
 * @Author: SHUANG
 * @Description: 定额册删除操作方法
 * @Date: 2023-10-17 13:39:01
 * @name params 关联参数
 * @name databaseCurrent 当前数据库
 */
export const handleDbChapterDelete = async (params: FETCH.UpStatus, databaseCurrent?: DatabaseDbItem) => {
  const { id: dbId } = databaseCurrent || {};
  const res = await dbChapterDeleteByIds({ ...params, dbId: dbId || '' });
  return res;
};
